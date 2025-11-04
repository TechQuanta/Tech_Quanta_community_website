import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
// External Components - Defined or Stubbed
import Faq from "../components/LandingPage/Faq";
import CoreTeam from "../components/LandingPage/CoreTeam";
import Partners from "../components/LandingPage/Partners";
import SOCIALS from "../components/LandingPage/Socials";
import ShinyText from '../components/ui/ShinyText';

// import DomainsSection from "../components/LandingPage/DomainsSection"; // Correctly defined
import { HoverBorderGradient } from "./../components/ui/hover-border-gradient";

// Words focused on active contribution and creative roles for the Hero title
const words = [
  "Innovators",
  "Creators",
  "Coders",
  "Designers",
  "Writers",
  "Problem Solvers",
  "Your Ideas",
  "New Perspectives",
];


// Reusable Tailwind CSS classes for consistent styling
const BASE_BUTTON_CLASSES =
  "bg-[#00BFFF] dark:text-black dark:bg-white text-white hover:bg-blue-400 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full";

const BASE_CONTAINER_CLASSES = "rounded-lg w-full sm:w-auto";

// Gradient classes for the H1 text
const GRADIENT_TEXT_CLASSES =
  "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-white dark:to-blue-300";

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Video player specific states and refs
  const videoRef = useRef(null);
  // Base URL is used statically now, without any autoplay logic
  const videoSrc = `https://www.youtube.com/embed/pQkaoaI9Ljc?si=xITc7-aGS_N6SoLT&wmode=transparent`;
  // Removed: const [transformStyle, setTransformStyle] = useState({});

  // Effect 1: Cycling through words (Hero Section) - RETAINED
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);

      return () => clearTimeout(timeout);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Removed: Effect 2: IntersectionObserver (Autoplay/Pause video on scroll)
  // Removed: Effect 3: Mousemove parallax/tilt effect for the video card

  return (
    <div className="home-page bg-transparent">
      <Helmet>
        <title>
          TechQuanta - Crafting Open Source Futures | Join Our Community
        </title>
        <meta
          name="description"
          content="TechQuanta welcomes newcomers to open source. Build impactful projects, share your unique vision, and grow with our supportive global community. Your contributions power innovation!"
        />
        <meta
          property="og:title"
          content="TechQuanta - Crafting Open Source Futures"
        />
        <meta
          property="og:description"
          content="Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="TechQuanta - Crafting Open Source Futures"
        />
        <meta
          name="twitter:description"
          content="Join TechQuanta: Build impactful open-source projects, share your vision, and grow with our supportive global community."
        />
        <link rel="canonical" href="https://yourwebsite.com/" />
      </Helmet>

      {/* |----------------------------------------------------------------------
        | 1. HERO SECTION 
        |----------------------------------------------------------------------
        */}
      <section className="home-hero-section min-h-screen w-full flex flex-col items-center justify-center bg-transparent">
        <div className="w-full lg:px-16 max-w-6xl mx-auto pb-24">
          <div className="flex flex-wrap gap-4 w-full">
            <div className="home-hero-wrapper flex flex-col items-start justify-between w-full text-left">
              <div className="w-full max-w-3xl">
                <h1 className="home-hero-title text-left">
                  <ShinyText
                    text="Crafting Open Source Futures. With"
                    disabled={false}
                    speed={3}
                    className="custom-class"
                  />
                  <span className={GRADIENT_TEXT_CLASSES}>
                     {" "}
                  </span>
                  <div className="home-hero-animated-word-container inline-block">
                    <span
                      className={`home-hero-animated-word typing-effect ${GRADIENT_TEXT_CLASSES} ${
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
                      style={{ borderRadius: "8px", transformOrigin: "center" }}
                    />
                  </div>
                </h1>
                <p className="home-hero-description text-left">
                  <strong>TechQuanta</strong> welcomes{" "}
                  <strong>newcomers</strong> to open source. Build impactful
                  projects, share your unique vision, and grow with our
                  supportive global community. Your contributions power
                  innovation!
                </p>
              </div>

              {/* BUTTONS CONTAINER */}
              <div className="home-hero-cta flex flex-col sm:flex-row gap-4 sm:space-x-4 mt-10 ml-0 sm:ml-auto justify-start sm:justify-end">
                <HoverBorderGradient
                  containerClassName={`${BASE_CONTAINER_CLASSES} font-exo2`}
                  as="button"
                  className={BASE_BUTTON_CLASSES}
                  onClick={() =>
                    window.open("https://techquanta.github.io/community-wall")
                  }
                >
                  <span>Make First Contribution</span>
                </HoverBorderGradient>

                <HoverBorderGradient
                  containerClassName={BASE_CONTAINER_CLASSES}
                  as="button"
                  className={`${BASE_BUTTON_CLASSES} font-exo2 backdrop-blur-md`}
                  onClick={() => (window.location.href = "/community-work")}
                >
                  <span>Explore Projects</span>
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* |----------------------------------------------------------------------
        | 2. VISION SECTION (Video) - Width: max-w-6xl
        |----------------------------------------------------------------------
        */}
      <section className=" pb-16lg:px-16 bg-transparent">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 dark:text-blue dark:from-white text-purple-400 font-space-grotesk">
          Discover Our Vision
        </h2>
        <div
          // Add pointer-events-none to the container itself
          className="video-card-container w-full max-w-6xl mx-auto relative group pointer-events-none"
        >
          {/* Apply to the shadow element as well */}
          <div className="video-card-shadow-outer pointer-events-none"></div>

          <div className="video-shadow-inset aspect-video">
            <iframe
              ref={videoRef}
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ background: "transparent" }}
              // CRITICAL: Re-enable pointer events ONLY for the iframe
              className="w-full h-full pointer-events-auto"
            ></iframe>
          </div>
        </div>
      </section>

      {/* |----------------------------------------------------------------------
        | 4. SOCIALS SECTION - Width: max-w-6xl
        |----------------------------------------------------------------------
        */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-transparent">
        <SOCIALS />
      </section>

      {/* |----------------------------------------------------------------------
        | 5. CORE TEAM, PARTNERS, FAQ SECTION 
        |----------------------------------------------------------------------
        */}
      <section>
        <div>
          <div className="home-core-team-wrapper">
            <CoreTeam />
          </div>
          <div className="home-partners-wrapper mt-16">
            <Partners />
          </div>
          <div className="mt-16">
            <Faq />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
