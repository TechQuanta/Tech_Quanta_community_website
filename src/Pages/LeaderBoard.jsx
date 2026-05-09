import React, { useState, useMemo, useEffect, memo } from "react";

import { Helmet } from "react-helmet";

import Loading from "../components/ui/loader";

import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";

/* =========================
   ASSETS
========================= */

import CommunityChampion from "../assets/communitychampion.png";

import Conversationalist from "../assets/conversationalist.png";

import Initiator from "../assets/initiator.png";

import Superstar from "../assets/superstar.png";

import Supporter from "../assets/supporter.png";

import Joining from "../assets/join.png";

import search1 from "../assets/SearchIMg1.gif";

import search2 from "../assets/SearchIMG2.gif";

import search3 from "../assets/SearchIMG3.gif";

/* =========================
   CONSTANTS
========================= */

const rotatingImages = [search1, search2, search3];

const badges = [
  {
    src: CommunityChampion,
    name: "Champion",
    threshold: 40000,
  },

  {
    src: Conversationalist,
    name: "Speaker",
    threshold: 20000,
  },

  {
    src: Initiator,
    name: "Initiator",
    threshold: 10000,
  },

  {
    src: Superstar,
    name: "Superstar",
    threshold: 5000,
  },

  {
    src: Supporter,
    name: "Supporter",
    threshold: 2500,
  },

  {
    src: Joining,
    name: "Member",
    threshold: 0,
  },
];

/* =========================
   HELPERS
========================= */

function getBadgeInfoByScore(score) {
  for (const badge of badges) {
    if (score >= badge.threshold) {
      return badge;
    }
  }

  return badges[badges.length - 1];
}

/* =========================
   CARD COLORS
========================= */

const lightThemes = [
  `
    from-[#f4d7ff]
    to-[#ffd7d7]
    border-[#ffffff]
  `,

  `
    from-[#d7e8ff]
    to-[#e8dcff]
    border-[#ffffff]
  `,

  `
    from-[#ffe4d6]
    to-[#ffd7f1]
    border-[#ffffff]
  `,

  `
    from-[#d7fff0]
    to-[#d7e8ff]
    border-[#ffffff]
  `,
];

/* =========================
   USER CARD
========================= */

const UserCard = memo(({ user, index, filterActive }) => {
  const rank = index + 1;

  const badge = getBadgeInfoByScore(user.score);

  const githubUrl = `https://github.com/${user.username}`;

  const lightTheme = lightThemes[index % lightThemes.length];

  return (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <div
        className={`
            relative

            overflow-hidden

            rounded-[34px]

            border

            p-[1px]

            transition-all
            duration-500

            hover:-translate-y-2

            dark:border-white/[0.08]

            bg-gradient-to-br

            ${lightTheme}

            dark:bg-none
          `}
      >
        {/* SHINY BORDER */}

        <div
          className="
              absolute
              inset-0

              opacity-0

              transition-opacity
              duration-500

              group-hover:opacity-100
            "
        >
          <div
            className="
                absolute

                -left-[120%]
                top-0

                h-full
                w-[80%]

                rotate-12

                bg-gradient-to-r

                from-transparent

                via-white/20

                to-transparent

                transition-all
                duration-1000

                group-hover:left-[140%]
              "
          />
        </div>

        {/* CARD */}

        <div
          className="
              relative

              min-h-[340px]

              rounded-[33px]

              p-6

              flex
              flex-col
              items-center
              text-center

              overflow-hidden

              transition-all
              duration-500

              dark:bg-[#050505]/95

              bg-blackz

              dark:from-[#0a0a0a]

              dark:to-[#050505]

              from-white/90
              to-white/70

              backdrop-blur-3xl

              shadow-[0_10px_40px_rgba(0,0,0,0.12)]

              dark:shadow-[0_15px_50px_rgba(0,0,0,0.55)]

              group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)]

              dark:group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.75)]
            "
        >
          {/* DARK GLOW */}

          <div
            className="
                absolute

                inset-0

                dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]

                pointer-events-none
              "
          />


          {/* AVATAR */}

          <div
            className="
                relative

                mt-2
                mb-5

                h-24
                w-24

                overflow-hidden

                rounded-full

                border-2

                dark:border-white/[0.08]

                border-black/10

                transition-all
                duration-500

                group-hover:scale-105

                dark:group-hover:border-white/[0.18]

                group-hover:border-black/20
              "
          >
            <img
              src={`https://github.com/${user.username}.png`}
              alt={user.username}
              loading="lazy"
              className="
                  h-full
                  w-full

                  object-cover
                "
            />
          </div>

          {/* USERNAME */}

          <h2
            className="
                max-w-full

                truncate

                text-[1.35rem]

                font-black

                dark:text-white

                text-black

                font-rajdhani
              "
          >
            {user.username}
          </h2>

          {/* SCORE */}

          <div
            className="
                mt-4

                flex
                flex-col
                items-center
              "
          >
            <span
              className="
                  text-4xl

                  font-black

                  tracking-tight

                  dark:text-white

                  text-black
                "
            >
              {user.score}
            </span>

            <span
              className="
                  mt-1

                  text-[11px]

                  uppercase

                  tracking-[3px]

                  dark:text-white/40

                  text-black/45
                "
            >
              TQ Points
            </span>
          </div>

          {/* STATS */}

          {filterActive && (
            <div
              className="
                  mt-5
                "
            >
              <div
                className="
                    rounded-2xl

                    border

                    dark:border-white/[0.06]

                    border-black/5

                    dark:bg-white/[0.03]

                    bg-black/[0.03]

                    px-5
                    py-3

                    backdrop-blur-xl
                  "
              >
                <div
                  className="
                      text-base

                      font-black

                      dark:text-white

                      text-black
                    "
                >
                  {user.techquantaCommits}
                </div>

                <div
                  className="
                      mt-1

                      text-[10px]

                      uppercase

                      tracking-[2px]

                      dark:text-white/40

                      text-black/45
                    "
                >
                  Commits
                </div>
              </div>
            </div>
          )}

          {/* BADGE */}

          <div
            className="
                mt-auto

                flex
                items-center
                gap-3

                rounded-2xl

                border

                dark:border-white/[0.06]

                border-black/5

                dark:bg-white/[0.03]

                bg-black/[0.03]



                backdrop-blur-xl
              "
          >
            <img
              src={badge.src}
              alt={badge.name}
              className="
                  h-9
                  w-9

                  object-contain
                "
            />

            <span
              className="
                  text-sm

                  font-bold

                  dark:text-white

                  text-black
                "
            >
              {badge.name}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
});

/* =========================
   MAIN
========================= */

export default function Leaderboard() {
  const {
    userStats,
    loading,

    filterActive,

    showActiveMembers,
    showAllMembers,

    loadingFilter,
  } = useGitHubLeaderboardData();

  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState("scoreDesc");

  const [imageIndex, setImageIndex] = useState(0);

  /* GIF ROTATION */

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % rotatingImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* FILTER */

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(userStats)) {
      return [];
    }

    const query = search.trim().toLowerCase();

    const filtered = query
      ? userStats.filter((u) => u.username.toLowerCase().includes(query))
      : userStats;

    return [...filtered].sort((a, b) => {
      if (sortKey === "scoreDesc") {
        return b.score - a.score;
      }

      if (sortKey === "scoreAsc") {
        return a.score - b.score;
      }

      return a.username.localeCompare(b.username);
    });
  }, [userStats, search, sortKey]);

  /* LOADING */

  if (loading) {
    return (
      <div
        className="
          min-h-screen

          flex
          items-center
          justify-center
        "
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen

        px-5
        py-8

        overflow-hidden
      "
    >
      <Helmet>
        <title>Continue Your Open Source Journey</title>
      </Helmet>

      <div
        className="
          mx-auto

          max-w-[1550px]
        "
      >
        {/* HERO */}

        <div
          className="
            mb-12

            flex
            flex-col

            lg:flex-row

            lg:items-end

            lg:justify-between

            gap-8
          "
        >
          {/* LEFT */}

          <div
            className="
              max-w-[760px]
            "
          >
            <div
              className="
                mb-4

                inline-flex

                items-center
                gap-2

                rounded-full

                border

                border-white/10

                bg-black/30

                px-4
                py-2

                text-xs

                uppercase

                tracking-[3px]

                text-white/50

                backdrop-blur-2xl
              "
            >
              Open Source • Community • Growth
            </div>

            <h1
              className="
                text-5xl

                sm:text-6xl

                lg:text-7xl

                font-black

                leading-[0.95]

                tracking-[-0.05em]

                text-black

                dark:text-white

                font-rajdhani
              "
            >
              Continue Your
              <span
                className="
                  block

                  bg-gradient-to-r

                  from-purple-400

                  via-pink-300

                  to-orange-300

                  bg-clip-text

                  text-transparent
                "
              >
                Open Source
              </span>
              Journey.
            </h1>

            <p
              className="
                mt-6

                max-w-[620px]

                text-base

                leading-relaxed

                text-black/55

                dark:text-white/45
              "
            >
              Track your growth, contribute to projects, climb the leaderboard,
              and build your developer identity with the community.
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >
            {/* SEARCH */}

            <div
              className="
                flex

                items-center
                gap-3

                rounded-[24px]

                border

                dark:border-white/[0.08]

                border-black/5

                dark:bg-[#050505]/90

                bg-white/70

                px-5
                py-4

                backdrop-blur-3xl
              "
            >
              <img
                src={rotatingImages[imageIndex]}
                alt=""
                className="
                  h-10
                  w-10

                  rounded-full

                  object-cover
                "
              />

              <input
                type="text"
                placeholder="
                  Search contributors...
                "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-[230px]

                  bg-transparent

                  outline-none

                  dark:text-white

                  text-black

                  placeholder:text-black/40

                  dark:placeholder:text-white/30
                "
              />
            </div>

            {/* SORT */}

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="
                rounded-[24px]

                border

                dark:border-white/[0.08]

                border-black/5

                dark:bg-[#050505]/90

                bg-white/70

                px-5
                py-4

                text-sm
                font-semibold

                dark:text-white

                text-black

                outline-none

                backdrop-blur-3xl
              "
            >
              <option value="scoreDesc">Highest Points</option>

              <option value="scoreAsc">Lowest Points</option>

              <option value="alphaAZ">A-Z Name</option>
            </select>
          </div>
        </div>

        {/* GRID */}

        <div
          className="
            grid

            gap-6

            sm:grid-cols-2

            lg:grid-cols-3

            xl:grid-cols-4
          "
        >
          {filteredUsers.map((user, index) => (
            <UserCard
              key={user.username}
              user={user}
              index={index}
              filterActive={filterActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
