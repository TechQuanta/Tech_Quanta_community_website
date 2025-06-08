// src/AppRoutes.jsx
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout"; // Assuming Layout does not need lazy loading

// Dynamically import components for lazy loading
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const CommunityWork = lazy(() => import("../pages/CommunityWork"));
const LeaderBoard = lazy(() => import("../pages/LeaderBoard"));
const Maintenance = lazy(() => import("../pages/Maintenance"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout typically contains shared UI like Header/Footer and <Outlet />
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: "about", 
        element: (
          <Suspense fallback={<div>Loading About page...</div>}>
            <About />
          </Suspense>
        ) 
      },
      { 
        path: "community-work", 
        element: (
          <Suspense fallback={<div>Loading Community Work...</div>}>
            <CommunityWork />
          </Suspense>
        ) 
      },
      { 
        path: "leaderboard", 
        element: (
          <Suspense fallback={<div>Loading Leaderboard...</div>}>
            <LeaderBoard />
          </Suspense>
        ) 
      },
      { 
        path: "main", 
        element: (
          <Suspense fallback={<div>Loading Maintenance page...</div>}>
            <Maintenance />
          </Suspense>
        ) 
      },
    ],
  },
]);

export default router;
