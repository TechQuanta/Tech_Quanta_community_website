import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
// Removed: import { useGitHubLeaderboardData } from "../hooks/GraphQlQuery";
// Removed: useEffect import, as AppLoader is gone

// IMPORTANT: Import the plain JavaScript route configuration
import routesConfig from '../routesConfig.js';

// Synchronous imports (Normal Routes) - No more lazy loading
import Home from "../Pages/Home.jsx";
import About from "../Pages/About.jsx";
import CommunityWork from "../Pages/CommunityWork.jsx";
import LeaderBoard from "../Pages/LeaderBoard.jsx";
import OpenSourceProjects from "../Pages/open-sourcep.jsx";
import Maintenance from "../Pages/Maintenance.jsx";

// Removed: The AppLoader component

// Function to map the plain route config to the full React Router config
const createReactRouterConfig = (routes) => {
    return routes.map(route => {
        const newRoute = { ...route };

        if (newRoute.path === '/') {
            newRoute.element = (
                <>
                    {/* Removed: <AppLoader /> */}
                    <Layout />
                </>
            );
            if (newRoute.children) {
                newRoute.children = newRoute.children.map(childRoute => {
                    let elementComponent;

                    if (childRoute.index) { // Handle index route (path undefined or '')
                        elementComponent = Home;
                    } else {
                        switch(childRoute.path) {
                            case 'about':
                                elementComponent = About;
                                break;
                            case 'community-work':
                                elementComponent = CommunityWork;
                                break;
                            case 'open-source-contributions':
                                elementComponent = OpenSourceProjects;
                                break;
                            case 'leaderboard':
                                elementComponent = LeaderBoard;
                                break;
                            case 'main':
                                elementComponent = Maintenance;
                                break;
                            default:
                                elementComponent = null; // Or a 404 component
                        }
                    }

                    return {
                        ...childRoute,
                        // Direct rendering of the component, removing Suspense and fallback logic
                        element: elementComponent ? (
                            React.createElement(elementComponent)
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
