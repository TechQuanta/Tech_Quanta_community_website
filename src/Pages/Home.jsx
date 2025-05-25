import React, { useEffect, useState } from "react";
import { HoverBorderGradient } from './../components/ui/hover-border-gradient';
import { HeroHighlight } from "../components/ui/hero-highlight";
import CoreTeam from "../components/LandingPage/CoreTeam";
import Volunteers from "../components/LandingPage/Volunteer";

const words = ['Developers', 'Students', 'Professionals', 'Engineers', 'Creators'];

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 2000);
    return () => clearInterval(interval);
  }, []);





  return (
    <>
      <HeroHighlight>
        <section className="min-h-screen w-full px-4 sm:px-8 lg:px-16 py-12 flex flex-col items-center justify-center text-white text-center font-[Poppins]">
          <div className="flex flex-wrap justify-center gap-4 my-6">
            {/* 3D Tilt Feature Buttons with different rotation per button */}

            {/* Hero Section */}
            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl text-black  dark:text-white  font-sans-serif sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Online Sessions & Workshops <span className="inline-block">For</span>
                <div className="relative inline-block overflow-hidden h-[1.2em] ml-2">
                  <span
                    className={`relative z-10 px-2 inline-block transition-all duration-500 ${isAnimating
                      ? 'translate-y-full -translate-x-4 opacity-0'
                      : 'translate-y-0 translate-x-0 opacity-100'
                      }`}
                  >
                    {words[currentWord]}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-8 md:h-10 bg-[#2ECC71] dark:bg-purple-400 z-0 transition-all duration-500 transform -rotate-2 ${isAnimating
                      ? 'translate-y-full -translate-x-8'
                      : 'translate-y-0 translate-x-0'
                      }`}
                    style={{ borderRadius: '8px', transformOrigin: 'center' }}
                  ></span>
                </div>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-6 mb-10 max-w-3xl mx-auto">
                WeMakeDevs is an inclusive global community for anyone passionate about
                technology. We foster collaboration and innovation through global events.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto font-exo2"
                  as="button"
                  className="dark:bg-black bg-transparent flex items-center justify-center space-x-2 px-6 py-3 text-sm cursor-pointer w-full"
                  onClick={() => window.open("/community-work")}
                >
                  <span>Upcomming Events !</span>
                </HoverBorderGradient>
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto"
                  as="button"
                  className="bg-gradient-to-r from-blue-600 font-exo2 to-blue-500 text-white flex items-center justify-center space-x-2 px-6 py-3 text-sm backdrop-blur-md cursor-pointer w-full"
                  onClick={() => window.location.href = "/community-work"}
                >
                  <span>Explore</span>
                </HoverBorderGradient>
              </div>
            </div>
          </div>
        </section>
      </HeroHighlight>

      {/* Core Team Section */}
      <section className="relative h-full dark:bg-[#121212] bg-white px-3 sm:px-4 md:px-6 flex flex-col items-center justify-center font-[Poppins] text-center pt-12 sm:pt-16 md:pt-20 mt-4 sm:mt-8 md:mt-10 overflow-hidden z-0">
        <CoreTeam />
      </section>

      {/* Volunteers Section */}
      <section className="relative dark:bg-[#121212] bg-white font-[Poppins] py-2 sm:py-4 md:py-6 z-0 -mt-6 sm:-mt-8">
        <Volunteers />
      </section>
    </>
  );
};

export default Home;
