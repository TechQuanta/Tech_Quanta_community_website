import React, { useState, useMemo, useEffect, useRef} from "react";
import { FaFilter } from "react-icons/fa";
import { FaGithub, FaBug } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/ui/loader"; // adjust path as needed

import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery"; // Custom hook, make sure path is correct

const sortFunctions = {
  scoreDesc: (a, b) => b.score - a.score,
  scoreAsc: (a, b) => a.score - b.score,
  alphaAZ: (a, b) => a.username.localeCompare(b.username),
  alphaZA: (a, b) => b.username.localeCompare(a.username),
};

const rotatingImages = [
  "/SearchIMg1.gif",
  "/SearchIMG2.gif",
  "/SearchIMG3.gif",
];
 const badges = [
    { src: "/communitychampion.png", name: "Community Champion" },
    { src: "/conversationalist.png", name: "Conversation List" },
    { src: "/initiator.png", name: "Initiator" },
    { src: "/superstar.png", name: "Superstar" },
    { src: "/supporter.png", name: "Supporter" },
    { src: "/join.png", name: "Joining" },
];


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
  const searchResultRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
    const featureButtons = [
    { label: 'innovate', color: 'bg-orange-300', border: 'border-orange-400' },
    { label: 'elevate', color: 'bg-green-300', border: 'border-green-400' },
    { label: 'collaborate', color: 'bg-purple-300', border: 'border-purple-400' }
  ];
  const openModal = () => {
    setIsOpen(true);
    setIsImageLoaded(false); // reset for next open
  };

    const closeModal = () => setIsOpen(false);
  useEffect(() => {
  // --- Debounce Search ---
  const debounceTimeout = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  // --- Rotate Search Images ---
  const imageRotationInterval = setInterval(() => {
    setImageIndex((prev) => (prev + 1) % rotatingImages.length);
  }, 4000);

  // --- Sticky Header on Scroll ---
  const onScroll = () => {
    if (!searchRef.current) return;
    const top = searchRef.current.getBoundingClientRect().top;
    setIsSticky(top <= 10);
  };

  window.addEventListener("scroll", onScroll);

  // Cleanup
  return () => {
    clearTimeout(debounceTimeout);
    clearInterval(imageRotationInterval);
    window.removeEventListener("scroll", onScroll);
  };
}, [search, rotatingImages.length, debouncedSearch]);

  const filteredSortedUsers = useMemo(() => {
    if (!userStats || !Array.isArray(userStats)) return [];

    let users = userStats;

    if (debouncedSearch.trim()) {
      users = users.filter((user) =>
        user.username.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
      );
    }

    return users.sort(sortFunctions[sortKey]);
  }, [userStats, debouncedSearch, sortKey]);

if (loading)
  return (
    <div className={`min-h-screen flex justify-center items-center bg-white text-gray-900 dark:bg-[#121212] dark:text-white`}>
      <Loading />
    </div>
  );

if (error)
  return (
    <div className={`min-h-screen flex justify-center items-center text-center mt-20 font-semibold text-red-500 bg-white text-gray-900 dark:bg-[#121212] dark:text-white`}>
      {error}
    </div>
  );


  const searchedUser = filteredSortedUsers[0] || null;
  const searchTerm = debouncedSearch.trim();

  return (
    <div className="bg-gray-50 dark:bg-[#121212] min-h-screen mt-[150px] pb-10">

      {/* Header & Search Input */}
      <motion.div
  ref={searchRef}
  className={`max-w-7xl mx-auto flex flex-wrap justify-center  items-center mb-6 gap-12
    ${isSticky ? "top-0 left-0 right-0 z-50 px-5 py-3  bg-opacity-90 backdrop-blur-sm" : ""}
    bg-white dark:bg-transparent`}
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 120 }}
> 
 <div className="flex flex-wrap justify-center gap-4 my-6">
  {featureButtons.map((button, index) => {
    // Assign unique rotation degrees per button index
    const rotations = [10, -3, -10]; // add more if you add more buttons
    const rotation = rotations[index % rotations.length];

    return (
      <div
        key={button.label}
        className={`group ${button.color} ${button.border} border-4 outline-2px rounded-full font-rajdhani dark:text-black px-6 py-2 text-lg font-bold text-white cursor-pointer transition-transform duration-300 transform hover:scale-105 `}
        style={{ transform: `rotate(${rotation}deg)`, perspective: '1000px' }}
      >
        <div className="transition-transform duration-300 group-hover:rotate-x-6 group-hover:-rotate-y-6">
          {button.label}
        </div>
      </div>
    );
  })}
</div>
  <div className="relative flex items-center justify-center w-full px-4 py-2">
    <h1
      className="text-4xl font-extrabold text-gray-500 dark:text-white flex items-center gap-2 font-mono"
      style={{ minWidth: 200 }}
    >
      The Arkenlist
    </h1>
  </div>
<div className="flex flex-wrap justify-between items-center gap-4 w-full px-4 py-2 bg-transparent rounded-lg shadow-sm">
  {/* Search Bar Section */}
  <div className="relative flex items-center text-gray-400 focus-within:text-[#2ECC71] flex-grow max-w-sm">
    <AnimatePresence mode="wait" initial={false}>
      <motion.img
        key={imageIndex}
        src={rotatingImages[imageIndex]}
        alt="Rotating search"
        className="absolute left-3 top-1.5 -translate-y-1/2 w-8 h-6 rounded pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      />
    </AnimatePresence>
    {/* <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-[60px] pr-4 py-2 rounded-full bg-black dark:bg-white text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition"
    /> */}
<input
  type="text"
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full pl-[60px] pr-4 py-2 rounded-full 
             bg-black text-white 
             dark:bg-white dark:text-black 
             placeholder-gray-400 dark:placeholder-gray-500 
             focus:outline-none focus:ring-2 focus:ring-[#2ECC71] 
             caret-white dark:caret-black
             transition"
/>

  </div>

  {/* Filter Controls Section */}
  {/* <div className="flex items-center gap-3 flex-wrap justify-end">
    <select
      className=" py-2 rounded-full bg-orange-200 font-semibold text-center dark:bg-beige-200 text-gray-800 dark:text-black focus:outline-none focus:ring-2 focus:ring-[#2ECC71] transition"
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      <option value="scoreDesc">Filter</option>
      <option value="scoreAsc">Score: Low → High</option>
      <option value="alphaAZ">A → Z</option>
      <option value="alphaZA">Z → A</option>
    </select>

    <button
      disabled={!filterActive}
      onClick={showAllMembers}
      className="px-4 py-2 rounded-full bg-black text-white dark:bg-[#2ECC71] dark:hover:bg-[#28b263] hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      Show All
    </button>

    <button
      disabled={loadingFilter}
      onClick={showActiveMembers}
      className="px-4 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black dark:hover:bg-[#28b263] hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1"
    >
      <FaFilter />
    </button>
  </div> */}

<div className="flex items-center gap-4">
  <select
    className="py-2 px-4 rounded-full bg-gradient-to-r from-orange-300 to-orange-200 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 transition"
    value={sortKey}
    onChange={(e) => setSortKey(e.target.value)}
  >
    <option value="scoreDesc">Score: High → Low</option>
    <option value="scoreAsc">Score: Low → High</option>
    <option value="alphaAZ">Username: A → Z</option>
    <option value="alphaZA">Username: Z → A</option>
  </select>

  <button
    onClick={showAllMembers}
    disabled={!filterActive}
    className={`px-5 py-2 rounded-full font-semibold transition
      ${filterActive ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"} 
      hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    Show All
  </button>

  <button
    onClick={showActiveMembers}
    disabled={loadingFilter}
    className={`px-5 py-2 rounded-full font-semibold transition flex items-center gap-2
      ${filterActive ? "bg-green-500 text-white" : "bg-black text-white"} 
      hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    <FaFilter />
    Active Filter
  </button>
</div>


</div>

  
</motion.div>


      {/* Search Result Sticky Card */}
<motion.div
  ref={searchResultRef}
  layout
  animate={{
    position: isSticky ? "fixed" : "static",
    bottom: isSticky ? 0 : "auto",
    left: isSticky ? 0 : "auto",
    right: isSticky ? 0 : "auto",
    margin: isSticky ? "0 auto" : "initial",
    zIndex: isSticky ? 999 : "auto",
    width: isSticky ? "100%" : "auto",
    backgroundColor: isSticky ? "rgba(255,255,255,0.8)" : "transparent", // Light mode fallback
    backdropFilter: isSticky ? "blur(6px)" : "none",
    // boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.2)" : "none",
  }}
  className={`max-w-auto   mx-auto p-3 rounded-b-lg  ${
    isSticky
      ? "border-b border-gray-300 dark:border-gray-700  bg-white dark:bg-[#121212cc]"
      : ""
  }`}
>

  {searchTerm && searchedUser ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex  items-center  gap-6 justify-center items-center p-2 rounded-lg bg-white dark:bg-[#1f1f1f]  dark:shadow-lg"
    >
      <img
        src={searchedUser.avatar}
        alt={`${searchedUser.username} avatar`}
        className="w-12 h-12 rounded-full border-4 border-white"
      />
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {searchedUser.username}
        </h2>
        <p className="text-sm text-gray-600 font-semibold dark:text-gray-400">
          Score: {searchedUser.score} | Repos: {searchedUser.repositories} | Commits: {searchedUser.commits} | PRs: {searchedUser.pullRequests}
        </p>
      </div>
    </motion.div>
  ) : searchTerm ? (
    <div className="text-center p-3 text-gray-600 dark:text-gray-400">
      No user found...
    </div>
  ) : null}
</motion.div>
{/* Users List */}
<div className="max-w-6xl mx-auto mt-[100px] grid gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center items-center">
  {filteredSortedUsers.map((user, index) => {
    const isTop5 = index < 5;
    const isTop3 = index < 3;

    const getBadgeIndexByScore = (score) => {
      if (score >= 40000) return 0;
      if (score >= 20000) return 1;
      if (score >= 10000) return 2;
      if (score >= 5000) return 3;
      if (score >= 2500) return 4;
      return 5; // Below 60
    };

    const showHighlight = sortKey === "scoreDesc"; // Highlight top users only for default sort

    return (
      <motion.div
        key={user.username}
        className={`
          relative w-full max-w-md min-h-[130px] px-5 py-12 rounded-3xl shadow-lg group font-space-grotesk text-center backdrop-blur-xl
          bg-gradient-to-br from-[#3a1c71]/60 via-[#d76d77]/80 to-[#ffaf7b]/80
          border-2 border-pink-400/10 ring-1 ring-orange-300/20
          transition-transform duration-300 hover:scale-[1.035]
          text-white text-sm

          ${isTop3 ? "border-emerald-300/40 animate-border-glow" : ""}
          ${isTop5
            ? "ring-2 dark:ring-pink-400/30 ring-fuchsia-500/60 bg-gradient-to-br from-[#ff00cc] via-[#333399] to-[#000000] dark:from-[#1f0033] dark:via-[#660066] dark:to-[#000000]"
            : ""}
        `}
        whileHover={{ scale: 1.035 }}
      >
        {/* Glowing Animated Background */}
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <img
            src="/runes.png"
            alt=""
            className="w-full h-full object-cover animate-pulse"
          />
        </div>

        {/* Top 3 Shimmer Beam */}
        {isTop3 && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/25 to-transparent blur-3xl animate-zoom-glow" />
          </div>
        )}

        {/* Top 5 Badge */}
        {showHighlight && (
          <div className="absolute top-4 right-4 z-20 w-12 h-12">
            <div className="relative w-12 h-12">
              <img
                src={badges[getBadgeIndexByScore(user.score)].src}
                alt={badges[getBadgeIndexByScore(user.score)].name}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        )}

        {/* Avatar & Username */}
        <div className="flex items-center gap-4 mb-3 relative z-10">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-16 h-16 rounded-full border-4 border-emerald-200 shadow-md"
          />
          <div>
            <h3
              className={`text-xl font-bold leading-snug tracking-tight
              ${
                isTop5
                  ? "text-transparent bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 bg-clip-text"
                  : "text-emerald-100"
              }`}
            >
              {user.username}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Score:{" "}
              <span className="text-emerald-300 font-semibold">{user.score}</span>
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center px-2 mt-1 z-10 relative text-emerald-300 text-sm">
          <div className="flex items-center gap-1">
            <a
              href={`https://github.com/${user.username}?tab=commits`}
              target="_blank"
              rel="noreferrer"
              title="Commits"
              className="hover:text-emerald-400 transition"
            >
              <FaGithub />
            </a>
            {user.commits}
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`https://github.com/pulls?q=is%3Apr+author%3A${user.username}`}
              target="_blank"
              rel="noreferrer"
              title="Pull Requests"
              className="hover:text-emerald-400 transition"
            >
              <img src="/pricon.png" alt="PR" className="w-4 h-4" />
            </a>
            {user.pullRequests}
          </div>
          <div className="flex items-center gap-1">
            <FaBug />
            {user.issues}
          </div>
        </div>

        {/* Holographic Glow Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute -inset-1 bg-gradient-to-br from-emerald-200/20 to-transparent blur-2xl group-hover:opacity-60 opacity-30 transition-all duration-500" />
          <div className="absolute top-0 left-1/2 w-32 h-32 bg-emerald-300/15 rotate-45 blur-3xl animate-holo-shimmer" />
        </div>
      </motion.div>
    );
  })}
   
</div>
<div className="absolute -right-0 pb-10">
  <button
        onClick={openModal}
        className="px-2 py-3 bg-transparent border-none text-black dark:text-white hover:text-[#00BFFF] dark:hover:text-[#2ECC71] font-semibold rounded-lg  transition"
      >
        View Scoring Criteria?
      </button>

      {isOpen && (
        <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
          <div
            className="bg-white rounded-xl shadow-xl p-6 relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Scoring Criteria</h2>

            {!isImageLoaded && (
              <div className="flex justify-center items-center h-64">
                <div className="w-10 h-10 border-4 border-purple-700 border-dashed rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src="/ScoringCalculation.jpg"
              alt="Scoring Criteria"
              className={`rounded-lg w-full ${isImageLoaded ? "block" : "hidden"}`}
              onLoad={() => setIsImageLoaded(true)}
            />

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
</div>
</div>
  );
}
