import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import memoji1 from "./assets/memoji1.webp";
import memoji2 from "./assets/memoji2.webp";
import memoji3 from "./assets/memoji3.webp";
import memoji4 from "./assets/memoji4.webp";
import memoji5 from "./assets/memoji5.webp";
import memoji6 from "./assets/memoji6.webp";
import memoji7 from "./assets/memoji7.webp";

const memojiList = [
  memoji1,
  memoji2,
  memoji3,
  memoji4,
  memoji5,
  memoji6,
  memoji7,
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
        className={`loader-container ${theme === "dark" ? "loader-dark" : "loader-light"
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
