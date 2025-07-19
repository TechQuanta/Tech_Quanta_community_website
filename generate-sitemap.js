// generate-sitemap.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM specific: Get __filename and __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: This path must correctly point to your routesConfig.js file.
// Assuming routesConfig.js is directly in your 'src' folder:
import routesConfig from './src/routesConfig.js'; 

const hostname = 'https://www.techquanta.tech'; // Your website's base URL

async function generateSitemap() {
    console.log('Starting sitemap generation...');

    const sitemap = new SitemapStream({ hostname: hostname });
    // This creates the write stream for the sitemap.xml file in the public directory
    const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));

    // Pipe the sitemap content to the file write stream
    sitemap.pipe(writeStream);

    // Function to recursively add routes from your configuration
    function addRoutes(routes, parentPath = '') {
        routes.forEach(route => {
            let currentPath = parentPath;

            // Handle the root path or paths that start with '/'
            if (route.path === '/') {
                if (parentPath === '') {
                    // For the very first root route, the URL is just '/'
                    currentPath = '';
                }
                // If '/' is a child path (e.g., /parent/), it essentially means /parent/
                // No change to currentPath needed if it's already /parent
            } else if (route.path) {
                // Join paths using POSIX style (forward slashes) for URLs
                currentPath = path.posix.join(parentPath, route.path);
            }

            // Add the URL to the sitemap stream
            // Ensure we don't add duplicate entries for root if it's explicitly handled
            if (currentPath !== '' || route.path === '/') {
                sitemap.write({
                    url: `/${currentPath}`, // URLs in sitemap must start with /
                    changefreq: 'weekly',    // Suggestion: Adjust based on how often content changes
                    priority: 0.7            // Suggestion: Adjust based on page importance (0.0 to 1.0)
                });
                console.log(`Added: ${hostname}/${currentPath}`);
            }

            // If the route has children, recursively add them
            if (route.children && route.children.length > 0) {
                addRoutes(route.children, currentPath);
            }
        });
    }

    // Start adding routes from your imported routesConfig
    if (routesConfig && Array.isArray(routesConfig)) { // Ensure routesConfig is an array
        addRoutes(routesConfig);
    } else {
        console.error("Error: routesConfig is not an array or is undefined. Check src/routesConfig.js export.");
        // Optionally, you might want to exit here or throw an error
        process.exit(1);
    }

    // Signal that no more URLs will be added to the sitemap stream
    sitemap.end();

    try {
        // Await the promise that resolves when the sitemap stream has completely flushed its data
        await streamToPromise(sitemap); // Corrected: Await the 'sitemap' stream itself
        console.log('Sitemap generated successfully at ./public/sitemap.xml');
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

generateSitemap();