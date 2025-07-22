// BecomeSpeakerSection.jsx
import React, { useEffect, useRef, useState } from "react";
import banner from "../../assets/BecomeSpeakerBanner.png"

const BecomeSpeakerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden
        w-full
        uniform-background-gradient
        py-24 px-6 sm:px-12 md:px-24
        font-rajdhani
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        ease-out transform transition-opacity transition-transform duration-1000
      `}
      aria-label="Become a Speaker Section"
    >
      {/* Background abstract shapes with blur - keep these */}
      {/* Top Left Blob (unchanged) */}
      <svg
        className="absolute top-[-100px] left-[-100px] w-[320px] h-[320px] opacity-20 animate-blobFloat"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        fill="url(#gradBlob1)"
        aria-hidden="true"
        style={{ zIndex: 0, filter: "blur(20px)" }}
      >
        <defs>
          <linearGradient id="gradBlob1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          d="M40.2,-64.8C53.1,-55,59.3,-39.5,65.6,-23.6C72,-7.7,78.4,7.9,76.4,23.3C74.4,38.7,64,53.8,50.2,61.5C36.3,69.1,18.2,69.3,3.7,62.7C-10.8,56.1,-21.6,42.7,-34.5,34.7C-47.5,26.7,-62.6,24.1,-69.3,14.3C-76,4.4,-74.3,-14.9,-66.8,-30.7C-59.4,-46.5,-46.3,-58.7,-32.1,-66.3C-17.9,-73.9,-8.9,-77.8,5.6,-84.2C20,-90.7,40.1,-99.5,40.2,-64.8Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Center-Right Blob (MODIFIED AGAIN) */}
      <svg
        className="absolute top-1/2 -translate-y-1/2 right-[-50px] md:right-[-80px] w-[380px] h-[380px] opacity-15 animate-blobFloat delay-4000" /* MODIFIED: right property */
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        fill="url(#gradBlob2)"
        aria-hidden="true"
        style={{ zIndex: 0, filter: "blur(20px)" }}
      >
        <defs>
          <linearGradient id="gradBlob2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path
          d="M41.7,-62.1C54.4,-52.8,63.8,-41.8,68.7,-29.7C73.7,-17.6,74.3,-4.4,71.1,7.9C67.9,20.2,60.9,31.6,53.2,41.8C45.4,52,37,61,26.2,65.6C15.3,70.2,2.1,70.4,-9.8,74.3C-21.6,78.2,-32.4,85.7,-39.1,83.1C-45.7,80.5,-48.3,67.8,-52.7,55.2C-57.1,42.5,-63.4,30,-63.3,18.8C-63.2,7.5,-56.6,-2.4,-53,-11.4C-49.3,-20.4,-48.7,-28.5,-44.1,-37.3C-39.5,-46,-30.9,-55.3,-21,-62.5C-11.2,-69.6,-5.6,-74.6,3.1,-78.3C11.8,-82,23.7,-84.1,41.7,-62.1Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Container */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 z-10 items-center">
        {/* Text Content */}
        <div className="flex flex-col justify-center">
          <h2
            className="
              text-5xl sm:text-6xl font-space-grotesk font-extrabold tracking-tight
              bg-gradient-to-r from-primary to-tech-green
              bg-clip-text text-transparent
              animate-textShimmer
              drop-shadow-lg
              mb-8
            "
          >
            Become a Speaker
          </h2>

          <p
            className="
              text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300
              font-space-grotesk max-w-lg
            "
          >
            Share your expertise and passion with a vibrant community by hosting workshops, sessions, or talks. Whether you're an industry professional, educator, or enthusiast, this is your opportunity to inspire others, expand your network, and showcase your unique insights. Join us to empower minds and drive meaningful conversations that spark innovation and growth.
          </p>

          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSevjGT1Nh8mNyc8MBovZn3EX1X_9P85OmozpJTe6edUkRpPDw/viewform?usp=header",
                "_blank"
              )
            }
            aria-label="Host a Workshop or Session"
            className="
              mt-10
              w-max
              px-8 py-4
              bg-gradient-to-r from-primary to-tech-green
              hover:from-tech-green hover:to-primary
              text-white font-semibold tracking-wide rounded-3xl
              shadow-md
              transition-all duration-300 ease-in-out
              transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-60
              animate-pulseGlow
            "
          >
            🎤 Host a Workshop or Session
          </button>
        </div>

        {/* Image */}
        <div
          className="
            relative
            w-full
            max-w-lg
            mx-auto
            md:mx-0
            cursor-pointer
            perspective-800
            shadow-lg
            overflow-hidden
          "
          onMouseMove={e => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
          }}
        >
          <img
            src={banner}
            alt="Become a Speaker Banner"
            className="w-full h-auto  object-cover select-none"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* Keep existing styles, they are specific to this component's animations */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        .animate-blobFloat {
          animation: blobFloat 15s ease-in-out infinite;
        }

        @keyframes textShimmer {
          0% {
            background-position: -400%;
          }
          100% {
            background-position: 400%;
          }
        }
        .animate-textShimmer {
          background-size: 400% 100%;
          animation: textShimmer 4s linear infinite;
        }

        .perspective-800 {
          perspective: 800px;
          transition: transform 0.2s ease-out;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(52, 211, 153, 0.7);
          }
          50% {
            box-shadow: 0 0 14px 4px rgba(52, 211, 153, 1);
          }
        }
        .animate-pulseGlow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BecomeSpeakerSection;