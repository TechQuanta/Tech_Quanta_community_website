import React, { useState, useEffect, useRef, useCallback } from "react";
import { request, gql } from "graphql-request";
import { setWithExpiry, getWithExpiry } from "../../utils/storageWithExpiry"; // Your caching utility

// --- Configuration ---
// Fetches GitHub Personal Access Tokens (PATs) from environment variables.
// Ensure VITE_GITHUB_TOKENS is set in your .env file in a JSON string format:
// Example: VITE_GITHUB_TOKENS='{"main":"ghp_YOUR_MAIN_TOKEN_HERE","backup":"ghp_YOUR_BACKUP_TOKEN_HERE"}'
const TOKEN_MAP = JSON.parse(import.meta.env.VITE_GITHUB_TOKENS || "{}");
const TOKEN_KEYS = Object.keys(TOKEN_MAP);

// Cache key and Time-To-Live (TTL) for session storage, preventing excessive API calls.
const FEATURING_REPOS_SESSION_KEY = "techquanta_featuring_repos_cache";
const FEATURING_REPOS_SESSION_TTL = 30 * 60 * 1000; // Cache data for 30 minutes

// --- GraphQL Query ---
// This concise query fetches the top 10 most-starred, non-forked repositories
// from the 'techquanta' organization, along with essential details.
const GET_FEATURING_REPOS_ONLY = gql`
  query GetFeaturingRepositories {
    organization(login: "techquanta") {
      featuringRepositories: repositories(
        first: 10
        orderBy: { field: STARGAZERS, direction: DESC }
        isFork: false
      ) {
        nodes {
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
 * A custom React hook to fetch and manage the state of featured GitHub repositories.
 * It includes logic for token rotation and retries to handle GitHub API rate limits.
 * @returns {object} - An object containing:
 * - `featuringRepos`: An array of featured repository data.
 * - `loading`: A boolean indicating if data is currently being fetched.
 * - `fetchError`: A boolean indicating if a critical error occurred that prevents rendering.
 */
const useFeaturingReposFetcher = () => {
  const [featuringRepos, setFeaturingRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false); // Changed 'error' to 'fetchError' for clarity

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
  // This effect runs once on component mount to fetch the featured repositories.
  useEffect(() => {
    async function fetchRepos() {
      setLoading(true); // Indicate loading has started
      setFetchError(false); // Clear any previous errors

      // First, try to load data from session storage to avoid unnecessary API calls
      const cached = getWithExpiry(FEATURING_REPOS_SESSION_KEY);
      if (cached) {
        setFeaturingRepos(cached);
        setLoading(false); // Data loaded from cache
        return; // Exit as data is available
      }

      try {
        // Execute the GraphQL query for featuring repositories
        const data = await tryGraphQLRequest(GET_FEATURING_REPOS_ONLY);
        // Extract the relevant data, defaulting to an empty array if not found
        const fetchedRepos = data.organization?.featuringRepositories?.nodes || [];
        setFeaturingRepos(fetchedRepos);
        // Cache the newly fetched data for future use
        setWithExpiry(FEATURING_REPOS_SESSION_KEY, fetchedRepos, FEATURING_REPOS_SESSION_TTL);
      } catch (err) {
        console.error("Critical error fetching featuring repositories:", err);
        // On error, if no cache was found, set fetchError to true to render nothing
        setFetchError(true);
        setFeaturingRepos([]); // Ensure the array is empty
      } finally {
        setLoading(false); // Always set loading to false after fetch attempt
      }
    }

    fetchRepos(); // Initiate the fetch process
  }, [tryGraphQLRequest]); // tryGraphQLRequest is a dependency because it's memoized

  return { featuringRepos, loading, fetchError }; // Return fetchError instead of error
};

// --- RepoCard Component ---
// This is a presentational component responsible for rendering a single repository card.
const RepoCard = ({ name, description, language, stars, url, theme = 'dark' }) => {
  // Determine card colors based on the theme for optimal visibility
  const cardBgClass = theme === 'dark' ? 'bg-white' : 'bg-gray-800'; // White card on dark page, dark gray on light page
  const mainTextColorClass = theme === 'dark' ? 'text-gray-800' : 'text-white'; // Dark text on white card, white text on dark card
  const descriptionColorClass = theme === 'dark' ? 'text-gray-700' : 'text-gray-300'; // Slightly softer description color
  const metaColorClass = theme === 'dark' ? 'text-gray-600' : 'text-gray-400'; // Metadata text (file icon, language)
  const publicBadgeBgClass = theme === 'dark' ? 'bg-gray-200' : 'bg-gray-700'; // Public badge background
  const publicBadgeTextColorClass = theme === 'dark' ? 'text-gray-800' : 'text-gray-200'; // Public badge text color

  // File Icon (always inherits `metaColorClass` to match other metadata)
  const FileIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20" // Slightly smaller for better visual balance with text
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${metaColorClass}`} // Ensures icon color adapts with theme
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );

  // Star Icon (always yellow for consistent star representation)
  const StarIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20" // Consistent size with file icon
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-yellow-500" // Explicitly yellow for always visible star
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
          <span className={`font-semibold text-lg ${mainTextColorClass} font-exo2`}>{name}</span> {/* Apply Exo 2 font */}
        </div>

        {/* Repository Description */}
        <p className={`text-sm mt-1 line-clamp-3 ${descriptionColorClass} font-space-grotesk`}>{description || 'No description provided.'}</p> {/* Apply Space Grotesk font */}

        {/* Language and Star Count */}
        <div className="flex justify-between items-center mt-3 text-sm">
          {language && ( // Only show language if available
            <span className={`flex items-center gap-1 ${metaColorClass} font-mono`}> {/* Apply Fira Mono font */}
              <span style={{ backgroundColor: language.color }} className="inline-block w-3 h-3 rounded-full"></span> {language.name}
            </span>
          )}
          <span className={`flex items-center gap-1 ${metaColorClass} font-mono`}> {/* Apply Fira Mono font */}
            {StarIcon}
            {stars}
          </span>
          <div className="flex items-center mt-2 text-right">
            <span className={`${publicBadgeBgClass} ${publicBadgeTextColorClass} px-2 py-0.5 rounded text-xs ml-auto font-mono`}> {/* Apply Fira Mono font */}
              Public
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- Main Featuring Repositories Component ---
// This component orchestrates the fetching and display of featured repositories.
const FeaturingReposOnly = ({ theme = 'dark' }) => { // Accept theme prop
  // Use the custom hook to get the data and its status
  const { featuringRepos, loading, fetchError } = useFeaturingReposFetcher(); // Destructure fetchError

  // Determine the main heading color based on the theme
  const headingColorClass = theme === 'dark' ? 'text-green-400' : 'text-green-600'; // Green on dark, darker green on light

  // --- Conditional Rendering Logic ---
  // If a critical error occurred and no cached data is available, return null.
  if (fetchError) {
    return null;
  }

  // If slides are still loading (or no slides fetched yet and no critical error), show loading message.
  if (loading || featuringRepos.length === 0) { // Check loading and also if repos are empty (could mean no data yet)
    return (
      <div className="bg-transparent text-white px-6 py-10 flex justify-center items-center h-48">
        <p className={`text-xl ${headingColorClass} animate-pulse font-space-grotesk`}>Loading amazing featured repositories...</p> {/* Apply Space Grotesk font */}
      </div>
    );
  }

  // This `if (error)` block (from your original code) is now removed,
  // as `fetchError` directly controls rendering nothing, and if `fetchError` is false,
  // it implies either success or loading.

  return (
    <div className="bg-transparent px-6 py-10 flex justify-center font-space-grotesk mt-12"> {/* Apply Space Grotesk font to container */}
      <div className="w-full max-w-6xl">
        <h2 className={`text-left 
            text-4xl sm:text-5xl md:text-6xl 
            font-space-grotesk font-bold tracking-tight leading-tight
            bg-clip-text text-transparent 
            bg-gradient-to-r from-primary to-tech-green pb-12 ${headingColorClass} font-exo2`}>Our Stellar Featuring Repositories</h2> {/* Apply Exo 2 font */}
        {featuringRepos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {featuringRepos.map((repo) => (
              <RepoCard
                key={repo.name} // Using repo name as a unique key for list rendering
                name={repo.name}
                description={repo.description}
                language={repo.primaryLanguage}
                stars={repo.stargazerCount}
                url={repo.url}
                theme={theme} // Pass the theme prop down to RepoCard
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg font-space-grotesk"> {/* Apply Space Grotesk font */}
            No featured repositories to display at this moment. Stay tuned for exciting projects!
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturingReposOnly;