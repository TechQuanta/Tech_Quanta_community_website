// src/AppRoutes.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import CommunityWork from "../pages/CommunityWork";
import LeaderBoard from "../pages/LeaderBoard";
import Maintenance from "../pages/Maintenance";

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
