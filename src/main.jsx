// src/index.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App"; // This is your main App component
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import memoji1 from "./assets/memoji/memoji1-1.webp";
import memoji2 from "./assets/memoji/memoji2-1.webp";
import memoji3 from "./assets/memoji/memoji3-1.webp";
import memoji4 from "./assets/memoji/memoji4-1.webp";
import memoji5 from "./assets/memoji/memoji5-1.webp";
import memoji6 from "./assets/memoji/memoji6-1.webp";

// 🧠 List of memojis
const memojiList = [
  memoji1,
  memoji2,
  memoji3,
  memoji4,
  memoji5,
  memoji6
];

// 🌀 Loading Screen Component
function Loader() {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let intervalId, fadeTimeout, removeTimeout;
    let loaded = 0;

    // Preload memoji images
    const imagesToLoad = memojiList.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loaded++;
          resolve();
        };
        img.onerror = () => {
          // Even if an image fails to load, we still resolve to not block the loader
          console.warn(`Failed to load memoji image: ${src}`);
          loaded++;
          resolve();
        };
      });
    });

    // Wait for all memoji images to load
    Promise.all(imagesToLoad).then(() => {
      // Start rotating memojis
      intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % memojiList.length);
      }, 100);

      // Fade out the loader after 4 seconds (after all images are loaded)
      fadeTimeout = setTimeout(() => {
        setFadeOut(true);
        // Remove the loader from the DOM after fade-out transition
        removeTimeout = setTimeout(() => {
          const loaderRoot = document.getElementById("loader-root");
          if (loaderRoot) {
            // Unmount the loader component
            ReactDOM.createRoot(loaderRoot).unmount(); // Use unmount for proper cleanup
          }
          document.body.style.overflow = "auto"; // Restore scrollbar
          clearInterval(intervalId); // Stop memoji rotation
        }, 1000); // Duration of fade-out CSS transition
      }, 4000); // Display loader for 4 seconds after images are loaded
    });


    return () => {
      clearInterval(intervalId);
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-glow-circle" />
      <img
        src={memojiList[index]}
        alt="Loading"
        className="loader-image"
      />
      <h1 className="loader-title">Tech Quanta</h1>
      <p className="loader-subtext">
        Empowering Open Source Minds<br />
        Code the Future. Sustain the Planet.
      </p>
    </div>
  );
}

// Inject loader immediately into a dedicated root element
// Make sure you have a <div id="loader-root"></div> in your public/index.html
ReactDOM.createRoot(document.getElementById("loader-root")).render(<Loader />);

// Main App Mount
function Main() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider>
          <App /> {/* Your main application, which uses react-router-dom and lazy loading */}
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

// Mount the actual app
// We need to ensure the main app only mounts after the loader is ready to fade out,
// or at least after a sufficient delay, to avoid a flicker.
// A common pattern is to conditionally render the Main app in index.jsx
// based on the loader's state, but given your current loader unmounts itself,
// we just need to ensure 'root' exists.
// The current setup ensures the loader is displayed first, then the App renders.
// For a very large app, you might want to delay the main app's render until the loader is completely gone.
// However, typically, `App` will start loading its chunks in parallel with the loader running.
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);