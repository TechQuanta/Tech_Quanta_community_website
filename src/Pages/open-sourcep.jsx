import React, { useState, useEffect, useMemo, useCallback } from 'react';


// --- Contributor Data Fetching & Parsing ---


const BASE_GITHUB_OWNER = 'TechQuanta';


/**

 * Fetches the full list of contributors from one static URL to use as base data

 * for all simulations.

 */

const fetchBaseContributorData = async () => {

    // We use a single, reliable URL for the initial data fetch

    const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${BASE_GITHUB_OWNER}/github-avatar-frame-api/main/.all-contributorsrc`;

    const maxRetries = 3;

    let lastError = null;


    for (let i = 0; i < maxRetries; i++) {

        try {

            const response = await fetch(GITHUB_RAW_URL);


            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);

            }


            const json = await response.json();


            if (json && Array.isArray(json.contributors)) {

                return json.contributors.map(c => ({

                    login: c.login,

                    name: c.name || c.login,

                    avatar: c.avatar_url || `https://github.com/${c.login}.png`, 

                    contributions: c.contributions || [],

                    profileLink: `https://github.com/${c.login}`

                }));

            }

            

            throw new Error("Invalid contributor data structure in response.");


        } catch (error) {

            lastError = error;

            console.error(`Attempt ${i + 1} failed during initial fetch:`, error.message);

            if (i < maxRetries - 1) {

                const delay = Math.pow(2, i) * 1000;

                await new Promise(resolve => setTimeout(resolve, delay));

            }

        }

    }


    console.error("Failed to fetch base contributor data after all retries.", lastError);

    return [];

};


// --- Icon Components ---


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


const ChevronLeft = (props) => (

    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>

);

const ChevronRight = (props) => (

    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>

);


// --- Component: Repo Card (Left Panel) with Integrated Navigation ---


const RepoCard = ({ project, onPrev, onNext, current, total }) => {

    const repoLink = `https://github.com/${project.repoOwner}/${project.repoName}`;


    return (

        <div className="flex flex-col max-w-lg w-full scale-[0.95]

            bg-white shadow-2xl dark:shadow-indigo-500/20

            dark:bg-gray-800 

            rounded-2xl overflow-hidden transition-colors duration-300 relative">

            


            {/* Code Editor Header Bar with Integrated Navigation */}

            <div className="flex items-center justify-between 

                bg-gray-100/80 dark:bg-gray-700/80 border-b border-gray-300 dark:border-gray-700 

                p-3 backdrop-blur-sm">

                

                {/* Left Side: Mac Dots and Navigation */}

                <div className="flex items-center space-x-4">

                    {/* Mac Dots */}

                    <div className="flex space-x-2">

                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>

                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>

                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>

                    </div>

                    

                    {/* Navigation Controls */}

                    <div className="flex items-center space-x-2">

                        <button 

                            onClick={onPrev}

                            className="p-1 rounded-md 

                                       text-gray-600 dark:text-gray-400 

                                       hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition"

                            title="Previous Project"

                        >

                            <ChevronLeft className="w-4 h-4" />

                        </button>

                        

                        {/* Index Indicator */}

                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">

                            {current + 1} / {total}

                        </span>


                        <button 

                            onClick={onNext}

                            className="p-1 rounded-md 

                                       text-gray-600 dark:text-gray-400 

                                       hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition"

                            title="Next Project"

                        >

                            <ChevronRight className="w-4 h-4" />

                        </button>

                    </div>

                </div>


                

                {/* Right Side: Repo Title */}

                <div className="flex-grow min-w-0 text-right">

                    <div className="text-xs 

                        text-gray-600 dark:text-gray-400 

                        font-mono truncate">

                        {project.repoOwner}/<span className="font-bold text-indigo-500">{project.repoName}</span>

                    </div>

                </div>

            </div>


            {/* Content Area */}

            <div className="p-6 space-y-6 font-mono 

                bg-white dark:bg-gray-800 

                text-gray-900 dark:text-white">

                

                {/* Main Heading: text-3xl */}

                <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight break-words">

                    <a href={repoLink} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 dark:hover:text-indigo-300 transition">

                        {project.repoName}

                    </a>

                </h1>

                

                {/* Description: text-base */}

                <p className="text-base text-gray-700 dark:text-gray-300 pt-4">

                    {project.description}

                </p>

                

                {/* Metrics */}

                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm pt-4">

                    <div className="flex items-center text-green-600 dark:text-green-400">

                        <PullIcon className="w-5 h-5 mr-2" />

                        <span className="font-semibold">{project.pulls} Pulls</span>

                    </div>

                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">

                        <ForkIcon className="w-5 h-5 mr-2" />

                        <span className="font-semibold">{project.forks} Forks</span>

                    </div>

                    {/* Issues Metric */}

                    <div className="flex items-center text-red-600 dark:text-red-400">

                        <AlertCircle className="w-5 h-5 mr-2" />

                        <span className="font-semibold">{project.openIssues} Issues</span>

                    </div>

                    {/* Stars Metric */}

                    <div className="flex items-center text-orange-600 dark:text-orange-400">

                        <StarIcon className="w-5 h-5 mr-2" />

                        <span className="font-semibold">{project.stars} Stars</span>

                    </div>

                </div>

            </div>

            

            {/* Footer Status Bar */}

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


// --- Component: Profile Card ---


const ContributorProfile = ({ contributor }) => (

    <a 

        href={contributor.profileLink} 

        target="_blank" 

        rel="noopener noreferrer" 

        className="block group bg-white/70 backdrop-blur-sm p-4 rounded-3xl hover:shadow-xl transition duration-300 transform hover:scale-[1.03] border-4 border-transparent hover:border-indigo-500 dark:bg-gray-900/70 dark:hover:border-indigo-400 overflow-hidden"

    >

        <div className="flex flex-col items-center">

            {/* Curved Square Shape */}

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

);



// --- Component: Continuous Scrolling List (Seamless Loop Logic) ---


const ContinuousScrollProfiles = ({ contributors, projectKey }) => {

    

    // Double the list to create the seamless loop (A + A)

    const doubledContributors = useMemo(() => {

        if (contributors.length === 0) return [];

        return [...contributors, ...contributors]; 

    }, [contributors]);


    if (contributors.length === 0) return null;


    const itemsPerRow = 3;

    const rows = [];

    // Populate the doubled list into rows for display

    for (let i = 0; i < doubledContributors.length; i += itemsPerRow) {

        rows.push(doubledContributors.slice(i, i + itemsPerRow));

    }


    // Calculate the animation speed based on the size of the original content

    const originalRowsCount = Math.ceil(contributors.length / itemsPerRow);

    // Use a factor of 4.5 seconds per original row for a professional, slow speed

    const animationDuration = originalRowsCount * 4.5; 


    return (

        // The key prop forces a remount and restart of the animation when contributors change

        <div key={projectKey}> 

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

            

            <div className="h-full absolute inset-0 auto-scroll-list">

                {rows.map((row, rowIndex) => (

                    <div key={rowIndex} className="grid grid-cols-3 gap-x-8 mb-8">

                        {row.map((c, colIndex) => (

                            <div key={`${c.login}-${rowIndex}-${colIndex}`} className="col-span-1">

                                <ContributorProfile contributor={c} />

                            </div>

                        ))}

                        {Array(itemsPerRow - row.length).fill(0).map((_, i) => (

                            <div key={`spacer-${rowIndex}-${i}`} className="col-span-1"></div>

                        ))}

                    </div>

                ))}

            </div>

        </div>

    );

};



// --- Component: Profile Grid (Right Panel) ---


const ProfileGrid = ({ project, loadingRightPanel }) => {

    // Determine which message to show based on state

    const showLoading = loadingRightPanel;

    const noContributors = !loadingRightPanel && project.contributors.length === 0;


    if (showLoading) {

        return (

            <div className="p-4 md:p-8 h-full flex items-center justify-center 

                text-gray-900 dark:text-white/70">

                <div className="flex items-center space-x-3">

                    <svg className="animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

                    </svg>

                    <span>Fetching contributors for **{project.repoName}**...</span>

                </div>

            </div>

        );

    }

    

    if (noContributors) {

        return (

            <div className="p-4 md:p-8 h-full flex items-center justify-center">

                <div className="text-center text-gray-700 dark:text-gray-400">

                    <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-500"/>

                    <p className="font-semibold text-lg">No Contributor Data Found</p>

                    <p className="text-sm">The `.all-contributorsrc` file was not found in the **{project.repoName}** repository.</p>

                </div>

            </div>

        )

    }



    return (

        <div className="h-full flex flex-col overflow-hidden">

            <div className="flex-grow relative overflow-hidden p-6 md:p-8"> 

                <ContinuousScrollProfiles 

                    contributors={project.contributors} 

                    projectKey={project.repoName} // Key resets scroll animation on project change

                />

            </div>

        </div>

    );

};



// --- Main App Component ---


const App = () => {

    const [projects, setProjects] = useState([]); 

    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const [baseContributorList, setBaseContributorList] = useState([]);

    

    const [loadingInitial, setLoadingInitial] = useState(true);

    const [loadingRightPanel, setLoadingRightPanel] = useState(false);

    

    const [isDarkTheme, setIsDarkTheme] = useState(

        () => localStorage.getItem('theme') === 'dark' || false

    );


    // Mock project structure

    const mockProjectDefinitions = useMemo(() => [

        { 

            repoOwner: BASE_GITHUB_OWNER, 

            repoName: 'github-avatar-frame-api', 

            description: 'A dedicated microservice for generating custom, framed GitHub profile avatars using modern image processing libraries.', 

            forks: 42, pulls: 18, stars: 256, openIssues: 7, 

            language: 'TypeScript', 

        },

    ], []);



    // 1. Theme Effect

    useEffect(() => {

        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');

        if (isDarkTheme) {

            document.documentElement.classList.add('dark');

        } else {

            document.documentElement.classList.remove('dark');

        }

    }, [isDarkTheme]);


    // Handler to toggle the theme

    const toggleTheme = () => setIsDarkTheme(prev => !prev);



    // 2. Initial Data Load Effect (Runs ONCE)

    useEffect(() => {

        const loadInitialData = async () => {

            setLoadingInitial(true);

            const data = await fetchBaseContributorData();

            setBaseContributorList(data);


            // Initialize projects with full details but empty contributors array

            const initializedProjects = mockProjectDefinitions.map(p => ({

                ...p,

                contributors: [], 

            }));

            setProjects(initializedProjects);

            setLoadingInitial(false);

        };

        loadInitialData();

    }, [mockProjectDefinitions]);



    // 3. Project Change Effect (Simulates the PER-PROJECT FETCH/REFRESH)

    useEffect(() => {

        // Only run if we have initialized projects and fetched the base list

        if (projects.length > 0 && baseContributorList.length > 0) {

            setLoadingRightPanel(true);

            

            let delayTimeout;

            

            // Simulate dynamic fetching delay (e.g., 500ms)

            delayTimeout = setTimeout(() => {

                setProjects(prevProjects => {

                    const updatedProjects = [...prevProjects];

                    const projectIndex = currentProjectIndex;

                    const selectedProject = updatedProjects[projectIndex];

                    

                    let uniqueList = [];

                    

                    // --- SIMULATION LOGIC: Ensuring distinct lists ---

                    if (selectedProject.repoName === 'github-avatar-frame-api') {

                        // Project 1: Successful fetch, full list

                        uniqueList = baseContributorList;

                    } else {

                        // Project 2 & 3: Explicitly empty array (no contributors file found)

                        uniqueList = []; 

                    }


                    // Update ONLY the selected project with its new contributor list

                    updatedProjects[projectIndex] = {

                        ...selectedProject,

                        contributors: uniqueList,

                    };

                    return updatedProjects;

                });

                

                setLoadingRightPanel(false);

            }, 500); // 500ms simulation delay


            return () => clearTimeout(delayTimeout); // Cleanup for fast clicking

        }

    }, [currentProjectIndex, baseContributorList, projects.length]);


    // Get the currently selected project

    const currentProject = projects[currentProjectIndex] || mockProjectDefinitions[0];


    // Carousel Navigation Handlers

    const handlePrev = () => {

        if (projects.length === 0) return;

        setCurrentProjectIndex(prevIndex => 

            (prevIndex - 1 + projects.length) % projects.length

        );

    };


    const handleNext = () => {

        if (projects.length === 0) return;

        setCurrentProjectIndex(prevIndex => 

            (prevIndex + 1) % projects.length

        );

    };

    

    // Initial loading screen while fetching base data

    if (loadingInitial) {

         return (

             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

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


    return (

        <div className={`min-h-screen mt-[60px] font-sans relative overflow-hidden 

            bg-gray-100 dark:bg-gray-900 transition-colors duration-500 

            ${isDarkTheme ? 'dark' : ''}`}>

            

            {/* --- Custom CSS for Animated Rainbow Blobs (High Opacity) --- */}

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

                    /* Updated colors for more distinction */

                    background: linear-gradient(135deg, #FF33A1, #33FFF6, #FFE033, #7E1E97);

                    background-size: 400% 400%;

                    border-radius: 50%;

                    opacity: 1.0; /* Increased opacity to 1.0 */

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

                    opacity: 1.0; /* Increased opacity to 1.0 */

                    filter: blur(200px); 

                }

            `}</style>

            

            {/* --- Animated Background Blobs --- */}

            <div className="rainbow-blob blob-top-left"></div>

            <div className="rainbow-blob blob-bottom-right"></div>

            <div className="rainbow-blob blob-center"></div>

            {/* --- Main Dashboard Container (Flex on desktop, Stacking on mobile) --- */}

            <div className="relative w-full h-screen flex flex-col md:flex-row pt-12 md:pt-0">

                

                {/* LEFT PANEL (Repo Card) - Vertically centered and spaced out */}

                <div className="flex flex-col items-center justify-center 

                    w-full h-full p-6 md:p-12 z-10 md:w-1/2 pt-20 md:pt-0">

                    

                    {/* Repo Card with Integrated Navigation */}

                    <RepoCard 

                        project={currentProject} 

                        onPrev={handlePrev} 

                        onNext={handleNext}

                        current={currentProjectIndex}

                        total={projects.length}

                    />


                </div>

                

                {/* RIGHT PANEL (Profile Grid) */}

                <div className="absolute inset-0 w-full h-full bg-transparent z-0 

                    md:relative md:w-1/2 md:h-full p-6">

                    <ProfileGrid 

                        project={currentProject} 

                        loadingRightPanel={loadingRightPanel} 

                    />

                </div>

            </div>

        </div>

    );

};


export default App;