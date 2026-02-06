import React, { useState, useMemo, useEffect } from "react";
import Loading from "../components/ui/loader";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";
import { Helmet } from 'react-helmet';

import "./leaderboard.css";
import "./main.css";

// Assets (Imports remain the same)
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
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="glass-row-wrapper">
      <div className={`glass-row ${rank <= 3 ? `glass-rank-${rank}` : ""}`}>
        <div className="glass-rank-cell">#{rank}</div>
        
        <div className="glass-user-cell">
          <div className="glass-avatar" dangerouslySetInnerHTML={{ __html: user.avatarSvg }} />
          <span className="glass-username">{user.username}</span>
        </div>

        <div className="glass-stats-cell">
          <div className="glass-stat">
            <span className="glass-stat-val">{user.score}</span>
            <span className="glass-stat-lbl">TQ Points</span>
          </div>
          {filterActive && user.techquantaCommits > 0 && (
            <div className="glass-stat">
              <span className="glass-stat-val">{user.techquantaCommits}</span>
              <span className="glass-stat-lbl">Commits</span>
            </div>
          )}
        </div>

        <div className="glass-badge-cell">
          <img src={badge.src} alt={badge.name} className="glass-badge-img" />
          <span className="glass-badge-name">{badge.name}</span>
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

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(userStats)) return [];
    const searchLower = search.trim().toLowerCase();
    const filtered = searchLower ? userStats.filter(u => u.username.toLowerCase().includes(searchLower)) : userStats;
    return [...filtered].sort((a, b) => {
      if (sortKey === "scoreDesc") return b.score - a.score;
      if (sortKey === "scoreAsc") return a.score - b.score;
      return a.username.localeCompare(b.username);
    });
  }, [userStats, search, sortKey]);

  if (loading) return <div className="glass-loader"><Loading /></div>;

  return (
    <div className="glass-leaderboard-page">
      <Helmet><title>The Arkenlist | Glass Edition</title></Helmet>

      <div className="glass-container">
        <header className="glass-header">
          <h1 className="glass-title">The Arkenlist <span className="sparkle">✨</span></h1>
          
          <div className="glass-toolbar">
            <div className="glass-search-box">
              <img src={rotatingImages[imageIndex]} className="glass-search-gif" alt="" />
              <input 
                type="text" 
                placeholder="Find a contributor..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>

            <div className="glass-actions">
              <select className="glass-select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                <option value="scoreDesc">Highest Points</option>
                <option value="scoreAsc">Lowest Points</option>
                <option value="alphaAZ">A-Z Name</option>
              </select>
              <button className="glass-btn" onClick={filterActive ? showAllMembers : showActiveMembers}>
                {loadingFilter ? "..." : (filterActive ? "All" : "Active")}
              </button>
            </div>
          </div>
        </header>

        <div className="glass-list">
          {filteredUsers.map((user, index) => (
            <UserRow key={user.username} user={user} index={index} filterActive={filterActive} />
          ))}
        </div>
      </div>
    </div>
  );
}
