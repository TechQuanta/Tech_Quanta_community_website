import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { HeroHighlight } from "../components/ui/hero-highlight";
import "./main.css";

const CoreTeam = lazy(() => import("../components/LandingPage/CoreTeam"));
const Partners = lazy(() => import("../components/LandingPage/Partners"));

const words = [
  'Developers', 'Students', 'Professionals', 'Engineers', 'Researchers',
  'Tech Enthusiasts', 'Innovators', 'Creators', 'Coders', 'Designers'
];

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    const resetAnim = setInterval(() => {
      setIsAnimating(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(resetAnim);
    };
  }, []);

  const animatedWord = useMemo(() => words[currentWord], [currentWord]);

  const handleExplore = () => {
    window.location.href = "/community-work";
  };

  return (
    <div className="home-page">
      <HeroHighlight>
        <section className="home-hero-section">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="home-hero-wrapper">
              <h1 className="home-hero-title">
                Online Sessions & Workshops <span className="inline-block">For</span>
                <div className="home-hero-animated-word-container">
                  <span
                    className={`home-hero-animated-word ${isAnimating
                        ? "home-hero-animated-word-exit"
                        : "home-hero-animated-word-enter"
                      }`}
                  >
                    {animatedWord}
                  </span>
                  <span
                    className={`home-hero-animated-bg ${isAnimating
                        ? "home-hero-animated-bg-exit"
                        : "home-hero-animated-bg-enter"
                      }`}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </h1>
              <p className="home-hero-description">
                TechQuanta is an inclusive global community for anyone passionate about
                technology. We foster collaboration and innovation through global events.
              </p>
              <div className="home-hero-cta">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto font-exo2"
                  as="button"
                  className="dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full"
                  onClick={handleExplore}
                >
                  <span>Upcoming Events !</span>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto"
                  as="button"
                  className="bg-gradient-to-r from-blue-600 font-exo2 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full"
                  onClick={handleExplore}
                >
                  <span>Explore</span>
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </section>
      </HeroHighlight>

      <section className="home-core-team-section">
        <div className="home-core-team-wrapper">
          <Suspense fallback={<div>Loading Team...</div>}>
            <CoreTeam />
          </Suspense>
        </div>
        <div className="home-partners-wrapper">
          <Suspense fallback={<div>Loading Partners...</div>}>
            <Partners />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Home;
