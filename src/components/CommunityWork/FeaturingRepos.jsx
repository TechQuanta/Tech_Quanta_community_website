// FeaturingReposOnly.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { request, gql } from "graphql-request";
import { FaCode, FaGitAlt, FaTools, FaCodeBranch } from "react-icons/fa";

// --- GraphQL Query for Pinned/Featured Repositories ---
const GET_PINNED_REPOS = gql`
  query GetPinnedRepositories {
    organization(login: "techquanta") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
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

// --- Utility Functions (kept for completeness, but less critical without token rotation) ---
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(error) {
  if (!error) return false;

  const errors = error.response?.errors;
  if (errors && errors.some((e) => e.message?.toLowerCase().includes("rate limit"))) {
    return true;
  }
  if (error.response?.status === 403 && error.response?.statusText?.toLowerCase().includes("rate limit")) {
    return true;
  }
  return false;
}

// --- Custom Hook for Data Fetching ---
const usePinnedReposFetcher = () => {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false); // State to hold error message

  const getCurrentHeader = useCallback(() => {
    const token = import.meta.env.VITE_APP_GITHUB_TOKEN; // Or process.env.REACT_APP_GITHUB_TOKEN etc.
    if (!token) {
      console.error("Error: GITHUB_TOKEN environment variable is not set. API requests will fail.");
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }, []);

  const tryGraphQLRequest = useCallback(async (query, variables = {}) => {
    try {
      const headers = getCurrentHeader();
      if (!headers.Authorization) {
        // This error will now be caught by the outer try-catch in fetchRepos
        throw new Error("Authentication token missing. Please ensure GITHUB_TOKEN is correctly configured.");
      }
      const data = await request("https://api.github.com/graphql", query, variables, headers);
      return data;
    } catch (err) {
      console.error("GraphQL request failed:", err);
      let errorMessage = "Failed to fetch repositories.";
      if (err.response?.errors && err.response.errors.length > 0) {
        errorMessage += " Details: " + err.response.errors.map(e => e.message).join(", ");
      } else if (err.message.includes("Failed to fetch") || (err.name === "TypeError" && err.message.includes("Network request failed"))) {
        errorMessage = "Network error: Could not connect to GitHub API. Check internet/firewall.";
      } else if (isRateLimitError(err)) {
        errorMessage = "GitHub API rate limit hit. Please wait or check your token.";
      } else {
        errorMessage += " " + err.message;
      }
      throw new Error(errorMessage); // Re-throw with a user-friendly message
    }
  }, [getCurrentHeader]);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      setFetchError(null); // Clear previous errors

      try {
        const data = await tryGraphQLRequest(GET_PINNED_REPOS);
        const fetchedRepos = data.organization?.pinnedItems?.nodes || [];
        setPinnedRepos(fetchedRepos);
        if (fetchedRepos.length === 0) {
          // If no repos are returned, but no error, it means no pins are set or found
          setFetchError("No pinned repositories found for techquanta organization.");
        }
      } catch (err) {
        console.error("Critical error fetching pinned repositories:", err);
        setFetchError(err.message || "An unknown error occurred while fetching repositories.");
        setPinnedRepos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, [tryGraphQLRequest]);

  return { pinnedRepos, loading, fetchError };
};

// --- RepoCard Component (UNMODIFIED) ---
const RepoCard = ({ name, description, language, stars, url }) => {
  const cardBgClass = 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-md';
  const mainTextColorClass = 'text-gray-900 dark:text-white';
  const descriptionColorClass = 'text-gray-700 dark:text-gray-300';
  const metaColorClass = 'text-gray-600 dark:text-gray-400';
  const publicBadgeBgClass = 'bg-gray-200 dark:bg-gray-700';
  const publicBadgeTextColorClass = 'text-gray-800 dark:text-gray-200';

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
      className={`${cardBgClass} border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl p-6 w-full flex flex-col justify-between
                   hover:shadow-2xl hover:border-primary dark:hover:border-tech-green transform hover:-translate-y-2 transition-all duration-300 ease-in-out
                   relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10 dark:to-tech-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          {FileIcon}
          <span className={`font-semibold text-xl ${mainTextColorClass} font-exo2`}>{name}</span>
        </div>
        <p className={`text-base mt-2 line-clamp-3 ${descriptionColorClass} font-space-grotesk flex-grow`}>{description || 'No description provided.'}</p>
        <div className="flex justify-between items-center mt-4 text-sm">
          {language && (
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

// --- Main Featuring Repositories Component (MODIFIED for error display) ---
const FeaturingReposOnly = () => {
  const { pinnedRepos, loading, fetchError } = usePinnedReposFetcher();
  const headingColorClass = 'bg-gradient-to-r from-primary to-tech-green';

  // Display error message if there's a fetchError
  if (fetchError) {
    return (
      <div className="uniform-background-gradient relative overflow-hidden px-6 py-20 flex justify-center items-center min-h-[400px] text-center">
        <div className="absolute inset-0 flex items-center justify-around z-0 opacity-10">
          <FaCode className="text-red-400 dark:text-red-600 text-6xl" />
          <FaGitAlt className="text-red-400 dark:text-red-600 text-7xl" />
          <FaTools className="text-red-400 dark:text-red-600 text-5xl" />
        </div>
        <div className="z-10 text-red-700 dark:text-red-300 font-space-grotesk">
          <p className="text-2xl font-bold mb-4">Error Loading Repositories!</p>
          <p className="text-lg">{fetchError}</p>
          <p className="text-md mt-2">Please check your GitHub token, network connection, or the organization's pinned repositories on GitHub.com.</p>
        </div>
      </div>
    );
  }

  // Display loading state
  if (loading) {
    return (
      <div className="uniform-background-gradient relative overflow-hidden px-6 py-20 flex justify-center items-center min-h-[400px]">
        {/* Background Icons (during loading) */}
        <div className="absolute inset-0 flex items-center justify-around z-0 opacity-10">
          <FaCode className="text-gray-400 dark:text-gray-600 text-6xl animate-pulseSlow" />
          <FaGitAlt className="text-gray-400 dark:text-gray-600 text-7xl animate-pulseSlow delay-1000" />
          <FaTools className="text-gray-400 dark:text-gray-600 text-5xl animate-pulseSlow delay-2000" />
        </div>
        <p className={`text-2xl font-space-grotesk font-semibold bg-clip-text text-transparent ${headingColorClass} animate-pulse z-10`}>
          Loading amazing featured repositories...
        </p>
      </div>
    );
  }

  // Display pinned repositories or "no repos" message
  return (
    <div className="uniform-background-gradient relative overflow-hidden px-6 py-20 flex justify-center font-space-grotesk mt-12">
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-around z-0 opacity-10">
        <FaCode className="text-blue-500 dark:text-cyan-400 text-8xl md:text-9xl animate-spinSlow" />
        <FaGitAlt className="text-purple-500 dark:text-pink-400 text-7xl md:text-8xl animate-blobFloat delay-2000" />
        <FaTools className="text-green-500 dark:text-emerald-400 text-9xl md:text-10xl animate-spinSlow delay-1000" />
        <FaCodeBranch className="text-orange-500 dark:text-amber-400 text-6xl md:text-7xl animate-blobFloat delay-4000" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <h2 className={`text-left
            text-4xl sm:text-5xl md:text-6xl
            font-space-grotesk font-bold tracking-tight leading-tight
            bg-clip-text text-transparent
            ${headingColorClass} pb-12 font-exo2`}>Our Stellar Pinned Repositories</h2>
        {pinnedRepos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {pinnedRepos.map((repo) => (
              <RepoCard
                key={repo.name} // Using repo.name as key (ensure uniqueness or use repo.id if available)
                name={repo.name}
                description={repo.description}
                language={repo.primaryLanguage}
                stars={repo.stargazerCount}
                url={repo.url}
              />
            ))}
          </div>
        ) : (
          // This message will now also show if fetchError is set to "No pinned repositories found"
          <div className="text-center text-gray-400 text-lg font-space-grotesk">
            No pinned repositories to display at this moment. Stay tuned for exciting projects!
          </div>
        )}
      </div>

      {/* New CSS for icon animations */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spinSlow {
          animation: spinSlow 30s linear infinite;
        }

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(15deg); }
        }
        .animate-blobFloat {
          animation: blobFloat 20s ease-in-out infinite;
        }

        @keyframes pulseSlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }
        .animate-pulseSlow {
            animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FeaturingReposOnly;