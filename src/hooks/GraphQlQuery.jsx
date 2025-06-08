// src/hooks/GraphQlQuery.js
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { request, gql } from "graphql-request";
import { setWithExpiry, getWithExpiry } from "../utils/storageWithExpiry";

// Config
const SHEET_URL = import.meta.env.VITE_GOOGLE_MACRO_API_USERNAME;

const TOKEN_MAP = JSON.parse(import.meta.env.VITE_GITHUB_TOKENS || "{}");
const TOKEN_KEYS = Object.keys(TOKEN_MAP);
const SESSION_KEY = "github_leaderboard_data";
const SESSION_TTL = 10 * 60 * 2000; // 10 minutes

// GraphQL Queries (keep as-is)
const GET_USER_STATS = gql`
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoriesWithContributedCommits
      }
      repositoriesContributedTo(contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]) {
        totalCount
      }
      followers {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      avatarUrl
    }
  }
`;

const GET_TECHQUANTA_REPOS = gql`
  query {
    organization(login: "techquanta") {
      repositories(first: 30) {
        nodes {
          name
        }
      }
    }
  }
`;

const GET_REPO_CONTRIBUTORS = gql`
  query ($owner: String!, $repoName: String!) {
    repository(owner: $owner, name: $repoName) {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 100) {
              edges {
                node {
                  author {
                    user {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Helper to sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if error is rate limit related
function isRateLimitError(error) {
  if (!error) return false;

  const errors = error.response?.errors;
  if (errors && errors.some((e) => e.message?.toLowerCase().includes("rate limit"))) {
    return true;
  }

  if (
    error.response?.status === 403 &&
    error.response?.statusText?.toLowerCase().includes("rate limit")
  ) {
    return true;
  }

  return false;
}

export function useGitHubLeaderboardData() {
  const [allUserStats, setAllUserStats] = useState([]);
  const [displayedUserStats, setDisplayedUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [allDataNull, setAllDataNull] = useState(false);

  // Use ref to keep tokenIndex stable across renders
  const tokenIndexRef = useRef(0);
  // Ref to track if fetching is already in progress to prevent multiple calls
  const isFetchingRef = useRef(false);

  // Get current token header
  const getCurrentHeader = () => {
    const tokenKey = TOKEN_KEYS[tokenIndexRef.current];
    return { Authorization: `Bearer ${TOKEN_MAP[tokenKey]}` };
  };

  // Rotate token safely
  const rotateToken = () => {
    tokenIndexRef.current = (tokenIndexRef.current + 1) % TOKEN_KEYS.length;
    console.info(`Switched to token ${TOKEN_KEYS[tokenIndexRef.current]}`);
  };

  // Robust GraphQL request with token rotation & retries
  async function tryGraphQLRequest(query, variables = {}) {
    let retries = 0;

    while (true) {
      try {
        const headers = getCurrentHeader();
        const data = await request("https://api.github.com/graphql", query, variables, headers);
        return data;
      } catch (error) {
        if (isRateLimitError(error)) {
          rotateToken();
          retries++;
          if (retries >= TOKEN_KEYS.length) {
            throw new Error("All tokens exhausted due to rate limits.");
          }
          await sleep(1000 * retries * retries); // exponential backoff squared
          continue;
        } else {
          throw error;
        }
      }
    }
  }

  const fetchTechquantaContributors = useCallback(async () => {
    try {
      const repoData = await tryGraphQLRequest(GET_TECHQUANTA_REPOS);
      const repos = repoData.organization.repositories.nodes;
      const userRepoCommitsMap = {};

      for (const repo of repos) {
        const contributorsData = await tryGraphQLRequest(GET_REPO_CONTRIBUTORS, {
          owner: "techquanta",
          repoName: repo.name,
        });

        const commits = contributorsData.repository?.defaultBranchRef?.target?.history?.edges || [];

        for (const { node } of commits) {
          const login = node.author?.user?.login;
          if (!login) continue;
          if (!userRepoCommitsMap[login]) userRepoCommitsMap[login] = {};
          userRepoCommitsMap[login][repo.name] = (userRepoCommitsMap[login][repo.name] || 0) + 1;
        }
      }
      return userRepoCommitsMap;
    } catch (err) {
      console.error("Error fetching Techquanta contributors:", err);
      return {};
    }
  }, []);

  const fetchAllLeaderboardData = useCallback(async () => {
    if (isFetchingRef.current) {
      console.log("Leaderboard data fetching already in progress.");
      return;
    }

    const cached = getWithExpiry(SESSION_KEY);
    if (cached) {
      setAllUserStats(cached);
      // Initialize displayedUserStats with cached data
      setDisplayedUserStats(cached);
      setAllDataNull(cached.length === 0);
      setLoading(false);
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);
    console.log("Starting full leaderboard data fetch...");

    try {
      const res = await axios.get(SHEET_URL);
      const usernames = res.data?.data?.map((u) => u.GitHub_Username).filter(Boolean) || [];

      const userRepoCommitsMap = await fetchTechquantaContributors();

      const statsArray = [];

      for (let i = 0; i < usernames.length; i++) {
        const username = usernames[i];
        let success = false;
        let retryCount = 0;

        while (!success) {
          try {
            const data = await tryGraphQLRequest(GET_USER_STATS, { username });
            const user = data.user;
            if (!user) {
              success = true;
              break;
            }

            const {
              contributionsCollection,
              repositoriesContributedTo,
              followers,
              starredRepositories,
              avatarUrl,
            } = user;

            const score =
              contributionsCollection.totalCommitContributions * 1 +
              contributionsCollection.totalPullRequestContributions * 5 +
              contributionsCollection.totalIssueContributions * 2 +
              repositoriesContributedTo.totalCount * 3 +
              starredRepositories.totalCount * 0.5 +
              followers.totalCount * 0.2;

            const repoCommits = userRepoCommitsMap[username] || {};
            const techquantaCommits = Object.values(repoCommits).reduce((a, b) => a + b, 0);

            statsArray.push({
              username,
              avatar: avatarUrl,
              commits: contributionsCollection.totalCommitContributions,
              pullRequests: contributionsCollection.totalPullRequestContributions,
              issues: contributionsCollection.totalIssueContributions,
              reposContributed: repositoriesContributedTo.totalCount,
              stars: starredRepositories.totalCount,
              followers: followers.totalCount,
              score: Math.round(score + techquantaCommits * 4),
              techquantaCommits,
              techquantaContributions: repoCommits,
            });

            success = true;
            retryCount = 0;

            await sleep(1500); // avoid hammering GitHub API
          } catch (err) {
            if (isRateLimitError(err)) {
              console.warn(`Rate limit hit on token ${TOKEN_KEYS[tokenIndexRef.current]} for user ${username}. Rotating token...`);
              rotateToken();
              retryCount++;

              if (retryCount >= TOKEN_KEYS.length) {
                throw new Error(`All tokens exhausted due to rate limits at user index ${i}: ${username}`);
              }

              await sleep(1000 * retryCount * retryCount);
            } else {
              console.error(`Error fetching data for user ${username}:`, err);
              success = true; // skip user on non-rate-limit errors
            }
          }
        }
      }

      setWithExpiry(SESSION_KEY, statsArray, SESSION_TTL);
      setAllUserStats(statsArray);
      setDisplayedUserStats(statsArray); // Initialize displayed stats here
      setAllDataNull(statsArray.length === 0);
      console.log("Leaderboard data fetch completed and cached.");
    } catch (err) {
      console.error("Error loading leaderboard data:", err);
      setError("Failed to fetch leaderboard data.");
      setAllDataNull(true);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [fetchTechquantaContributors]);

  // Initial load effect: Try to load from cache
  useEffect(() => {
    const cached = getWithExpiry(SESSION_KEY);
    if (cached) {
      setAllUserStats(cached);
      setDisplayedUserStats(cached); // Ensure displayed stats also get cached data
      setAllDataNull(cached.length === 0);
      setLoading(false);
    } else {
      setLoading(true); // Still loading if no cache and fetchAllLeaderboardData hasn't completed
    }
  }, []);

  const showActiveMembers = useCallback(async () => {
    setLoadingFilter(true);
    setError(null);
    try {
      // If allUserStats is empty (meaning no data or cache), try to fetch it first
      // This ensures filtering works even if `fetchAllLeaderboardData` hasn't completed
      // or if it was called and failed previously for some reason.
      if (allUserStats.length === 0 && !isFetchingRef.current) {
         await fetchAllLeaderboardData(); // Ensure base data is available
      }

      // We need to re-fetch techquanta contributor data to ensure it's fresh for filtering
      // especially since the main data might be from cache.
      const repoMap = await fetchTechquantaContributors();
      const active = allUserStats // Use allUserStats as the base for filtering
        .filter((u) => repoMap[u.username] && Object.keys(repoMap[u.username]).length > 0)
        .map((u) => {
          const repos = repoMap[u.username];
          const commits = Object.values(repos).reduce((a, b) => a + b, 0);
          return {
            ...u,
            techquantaContributions: repos,
            techquantaCommits: commits,
          };
        });

      setDisplayedUserStats(active);
      setFilterActive(true);
      setAllDataNull(active.length === 0);
    } catch (err) {
      console.error("Error filtering active members:", err);
      setError("Failed to fetch active members.");
      setAllDataNull(true);
    } finally {
      setLoadingFilter(false);
    }
  }, [allUserStats, fetchTechquantaContributors, fetchAllLeaderboardData]);

  // The showAllMembers function now just resets to the complete `allUserStats`
  // which will have been populated either from cache or the initial fetch.
  const showAllMembers = useCallback(() => {
    setDisplayedUserStats(allUserStats);
    setFilterActive(false);
    setError(null);
    setAllDataNull(allUserStats.length === 0);
  }, [allUserStats]);

  return {
    userStats: displayedUserStats || [],
    error: error || null,
    loading: loading || false,
    loadingFilter: loadingFilter || false,
    filterActive: filterActive || false,
    allDataNull,
    showActiveMembers,
    showAllMembers,
    fetchAllLeaderboardData, // Still expose for the background fetch
  };
}