import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const memojiList = [
  "/memoji1.webp",
  "/memoji2.webp",
  "/memoji3.webp",
  "/memoji4.webp",
  "/memoji5.webp",
  "/memoji6.webp",
  "/memoji7.webp",
];

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMemojiIndex, setCurrentMemojiIndex] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const memojiInterval = setInterval(() => {
      setCurrentMemojiIndex((prev) => (prev + 1) % memojiList.length);
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(memojiInterval);
    }, 2000);

    return () => {
      clearInterval(memojiInterval);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div
        className={`loader-container ${
          theme === "dark" ? "loader-dark" : "loader-light"
        }`}
      >
        <div className="loader-blur-bg" aria-hidden="true" />
        <div className="loader-glow-circle" aria-hidden="true" />
        <img
          src={memojiList[currentMemojiIndex]}
          alt="Loading Memoji"
          className="loader-image"
        />
        <h1 className="loader-title">Tech Quanta</h1>
        <p className="loader-subtext">
          Empowering Open Source Minds
          <br />
          Code the Future. Sustain the Planet.
        </p>
      </div>
    );
  }

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

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
