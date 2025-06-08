import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
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

    memojiList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === memojiList.length) {
          intervalId = setInterval(() => {
            setIndex((prev) => (prev + 1) % memojiList.length);
          }, 100);

          fadeTimeout = setTimeout(() => {
            setFadeOut(true);
            removeTimeout = setTimeout(() => {
              const loaderRoot = document.getElementById("loader-root");
              if (loaderRoot) ReactDOM.createRoot(loaderRoot).render(null);
              document.body.style.overflow = "auto";
              clearInterval(intervalId);
            }, 1000);
          }, 4000);
        }
      };
    });

    return () => {
      clearInterval(intervalId);
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

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

// Inject loader immediately
ReactDOM.createRoot(document.getElementById("loader-root")).render(<Loader />);

// Main App Mount
function Main() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

// Mount the actual app
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
