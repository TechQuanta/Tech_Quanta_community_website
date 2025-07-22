// // src/routes/AppRoutes.jsx
// import React, { lazy, Suspense, useEffect } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import Layout from "../Layout/Layout.jsx"; // Adjust path if Layout is elsewhere
// import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery"; // Adjust path if hooks are elsewhere

// // IMPORTANT: Import the plain JavaScript route configuration
// // Path from src/routes/AppRoutes.jsx to src/routesConfig.js is '../routesConfig.js'
// import routesConfig from '../routesConfig.js';

// // Dynamically import components for lazy loading
// const Home = lazy(() => import("../pages/Home")); // Adjust path relative to AppRoutes.jsx
// const About = lazy(() => import("../pages/About")); // Adjust path relative to AppRoutes.jsx
// const CommunityWork = lazy(() => import("../pages/CommunityWork")); // Adjust path relative to AppRoutes.jsx
// const LeaderBoard = lazy(() => import("../pages/LeaderBoard")); // Adjust path relative to AppRoutes.jsx
// const Maintenance = lazy(() => import("../pages/Maintenance")); // Adjust path relative to AppRoutes.jsx

// // Create a wrapper component to fetch data
// const AppLoader = () => {
//   const { fetchAllLeaderboardData } = useGitHubLeaderboardData();

//   useEffect(() => {
//     fetchAllLeaderboardData();
//   }, [fetchAllLeaderboardData]);

//   return null;
// };

// // Function to map the plain route config to the full React Router config
// const createReactRouterConfig = (routes) => {
//     return routes.map(route => {
//         const newRoute = { ...route };

//         if (newRoute.path === '/') {
//             newRoute.element = (
//                 <>
//                     <AppLoader />
//                     <Layout />
//                 </>
//             );
//             if (newRoute.children) {
//                 newRoute.children = newRoute.children.map(childRoute => {
//                     let elementComponent;
//                     let fallbackText = "Loading...";

//                     if (childRoute.index) { // Handle index route (path undefined or '')
//                         elementComponent = Home;
//                         fallbackText = "Loading Home...";
//                     } else {
//                         switch(childRoute.path) {
//                             case 'about':
//                                 elementComponent = About;
//                                 fallbackText = "Loading About page...";
//                                 break;
//                             case 'community-work':
//                                 elementComponent = CommunityWork;
//                                 fallbackText = "Loading Community Work...";
//                                 break;
//                             case 'leaderboard':
//                                 elementComponent = LeaderBoard;
//                                 fallbackText = "Loading Leaderboard...";
//                                 break;
//                             case 'main':
//                                 elementComponent = Maintenance;
//                                 fallbackText = "Loading Maintenance page...";
//                                 break;
//                             default:
//                                 elementComponent = null; // Or a 404 component
//                         }
//                     }

//                     return {
//                         ...childRoute,
//                         element: elementComponent ? (
//                             <Suspense fallback={<div>{fallbackText}</div>}>
//                                 {React.createElement(elementComponent)}
//                             </Suspense>
//                         ) : null,
//                     };
//                 });
//             }
//         }
//         // You might add logic for other top-level routes here if they exist
//         return newRoute;
//     });
// };


// const router = createBrowserRouter(createReactRouterConfig(routesConfig));

// export default router;



import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Ensure RouterProvider is imported
import Layout from "../Layout/Layout.jsx";
import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";

// IMPORTANT: Import the plain JavaScript route configuration
import routesConfig from '../routesConfig.js';

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
    fetchAllLeaderboardData();
  }, [fetchAllLeaderboardData]);

  return null;
};

// Function to map the plain route config to the full React Router config
const createReactRouterConfig = (routes) => {
    return routes.map(route => {
        const newRoute = { ...route };

        if (newRoute.path === '/') {
            newRoute.element = (
                <>
                    <AppLoader />
                    <Layout />
                </>
            );
            if (newRoute.children) {
                newRoute.children = newRoute.children.map(childRoute => {
                    let elementComponent;
                    let fallbackText = "Loading...";

                    if (childRoute.index) { // Handle index route (path undefined or '')
                        elementComponent = Home;
                        fallbackText = "Loading Home...";
                    } else {
                        switch(childRoute.path) {
                            case 'about':
                                elementComponent = About;
                                fallbackText = "Loading About page...";
                                break;
                            case 'community-work':
                                elementComponent = CommunityWork;
                                fallbackText = "Loading Community Work...";
                                break;
                            case 'leaderboard':
                                elementComponent = LeaderBoard;
                                fallbackText = "Loading Leaderboard...";
                                break;
                            case 'main':
                                elementComponent = Maintenance;
                                fallbackText = "Loading Maintenance page...";
                                break;
                            default:
                                elementComponent = null; // Or a 404 component
                        }
                    }

                    return {
                        ...childRoute,
                        element: elementComponent ? (
                            <Suspense fallback={<div>{fallbackText}</div>}>
                                {React.createElement(elementComponent)}
                            </Suspense>
                        ) : null,
                    };
                });
            }
        }
        return newRoute;
    });
};

// Use import.meta.env.BASE_URL to get the base path from Vite config
// This ensures consistency between Vite's asset paths and React Router's routing.
const router = createBrowserRouter(createReactRouterConfig(routesConfig), {
    basename: import.meta.env.BASE_URL // <--- ADD/MODIFY THIS LINE
});

export default router;

// You'll also need to ensure your main.jsx (or index.jsx) uses RouterProvider:
// Example:
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import AppRoutes from './routes/AppRoutes.jsx'; // Your router file
// import './index.css'; // Your global CSS

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={AppRoutes} />
//   </React.StrictMode>,
// );