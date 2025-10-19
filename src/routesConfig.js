 // src/routesConfig.js

// This file defines the routes as a plain JavaScript array.
// NO React components, NO JSX, NO Hooks (like useEffect, lazy, Suspense) in this file.

const routes = [
  {
    path: "/",
    children: [
      {
        // This is for the root path (index: true)
        index: true,
      },
      {
        path: "about",
      },
      {
        path: "community-work",
      },
      {
        path: "leaderboard",
      },
      {
        path: "main",
      },
      {
        path: "open-source-contributions",
      },
    ],
  },
  // Add any other top-level routes here if you expand your site later, e.g.:
  // {
  //   path: "/new-feature",
  // },
];

// Export the plain JavaScript array of routes
export default routes;