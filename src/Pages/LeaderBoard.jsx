import React, { useState, useMemo, useEffect, useRef } from "react";
// import { FaFilter } from "react-icons/fa"; // No longer needed as it's replaced by inline SVG
import Loading from "../components/ui/loader"; // Assuming this path is correct
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery"; // Explicit .js extension for the main hook
import "./leaderboard.css"; // Ensure you have the correct path to your leaderboard.css
import "./main.css"; // Ensure you have the correct path to your main.css

// Assets (adjust paths if your assets are not directly under the root of your project)
import SearchImg1 from "../assets/SearchIMg1.gif";
import SearchImg2 from "../assets/SearchIMG2.gif";
import SearchImg3 from "../assets/SearchIMG3.gif";

import CommunityChampion from "../assets/communitychampion.png";
import Conversationalist from "../assets/conversationalist.png";
import Initiator from "../assets/initiator.png";
import Superstar from "../assets/superstar.png";
import Supporter from "../assets/supporter.png";
import Joining from "../assets/join.png";

const rotatingImages = [SearchImg1, SearchImg2, SearchImg3];
const badges = [
  { src: CommunityChampion, name: "Community Champion" },
  { src: Conversationalist, name: "Conversation List" },
  { src: Initiator, name: "Initiator" },
  { src: Superstar, name: "Superstar" },
  { src: Supporter, name: "Supporter" },
  { src: Joining, name: "Joining" },
];

const sortFunctions = {
  scoreDesc: (a, b) => b.score - a.score,
  scoreAsc: (a, b) => a.score - b.score,
  alphaAZ: (a, b) => a.username.localeCompare(b.username),
  alphaZA: (a, b) => b.username.localeCompare(a.username),
};

const featureButtons = [
  { label: "innovate", color: "bg-orange-300", border: "border-orange-400" },
  { label: "elevate", color: "bg-green-300", border: "border-green-400" },
  { label: "collaborate", color: "bg-purple-300", border: "border-purple-400" },
];

function getBadgeIndexByScore(score) {
  if (score >= 40000) return 0;
  if (score >= 20000) return 1;
  if (score >= 10000) return 2;
  if (score >= 5000) return 3;
  if (score >= 2500) return 4;
  return 5;
}

export default function App() {
  const {
    userStats,
    loading,
    error,
    filterActive,
    loadingFilter,
    showActiveMembers,
    showAllMembers,
    allDataNull,
  } = useGitHubLeaderboardData();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("scoreDesc");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const searchRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Rotate search images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % rotatingImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll event with rAF throttle for sticky header
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!searchRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check if search bar's top is at or above 10px from viewport top
          setIsSticky(searchRef.current.getBoundingClientRect().top <= 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Memoized filtered and sorted users
  const filteredSortedUsers = useMemo(() => {
    if (!Array.isArray(userStats)) return [];

    const searchLower = debouncedSearch.toLowerCase();
    const filtered = debouncedSearch
      ? userStats.filter((u) => u.username.toLowerCase().includes(searchLower))
      : userStats;

    const sortFn = sortFunctions[sortKey] || sortFunctions.scoreDesc;
    return [...filtered].sort(sortFn);
  }, [userStats, debouncedSearch, sortKey]);

  if (loading)
    return (
      <div className="leaderboard-loading-screen h-screen flex justify-center items-center">
        <Loading message="Compiling....." />
      </div>
    );
  if (error)
    return (
      <div className="leaderboard-error-screen text-red-500 text-center py-8">
        {error}
      </div>
    );

  const searchedUser = filteredSortedUsers[0] || null;

  return (
    <div className="leaderboard-container">
      <div
        ref={searchRef}
        className={`leaderboard-header ${
          isSticky ? "leaderboard-header-sticky" : ""
        }`}
      >
        <div className="leaderboard-feature-buttons">
          {featureButtons.map(({ label, color, border }, i) => {
            const rotation = [10, -3, -10][i % 3];
            return (
              <div
                key={label}
                className={`feature-button ${color} ${border}`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  perspective: "1000px",
                }}
              >
                <div className="feature-button-inner">{label}</div>
              </div>
            );
          })}
        </div>

        <h1 className="leaderboard-title">The Arkenlist</h1>

        <div className="leaderboard-search-filter">
          <div className="search-bar-wrapper">
            <img
              src={rotatingImages[imageIndex]}
              alt="Rotating search"
              className="search-rotating-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/40x40/cccccc/333333?text=IMG";
              }}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              aria-label="Search users"
            />
          </div>

          <div className="filter-controls">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="filter-select"
              aria-label="Sort users"
            >
              <option value="scoreDesc">Filter</option>
              <option value="scoreAsc">Score: Low → High</option>
              <option value="alphaAZ">A → Z</option>
              <option value="alphaZA">Z → A</option>
            </select>

            <button
              disabled={!filterActive || loadingFilter}
              onClick={showAllMembers}
              className="filter-button show-all-button"
              type="button"
            >
              Show All
            </button>

            <button
              disabled={filterActive || loadingFilter}
              onClick={showActiveMembers}
              className="filter-button active-filter-button"
              aria-label="Filter active members"
              type="button"
            >
              {loadingFilter ? (
                <div className="spinner"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path d="M3.9 54.9C10.5 45.4 22.3 40 34.5 40H477.5c12.2 0 24 5.4 30.6 14.9s6.6 22.1 0 31.6l-139.7 201.2c-3.1 4.4-4.8 9.6-4.8 15.1V448h-80V302.7c0-5.5-1.7-10.7-4.8-15.1L3.9 86.5c-6.6-9.6-6.6-22.1 0-31.6z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: isSticky ? "fixed" : "static",
          bottom: isSticky ? 0 : "auto",
          left: isSticky ? 0 : "auto",
          right: isSticky ? 0 : "auto",
          margin: isSticky ? "0 auto" : "initial",
          zIndex: isSticky ? 999 : "auto",
          width: isSticky ? "100%" : "auto",
          backgroundColor: isSticky ? "rgba(255,255,255,0.8)" : "transparent",
          backdropFilter: isSticky ? "blur(6px)" : "none",
        }}
        className={`search-result-card-container ${
          isSticky ? "sticky-active" : ""
        }`}
      >
        {debouncedSearch && searchedUser ? (
          <div className="search-result-card">
            <img
              src={searchedUser.avatar}
              alt={`${searchedUser.username} avatar`}
              className="search-result-avatar"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/80x80/cccccc/333333?text=N/A";
              }}
            />
            <div className="search-result-info">
              <h2>{searchedUser.username}</h2>
              <p>
                Score: {searchedUser.score} | Repos:{" "}
                {searchedUser.reposContributed} | Commits:{" "}
                {searchedUser.commits} | PRs: {searchedUser.pullRequests}
              </p>
              {searchedUser.techquantaCommits > 0 && (
                <p className="techquanta-contributions">
                  TechQuanta Commits: {searchedUser.techquantaCommits}
                </p>
              )}
            </div>
          </div>
        ) : debouncedSearch ? (
          <div className="no-user-found">No user found...</div>
        ) : null}
      </div>
      <div className="users-scroll-container mb-20">
        <div className="users-list-grid">
          {filteredSortedUsers.length > 0 ? (
            filteredSortedUsers.map((user, index) => {
              const badgeIndex = getBadgeIndexByScore(user.score);
              const badge = badges[badgeIndex];
              return (
                <div key={user.username} className="user-card">
                  <img
                    src={user.avatar}
                    alt={`${user.username} avatar`}
                    className="user-card-avatar"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100/cccccc/333333?text=N/A";
                    }}
                  />
                  <div className="user-card-details">
                    <h3 className="user-card-username">{user.username}</h3>
                    <p className="user-card-score">Score: {user.score}</p>
                    {filterActive && user.techquantaCommits > 0 && (
                      <p className="user-card-techquanta-commits">
                        TQ Commits: {user.techquantaCommits}
                      </p>
                    )}
                    <div className="user-card-badges">
                      <img
                        src={badge.src}
                        alt={badge.name}
                        className="badge-icon"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/40x40/cccccc/333333?text=Badge";
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-users-display">
              {allDataNull
                ? "No data available."
                : filterActive
                ? "No active TechQuanta contributors found."
                : "No users found based on your search/filters."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}