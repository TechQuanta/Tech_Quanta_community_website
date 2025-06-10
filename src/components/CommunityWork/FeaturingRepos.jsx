import React, { useState, useEffect, useRef, useCallback } from "react";
import { request, gql } from "graphql-request";

// --- Configuration ---
// Fetches GitHub Personal Access Tokens (PATs) from environment variables.
// Ensure VITE_GITHUB_TOKENS is set in your .env file in a JSON string format:
// Example: VITE_GITHUB_TOKENS='{"main":"ghp_YOUR_MAIN_TOKEN_HERE","backup":"ghp_YOUR_BACKUP_TOKEN_HERE"}'
const TOKEN_MAP = JSON.parse(import.meta.env.VITE_GITHUB_TOKENS || "{}");
const TOKEN_KEYS = Object.keys(TOKEN_MAP);

// --- GraphQL Query for Pinned/Featured Repositories ---
// This query specifically fetches the repositories pinned to the 'techquanta' organization's profile.
// You can adjust the 'first' argument to control how many pinned repositories are displayed.
// For typical GitHub profiles, 6 is a common number of displayed pinned repos.
const GET_PINNED_REPOS = gql`
  query GetPinnedRepositories {
    organization(login: "techquanta") {
      pinnedItems(first: 6, types: REPOSITORY) { # Fetch up to 6 pinned repositories
        nodes {
          ... on Repository { # Ensure we're only selecting repository data
            name
            description
            stargazerCount
            forkCount
            url
            updatedAt
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

// --- Utility Functions ---

/**
 * Creates a promise that resolves after a specified delay.
 * Useful for introducing delays in asynchronous operations (e.g., API retries).
 * @param {number} ms - The delay in milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if a given error object indicates a GitHub API rate limit error.
 * This helps in implementing token rotation and retry logic.
 * @param {object} error - The error object from a GraphQL request.
 * @returns {boolean} - True if it's a rate limit error, false otherwise.
 */
function isRateLimitError(error) {
  if (!error) return false;

  const errors = error.response?.errors;
  if (errors && errors.some((e) => e.message?.toLowerCase().includes("rate limit"))) {
    return true;
  }
  // Also check for 403 Forbidden status with "rate limit" text
  if (error.response?.status === 403 && error.response?.statusText?.toLowerCase().includes("rate limit")) {
    return true;
  }
  return false;
}

// --- Custom Hook for Data Fetching ---
/**
 * A custom React hook to fetch and manage the state of GitHub's pinned repositories.
 * It includes logic for token rotation and retries to handle GitHub API rate limits.
 * @returns {object} - An object containing:
 * - `pinnedRepos`: An array of pinned repository data.
 * - `loading`: A boolean indicating if data is currently being fetched.
 * - `fetchError`: A boolean indicating if a critical error occurred that prevents rendering.
 */
const usePinnedReposFetcher = () => { // Renamed hook to reflect its purpose
  const [pinnedRepos, setPinnedRepos] = useState([]); // Renamed state variable
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // useRef to keep track of the current token index across renders without causing re-renders
  const tokenIndexRef = useRef(0);

  /**
   * Dynamically gets the authorization header for the current GitHub token.
   */
  const getCurrentHeader = useCallback(() => {
    const tokenKey = TOKEN_KEYS[tokenIndexRef.current];
    if (!tokenKey || !TOKEN_MAP[tokenKey]) {
      console.warn("No GitHub token configured for the current index. API requests may fail.");
      return {}; // Return an empty object if no token is available
    }
    return { Authorization: `Bearer ${TOKEN_MAP[tokenKey]}` };
  }, []);

  /**
   * Rotates to the next GitHub token in the TOKEN_KEYS array.
   * Useful when a token hits a rate limit.
   */
  const rotateToken = useCallback(() => {
    tokenIndexRef.current = (tokenIndexRef.current + 1) % TOKEN_KEYS.length;
    console.info(`Switched to token: ${TOKEN_KEYS[tokenIndexRef.current]}`);
  }, []);

  /**
   * Attempts a GraphQL request with built-in retry and token rotation logic for rate limits.
   * @param {string} query - The GraphQL query string.
   * @param {object} variables - Variables for the GraphQL query.
   * @returns {Promise<object>} - The data returned from the GraphQL API.
   * @throws {Error} - Throws an error if all tokens are exhausted or for other API issues.
   */
  const tryGraphQLRequest = useCallback(async (query, variables = {}) => {
    let retries = 0;
    while (true) { // Loop indefinitely until success or permanent failure
      try {
        const headers = getCurrentHeader();
        // If there are tokens configured but no valid header is generated, throw immediately
        if (!headers.Authorization && TOKEN_KEYS.length > 0) {
            throw new Error("GitHub tokens are configured, but no valid authorization header could be generated. Check .env format or token validity.");
        }
        const data = await request("https://api.github.com/graphql", query, variables, headers);
        return data; // Request successful, break loop
      } catch (err) {
        if (isRateLimitError(err)) {
          console.warn(`Rate limit hit. Rotating token for retry. Retries left: ${TOKEN_KEYS.length - retries - 1}`);
          rotateToken(); // Switch to the next token
          retries++;
          if (retries >= TOKEN_KEYS.length) {
            throw new Error("All configured GitHub tokens exhausted due to rate limits. Please wait or provide more tokens.");
          }
          await sleep(1000 * retries * retries); // Exponential backoff
          continue; // Retry with the new token
        } else {
            // General error logging for non-rate limit issues
            console.error("GraphQL request failed due to a non-rate limit error:", err);
            // Provide more user-friendly messages for common network issues
            if (err.message.includes("Failed to fetch") || (err.name === "TypeError" && err.message.includes("Network request failed"))) {
                throw new Error("Network error: Could not connect to GitHub API. Please check your internet connection or firewall.");
            }
            throw err; // Re-throw other types of errors
        }
      }
    }
  }, [getCurrentHeader, rotateToken, TOKEN_KEYS]); // Dependencies for useCallback

  // --- Main Data Fetching Effect ---
  // This effect runs once on component mount to fetch the pinned repositories.
  useEffect(() => {
    async function fetchRepos() {
      setLoading(true); // Indicate loading has started
      setFetchError(false); // Clear any previous errors

      try {
        // Execute the GraphQL query for Pinned Repositories
        const data = await tryGraphQLRequest(GET_PINNED_REPOS); // *** CORRECTED: Use GET_PINNED_REPOS ***
        // Extract the relevant data from 'pinnedItems', defaulting to an empty array if not found
        const fetchedRepos = data.organization?.pinnedItems?.nodes || []; // *** CORRECTED: Data path for pinnedItems ***
        setPinnedRepos(fetchedRepos); // Update pinnedRepos state
      } catch (err) {
        console.error("Critical error fetching pinned repositories:", err);
        setFetchError(true);
        setPinnedRepos([]); // Ensure the array is empty on error
      } finally {
        setLoading(false); // Always set loading to false after fetch attempt
      }
    }

    fetchRepos(); // Initiate the fetch process
  }, [tryGraphQLRequest]); // tryGraphQLRequest is a dependency because it's memoized

  return { pinnedRepos, loading, fetchError }; // Return pinnedRepos instead of featuringRepos
};

// --- RepoCard Component ---
// This is a presentational component responsible for rendering a single repository card.
const RepoCard = ({ name, description, language, stars, url, theme = 'dark' }) => {
  // Determine card colors based on the theme for optimal visibility
  const cardBgClass = theme === 'dark' ? 'bg-white' : 'bg-gray-800';
  const mainTextColorClass = theme === 'dark' ? 'text-gray-800' : 'text-white';
  const descriptionColorClass = theme === 'dark' ? 'text-gray-700' : 'text-gray-300';
  const metaColorClass = theme === 'dark' ? 'text-gray-600' : 'text-gray-400';
  const publicBadgeBgClass = theme === 'dark' ? 'bg-gray-200' : 'bg-gray-700';
  const publicBadgeTextColorClass = theme === 'dark' ? 'text-gray-800' : 'text-gray-200';

  // File Icon (always inherits `metaColorClass` to match other metadata)
  const FileIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${metaColorClass}`}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );

  // Star Icon (always yellow for consistent star representation)
  const StarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-yellow-500"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardBgClass} shadow-lg rounded-md p-4 w-full flex flex-col justify-between
                   hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ease-in-out`}
    >
      <div>
        {/* Repository Name and File Icon */}
        <div className="flex items-center gap-2 mb-2">
          {FileIcon}
          <span className={`font-semibold text-lg ${mainTextColorClass} font-exo2`}>{name}</span>
        </div>

        {/* Repository Description */}
        <p className={`text-sm mt-1 line-clamp-3 ${descriptionColorClass} font-space-grotesk`}>{description || 'No description provided.'}</p>

        {/* Language and Star Count */}
        <div className="flex justify-between items-center mt-3 text-sm">
          {language && ( // Only show language if available
            <span className={`flex items-center gap-1 ${metaColorClass} font-mono`}>
              <span style={{ backgroundColor: language.color }} className="inline-block w-3 h-3 rounded-full"></span> {language.name}
            </span>
          )}
          <span className={`flex items-center gap-1 ${metaColorClass} font-mono`}>
            {StarIcon}
            {stars}
          </span>
          <div className="flex items-center mt-2 text-right">
            <span className={`${publicBadgeBgClass} ${publicBadgeTextColorClass} px-2 py-0.5 rounded text-xs ml-auto font-mono`}>
              Public
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- Main Featuring Repositories Component ---
// This component orchestrates the fetching and display of pinned repositories.
const FeaturingReposOnly = ({ theme = 'dark' }) => {
  // Use the custom hook to get the data and its status
  const { pinnedRepos, loading, fetchError } = usePinnedReposFetcher(); // *** CORRECTED: Destructure pinnedRepos ***

  // Determine the main heading color based on the theme
  const headingColorClass = theme === 'dark' ? 'text-green-400' : 'text-green-600';

  // --- Conditional Rendering Logic ---
  if (fetchError) {
    // If a critical error occurred, you might want to render an error message or nothing.
    // For now, we'll return null as per your original logic.
    return null;
  }

  // If data is still loading or no pinned repos are found, show a loading message.
  if (loading || pinnedRepos.length === 0) {
    return (
      <div className="bg-transparent text-white px-6 py-10 flex justify-center items-center h-48">
        <p className={`text-xl ${headingColorClass} animate-pulse font-space-grotesk`}>Loading amazing featured repositories...</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent px-6 py-10 flex justify-center font-space-grotesk mt-12">
      <div className="w-full max-w-6xl">
        <h2 className={`text-left
            text-4xl sm:text-5xl md:text-6xl
            font-space-grotesk font-bold tracking-tight leading-tight
            bg-clip-text text-transparent
            bg-gradient-to-r from-primary to-tech-green pb-12 ${headingColorClass} font-exo2`}>Our Stellar Pinned Repositories</h2> {/* Updated heading */}
        {pinnedRepos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {pinnedRepos.map((repo) => ( // Iterate over pinnedRepos
              <RepoCard
                key={repo.name}
                name={repo.name}
                description={repo.description}
                language={repo.primaryLanguage}
                stars={repo.stargazerCount}
                url={repo.url}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg font-space-grotesk">
            No pinned repositories to display at this moment. Stay tuned for exciting projects!
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturingReposOnly;