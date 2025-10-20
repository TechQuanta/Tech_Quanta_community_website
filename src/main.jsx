import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { ClerkProvider } from "@clerk/clerk-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";

import memoji1 from "./assets/memoji/memoji1-1.webp";
import memoji2 from "./assets/memoji/memoji2-1.webp";
import memoji3 from "./assets/memoji/memoji3-1.webp";
import memoji4 from "./assets/memoji/memoji4-1.webp";
import memoji5 from "./assets/memoji/memoji5-1.webp";
import memoji6 from "./assets/memoji/memoji6-1.webp";

const clerkPublishableKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

const clerkAppearance = {
  variables: {
    colorPrimary: "#6366f1",
    colorBackground: "#f9fafb",
    colorText: "#111827",
    colorInputBackground: "#ffffff",
    colorInputText: "#111827",
    colorInputBorder: "#d1d5db",
    colorDanger: "#ef4444",
  },
  elements: {
    formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    card: "shadow-md border border-gray-200",
    headerTitle: "text-xl font-semibold",
  },
};

const memojiList = [memoji1, memoji2, memoji3, memoji4, memoji5, memoji6];

function Loader({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let intervalId, fadeTimeout, removeTimeout;

    const imagesToLoad = memojiList.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = () => {
          console.warn(`Failed to load memoji image: ${src}`);
          resolve();
        };
      });
    });

    Promise.all(imagesToLoad).then(() => {
      intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % memojiList.length);
      }, 100);

      fadeTimeout = setTimeout(() => {
        setFadeOut(true);
        removeTimeout = setTimeout(() => {
          onFinish?.();
          clearInterval(intervalId);
        }, 1000);
      }, 4000);
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
      <img src={memojiList[index]} alt="Loading" className="loader-image mb-[130px]" />
    </div>
  );
}

function MainApp() {
  return (
    <React.StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey} appearance={clerkAppearance}>
        <HelmetProvider>
          <RecoilRoot>
            <ThemeProvider>
              <App />
              <Analytics />
              <SpeedInsights />
            </ThemeProvider>
          </RecoilRoot>
        </HelmetProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
}

// Mount the loader and then the app
const loaderContainer = document.getElementById("loader-root");
const rootContainer = document.getElementById("root");

if (loaderContainer && rootContainer) {
  const loaderRoot = ReactDOM.createRoot(loaderContainer);

  loaderRoot.render(
    <Loader
      onFinish={() => {
        loaderRoot.unmount();
        document.body.style.overflow = "auto";
        ReactDOM.createRoot(rootContainer).render(<MainApp />);
      }}
    />
  );
} else {
  ReactDOM.createRoot(rootContainer).render(<MainApp />);
}
