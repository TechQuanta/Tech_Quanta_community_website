import React, { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import Faq from "./../components/LandingPage/Faq";
import { HoverBorderGradient } from './../components/ui/hover-border-gradient';
import CoreTeam from "../components/LandingPage/CoreTeam";
import { HeroHighlight } from "../components/ui/hero-highlight";
import Partners from "../components/LandingPage/Partners";
import SOCIALS from  "../components/LandingPage/Socials"; // Ensure your custom styles are imported
import "./main.css"; // Ensure your custom video player CSS is in this file

// Words focused on active contribution and creative roles
const words = [
  'Innovators', 'Creators', 'Coders', 'Designers',
  'Writers', 'Problem Solvers', 'Your Ideas', 'New Perspectives'
];

const Home = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Video player specific states and refs
  const videoRef = useRef(null);
  // IMPORTANT: Replace 'dQw4w9WgXcQ' with your actual YouTube video ID.

  const baseVideoUrl = `https://www.youtube.com/embed/pQkaoaI9Ljc?si=xITc7-aGS_N6SoLT`;
  const [videoSrc, setVideoSrc] = useState(baseVideoUrl);
  const [transformStyle, setTransformStyle] = useState({});

  // Effect for cycling through words (Hero Section)
  useEffect(() => {
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

  // Effect for IntersectionObserver (autoplay/pause on scroll)
  useEffect(() => {
    const currentVideoIframe = videoRef.current;
    if (!currentVideoIframe) return;

    // Use URL object for clean parameter management
    const url = new URL(baseVideoUrl);
    url.searchParams.set('enablejsapi', '1'); // Required for YouTube IFrame API to control playback

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If video is in view, add autoplay and mute.
          // Most browsers require videos to be muted for autoplay without user interaction.
          url.searchParams.set('autoplay', '1');
          url.searchParams.set('mute', '1'); // Mute by default for autoplay
          setVideoSrc(url.toString());
        } else {
          // If video is out of view, remove autoplay to effectively "pause" it.
          // Removing mute ensures it starts muted if it comes back into view.
          url.searchParams.delete('autoplay');
          setVideoSrc(url.toString()); // Update src to stop playback
          // To truly stop/reset, you might re-set the src without autoplay,
          // or use the YouTube IFrame API to pause/stop the video more cleanly.
          // For simplicity here, just removing autoplay param effectively pauses it.
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% of the video is visible
    });

    observer.observe(currentVideoIframe);

    // Cleanup observer on component unmount
    return () => {
      if (currentVideoIframe) {
        observer.unobserve(currentVideoIframe);
      }
    };
  }, [baseVideoUrl]); // Depend on baseVideoUrl to re-run if it changes

  // Effect for mousemove parallax/tilt effect (the "page effect")
  useEffect(() => {
    const videoContainer = videoRef.current?.closest('.video-card-container');
    if (!videoContainer) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = videoContainer.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = (clientX - centerX) / (width / 2); // -1 to 1 range
      const deltaY = (clientY - centerY) / (height / 2); // -1 to 1 range

      // Apply rotation and lift for a 3D "page" effect
      const rotateX = -deltaY * 10; // Increased rotation for more dramatic effect
      const rotateY = deltaX * 10;  // Increased rotation for more dramatic effect
      const translateZ = 30;       // Lift off the page even more

      setTransformStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        transition: 'transform 0.1s ease-out' // Smooth transition for movement
      });
    };

    const handleMouseLeave = () => {
      setTransformStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: 'transform 0.5s ease-out' // Slower transition back to original
      });
    };

    videoContainer.addEventListener('mousemove', handleMouseMove);
    videoContainer.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      videoContainer.removeEventListener('mousemove', handleMouseMove);
      videoContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
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
                  onClick={() => window.open("https://techquanta.github.io/community-wall")}
                >
                  <span>Make First Contribution</span>
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

      {/* Interactive video player section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-trasnparent ">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 dark:text-blue dark:from-white text-purple-400 font-space-grotesk ">
          Discover Our Vision
        </h2>
        <div className="video-card-container w-full max-w-6xl mx-auto relative group" style={transformStyle}>
          {/* Outer shadow layer for depth and floating effect */}
          <div className="video-card-shadow-outer"></div>

          {/* Video Container - Ensures 16:9 aspect ratio and clips content */}
          <div className="video-aspect-ratio video-shadow-inset">
            
            <iframe
              ref={videoRef}
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      {/* Community Join Section */}
      <section className="py-16 px-4  max-w-7xl mx-auto">
        <SOCIALS />
      </section>
      


      <section className="home-core-team-section">
        <div className="home-core-team-wrapper">
          <CoreTeam />
        </div>
        <div className="home-partners-wrapper">
          <Partners />
        </div>
        <div>
          <Faq/>
        </div>
      </section>
    </div>
  );
};

export default Home;