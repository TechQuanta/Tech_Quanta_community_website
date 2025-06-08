import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(null);

      const cached = getWithExpiry(SESSION_KEY);
      if (cached) {
        setAllUserStats(cached);
        setDisplayedUserStats(cached);
        setAllDataNull(cached.length === 0);
        setLoading(false);
        return;
      }

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
        setDisplayedUserStats(statsArray);
        setAllDataNull(statsArray.length === 0);
      } catch (err) {
        console.error("Error loading leaderboard data:", err);
        setError("Failed to fetch leaderboard data.");
        setAllDataNull(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  async function fetchTechquantaContributors() {
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
  }

  const showActiveMembers = async () => {
    setLoadingFilter(true);
    setError(null);
    try {
      // Re-fetch Techquanta contributors data to ensure it's up-to-date
      const repoMap = await fetchTechquantaContributors();
      const active = allUserStats
        .filter((u) => repoMap[u.username] && Object.keys(repoMap[u.username]).length > 0) // Ensure there's at least one contribution
        .map((u) => {
          const repos = repoMap[u.username];
          const commits = Object.values(repos).reduce((a, b) => a + b, 0);
          return {
            ...u,
            commits, // This 'commits' will now represent total commits (not just TQ)
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
  };

  const showAllMembers = () => {
    setDisplayedUserStats(allUserStats);
    setFilterActive(false);
    setError(null);
    setAllDataNull(allUserStats.length === 0);
  };

  return {
    userStats: displayedUserStats || [],
    error: error || null,
    loading: loading || false,
    loadingFilter: loadingFilter || false,
    filterActive: filterActive || false,
    allDataNull,
    showActiveMembers,
    showAllMembers,
  };
}