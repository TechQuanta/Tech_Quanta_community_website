import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import Loading from "../components/ui/loader";
import "./leaderboard.css";
import "./main.css"; // Ensure you have the correct path to your main.css

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

export default function Leaderboard() {
  const {
    userStats,
    loading,
    error,
    filterActive,
    loadingFilter,
    showActiveMembers,
    showAllMembers,
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
      <div className="leaderboard-loading-screen">
        <Loading />
      </div>
    );
  if (error) return <div className="leaderboard-error-screen">{error}</div>;

  const searchedUser = filteredSortedUsers[0] || null;

  return (
    <div className="leaderboard-container">
      <div
        ref={searchRef}
        className={`leaderboard-header ${isSticky ? "leaderboard-header-sticky" : ""}`}
      >
        <div className="leaderboard-feature-buttons">
          {featureButtons.map(({ label, color, border }, i) => {
            const rotation = [10, -3, -10][i % 3];
            return (
              <div
                key={label}
                className={`feature-button ${color} ${border}`}
                style={{ transform: `rotate(${rotation}deg)`, perspective: "1000px" }}
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
              disabled={!filterActive}
              onClick={showAllMembers}
              className="filter-button show-all-button"
              type="button"
            >
              Show All
            </button>

            <button
              disabled={loadingFilter}
              onClick={showActiveMembers}
              className="filter-button active-filter-button"
              aria-label="Filter active members"
              type="button"
            >
              <FaFilter />
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
        className={`search-result-card-container ${isSticky ? "sticky-active" : ""}`}
      >
        {debouncedSearch && searchedUser ? (
          <div className="search-result-card">
            <img
              src={searchedUser.avatar}
              alt={`${searchedUser.username} avatar`}
              className="search-result-avatar"
              loading="lazy"
            />
            <div className="search-result-info">
              <h2>{searchedUser.username}</h2>
              <p>
                Score: {searchedUser.score} | Repos: {searchedUser.repositories} | Commits:{" "}
                {searchedUser.commits} | PRs: {searchedUser.pullRequests}
              </p>
            </div>
          </div>
        ) : debouncedSearch ? (
          <div className="no-user-found">No user found...</div>
        ) : null}
      </div>
      <div class="users-scroll-container mb-20">
      <div className="users-list-grid">
        {filteredSortedUsers.map((user, index) => {
          const badgeIndex = getBadgeIndexByScore(user.score);
          const badge = badges[badgeIndex];
          return (
            <div key={user.username} className="user-card">
              <img
                src={user.avatar}
                alt={`${user.username} avatar`}
                className="user-card-avatar"
                loading="lazy"
              />
              <div className="user-card-details">
                <h3 className="user-card-username">{user.username}</h3>
                <p className="user-card-score">Score: {user.score}</p>
                <div className="user-card-badges">
                  <img
                    src={badge.src}
                    alt={badge.name}
                    className="badge-icon"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
