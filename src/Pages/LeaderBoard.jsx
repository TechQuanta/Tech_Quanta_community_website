// import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
// import Loading from "../components/ui/loader";
// import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";
// import "./leaderboard.css";
// import "./main.css";


// import CommunityChampion from "../assets/communitychampion.png";
// import Conversationalist from "../assets/conversationalist.png";
// import Initiator from "../assets/initiator.png";
// import Superstar from "../assets/superstar.png";
// import Supporter from "../assets/supporter.png";
// import Joining from "../assets/join.png";
// import search1 from "../assets/SearchIMg1.gif";
// import search2 from "../assets/SearchIMG2.gif";
// import search3 from "../assets/SearchIMG3.gif";



// import { Helmet } from 'react-helmet'; // <--- Import Helmet

// const rotatingImages = [search1, search2, search3];
// const badges = [
//   { src: CommunityChampion, name: "Community Champion", threshold: 40000 },
//   { src: Conversationalist, name: "Conversationalist", threshold: 20000 },
//   { src: Initiator, name: "Initiator", threshold: 10000 },
//   { src: Superstar, name: "Superstar", threshold: 5000 },
//   { src: Supporter, name: "Supporter", threshold: 2500 },
//   { src: Joining, name: "Joining", threshold: 0 },
// ];

// const sortFunctions = {
//   scoreDesc: (a, b) => b.score - a.score,
//   scoreAsc: (a, b) => a.score - b.score,
//   alphaAZ: (a, b) => a.username.localeCompare(b.username),
//   alphaZA: (a, b) => b.username.localeCompare(a.username),
// };

// const featureButtons = [
//   { label: "Innovate", color: "bg-orange-300", border: "border-orange-400" },
//   { label: "Elevate", color: "bg-green-300", border: "border-green-400" },
//   { label: "Collaborate", color: "bg-purple-300", border: "border-purple-400" },
// ];

// function getBadgeInfoByScore(score) {
//   for (const badge of badges) {
//     if (score >= badge.threshold) {
//       return badge;
//     }
//   }
//   return badges[badges.length - 1];
// }

// const UserCard = React.memo(({ user, index, filterActive }) => {
//   const badge = getBadgeInfoByScore(user.score);
//   const isTopThree = index < 3;

//   const githubUrl = `https://github.com/${user.username}`;
//   // console.log(`UserCard: User "${user.username}" will link to: ${githubUrl}`); // Debugging line

//   return (
//     <a
//       href={githubUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className={`user-card-link ${isTopThree ? 'user-card-top-three' : ''}`}
//       aria-label={`View ${user.username}'s GitHub profile`}
//     >
//       <div className="user-card">
//         {isTopThree && <span className="user-rank-overlay">#{index + 1}</span>}
//         <div
//           className="user-card-avatar"
//           dangerouslySetInnerHTML={{ __html: user.avatarSvg }}
//         />
//         <div className="user-card-details">
//           <h3 className="user-card-username">{user.username}</h3>
//           <p className="user-card-score">TQ Points: {user.score}</p>
//           {filterActive && user.techquantaCommits > 0 && (
//             <p className="user-card-techquanta-commits">
//               Commits: {user.techquantaCommits}
//             </p>
//           )}
//           <div className="user-card-badges">
//             <img
//               src={badge.src}
//               alt={badge.name}
//               className="badge-icon"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://placehold.co/40x40/cccccc/333333?text=Badge";
//               }}
//             />
//             <span className="badge-name">{badge.name}</span>
//           </div>
//         </div>
//       </div>
//     </a>
//   );
// });

// const Modal = ({ children, onClose, className = '' }) => {
//   return (
//     <div className={`modal-backdrop ${className.includes('score-modal-content') || className.includes('coming-soon-content') ? 'active-modal-backdrop' : ''}`} onClick={onClose}>
//       <div className={`modal-content ${className}`} onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close" onClick={onClose}>&times;</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   const {
//     userStats,
//     loading,
//     error,
//     filterActive,
//     loadingFilter,
//     showActiveMembers,
//     showAllMembers,
//     allDataNull,
//   } = useGitHubLeaderboardData();

//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState("scoreDesc");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [imageIndex, setImageIndex] = useState(0);
//   const headerRef = useRef(null);
//   const mainContentRef = useRef(null);
//   const [showScoreModal, setShowScoreModal] = useState(false);
//   const [showComingSoonModal, setShowComingSoonModal] = useState(false);

//   useEffect(() => {
//     const handler = setTimeout(() => setSearch(search.trim()), 300);
//     return () => clearTimeout(handler);
//   }, [search]);

//   useEffect(() => {
//     setDebouncedSearch(search.trim());
//   }, [search]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex((i) => (i + 1) % rotatingImages.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const filteredSortedUsers = useMemo(() => {
//     if (!Array.isArray(userStats)) return [];

//     const searchLower = debouncedSearch.toLowerCase();
//     const filtered = debouncedSearch
//       ? userStats.filter((u) => u.username.toLowerCase().includes(searchLower))
//       : userStats;

//     const sortFn = sortFunctions[sortKey] || sortFunctions.scoreDesc;

//     return [...filtered].sort(sortFn);
//   }, [userStats, debouncedSearch, sortKey]);

//   const handleSearchChange = useCallback((e) => {
//     setSearch(e.target.value);
//   }, []);

//   const handleSortChange = useCallback((e) => {
//     setSortKey(e.target.value);
//   }, []);

//   const toggleScoreModal = useCallback(() => {
//     setShowScoreModal((prev) => !prev);
//   }, []);

//   const toggleComingSoonModal = useCallback(() => {
//     setShowComingSoonModal((prev) => !prev);
//   }, []);

//   if (loading)
//     return (
//       <div className="leaderboard-loading-screen h-screen flex justify-center items-center">
//         <Loading message="Igniting the Arkenlist..." />
//       </div>
//     );
//   if (error)
//     return (
//       <div className="leaderboard-error-screen text-red-500 text-center py-8">
//         Oops! Failed to load the Arkenlist. Please try again later.
//         <br />
//         Error: {error.message || 'Unknown error'}
//       </div>
//     );

//   const searchedUser = debouncedSearch && filteredSortedUsers.length > 0
//     ? filteredSortedUsers.find(user => user.username.toLowerCase() === debouncedSearch.toLowerCase()) || filteredSortedUsers[0]
//     : null;

//   const searchedUserGithubUrl = searchedUser ? `https://github.com/${searchedUser.username}` : '#';
//   // if (searchedUser) {
//   //   console.log(`App.js: Searched user "${searchedUser.username}" link will be: ${searchedUserGithubUrl}`);
//   // }

//   // Define SEO metadata for the Leaderboard page
//   const pageTitle = "Tech Quanta Leaderboard - The Arkenlist | Top Open Source Contributors";
//   const pageDescription = "Explore the Tech Quanta Arkenlist, a real-time leaderboard of top open-source contributors. See rankings, TQ Points, GitHub profiles, and more. Join our community and climb the ranks!";
//   const canonicalUrl = "https://www.yourwebsite.com/leaderboard"; // IMPORTANT: Replace with your actual leaderboard page URL
//   const ogImage = "https://www.yourwebsite.com/opengraph-leaderboard.jpg"; // IMPORTANT: Path to a relevant image for social sharing

//   return (
//     <div className="leaderboard-container">
//       <Helmet>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <link rel="canonical" href={canonicalUrl} />

//         {/* Open Graph / Social Media Tags (for Facebook, LinkedIn, etc.) */}
//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content={ogImage} />
//         <meta property="og:image:alt" content="Tech Quanta Leaderboard with user profiles and scores" />
//         {/* You might want to add og:site_name if your brand has one */}
//         {/* <meta property="og:site_name" content="Tech Quanta" /> */}

//         {/* Twitter Card Tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={pageTitle} />
//         <meta name="twitter:description" content={pageDescription} />
//         <meta name="twitter:image" content={ogImage} />
//         {/* If your organization has a Twitter handle */}
//         {/* <meta name="twitter:site" content="@yourtwitterhandle" /> */}

//         {/* Potentially add some structured data (Schema.org) for a collection page if applicable */}
//         {/* For a leaderboard, you might consider "CollectionPage" or "WebPage" with relevant properties.
//             This is more advanced and depends on your exact content.
//         <script type="application/ld+json">
//           {`
//             {
//               "@context": "https://schema.org",
//               "@type": "CollectionPage",
//               "name": "${pageTitle}",
//               "description": "${pageDescription}",
//               "url": "${canonicalUrl}",
//               "image": "${ogImage}"
//             }
//           `}
//         </script>
//         */}
//       </Helmet>

//       <div
//         ref={headerRef}
//         className="leaderboard-header"
//       >
//         <div className="header-top-row">
//           <div className="leaderboard-feature-buttons">
//             {featureButtons.map(({ label, color, border }, i) => {
//               const rotation = [10, -3, -10][i % 3];
//               return (
//                 <div
//                   key={label}
//                   className={`feature-button ${color} ${border}`}
//                   style={{
//                     transform: `rotate(${rotation}deg)`,
//                     perspective: "1000px",
//                   }}
//                 >
//                   <div className="feature-button-inner">{label}!</div>
//                 </div>
//               );
//             })}
//           </div>

//           <h1 className="leaderboard-title">
//             The Arkenlist <span className="sparkle-emoji">✨</span>
//           </h1>

//           <button
//             className="coming-soon-nav-button pulse-effect"
//             onClick={toggleComingSoonModal}
//             aria-label="New Features Coming Soon"
//           >
//             Coming Soon! 🚀
//           </button>
//         </div>


//         <div className="leaderboard-search-filter">
//           <div className="search-bar-wrapper">
//             <img
//               src={rotatingImages[imageIndex]}
//               alt="Searching for brilliance"
//               className="search-rotating-image"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://placehold.co/40x40/cccccc/333333?text=IMG";
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Find your hero..."
//               value={search}
//               onChange={handleSearchChange}
//               className="search-input"
//               aria-label="Search users"
//             />
//           </div>

//           <div className="filter-controls">
//             <select
//               value={sortKey}
//               onChange={handleSortChange}
//               className="filter-select"
//               aria-label="Sort users"
//             >
//               <option value="scoreDesc">Sort by...</option>
//               <option value="scoreDesc">Score: High → Low</option>
//               <option value="scoreAsc">Score: Low → High</option>
//               <option value="alphaAZ">Name: A → Z</option>
//               <option value="alphaZA">Name: Z → A</option>
//             </select>

//             {filterActive && (
//               <button
//                 disabled={loadingFilter}
//                 onClick={showAllMembers}
//                 className="filter-button show-all-button"
//                 type="button"
//               >
//                 Show All Members
//               </button>
//             )}

//             <button
//               disabled={filterActive || loadingFilter}
//               onClick={showActiveMembers}
//               className="filter-button active-filter-button tooltip"
//               aria-label="Filter active members"
//               type="button"
//             >
//               {loadingFilter ? (
//                 <div className="spinner"></div>
//               ) : (
//                 <>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 512 512"
//                     fill="currentColor"
//                     className="w-4 h-4 inline-block"
//                   >
//                     <path d="M3.9 54.9C10.5 45.4 22.3 40 34.5 40H477.5c12.2 0 24 5.4 30.6 14.9s6.6 22.1 0 31.6l-139.7 201.2c-3.1 4.4-4.8 9.6-4.8 15.1V448h-80V302.7c0-5.5-1.7-10.7-4.8-15.1L3.9 86.5c-6.6-9.6-6.6-22.1 0-31.6z" />
//                   </svg>
//                   <span className="tooltiptext">Show Active Contributors</span>
//                 </>
//               )}
//             </button>

//             <button
//               className="info-button tq-points-info-button tooltip"
//               onClick={toggleScoreModal}
//               aria-label="Show score information"
//             >
//               i
//               <span className="tooltiptext">Understand TQ Points!</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div ref={mainContentRef} className="main-leaderboard-content">
//         {debouncedSearch && (
//           <div
//             className="search-result-card-fixed-bottom"
//           >
//             {searchedUser ? (
//               <div className="search-result-card searched-highlight">
//                 <div
//                   className="search-result-avatar"
//                   dangerouslySetInnerHTML={{ __html: searchedUser.avatarSvg }}
//                 />
//                 <div className="search-result-info">
//                   <a href={searchedUserGithubUrl} target="_blank" rel="noopener noreferrer" className="search-result-username-link">
//                     <h2>{searchedUser.username} <span className="verified-emoji">✅</span></h2>
//                   </a>
//                   <p>
//                     TQ Score: <strong> {searchedUser.score} </strong> | Repos:{" "}
//                     <strong>{searchedUser.reposContributed}</strong> | Commits:{" "}
//                     <strong>{searchedUser.commits || searchedUser.techquantaCommits}</strong> | PRs: <strong>{searchedUser.pullRequests}</strong>
//                   </p>
//                   {searchedUser.techquantaCommits > 0 && (
//                     <p className="techquanta-contributions">
//                       TechQuanta Commits: <strong>{searchedUser.techquantaCommits} 🔥</strong>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="no-user-found">No hero found with that name... Keep exploring!</div>
//             )}
//           </div>
//         )}


//         <div className="users-scroll-container mb-20">
//           <div className="users-list-grid">
//             {filteredSortedUsers.length > 0 ? (
//               filteredSortedUsers.map((user, index) => (
//                 <UserCard
//                   key={user.username}
//                   user={user}
//                   index={index}
//                   filterActive={filterActive}
//                 />
//               ))
//             ) : (
//               <div className="no-users-display">
//                 {allDataNull
//                   ? "No data available yet. Be the first to contribute!"
//                   : filterActive
//                     ? "No active TechQuanta contributors found this cycle."
//                     : "No users found based on your search/filters. Try a different query!"}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showScoreModal && (
//         <Modal onClose={toggleScoreModal} className="score-modal-content">
//           <h2 className="modal-title">Understanding Your TQ Points 💡</h2>
//           <p className="modal-description">
//             Your <strong>TQ Points</strong> are a reflection of your contributions and engagement within the TechQuanta community. Here's how they're calculated:
//           </p>
//           <img
//             src="https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/banners/ScoringCalculation.jpg"
//             alt="Score Explanation"
//             className="score-explanation-image"
//           />
//           <p className="modal-footer">
//             Keep contributing, collaborating, and elevating to climb the ranks!
//           </p>
//         </Modal>
//       )}

//       {showComingSoonModal && (
//         <Modal onClose={toggleComingSoonModal} className="coming-soon-content">
//           <div className="coming-soon-icon">🚀</div>
//           <h2 className="modal-title">Feature Coming Soon!</h2>
//           <p className="modal-description">
//             We're hard at work building awesome new functionalities for you. Stay tuned for exciting updates!
//           </p>
//           <button className="learn-more-button" onClick={toggleComingSoonModal}>Got It!</button>
//         </Modal>
//       )}
//     </div>
//   );
// }


import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Loading from "../components/ui/loader";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";
import { Helmet } from 'react-helmet';

// Styles
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
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="leaderboard-row-link">
      <div className={`user-list-item ${rank <= 3 ? `top-three rank-${rank}` : ""}`}>
        {/* Rank Number */}
        <div className="item-rank">{rank}</div>

        {/* Avatar */}
        <div className="item-avatar" dangerouslySetInnerHTML={{ __html: user.avatarSvg }} />

        {/* User Identity */}
        <div className="item-identity">
          <span className="item-username">{user.username}</span>
          {rank === 1 && <span className="crown-icon">👑</span>}
        </div>

        {/* Stats Section - Hidden on mobile, visible on desktop */}
        <div className="item-stats">
          <div className="stat-pill">
            <span className="stat-value">{user.score}</span>
            <span className="stat-label">Points</span>
          </div>
          {filterActive && user.techquantaCommits > 0 && (
            <div className="stat-pill commits">
              <span className="stat-value">{user.techquantaCommits}</span>
              <span className="stat-label">Commits</span>
            </div>
          )}
        </div>

        {/* Badge Section */}
        <div className="item-badge">
          <img src={badge.src} alt={badge.name} className="badge-img-tiny" />
          <span className="badge-text-tiny">{badge.name}</span>
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

  const sortedUsers = useMemo(() => {
    if (!Array.isArray(userStats)) return [];
    const searchLower = search.toLowerCase().trim();
    let filtered = searchLower ? userStats.filter(u => u.username.toLowerCase().includes(searchLower)) : userStats;
    
    return [...filtered].sort((a, b) => {
      if (sortKey === "scoreDesc") return b.score - a.score;
      if (sortKey === "scoreAsc") return a.score - b.score;
      return a.username.localeCompare(b.username);
    });
  }, [userStats, search, sortKey]);

  if (loading) return <div className="loader-container"><Loading message="Loading the Arkenlist..." /></div>;

  return (
    <div className="leaderboard-page">
      <Helmet>
        <title>The Arkenlist | Contributors</title>
      </Helmet>

      <div className="leaderboard-container-v2">
        <header className="v2-header">
          <h1 className="v2-title">The Arkenlist <span className="sparkle-emoji">✨</span></h1>
          
          <div className="v2-toolbar">
            <div className="v2-search-wrapper">
              <img src={rotatingImages[imageIndex]} className="v2-search-gif" alt="search" />
              <input 
                placeholder="Search username..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
            </div>

            <div className="v2-controls">
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                <option value="scoreDesc">Highest Points</option>
                <option value="scoreAsc">Lowest Points</option>
                <option value="alphaAZ">A-Z Name</option>
              </select>
              
              <button className="v2-filter-btn" onClick={filterActive ? showAllMembers : showActiveMembers}>
                {loadingFilter ? "..." : (filterActive ? "Show All" : "Active Only")}
              </button>
            </div>
          </div>
        </header>

        <main className="v2-list-wrapper">
          <div className="v2-list-header">
            <span className="col-rank">#</span>
            <span className="col-user">Contributor</span>
            <span className="col-stats">Performance</span>
            <span className="col-badge">Rank</span>
          </div>
          
          <div className="v2-rows-container">
            {sortedUsers.map((user, index) => (
              <UserRow key={user.username} user={user} index={index} filterActive={filterActive} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
