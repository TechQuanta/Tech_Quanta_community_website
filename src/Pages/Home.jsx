// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Faq from "./../components/LandingPage/Faq";
import { HoverBorderGradient } from './../components/ui/hover-border-gradient';
import CoreTeam from "../components/LandingPage/CoreTeam";
import { HeroHighlight } from "../components/ui/hero-highlight";
import Partners from "../components/LandingPage/Partners";
import "./main.css";

// Words focused on active contribution and creative roles
const words = [
  'Innovators', 'Creators', 'Coders', 'Designers',
  'Writers', 'Problem Solvers', 'Your Ideas', 'New Perspectives'
];

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Interval to cycle through words
    const interval = setInterval(() => {
      setIsAnimating(true); // Trigger exit animation
      const timeout = setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsAnimating(false); // Trigger enter animation
      }, 500); // Matches CSS transition duration

      return () => clearTimeout(timeout); // Cleanup timeout
    }, 2000); // Word changes every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="home-page">
      <HeroHighlight>
        <section className="home-hero-section">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="home-hero-wrapper">
              <h1 className="home-hero-title">
                Crafting Open Source Futures. With{" "}
                <div className="home-hero-animated-word-container">
                  <span
                    className={`home-hero-animated-word ${
                      isAnimating
                        ? "home-hero-animated-word-exit"
                        : "home-hero-animated-word-enter"
                    }`}
                  >
                    {words[currentWord]}
                  </span>
                  <span
                    className={`home-hero-animated-bg ${
                      isAnimating
                        ? "home-hero-animated-bg-exit"
                        : "home-hero-animated-bg-enter"
                    }`}
                    style={{ borderRadius: '8px', transformOrigin: 'center' }}
                  />
                </div>
              </h1>
              <p className="home-hero-description">
                **TechQuanta** welcomes **newcomers** to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!
              </p>
              <div className="home-hero-cta">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto font-exo2"
                  as="button"
                  className="dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full"
                  onClick={() => window.open("https://discord.com/invite/WK3aftq5vg")}
                >
                  <span>Join the Community</span>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto"
                  as="button"
                  className="bg-gradient-to-r from-blue-600 font-exo2 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full"
                  onClick={() => (window.location.href = "/community-work")}
                >
                  <span>Explore Projects</span>
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </section>
      </HeroHighlight>

      <section className="home-core-team-section">
        <div className="home-core-team-wrapper">
          <CoreTeam />
        </div>
        <div>
          <Faq/>
        </div>
        <div className="home-partners-wrapper">
          <Partners />
        </div>
      </section>
    </div>
  );
};

export default Home;