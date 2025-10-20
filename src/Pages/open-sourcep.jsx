import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =================================================================
// 1. CONSTANTS & UTILITIES
// (Move base/icon data outside of components to prevent re-creation on render)
// =================================================================

const BASE_GITHUB_OWNER = 'TechQuanta';

/**
 * Optimized SVG Icon Components (moved outside of functions)
 */
const PullIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M18 11v5"/><path d="m15 14-3 3-3-3"/></svg>
);
const ForkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .66-.3 1-1 1H7c-.7 0-1-.34-1-1V9"/><path d="m14 15-2 2-2-2"/></svg>
);
const StarIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const AlertCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const CodeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
// Removed ChevronLeft/Right since with one mock project they are unused.

const mockProjectDefinition = { 
    repoOwner: BASE_GITHUB_OWNER, 
    repoName: 'github-avatar-frame-api', 
    description: 'A dedicated microservice for generating custom, framed GitHub profile avatars using modern image processing libraries.', 
    forks: 30, pulls: 20, stars: 10, openIssues: 15, 
    language: 'TypeScript', 
};

/**
 * Fetches the full list of contributors. Optimized to be a simple, single-use function.
 */
const fetchBaseContributorData = async () => {
    const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${BASE_GITHUB_OWNER}/github-avatar-frame-api/main/.all-contributorsrc`;
    try {
        const response = await fetch(GITHUB_RAW_URL);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return [];
        }
        const json = await response.json();
        if (json && Array.isArray(json.contributors)) {
            return json.contributors.map(c => ({
                login: c.login,
                name: c.name || c.login,
                avatar: c.avatar_url || `https://github.com/${c.login}.png`, 
                profileLink: `https://github.com/${c.login}`
            }));
        }
    } catch (error) {
        console.error("Failed to fetch base contributor data:", error.message);
    }
    return [];
};

// =================================================================
// 2. CHILD COMPONENTS
// =================================================================

// ContributorProfile is a small, presentation component. Using a React.memo
// is beneficial here to prevent re-rendering when the parent re-renders 
// but the 'contributor' prop is shallowly equal.
const ContributorProfile = React.memo(({ contributor }) => (
    <a 
        href={contributor.profileLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block group bg-white/70 backdrop-blur-sm p-4 rounded-3xl hover:shadow-xl transition duration-300 transform hover:scale-[1.03] border-4 border-transparent hover:border-indigo-500 dark:bg-gray-900/70 dark:hover:border-indigo-400 overflow-hidden"
    >
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-3 relative overflow-hidden rounded-[2rem] shadow-inner border-4 border-white dark:border-gray-900">
                <img 
                    src={contributor.avatar} 
                    alt={contributor.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/2563EB/ffffff?text=${contributor.name[0]}`; }}
                />
            </div>
            <h3 className="text-md font-bold text-gray-900 dark:text-white truncate w-full text-center">{contributor.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">@{contributor.login}</p>
        </div>
    </a>
));

// ContinuousScrollProfiles should be optimized to use a stable list 
// and pure CSS animation, which you've already done well.
const ContinuousScrollProfiles = ({ contributors, projectKey }) => {
    
    // Only calculate doubled list if contributors change.
    const doubledContributors = useMemo(() => {
        if (contributors.length === 0) return [];
        return [...contributors, ...contributors]; 
    }, [contributors]);

    if (contributors.length === 0) return null;

    const itemsPerRow = 3;
    const rows = [];
    for (let i = 0; i < doubledContributors.length; i += itemsPerRow) {
        rows.push(doubledContributors.slice(i, i + itemsPerRow));
    }

    const originalRowsCount = Math.ceil(contributors.length / itemsPerRow);
    // 4.5 seconds per original row is a good, slow speed.
    const animationDuration = originalRowsCount * 4.5; 

    return (
        // Key forces remount/animation restart only if project (i.e., data) changes
        <div key={projectKey} className="h-full absolute inset-0"> 
            {/* The style block is the correct way to inject dynamic CSS animation */}
            <style jsx="true">{`
                @keyframes continuous-scroll {
                    0% { transform: translateY(0%); }
                    100% { transform: translateY(-50%); } 
                }
                .auto-scroll-list {
                    display: flex;
                    flex-direction: column;
                    animation: continuous-scroll ${animationDuration}s linear infinite; 
                }
            `}</style>
            
            <div className="auto-scroll-list">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-3 gap-x-8 mb-8">
                        {row.map((c, colIndex) => (
                            <div key={`${c.login}-${rowIndex}-${colIndex}`} className="col-span-1">
                                <ContributorProfile contributor={c} />
                            </div>
                        ))}
                        {/* Spacers for incomplete final row in the original list */}
                        {rowIndex < originalRowsCount && Array(itemsPerRow - row.length).fill(0).map((_, i) => (
                            <div key={`spacer-${rowIndex}-${i}`} className="col-span-1"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfileGrid = ({ project, loading }) => {
    if (loading) {
        return (
            <div className="p-8 h-full flex items-center justify-center text-gray-900 dark:text-white/70">
                <div className="flex items-center space-x-3">
                    <svg className="animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Fetching contributors...</span>
                </div>
            </div>
        );
    }
    
    if (project.contributors.length === 0) {
        return (
            <div className="p-8 h-full flex items-center justify-center">
                <div className="text-center text-gray-700 dark:text-gray-400">
                    <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-500"/>
                    <p className="font-semibold text-lg">No Contributor Data Found</p>
                    <p className="text-sm">The `.all-contributorsrc` file was not found.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-grow relative overflow-hidden p-6 md:p-8"> 
                <ContinuousScrollProfiles 
                    contributors={project.contributors} 
                    projectKey={project.repoName} // Key resets scroll animation on data change
                />
            </div>
        </div>
    );
};

// RepoCard is kept largely the same, but simplified navigation.
const RepoCard = ({ project }) => {
    const repoLink = `https://github.com/${project.repoOwner}/${project.repoName}`;

    return (
        <div className="flex flex-col max-w-lg w-full scale-[0.95]
            bg-white shadow-2xl dark:shadow-indigo-500/20
            dark:bg-gray-800 
            rounded-2xl overflow-hidden transition-colors duration-300 relative">
            
            <div className="flex items-center justify-between 
                bg-gray-100/80 dark:bg-gray-700/80 border-b border-gray-300 dark:border-gray-700 
                p-3 backdrop-blur-sm">
                
                <div className="flex items-center space-x-4">
                    {/* Mac Dots */}
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                </div>
                
                <div className="flex-grow min-w-0 text-right">
                    <div className="text-xs 
                        text-gray-600 dark:text-gray-400 
                        font-mono truncate">
                        {project.repoOwner}/<span className="font-bold text-indigo-500">{project.repoName}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6 font-mono 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white">
                
                <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight break-words">
                    <a href={repoLink} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 dark:hover:text-indigo-300 transition">
                        {project.repoName}
                    </a>
                </h1>
                
                <p className="text-base text-gray-700 dark:text-gray-300 pt-4">
                    {project.description}
                </p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm pt-4">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                        <PullIcon className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{project.pulls}+ Pulls</span>
                    </div>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <ForkIcon className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{project.forks}+ Forks</span>
                    </div>
                    <div className="flex items-center text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{project.openIssues}+ Issues</span>
                    </div>
                    <div className="flex items-center text-orange-600 dark:text-orange-400">
                        <StarIcon className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{project.stars}+ Stars</span>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end items-center 
                bg-gray-100/80 dark:bg-gray-700/80 
                p-1 text-xs backdrop-blur-sm"> 
                
                <a 
                    href={repoLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-1 
                        text-gray-600 dark:text-gray-400 
                        hover:text-indigo-600 dark:hover:text-indigo-400 
                        transition px-2 py-1 rounded-lg 
                        hover:bg-gray-400/50 dark:hover:bg-gray-700/50"
                >
                    <CodeIcon className="w-4 h-4" /> 
                    <span>Explore Repo...</span>
                </a>
            </div>
        </div>
    );
};


// =================================================================
// 3. MAIN APP COMPONENT
// (Simplified State Management)
// =================================================================

const App = () => {
    // Only one state for the current project, including its contributors
    const [currentProject, setCurrentProject] = useState({
        ...mockProjectDefinition,
        contributors: [],
    });
    
    const [loading, setLoading] = useState(true);
    
    // Initial Data Load Effect (Runs ONCE)
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            // Fetch contributor data
            const data = await fetchBaseContributorData();
            
            // Update the single project state with the fetched data
            setCurrentProject(prevProject => ({
                ...prevProject,
                contributors: data,
            }));
            
            // Introduce a slight delay for a smoother dashboard initial load feeling
            setTimeout(() => {
                setLoading(false);
            }, 500); 
        };
        loadInitialData();
    }, []); // Empty dependency array means this runs only on mount
    
    // Initial loading screen while fetching base data
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="flex items-center space-x-3 text-indigo-600 dark:text-indigo-400">
                    <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xl font-semibold">Initializing Dashboard...</span>
                </div>
            </div>
        );
    }

    // Main dashboard view
    return (
        <div className={`min-h-screen font-sans relative bg-transparent transition-colors duration-500`}>
            
            {/* --- Custom CSS for Animated Rainbow Blobs --- (Kept as is for visual effect) */}
            <style jsx="true">{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes slow-wander {
                    0% { transform: translate(0vw, 0vh) scale(1); }
                    33% { transform: translate(30vw, 20vh) scale(1.1); }
                    66% { transform: translate(-20vw, 50vh) scale(0.9); }
                    100% { transform: translate(0vw, 0vh) scale(1); }
                }
                .rainbow-blob {
                    position: absolute;
                    width: 300px; 
                    height: 300px; 
                    background: linear-gradient(135deg, #FF33A1, #33FFF6, #FFE033, #7E1E97);
                    background-size: 400% 400%;
                    border-radius: 50%;
                    opacity: 1.0; 
                    filter: blur(180px); 
                    z-index: -1;
                }
                .blob-top-left {
                    top: -100px;
                    left: -100px;
                    animation: gradient-shift 12s ease infinite alternate, slow-wander 25s ease-in-out infinite alternate;
                }
                .blob-bottom-right {
                    bottom: -150px;
                    right: -150px;
                    width: 350px;
                    height: 350px;
                    animation: gradient-shift 15s ease infinite reverse, slow-wander 30s ease-in-out infinite reverse;
                }
                .blob-center {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.7);
                    animation: gradient-shift 18s linear infinite, slow-wander 35s ease-in-out infinite;
                    width: 400px;
                    height: 400px;
                    opacity: 1.0; 
                    filter: blur(200px); 
                }
            `}</style>
            
            {/* --- Animated Background Blobs --- */}
            <div className="rainbow-blob blob-bottom-right"></div>
            <div className="rainbow-blob blob-center"></div>
            
            <div className="relative w-full h-screen flex flex-col md:flex-row pt-12 md:pt-0">
                
                {/* LEFT PANEL (Repo Card) */}
                <div className="flex flex-col items-center justify-center 
                    w-full h-full p-6 md:p-12 z-10 md:w-1/2 pt-20 md:pt-0">
                    
                    <RepoCard project={currentProject} />
                </div>
                
                {/* RIGHT PANEL (Profile Grid) */}
                <div className="absolute inset-0 w-full h-full bg-transparent z-0 
                    md:relative md:w-1/2 md:h-full p-6">
                    <ProfileGrid 
                        project={currentProject} 
                        loading={false} // Load state is handled by the main App component now
                    />
                </div>
            </div>
        </div>
    );
};

export default App;