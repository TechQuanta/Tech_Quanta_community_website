// src/AppRoutes.jsx
import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery"; // Import the hook

// Dynamically import components for lazy loading
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const CommunityWork = lazy(() => import("../pages/CommunityWork"));
const LeaderBoard = lazy(() => import("../pages/LeaderBoard"));
const Maintenance = lazy(() => import("../pages/Maintenance"));

// Create a wrapper component to fetch data
const AppLoader = () => {
  const { fetchAllLeaderboardData } = useGitHubLeaderboardData();

  useEffect(() => {
    // Trigger data fetch as soon as this component mounts
    // This will happen when the app effectively starts
    fetchAllLeaderboardData();
  }, [fetchAllLeaderboardData]); // Dependency on the function to ensure it's called if it changes (though it's useCallback'd)

  // This component doesn't render anything itself,
  // it just ensures the data fetching is initiated.
  return null;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* Call AppLoader to trigger background data fetch */}
        <AppLoader />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading About page...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "community-work",
        element: (
          <Suspense fallback={<div>Loading Community Work...</div>}>
            <CommunityWork />
          </Suspense>
        ),
      },
      {
        path: "leaderboard",
        element: (
          <Suspense fallback={<div>Loading Leaderboard...</div>}>
            <LeaderBoard />
          </Suspense>
        ),
      },
      {
        path: "main",
        element: (
          <Suspense fallback={<div>Loading Maintenance page...</div>}>
            <Maintenance />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;