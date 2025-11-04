import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaCodeBranch, FaUserFriends } from 'react-icons/fa';
import DomeGallery from '../ui/DomeGallery';

// Constants for shared layout dimensions
const PROFILE_WIDTH = 320;
const PROFILE_HEIGHT = 420;

// Component for the profile detail view, featuring "Misty Dust" glassmorphism
const ProfileDetailBlock = ({ member, isLoading, theme }) => {
    
    // Determine theme-dependent styling
    const isDark = theme === 'dark';
    const cardBgClass = isDark ? 'bg-gray-900/40 border-indigo-500/50' : 'bg-white/40 border-indigo-400/50';
    const primaryTextColor = isDark ? 'text-white' : 'text-gray-900';
    const secondaryTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const accentColor = isDark ? 'text-teal-400' : 'text-teal-700';
    const loadingBgClass = isDark ? 'bg-black/80' : 'bg-white/90';

    if (!member) {
        // Initial state when no member is selected
        return (
            <div 
                // Removed shadow-xl
                className={`relative flex items-center justify-center p-8 backdrop-blur-lg rounded-2xl transition-all duration-500 
                    ${isDark ? 'bg-gray-900/30 border border-indigo-700/50' : 'bg-white/30 border border-indigo-400/50'}`}
                style={{ width: PROFILE_WIDTH, height: PROFILE_HEIGHT }}
            >
                <div className="flex flex-col items-center">
                    <FaCodeBranch className={`${isDark ? 'text-indigo-400' : 'text-indigo-700'} text-6xl mb-4 opacity-70 animate-pulse-slow`}/>
                    <p className={`text-xl font-semibold text-center ${secondaryTextColor}`}>Click on a team member to load their profile.</p>
                </div>
            </div>
        );
    }
    
    // Appearance class for smooth content transition (Misty Dust effect)
    const appearanceClass = `
        transition-all duration-700 ease-out 
        ${isLoading ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-none'}
    `;

    return (
        <div 
            className="flex items-center justify-center"
            style={{ width: PROFILE_WIDTH, height: PROFILE_HEIGHT }}
        >
            <div 
                // Main detail card container (Glassmorphism)
                className={`relative backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center transition-shadow duration-500 ${cardBgClass}`}
                style={{ width: PROFILE_WIDTH, height: PROFILE_HEIGHT }} 
            >
                {/* Subtle outer glow effect for aesthetic */}
                <div className={`absolute inset-0 border-4 border-indigo-500 rounded-2xl transition-opacity duration-1000 animate-pulse-slow 
                    ${isDark ? 'opacity-20' : 'opacity-10'}`}>
                </div>

                {/* Simulated Loading Overlay */}
                {isLoading && (
                    <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10 opacity-100 transition-opacity duration-300 ${loadingBgClass}`}>
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400"></div>
                        <p className={`mt-4 text-xl font-medium ${accentColor}`}>Decrypting Profile Data...</p>
                    </div>
                )}

                {/* Profile Content */}
                <div className={`flex flex-col items-center w-full ${appearanceClass}`}>
                    <img 
                        src={member.image} 
                        alt={member.name} 
                        // Removed shadow-xl
                        className="w-28 h-28 object-cover rounded-full mb-4 ring-4 ring-teal-500" 
                        loading="lazy" 
                    />
                    <h3 className={`text-3xl font-extrabold ${primaryTextColor}`}>{member.name}</h3>
                    
                    {/* Role added back per user request */}
                    <p className={`text-xl font-medium mb-3 ${accentColor}`}>{member.role}</p>
                    
                    {/* The description is the detailed field intended for the profile view */}
                    <p className={`text-sm text-center mb-6 max-w-xs italic border-t border-indigo-500/30 pt-4 ${secondaryTextColor}`}>{member.description}</p>
                    
                    {/* LinkedIn Connection Button */}
                    {member.linkedin && (
                        <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            // Removed shadow-md
                            className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-gray-900 rounded-full hover:bg-teal-400 transition-colors font-bold"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <FaLinkedin className="text-lg" />
                            <span>Connect</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


const CoreTeam = () => {
    // State to track theme, initialized by checking system preference
    const [theme, setTheme] = useState(() => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    
    // State and Ref for the dynamic vertical line scroll effect
    const [isTributeVisible, setIsTributeVisible] = useState(false);
    const tributeRef = useRef(null);

    
    // Memoize team data since it's static
    // const teamData = useMemo(() => teamdetails, []);

    // Theme-dependent classes
    const isDark = theme === 'dark';
    // mainBgClass removed, as the container background is now transparent
    const primaryTextColor = isDark ? 'text-white' : 'text-gray-900';
    const secondaryTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const lightSecondaryTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
    const accentIconColor = isDark ? 'text-teal-400' : 'text-teal-700';
    const accentPrimaryColor = isDark ? 'text-teal-400' : 'text-teal-600';
    const accentSecondaryColor = isDark ? 'text-indigo-400' : 'text-indigo-700';
    // const cardGlassClass = isDark ? 'bg-gray-900/20' : 'bg-white/50';
    const tributeGlassClass = isDark ? 'bg-gray-900/30' : 'bg-white/60';
    


    useEffect(() => {
        // 1. Theme Listener: Updates component theme if system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (e) => setTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleThemeChange);

        // 2. Intersection Observer: Triggers the vertical line animation when visible
        const observer = new IntersectionObserver(
            (entries) => { // Modified: Removed 'obs' argument and unobserve() call
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Element is visible, set state to true to trigger the h-full transition
                        setIsTributeVisible(true);
                    } else {
                        // Element is NOT visible, set state to false to reset the height to h-0
                        setIsTributeVisible(false);
                    }
                });
            },
            { threshold: 0.1 } // Keep the threshold
        );

        if (tributeRef.current) {
            observer.observe(tributeRef.current);
        }

        // Cleanup function
        return () => {
            if (tributeRef.current) {
                observer.unobserve(tributeRef.current); 
            }
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    // Base card classes for team members grid
    // Hover effects (scale, ring) were removed per user request.
    const CARD_BASE_CLASSES = "p-3 sm:p-4 backdrop-blur-md rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden";

    return (
        // Main container with transparent background
        <div className={`py-20  bg-transparent ${primaryTextColor} min-h-screen transition-colors duration-500`}>
            {/* CSS for the subtle background pulse effect */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 5s infinite;
                }
            `}</style>

            <div className="max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* COLUMN 1: TRIBUTE / INTRODUCTION BLOCK - SHADOW REMOVED */}
                    <div 
                        ref={tributeRef} 
                        className={`lg:col-span-1 p-8 flex flex-col justify-start backdrop-blur-xl rounded-xl relative overflow-hidden ${tributeGlassClass}`} 
                    >
                        
                        {/* ANIMATED VERTICAL LINE ELEMENT */}
                        {/* This line will now reset (h-0) when scrolling out and run again (h-full) when scrolling in */}
                        <div className={`absolute left-0 top-0 w-1 bg-teal-500  transition-all duration-[3000ms] ease-out 
                            ${isTributeVisible ? 'h-full' : 'h-0'}`}>
                        </div>

                        <div className="pl-6 space-y-4"> 
                            
                            {/* Title Block */}
                            <div className={`flex flex-col space-y-2 pb-2 border-b border-indigo-500/30 ${isDark ? '' : 'border-indigo-700/30'}`}>
                                <div className={`flex items-center space-x-3 ${accentIconColor}`}> 
                                    <FaUserFriends className="text-4xl"/>
                                    <h3 className={`text-3xl font-bold ${primaryTextColor}`}>
                                        A Tribute to Dedication
                                    </h3>
                                </div>
                            </div>

                            {/* Text Content */}
                            <p className={`leading-relaxed text-lg pt-4 ${secondaryTextColor}`}> 
                                The TechQuanta community thrives on the <strong>unwavering dedication</strong> of our core team. 
                                These individuals are the <strong>architects, mentors, and innovators</strong> who volunteer their time 
                                and expertise to foster a supportive and productive open-source environment.
                            </p>
                            <p className={`leading-relaxed text-md ${lightSecondaryTextColor}`}>
                                Every feature, every piece of documentation, and every encouraging word is a testament 
                                to their commitment. They embody the spirit of collaboration that defines us. 
                                <strong>Click on a profile</strong> on the right to learn more about the contributors shaping our future!
                            </p>
                            
                            {/* Button */}
                            <div className="pt-6">
                                <button 
                                    // Removed shadow-lg and hover:shadow-xl
                                    className="px-3 py-2 bg-teal-500 text-gray-900 font-extrabold rounded-[20px] hover:bg-teal-400 transition-all transform hover:translate-y-[-2px]">
                                    Join our Mission !
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2 & 3: PROFILES & INTERACTION AREA */}
                    <div className="lg:col-span-2 flex flex-col xl:flex-row">
                        
                        
                        {/* 2. Detail Block (Large Profile)
                        <div className="flex items-center justify-center w-full xl:w-2/5 order-2">
                            <ProfileDetailBlock member={hoveredMember} isLoading={isLoading} theme={theme} />
                        </div> */}
                        <div style={{ width: '100%', height: '100vh' }}>

      <DomeGallery />

    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreTeam;
