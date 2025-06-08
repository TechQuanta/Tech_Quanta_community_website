// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'; // Import Helmet
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
      {/* Helmet for managing document head tags for the Home page */}
      <Helmet>
        <title>TechQuanta - Crafting Open Source Futures | Join Our Community</title>
        <meta 
          name="description" 
          content="TechQuanta welcomes newcomers to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!" 
        />
        {/* Open Graph / Social Sharing Meta Tags */}
        <meta property="og:title" content="TechQuanta - Crafting Open Source Futures" />
        <meta property="og:description" content="Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community." />
        <meta property="og:type" content="website" />
        {/* Replace with your actual website URL and a relevant image for social sharing */}
        <meta property="og:url" content="https://yourwebsite.com/" /> 
        {/* <meta property="og:image" content="https://yourwebsite.com/images/techquanta-social-share.jpg" /> */}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TechQuanta - Crafting Open Source Futures" />
        <meta name="twitter:description" content="Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community." />
        {/* <meta name="twitter:image" content="https://yourwebsite.com/images/techquanta-social-share.jpg" /> */}

        <link rel="canonical" href="https://yourwebsite.com/" /> {/* Replace with your actual home page URL */}
      </Helmet>

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
                <strong>TechQuanta</strong> welcomes <strong>newcomers</strong> to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!
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
          <Faq/> {/* Your FAQ component already has its own Helmet for FAQ-specific tags */}
        </div>
        <div className="home-partners-wrapper">
          <Partners />
        </div>
      </section>
    </div>
  );
};

export default Home;