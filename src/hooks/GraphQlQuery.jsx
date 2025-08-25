// src/hooks/GraphQlQuery.js
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
// import { setWithExpiry, getWithExpiry } from "../utils/storageWithExpiry"; // Note: This utility is no longer needed but kept for completeness.

// Config: Your deployed Google Apps Script Web App URLs
const FETCH_API_URL ="https://script.google.com/macros/s/AKfycbywFJBXkX2mnNYteOV7_qP9E86UrIN76egL3vy2fQqC6Zd4S_Pe0GPO45dx17d-UllOaw/exec"; // Your "Get Leaderboard Data from Sheet" URL
const UPDATE_API_URL = "https://script.google.com/macros/s/AKfycbw0RMOEaU0mm6TChrxoRjbs4iEGtQEDAmBu20THvbO41hqPWmZ_Qw8vlu0_6tnItusYrQ/exec"; // Your "GitHub Data Updater & Cache Manager" URL

// --- Removed Cache Configuration ---
// const CLIENT_SESSION_KEY = "github_leaderboard_data_client_cache";
// const CLIENT_SESSION_TTL = 10 * 60 * 1000;
// const UPDATE_TRIGGER_KEY = "github_update_trigger";
// const UPDATE_TRIGGER_TTL = 24 * 60 * 60 * 1000;

// Helper to sleep (still useful for client-side delays if needed)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// *** NEW: More Distinct and "Awesome" SVG Generation Function (moved here) ***
function generateSvgAvatar(username) {
  // Simple hash for pseudo-randomness based on username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  // A more diverse set of colors
  const colors = [
    `hsl(${hash % 360}, 65%, 55%)`,
    `hsl(${(hash + 90) % 360}, 70%, 60%)`,
    `hsl(${(hash + 180) % 360}, 75%, 50%)`,
    `hsl(${(hash + 270) % 360}, 60%, 65%)`,
    `#${(hash * 12345).toString(16).slice(0, 6).padEnd(6, '0')}`, // Hex color from hash
    `#${(hash * 67890).toString(16).slice(0, 6).padEnd(6, '0')}` // Another hex color
  ];

  const size = 64; // Avatar size
  const rand = (min, max, seed) => {
    // Basic PRNG for consistent randomness based on hash
    const x = Math.sin(seed || hash) * 10000;
    const r = x - Math.floor(x);
    return Math.floor(r * (max - min + 1)) + min;
  };

  const svgElements = [];
  const clipPaths = [];
  let currentClipId = 0;

  // Background pattern with abstract shapes
  for (let i = 0; i < 5; i++) { // Generate 5 overlapping shapes
    const numPoints = rand(3, 7, hash + i * 10); // 3 to 7 points for polygon
    let points = "";
    for (let j = 0; j < numPoints; j++) {
      const x = rand(0, size, hash + i * 10 + j * 2) * (1 + (rand(0,1,hash+i+j) % 2 === 0 ? 0.2 : -0.2)); // Slight variation
      const y = rand(0, size, hash + i * 10 + j * 2 + 1) * (1 + (rand(0,1,hash+i+j) % 2 === 0 ? 0.2 : -0.2)); // Slight variation
      points += `${x},${y} `;
    }
    const fillColor = colors[rand(0, colors.length - 1, hash + i)];
    const opacity = (rand(5, 10, hash + i * 100) / 10).toFixed(1); // Varying opacity

    svgElements.push(`<polygon points="${points.trim()}" fill="${fillColor}" opacity="${opacity}" />`);
  }

  // Create a unique abstract clipping path
  currentClipId++;
  const clipId = `clip-${username}-${currentClipId}`;
  let clipPathPoints = "";
  const numClipPoints = rand(4, 8, hash + 99); // 4 to 8 points for clip path
  for (let j = 0; j < numClipPoints; j++) {
    const x = rand(size * 0.1, size * 0.9, hash + j * 50);
    const y = rand(size * 0.1, size * 0.9, hash + j * 50 + 1);
    clipPathPoints += `${x},${y} `;
  }
  clipPaths.push(`
    <clipPath id="${clipId}">
      <polygon points="${clipPathPoints.trim()}" />
    </clipPath>
  `);

  // Apply the clipping path to a main background layer for a "cutout" feel
  const mainBackgroundColor = colors[rand(0, colors.length - 1, hash + 200)];
  svgElements.push(`<rect width="100%" height="100%" fill="${mainBackgroundColor}" clip-path="url(#${clipId})" />`);


  // Add the initial of the username, potentially with a dynamic color or shadow
  const initial = username.substring(0, 1).toUpperCase();
  const textColor = colors[rand(0, colors.length - 1, hash + 300)]; // Dynamic text color
  const shadowColor = colors[rand(0, colors.length - 1, hash + 400)]; // Dynamic shadow color
  const shadowOffsetX = rand(-2, 2, hash + 500);
  const shadowOffsetY = rand(-2, 2, hash + 501);

  svgElements.push(`
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-size="32" fill="${textColor}" font-family="monospace" font-weight="bold"
          filter="drop-shadow(${shadowOffsetX}px ${shadowOffsetY}px 2px ${shadowColor})">
      ${initial}
    </text>
  `);


  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${clipPaths.join('')}
      </defs>
      <rect width="100%" height="100%" fill="#F0F0F0"/> ${svgElements.join('')}
    </svg>
  `;
}


export function useGitHubLeaderboardData() {
  const [allUserStats, setAllUserStats] = useState([]);
  const [displayedUserStats, setDisplayedUserStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [allDataNull, setAllDataNull] = useState(false);

  const isFetchingRef = useRef(false);

  // Function to trigger the Apps Script update endpoint
  const triggerAppsScriptUpdate = useCallback(async () => {
    console.log("Triggering Apps Script update (client-side cache removed)...");
    try {
      const response = await axios.get(UPDATE_API_URL);
      if (response.data && response.data.success) {
        console.log("Apps Script update triggered successfully:", response.data.message);
      } else {
        console.error("Apps Script update failed:", response.data.error || "Unknown error");
        setError("Failed to trigger data update. Please try again later.");
      }
    } catch (err) {
      console.error("Error calling Apps Script update URL:", err);
      setError("Failed to connect to update service. " + err.message);
    }
  }, []);

  // Function to fetch all leaderboard data from the Apps Script fetch endpoint
  const fetchAllLeaderboardData = useCallback(async (forceRefetch = false) => {
    if (isFetchingRef.current && !forceRefetch) {
      console.log("Leaderboard data fetching already in progress.");
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);
    console.log("Starting full leaderboard data fetch from Apps Script...");

    try {
      const response = await axios.get(FETCH_API_URL);
      if (response.data && Array.isArray(response.data.data)) {
        const rawStats = response.data.data;
        const processedStats = rawStats.map(userData => ({
          username: userData.GitHub_Username || userData.username,
          commits: userData.totalCommitContributions,
          pullRequests: userData.totalPullRequestContributions,
          issues: userData.totalIssueContributions,
          reposContributed: userData.totalCount_reposContributedTo,
          stars: userData.totalCount_starredRepositories,
          followers: userData.totalCount_followers,
          score: userData.score,
          techquantaCommits: userData.techquantaCommits,
          techquantaContributions: userData.techquantaContributions,
          avatarSvg: generateSvgAvatar(userData.GitHub_Username || userData.username)
        }));

        const sortedStats = processedStats.sort((a, b) => b.score - a.score);
        setAllUserStats(sortedStats);
        setDisplayedUserStats(sortedStats);
        setAllDataNull(sortedStats.length === 0);
        console.log("Leaderboard data fetch completed.");
      } else {
        console.error("Apps Script fetch endpoint returned unexpected data:", response.data);
        setError("Failed to fetch leaderboard data. Unexpected response.");
        setAllDataNull(true);
      }
    } catch (err) {
      console.error("Critical error loading leaderboard data from Apps Script fetch endpoint:", err);
      setError("Failed to fetch leaderboard data. " + err.message);
      setAllDataNull(true);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load effect: Trigger update then fetch data
  useEffect(() => {
    const initializeData = async () => {
      await triggerAppsScriptUpdate();
      await fetchAllLeaderboardData();
    };
    initializeData();
  }, [triggerAppsScriptUpdate, fetchAllLeaderboardData]);

  const showActiveMembers = useCallback(() => {
    setLoadingFilter(true);
    setError(null);
    setFilterActive(true);

    try {
      const active = allUserStats.filter((u) => u.techquantaCommits > 0);
      setDisplayedUserStats(active);
      setAllDataNull(active.length === 0);
    } catch (err) {
      console.error("Error filtering active members:", err);
      setError("Failed to filter active members. Please try again.");
      setAllDataNull(true);
    } finally {
      setLoadingFilter(false);
    }
  }, [allUserStats]);

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
    fetchAllLeaderboardData,
  };
}