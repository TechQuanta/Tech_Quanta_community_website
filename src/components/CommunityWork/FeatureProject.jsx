// FeaturingProject.jsx
import React, { useEffect, useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';

const FeaturingProject = () => {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  // Removed showAllDevelopers state and related logic as per request for full slider
  const timeoutRef = useRef(null);

  // Function to fetch project data from Google Apps Script
  useEffect(() => {
    fetch(
      'https://script.google.com/macros/s/AKfycbw-wqfKt5i6bZQkEEp2EI_iajddjB2m-_a6vxHLpCeB32ooFQYaJiUaMXVlgEgZgpzK/exec'
    )
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  // Effect for auto-cycling through projects
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (projects.length) {
      timeoutRef.current = setTimeout(() => {
        setIndex(i => (i + 1) % projects.length);
      }, 8000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [projects, index]);

  // Handle initial loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center font-space-grotesk font-semibold animate-pulse text-gray-600 dark:text-gray-400 px-4">
        Loading featured projects...
      </div>
    );
  }

  // Handle no projects found after loading
  if (!projects.length && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center font-space-grotesk font-semibold text-gray-600 dark:text-gray-400 px-4">
        No featured projects available.
      </div>
    );
  }

  const project = projects[index];
  // Helper function to validate string data
  const isValid = val => val && typeof val === 'string' && val.trim().length > 0;

  // Process developer data
  const developerNames = isValid(project.project_developer_name) ? project.project_developer_name.split(',').map(name => name.trim()) : [];
  const developerProfilePics = isValid(project.project_owner_profile_pic) ? project.project_owner_profile_pic.split(',').map(pic => pic.trim()) : [];
  const developerLinkedInIds = isValid(project.project_owner_linkedin_id) ? project.project_owner_linkedin_id.split(',').map(id => id.trim()) : [];

  // Combine and filter developer data to ensure consistency and only include valid entries
  const allDevelopers = Array.from({ length: Math.max(developerNames.length, developerProfilePics.length, developerLinkedInIds.length) }).map((_, idx) => {
    const name = developerNames[idx];
    const profilePic = developerProfilePics[idx];
    const linkedInId = developerLinkedInIds[idx];

    // Only return developer object if at least one piece of info is valid
    if (!isValid(name) && !isValid(profilePic) && !isValid(linkedInId)) {
      return null;
    }
    return {
      name: isValid(name) ? name : 'Developer',
      profilePic: isValid(profilePic) ? profilePic : null,
      LinkedIn: isValid(linkedInId) ? `https://www.linkedin.com/in/${linkedInId}` : null,
    };
  }).filter(Boolean); // Remove any null entries

  // Array for skeleton loaders, showing a few by default if data isn't ready
  const skeletonLoaders = Array.from({ length: 3 });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center uniform-background-gradient p-6 md:p-8 relative overflow-visible select-none">
        {/* LEFT blobs (decorative background elements) */}
        <div
          className="hidden md:block rounded-full bg-gradient-to-tr from-pink-400 to-purple-700 opacity-25 animate-blobFloat mix-blend-multiply filter blur-3xl"
          style={{
            position: 'absolute',
            top: 50,
            left: 40,
            width: 280,
            height: 280,
            zIndex: 0,
          }}
        />
        <div
          className="hidden md:block bg-gradient-to-br from-indigo-500 via-blue-600 to-teal-500 rounded-[55%_20%_60%_25%/25%_60%_20%_55%] opacity-30 animate-blobFloat delay-3000 mix-blend-screen filter blur-2xl"
          style={{
            position: 'absolute',
            bottom: 100,
            left: 10,
            width: 320,
            height: 320,
            zIndex: 0,
          }}
        />

        {/* RIGHT blobs (decorative background elements) */}
        <svg
          className="hidden md:block opacity-30 animate-pulseSlow"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          fill="url(#grad1)"
          style={{
            position: 'absolute',
            top: 80,
            right: 30,
            width: 280,
            height: 280,
            zIndex: 0,
            mixBlendMode: 'screen',
            filter: 'blur(14px)',
          }}
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          <polygon points="100,15 190,190 10,190" />
        </svg>
        <svg
          className="hidden md:block opacity-25 animate-blobFloat delay-1500"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          fill="url(#grad2)"
          style={{
            position: 'absolute',
            bottom: 70,
            right: 50,
            width: 350,
            height: 350,
            zIndex: 0,
            mixBlendMode: 'screen',
            filter: 'blur(22px)',
          }}
        >
          <defs>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" />
        </svg>

        {/* MAIN content container */}
        <div className="relative z-10 flex flex-col md:flex-row max-w-7xl w-full gap-8 md:gap-12 items-start overflow-hidden">
          {/* Project card content */}
          <div
            key={project.project_name}
            className="flex-1 p-6 md:p-12 rounded-xl bg-transparent transition-transform duration-500 ease-in-out hover:scale-[1.02] animate-fadeIn flex flex-col min-h-[480px]"
          >
            <h3 className="text-3xl sm:text-4xl font-exo2 font-extrabold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent tracking-wide select-text transition-all duration-700">
              {project.project_name}
            </h3>

            <p className="font-space-grotesk text-base sm:text-lg leading-relaxed mb-6 md:mb-8 text-gray-800 dark:text-gray-300 select-text flex-grow">
              {project.project_description}
            </p>

            {Array.isArray(project.project_stack) && (
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-8">
                {project.project_stack.map(tech => (
                  <span
                    key={tech}
                    className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold hover:scale-110 transform transition-transform duration-300 cursor-default select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Horizontal Scrollable Tray for Developer Profiles */}
            <div className="mt-8 md:mt-10">
              <div className="flex flex-row overflow-x-auto pb-2 gap-2 scrollbar-hide p-2 rounded-[10px] bg-[#343541] dark:bg-white  shadow-inner max-w-full md:max-w-xl lg:max-w-[400px] xl:max-w-xl justify-center items-center"> {/* Adjusted padding, gap, and added max-width classes */}
                {loading ? (
                  skeletonLoaders.map((_, idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="flex-shrink-0 flex flex-col items-center gap-1 animate-pulse" // Adjusted gap
                      style={{ minWidth: '80px' }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))
                ) : (
                  allDevelopers.length > 0 ? (
                    allDevelopers.map((dev, idx) => (
                      <div
                        key={`developer-${idx}`}
                        className="flex-shrink-0 flex flex-col items-center gap-1 relative group" // Adjusted gap
                        style={{ minWidth: '80px' }}
                      >
                        {/* Profile Picture */}
                        {dev.profilePic ? (
                          <img
                            src={dev.profilePic}
                            alt={`Profile of ${dev.name}`}
                            className="w-10 h-10 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
                            No Pic
                          </div>
                        )}

                        {/* Developer Name as Underlined Link with Tooltip */}
                        {dev.name && (
                          <div className="relative mt-2"> {/* Added relative for tooltip positioning */}
                            {dev.LinkedIn ? (
                              <a
                                href={dev.LinkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`LinkedIn profile of ${dev.name}`}
                                className="text-gray-100 dark:text-gray-800 text-sm font-medium hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                              >
                                {dev.name}
                              </a>
                            ) : (
                              <span className="text-gray-100 dark:text-gray-600 text-sm font-medium">
                                {dev.name}
                              </span>
                            )}
                            {/* Tooltip for Name AND LinkedIn Icon on Hover */}
                            {dev.LinkedIn && ( // Only show tooltip if there's a LinkedIn link
                              <div
                                className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-700/90 dark:bg-white/90 text-gray-100 dark:text-gray-800 text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 whitespace-nowrap z-50 font-semibold flex items-center gap-1"
                                style={{ marginBottom: '8px' }} // Adjusted margin to be above the name
                              >
                                <FaLinkedin size={12} className="flex-shrink-0 text-blue-500 dark:text-blue-300" />
                                <span>LinkedIn</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm w-full text-center py-4">
                      No developers listed for this project.
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Project Promotion Video */}
            {isValid(project.project_promo_link) && (
              <div className="mt-10 md:mt-12 aspect-video rounded-xl overflow-hidden ring-1 ring-white/20 dark:ring-gray-700 transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                <iframe
                  src={project.project_promo_link.replace('watch?v=', 'embed/')}
                  title="Project Promo Video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* LINKS PANEL (GitHub and Live Demo) */}
          <div
            className="flex md:flex-col flex-row gap-4 md:gap-6 sticky md:top-24 top-auto md:min-w-[160px] w-full md:w-auto"
            aria-label="Project links"
          >
            {isValid(project.project_repo_link) && (
              <a
                href={project.project_repo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2 px-4 py-3
                  bg-blue-700 text-white font-semibold
                  rounded-md
                  transition-colors duration-300
                  hover:bg-black
                  hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  flex-1 md:flex-none
                  text-sm sm:text-base
                "
                aria-label="GitHub Repository"
              >
                <FaGithub size={18} />
                Repo
              </a>
            )}
            {isValid(project.project_live_link) && (
              <a
                href={project.project_live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2 px-4 py-3
                  bg-green-700 text-white font-semibold
                  rounded-md
                  transition-colors duration-300
                  hover:bg-white
                  hover:text-green-700
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
                  flex-1 md:flex-none
                  text-sm sm:text-base
                "
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt size={16} />
                Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Existing CSS animations */}
      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(6deg); }
        }
        .animate-blobFloat {
          animation: blobFloat 12s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(8px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        /* Custom scrollbar styles for a cleaner look (optional, can be adjusted) */
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
          scrollbar-width: none; /* For Firefox */
        }
      `}</style>
    </>
  );
};

export default FeaturingProject;