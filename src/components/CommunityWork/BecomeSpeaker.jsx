// // BecomeSpeakerSection.jsx
// import React, { useEffect, useRef, useState } from "react";


// const BecomeSpeakerSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className={`
//         relative overflow-hidden
//         w-full
//         uniform-background-gradient
//         py-24 px-6 sm:px-12 md:px-24
//         font-rajdhani
//         ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
//         ease-out transform transition-opacity transition-transform duration-1000
//       `}
//       aria-label="Become a Speaker Section"
//     >
//       {/* Background abstract shapes with blur - keep these */}
//       {/* Top Left Blob (unchanged) */}
//       <svg
//         className="absolute top-[-100px] left-[-100px] w-[320px] h-[320px] opacity-20 animate-blobFloat"
//         viewBox="0 0 200 200"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="url(#gradBlob1)"
//         aria-hidden="true"
//         style={{ zIndex: 0, filter: "blur(20px)" }}
//       >
//         <defs>
//           <linearGradient id="gradBlob1" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="#06b6d4" />
//           </linearGradient>
//         </defs>
//         <path
//           d="M40.2,-64.8C53.1,-55,59.3,-39.5,65.6,-23.6C72,-7.7,78.4,7.9,76.4,23.3C74.4,38.7,64,53.8,50.2,61.5C36.3,69.1,18.2,69.3,3.7,62.7C-10.8,56.1,-21.6,42.7,-34.5,34.7C-47.5,26.7,-62.6,24.1,-69.3,14.3C-76,4.4,-74.3,-14.9,-66.8,-30.7C-59.4,-46.5,-46.3,-58.7,-32.1,-66.3C-17.9,-73.9,-8.9,-77.8,5.6,-84.2C20,-90.7,40.1,-99.5,40.2,-64.8Z"
//           transform="translate(100 100)"
//         />
//       </svg>

//       {/* Center-Right Blob (MODIFIED AGAIN) */}
//       <svg
//         className="absolute top-1/2 -translate-y-1/2 right-[-50px] md:right-[-80px] w-[380px] h-[380px] opacity-15 animate-blobFloat delay-4000" /* MODIFIED: right property */
//         viewBox="0 0 200 200"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="url(#gradBlob2)"
//         aria-hidden="true"
//         style={{ zIndex: 0, filter: "blur(20px)" }}
//       >
//         <defs>
//           <linearGradient id="gradBlob2" x1="100%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#10b981" />
//             <stop offset="100%" stopColor="#22c55e" />
//           </linearGradient>
//         </defs>
//         <path
//           d="M41.7,-62.1C54.4,-52.8,63.8,-41.8,68.7,-29.7C73.7,-17.6,74.3,-4.4,71.1,7.9C67.9,20.2,60.9,31.6,53.2,41.8C45.4,52,37,61,26.2,65.6C15.3,70.2,2.1,70.4,-9.8,74.3C-21.6,78.2,-32.4,85.7,-39.1,83.1C-45.7,80.5,-48.3,67.8,-52.7,55.2C-57.1,42.5,-63.4,30,-63.3,18.8C-63.2,7.5,-56.6,-2.4,-53,-11.4C-49.3,-20.4,-48.7,-28.5,-44.1,-37.3C-39.5,-46,-30.9,-55.3,-21,-62.5C-11.2,-69.6,-5.6,-74.6,3.1,-78.3C11.8,-82,23.7,-84.1,41.7,-62.1Z"
//           transform="translate(100 100)"
//         />
//       </svg>

//       {/* Container */}
//       <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 z-10 items-center">
//         {/* Text Content */}
//         <div className="flex flex-col justify-center">
//           <h2
//             className="
//               text-5xl sm:text-6xl font-space-grotesk font-extrabold tracking-tight
//               bg-gradient-to-r from-primary to-tech-green
//               bg-clip-text text-transparent
//               animate-textShimmer
//               drop-shadow-lg
//               mb-8
//             "
//           >
//             Become a Speaker
//           </h2>

//           <p
//             className="
//               text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300
//               font-space-grotesk max-w-lg
//             "
//           >
//             Share your expertise and passion with a vibrant community by hosting workshops, sessions, or talks. Whether you're an industry professional, educator, or enthusiast, this is your opportunity to inspire others, expand your network, and showcase your unique insights. Join us to empower minds and drive meaningful conversations that spark innovation and growth.
//           </p>

//           <button
//             onClick={() =>
//               window.open(
//                 "https://docs.google.com/forms/d/e/1FAIpQLSevjGT1Nh8mNyc8MBovZn3EX1X_9P85OmozpJTe6edUkRpPDw/viewform?usp=header",
//                 "_blank"
//               )
//             }
//             aria-label="Host a Workshop or Session"
//             className="
//               mt-10
//               w-max
//               px-8 py-4
//               bg-gradient-to-r from-primary to-tech-green
//               hover:from-tech-green hover:to-primary
//               text-white font-semibold tracking-wide rounded-3xl
//               shadow-md
//               transition-all duration-300 ease-in-out
//               transform hover:scale-105
//               focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-60
//               animate-pulseGlow
//             "
//           >
//             🎤 Host a Workshop or Session
//           </button>
//         </div>

//         {/* Image */}
//         <div
//           className="
//             relative
//             w-full
//             max-w-lg
//             mx-auto
//             md:mx-0
//             cursor-pointer
//             perspective-800
//             shadow-lg
//             overflow-hidden
//           "
//           onMouseMove={e => {
//             const card = e.currentTarget;
//             const rect = card.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;
//             const centerX = rect.width / 2;
//             const centerY = rect.height / 2;
//             const rotateX = ((y - centerY) / centerY) * 10;
//             const rotateY = ((x - centerX) / centerX) * 10;

//             card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
//           }}
//           onMouseLeave={e => {
//             e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
//           }}
//         >
//           <img
//             src="https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/banners/BecomeSpeakerBanner.png"
//             alt="Become a Speaker Banner"
//             className="w-full h-auto  object-cover select-none"
//             loading="lazy"
//             draggable={false}
//           />
//         </div>
//       </div>

//       {/* Keep existing styles, they are specific to this component's animations */}
//       <style>{`
//         @keyframes blobFloat {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(8deg); }
//         }
//         .animate-blobFloat {
//           animation: blobFloat 15s ease-in-out infinite;
//         }

//         @keyframes textShimmer {
//           0% {
//             background-position: -400%;
//           }
//           100% {
//             background-position: 400%;
//           }
//         }
//         .animate-textShimmer {
//           background-size: 400% 100%;
//           animation: textShimmer 4s linear infinite;
//         }

//         .perspective-800 {
//           perspective: 800px;
//           transition: transform 0.2s ease-out;
//         }

//         @keyframes pulseGlow {
//           0%, 100% {
//             box-shadow: 0 0 8px 2px rgba(52, 211, 153, 0.7);
//           }
//           50% {
//             box-shadow: 0 0 14px 4px rgba(52, 211, 153, 1);
//           }
//         }
//         .animate-pulseGlow {
//           animation: pulseGlow 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default BecomeSpeakerSection;
import React, { useEffect, useRef, useState } from 'react';

// --- Mock Project Data ---
const PROJECTS = [
  {
    id: 1,
    owner: "TechQuanta",
    repoName: "github-avatar-frame-api",
    description: "Dynamically generate customizable avatar frames for GitHub profiles.",
    link: "https://github.com/TechQuanta/github-avatar-frame-api", 
    color: "text-orange-600", // Bright orange for light background
  },
];

// --- Custom CSS & Background Styles (Visible Geometric Pattern) ---
const CustomStyles = () => (
  <style>
    {`
      /* Define the NEW distinct, visible Dot Grid Pattern SVG background */
      .code-pattern {
          /* New: Subtle Dot Grid Pattern */
          background-image: 
              url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' fill='%23ffffff'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23e8e8e8'/%3E%3C/svg%3E");
          background-color: #ffffff; /* Pure white base */
          background-size: 20px 20px; /* Tiled size */
      }
      
      /* Animation styles for the Become Speaker Section */
      @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
      }
      .animate-blobFloat {
          animation: blobFloat 15s ease-in-out infinite;
      }
      @keyframes textShimmer {
          0% { background-position: -400%; }
          100% { background-position: 400%; }
      }
      .animate-textShimmer {
          background-size: 400% 100%;
          animation: textShimmer 4s linear infinite;
      }
      /* This class is essential for the 3D perspective to work */
      .perspective-800 { 
          perspective: 800px;
          /* Removed individual transform transition here, added to elements directly */
      }
      @keyframes pulseGlow {
          /* Note: The button uses blue-500/teal-500, so we use blue glow for consistency */
          0%, 100% { box-shadow: 0 0 8px 2px rgba(96, 165, 250, 0.7); } 
          50% { box-shadow: 0 0 14px 4px rgba(96, 165, 250, 1); }
      }
      .animate-pulseGlow {
          animation: pulseGlow 3s ease-in-out infinite;
      }
    `}</style>
);

/**
 * Simple SVG Icon representing a developer/user
 */
const DeveloperIconSVG = () => (
  <svg 
    className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600 inline-block mr-3 align-middle" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head (Circle) */}
    <circle cx="12" cy="7" r="4" />
    {/* Body/Shoulders (Arc) */}
    <path d="M19 20v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  </svg>
);


/**
 * Single Project Card Component - Light Glassmorphism Style
 * Now includes dynamic 3D tilt and shadow based on mouse position.
 */
const ProjectCard = ({ project }) => {
  // SVG Icon for the Owner/Repo prefix
  const GitHubPrefixIcon = (
    <div className={`w-7 h-7 flex items-center justify-center border border-gray-400 bg-transparent rounded-full mr-2 p-0.5`}>
      {/* GitHub SVG Icon */}
      <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.385 3.431 9.9 8.243 11.459.6.111.821-.261.821-.577 0-.285-.01-1.04-.015-2.043-3.338.724-4.042-1.61-4.042-1.61-.542-1.355-1.325-1.714-1.325-1.714-1.087-.744.084-.693.084-.693 1.205.084 1.838 1.237 1.838 1.237 1.07 1.837 2.809 1.305 3.492.997.107-.775.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23-.957.266-1.983.398-3.003.398-1.02-.001-2.046-.132-3.004-.398 2.292-1.552 3.3-1.23 3.3-1.23.653 1.65.242 2.873.118 3.176.766.84 1.235 1.911 1.235 3.221 0 4.61-2.808 5.624-5.474 5.923.43.372.823 1.102.823 2.222 0 1.603-.015 2.899-.015 3.289 0 .318.216.694.825.577C19.563 22.092 23 17.584 23 12c0-6.627-5.374-12-12-12z"/></svg>
    </div>
  );

  const BASE_SHADOW = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';

  return (
    <div 
      className="w-full h-full cursor-pointer perspective-800"
      onMouseMove={e => {
        const card = e.currentTarget.querySelector('.card-3d-base');
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Increased tilt factor for a stronger 3D feel
        const rotateX = ((y - centerY) / centerY) * 7; 
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        
        // Dynamic shadow based on rotation (simulates lighting)
        card.style.boxShadow = `
            ${rotateY/2}px ${-rotateX/2}px 30px rgba(0, 0, 0, 0.25),
            0 0 15px rgba(255, 255, 255, 0.4) inset
        `; 
      }}
      onMouseLeave={e => {
        const card = e.currentTarget.querySelector('.card-3d-base');
        if (!card) return;
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        card.style.boxShadow = BASE_SHADOW; // Reset to the Tailwind base shadow
      }}
    > 
      {/* Ensure the card background contrasts well against the SVG pattern */}
      <div 
        className="card-3d-base rounded-3xl overflow-hidden flex flex-col h-72 relative transition duration-300 backdrop-blur-md bg-white/90 text-gray-900 border-b-8 border-yellow-400 shadow-xl shadow-gray-400/50"
        style={{ transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out', boxShadow: BASE_SHADOW }} // Separate transition for inner card
      >
        
        <div className="p-6 flex flex-col flex-grow">
          
          <div className="flex-1 mb-4">
            <h3 className={`text-2xl font-medium text-gray-700 flex items-center mb-1`}>
              {GitHubPrefixIcon} 
              {project.owner}/
            </h3>
            <h2 className={`text-4xl font-extrabold font-inter leading-tight mb-2 ${project.color}`}>
              {project.repoName}
            </h2>
            <p className="text-base text-gray-600">{project.description}</p>
          </div>
          
          <div className="mt-auto pt-3 flex justify-end">
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-16 h-16 transition duration-200 rounded-full bg-white/50 hover:scale-110 ring-2 ring-gray-300 hover:ring-gray-500`} 
                aria-label="View Repository on GitHub"
            >
                <img 
                    src="https://img.icons8.com/?size=1200&id=0tREDFkScvsm&format=png" 
                    alt="GitHub Logo Link" 
                    className="w-12 h-12" 
                />
            </a>
          </div>
        </div>

        {/* Badge */}
        {project.id === 1 && (
           <div className="absolute top-4 right-4 z-20">
              <img 
                src="https://github.com/user-attachments/assets/950fea18-882f-4f92-b33b-6a0c02adc140" 
                alt="2025 Hosted Project Badge" 
                className={`w-16 h-auto rounded-md transform hover:scale-110 transition`}
              />
           </div>
        )}
      </div>
    </div>
  );
};


/**
 * Interactive Section for Speaker Recruitment
 */
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

  const BASE_SHADOW_SPEAKER = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';

  return (
    <section
      ref={sectionRef}
      className={`
        relative overflow-hidden
        w-full
        /* The main container in App.jsx sets font-inter, ensuring consistency */
        py-24 px-6 sm:px-12 md:px-24
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        ease-out transform transition-opacity transition-transform duration-1000
      `}
      aria-label="Become a Speaker Section"
    >
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
              text-lg sm:text-xl leading-relaxed text-gray-700
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

        {/* Image Card (with Parallax Effect) */}
        <div
          className="
            relative
            w-full
            max-w-lg
            mx-auto
            md:mx-0
            cursor-pointer
            perspective-800
            shadow-2xl rounded-xl overflow-hidden
          "
          style={{ transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out', boxShadow: BASE_SHADOW_SPEAKER }}
          onMouseMove={e => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 5; // Reduced tilt for subtlety
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            // Dynamic shadow for enhanced 3D lighting effect
            card.style.boxShadow = `
                ${rotateY/2}px ${-rotateX/2}px 40px rgba(0, 0, 0, 0.4),
                0 10px 30px rgba(0, 0, 0, 0.2)
            `; 
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
            // Reset shadow to Tailwind's base shadow
            e.currentTarget.style.boxShadow = BASE_SHADOW_SPEAKER; 
          }}
        >
          <img
            src="https://ikfezffnmwcdmfcvnygk.supabase.co/storage/v1/object/public/banners/BecomeSpeakerBanner.png"
            alt="Become a Speaker Banner"
            className="w-full h-auto object-cover select-none"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
      {/* Keeping animation styles here for continuity, though they are also in CustomStyles */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        .animate-blobFloat {
          animation: blobFloat 15s ease-in-out infinite;
        }

        @keyframes textShimmer {
          0% { background-position: -400%; }
          100% { background-position: 400%; }
        }
        .animate-textShimmer {
          background-size: 400% 100%;
          animation: textShimmer 4s linear infinite;
        }

        .perspective-800 {
          perspective: 800px;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(96, 165, 250, 0.7); } 
          50% { box-shadow: 0 0 14px 4px rgba(96, 165, 250, 1); }
        }
        .animate-pulseGlow {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};


/**
 * Main App Component hosting both sections
 */
const App = () => {
  const featuredProject = PROJECTS[0]; 
  
  return (
    <>
      {/* Injects the custom CSS for the SVG background and animations */}
      <CustomStyles />
      
      {/* Single container for the entire app, applying the code-pattern background and font-inter */}
      <div className="w-full min-h-screen font-inter code-pattern">
        
        {/* Section 1: Featured Project Card - Centering container */}
        <div className="w-full flex flex-col items-center justify-center py-16">
          
          {/* Responsive Container for Card */}
          <div className="relative w-full max-w-7xl px-4 sm:px-8">
            
            {/* STYLIZED HEADER */}
            <h1 className="text-center text-4xl sm:text-5xl font-extrabold mb-10 text-orange-600 tracking-tight select-none">
              O̺͆p̺͆e̺͆n̺͆S̺͆o̺͆u̺͆r̺͆c̺͆e̺͆ F̺͆e̺͆a̺͆t̺͆u̺͆r̺͆i̺͆n̺͆g̺͆ p̺͆r̺͆o̺͆j̺͆e̺͆c̺͆t̺͆s̺͆
            </h1>
            
            {/* Single Card Centering Container */}
            <div className="flex justify-center items-center w-full">
                <div className="w-full sm:w-4/5 lg:w-2/3 p-3"> 
                    <ProjectCard project={featuredProject} />
                </div>
            </div>
          </div>
        </div>

        {/* Section 2: Become a Speaker (Now seamlessly integrated with the pattern) */}
        <BecomeSpeakerSection />
      </div>
    </>
  );
};

export default App;
