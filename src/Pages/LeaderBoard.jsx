import React, { useState, useMemo, useEffect, useCallback } from "react";
import Loading from "../components/ui/loader";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";
import { Helmet } from 'react-helmet';

import "./leaderboard.css";
import "./main.css";

// Assets
import CommunityChampion from "../assets/communitychampion.png";
import Conversationalist from "../assets/conversationalist.png";
import Initiator from "../assets/initiator.png";
import Superstar from "../assets/superstar.png";
import Supporter from "../assets/supporter.png";
import Joining from "../assets/join.png";
import search1 from "../assets/SearchIMg1.gif";
import search2 from "../assets/SearchIMG2.gif";
import search3 from "../assets/SearchIMG3.gif";

const rotatingImages = [search1, search2, search3];
const badges = [
  { src: CommunityChampion, name: "Champion", threshold: 40000 },
  { src: Conversationalist, name: "Speaker", threshold: 20000 },
  { src: Initiator, name: "Initiator", threshold: 10000 },
  { src: Superstar, name: "Superstar", threshold: 5000 },
  { src: Supporter, name: "Supporter", threshold: 2500 },
  { src: Joining, name: "Member", threshold: 0 },
];

function getBadgeInfoByScore(score) {
  for (const badge of badges) {
    if (score >= badge.threshold) return badge;
  }
  return badges[badges.length - 1];
}

const UserRow = React.memo(({ user, index, filterActive }) => {
  const badge = getBadgeInfoByScore(user.score);
  const rank = index + 1;
  const githubUrl = `https://github.com/${user.username}`;

  return (
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="leaderboard-row-wrapper">
      <div className={`leaderboard-row ${rank <= 3 ? `rank-bg-${rank}` : ""}`}>
        
        {/* 1. Rank Section */}
        <div className="row-rank-cell">
          <span className="rank-text">{rank}</span>
        </div>

        {/* 2. User Identity Section */}
        <div className="row-user-cell">
          <div className="row-avatar" dangerouslySetInnerHTML={{ __html: user.avatarSvg }} />
          <div className="row-user-details">
            <span className="row-username">{user.username}</span>
            <span className="row-mobile-score">{user.score} pts</span>
          </div>
        </div>

        {/* 3. Stats Section (Hidden on small mobile) */}
        <div className="row-stats-cell">
          <div className="stat-group">
            <span className="stat-label">TQ Points</span>
            <span className="stat-number">{user.score}</span>
          </div>
          {filterActive && user.techquantaCommits > 0 && (
            <div className="stat-group">
              <span className="stat-label">Commits</span>
              <span className="stat-number">{user.techquantaCommits}</span>
            </div>
          )}
        </div>

        {/* 4. Badge Section */}
        <div className="row-badge-cell">
          <img src={badge.src} alt={badge.name} className="row-badge-icon" />
          <span className="row-badge-name">{badge.name}</span>
        </div>
      </div>
    </a>
  );
});

export default function App() {
  const { userStats, loading, error, filterActive, showActiveMembers, showAllMembers, loadingFilter } = useGitHubLeaderboardData();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("scoreDesc");
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setImageIndex((i) => (i + 1) % rotatingImages.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredSortedUsers = useMemo(() => {
    if (!Array.isArray(userStats)) return [];
    const searchLower = search.trim().toLowerCase();
    const filtered = searchLower ? userStats.filter(u => u.username.toLowerCase().includes(searchLower)) : userStats;
    
    return [...filtered].sort((a, b) => {
      if (sortKey === "scoreDesc") return b.score - a.score;
      if (sortKey === "scoreAsc") return a.score - b.score;
      return a.username.localeCompare(b.username);
    });
  }, [userStats, search, sortKey]);

  if (loading) return <div className="full-page-loading"><Loading /></div>;

  return (
    <div className="leaderboard-page-v3">
      <Helmet><title>The Arkenlist | Contributors</title></Helmet>

      <div className="v3-content-container">
        <div className="v3-header">
          <h1 className="v3-title">The Arkenlist <span className="sparkle">✨</span></h1>
          
          <div className="v3-controls-bar">
            <div className="v3-search-input-group">
              <img src={rotatingImages[imageIndex]} className="v3-search-img" alt="" />
              <input 
                type="text" 
                placeholder="Search contributor..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>

            <div className="v3-buttons-group">
              <select className="v3-select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                <option value="scoreDesc">Highest TQ</option>
                <option value="scoreAsc">Lowest TQ</option>
                <option value="alphaAZ">Name A-Z</option>
              </select>
              <button className="v3-btn" onClick={filterActive ? showAllMembers : showActiveMembers}>
                {loadingFilter ? "..." : (filterActive ? "All" : "Active")}
              </button>
            </div>
          </div>
        </div>

        {/* THE SINGLE COLUMN LIST */}
        <div className="v3-list-header">
          <div className="h-rank">Rank</div>
          <div className="h-user">Contributor</div>
          <div className="h-stats">Performance</div>
          <div className="h-badge">Achievement</div>
        </div>

        <div className="v3-list-body">
          {filteredSortedUsers.map((user, index) => (
            <UserRow key={user.username} user={user} index={index} filterActive={filterActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
