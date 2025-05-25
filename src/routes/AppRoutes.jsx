// src/AppRoutes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout wrapper to include Header/Footer
import Layout from "../Layout/Layout";

// Pages
import Home from "../Pages/Home";
import About from "../Pages/About";
import CommunityWork from "../Pages/CommunityWork";
import LeaderBoard from "../Pages/LeaderBoard";
import Maintenance from "../Pages/Maintenance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // includes Header/Footer and <Outlet />
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "community-work", element: <CommunityWork /> },
      { path: "leaderboard", element: <LeaderBoard /> },
      { path: "main", element: <Maintenance /> },
    ],
  },
]);

export default router;
