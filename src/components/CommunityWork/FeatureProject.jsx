import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaRocket } from "react-icons/fa";

const FeaturingProject = () => {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  // Initial loading is false, as nothing is loading until the user clicks the button.
  const [loading, setLoading] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [fetchError, setFetchError] = useState(null); // New state for click-time errors
  const timeoutRef = useRef(null);

  // Function to handle data fetching when the user clicks 'Explore Project'
  const fetchProjects = async () => {
    // 1. If data is already loaded, just show the modal
    if (projects.length > 0) {
      setShowModal(true);
      return;
    }

    // 2. Start loading process
    setLoading(true);
    setFetchError(null);

    try {
      const res = await fetch("https://quantapi.onrender.com/getProject");
      if (!res.ok) throw new Error("Server response failed.");
      const data = await res.json();
      
      const projectArray = Array.isArray(data) ? data : [data];

      // 3. Update state
      setProjects(projectArray);
      setLoading(false);

      // 4. Show modal if data is available
      if (projectArray.length > 0) {
        setShowModal(true);
      } else {
        setFetchError("No featured projects were found in the API response.");
      }

    } catch (err) {
      console.error("Error fetching projects:", err);
      setFetchError("Failed to connect to the project service. Please check the network.");
      setLoading(false);
    }
  };

  // Auto-cycle projects (only runs AFTER data is loaded into 'projects' state)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (projects.length) {
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % projects.length);
      }, 8000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [projects, index]);

  const project = projects[index];
  const isValid = useCallback((val) => val && typeof val === "string" && val.trim().length > 0, []);

  // Process developers
  const developerNames = isValid(project?.project_developer_name)
    ? project.project_developer_name.split(",").map((n) => n.trim())
    : [];
  const developerPics = isValid(project?.project_owner_profile_pic)
    ? project.project_owner_profile_pic.split(",").map((p) => p.trim())
    : [];
  const developerLinkedIn = isValid(project?.project_owner_linkedin_id)
    ? project.project_owner_linkedin_id.split(",").map((l) => l.trim())
    : [];

  const allDevelopers = Array.from({
    length: Math.max(developerNames.length, developerPics.length, developerLinkedIn.length),
  }).map((_, idx) => ({
    name: isValid(developerNames[idx]) ? developerNames[idx] : "Developer",
    profilePic: isValid(developerPics[idx]) ? developerPics[idx] : null,
    // Using raw URL, as fixed in the previous iteration
    linkUrl: isValid(developerLinkedIn[idx])
      ? developerLinkedIn[idx]
      : null,
  }));
  
  // NOTE: The initial return blocks for "loading" and "no projects" are removed
  // as the page should always show the button/loading indicator instead.

  return (
    <>
      <div className="min-h-screen flex items-center justify-center uniform-background-gradient p-6 md:p-8 relative overflow-visible select-none">
        {/* SVG blobs (Background elements remain visible) */}
        <div className="hidden md:block rounded-full bg-gradient-to-tr from-pink-400 to-purple-700 opacity-25 animate-blobFloat mix-blend-multiply filter blur-3xl" style={{ position: 'absolute', top: 50, left: 40, width: 280, height: 280, zIndex: 0 }} />
        <div className="hidden md:block bg-gradient-to-br from-indigo-500 via-blue-600 to-teal-500 rounded-[55%_20%_60%_25%/25%_60%_20%_55%] opacity-30 animate-blobFloat delay-3000 mix-blend-screen filter blur-2xl" style={{ position: 'absolute', bottom: 100, left: 10, width: 320, height: 320, zIndex: 0 }} />
        <svg className="hidden md:block opacity-30 animate-pulseSlow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="url(#grad1)" style={{ position: 'absolute', top: 80, right: 30, width: 280, height: 280, zIndex: 0, mixBlendMode: 'screen', filter: 'blur(14px)' }}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          <polygon points="100,15 190,190 10,190" />
        </svg>
        <svg className="hidden md:block opacity-25 animate-blobFloat delay-1500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="url(#grad2)" style={{ position: 'absolute', bottom: 70, right: 50, width: 350, height: 350, zIndex: 0, mixBlendMode: 'screen', filter: 'blur(22px)' }}>
          <defs>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" />
        </svg>

        {/* Centered Button or Loading Indicator */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {loading ? (
            // Show loading spinner while fetching data after click
            <div className="text-white text-xl font-bold p-6 bg-gray-900/80 rounded-full shadow-2xl animate-pulse flex items-center gap-3 transition-all duration-300">
                <FaRocket className="text-3xl animate-spin-slow text-yellow-400" /> 
                Loading Project Data...
            </div>
          ) : (
            <button
              onClick={fetchProjects} // Calls the function that fetches data and opens modal
              className="
                relative group overflow-hidden
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                text-white font-extrabold tracking-wider
                px-8 py-4 rounded-full shadow-2xl transition-all duration-500
                transform hover:scale-[1.02] hover:translate-y-[-2px]
                focus:outline-none focus:ring-4 focus:ring-purple-400
              "
            >
              {/* Background sparkle/shine effect on hover */}
              <span className="
                absolute inset-0 block bg-gradient-to-r from-transparent via-white/50 to-transparent
                transform -skew-x-12 -translate-x-full
                group-hover:translate-x-full group-hover:duration-1000
              " />

              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                <FaRocket className="text-xl group-hover:animate-bounce-fast" /> 
                𝕰𝖝𝖕𝖑𝖔𝖗𝖊 𝕻𝖗𝖔𝖏𝖊𝖈𝖙
              </span>
            </button>
          )}
          
          {/* Error message display after a failed click attempt */}
          {fetchError && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 p-4 bg-red-600 text-white rounded-lg shadow-xl font-space-grotesk font-semibold text-center mt-20">
                  {fetchError}
                  <button onClick={() => setFetchError(null)} className="ml-4 underline opacity-80 hover:opacity-100">Dismiss</button>
              </div>
          )}
        </div>

        {/* Modal - only renders if showModal is true AND we have projects */}
        {showModal && projects.length > 0 && project && (
          <div className="fixed inset-0 bg-black/70 z-30 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full p-6 md:p-10 relative shadow-2xl">
              {/* Back button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                𝔹𝕒𝕔𝕜
              </button>

              {/* Project Details */}
              <h3 className="text-3xl sm:text-4xl font-exo2 font-extrabold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent tracking-wide select-text transition-all duration-700">
                {project.project_name}
              </h3>
              <p className="font-space-grotesk text-base sm:text-lg leading-relaxed mb-6 md:mb-8 text-gray-800 dark:text-gray-300 select-text flex-grow">
                {project.project_description}
              </p>

              {/* Project tech stack */}
              {Array.isArray(project.project_stack) && (
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 md:mb-8">
                  {project.project_stack.map((tech) => (
                    <span key={tech} className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold hover:scale-110 transform transition-transform duration-300 cursor-default select-none">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Developers */}
              <div className="mt-8 md:mt-10 flex flex-row overflow-x-auto pb-2 gap-2 scrollbar-hide p-2 rounded-[10px] bg-transparent shadow-inner max-w-full md:max-w-xl lg:max-w-[400px] xl:max-w-xl justify-center items-center">
                {allDevelopers.length > 0 ? allDevelopers.map((dev, idx) => (
                  <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-1 relative group" style={{ minWidth: '80px' }}>
                    {dev.profilePic ? (
                      <img src={dev.profilePic} alt={dev.name} className="w-10 h-10 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm">No Pic</div>
                    )}
                    {dev.name && (
                      <div className="relative mt-2">
                        {dev.linkUrl ? (
                          <a 
                            href={dev.linkUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-700 dark:text-gray-300 text-sm font-medium hover:underline hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                          >
                            {dev.name} 
                            {/* Dynamically choose icon based on link content */}
                            {dev.linkUrl.toLowerCase().includes('github.com') ? (
                              <FaGithub className="inline ml-1 text-gray-500 dark:text-gray-200" />
                            ) : (
                              <FaLinkedin className="inline ml-1 text-blue-500" />
                            )}
                          </a>
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{dev.name}</span>
                        )}
                      </div>
                    )}
                  </div>
                )) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm w-full text-center py-4">No contributors listed for this masterpiece.</p>
                )}
              </div>

              {/* GitHub & Live Links */}
              <div className="mt-6 flex gap-4">
                {isValid(project.project_repo_link) && (
                  <a href={project.project_repo_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                    <FaGithub /> View Repository
                  </a>
                )}
                {isValid(project.project_live_link) && (
                  <a href={project.project_live_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    <FaExternalLinkAlt /> Launch Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes blobFloat {0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-15px) rotate(6deg);}}
        .animate-blobFloat {animation:blobFloat 12s ease-in-out infinite;}
        @keyframes pulseSlow {0%,100%{opacity:0.3;}50%{opacity:0.6;}}
        .animate-pulseSlow {animation:pulseSlow 6s ease-in-out infinite;}
        @keyframes fadeIn {from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .animate-fadeIn {animation:fadeIn 0.5s ease forwards;}
        @keyframes bounce-fast {0%, 100% {transform: translateY(0);} 50% {transform: translateY(-4px);}}
        .group-hover:animate-bounce-fast {animation: bounce-fast 0.6s ease-in-out infinite;}
        @keyframes spin-slow {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}
        .animate-spin-slow {animation: spin-slow 1.5s linear infinite;}
        .scrollbar-hide::-webkit-scrollbar {display:none;}
        .scrollbar-hide {-ms-overflow-style:none;scrollbar-width:none;}
      `}</style>
    </>
  );
};

export default FeaturingProject;
