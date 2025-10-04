import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Code,
  GitFork,
  Search,
  Laptop,
  Puzzle,
  ArrowUpRight,
} from 'lucide-react';

// Custom hook to detect if an element is in the viewport for scroll animations
const useIntersectionObserver = (elementRef) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasAppeared = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAppeared.current) {
          setIsIntersecting(true);
          observer.disconnect(); // Stop observing after it appears once
          hasAppeared.current = true;
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.2,
      }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      // Clean up observer when component unmounts
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef]);

  return isIntersecting;
};

const domainData = [
  {
    title: 'Open Source',
    description: 'Contributing to, and building on, projects that are openly available to everyone.',
    icon: <Code className="w-12 h-12 text-slate-400" />,
    link: 'https://hub.docker.com/u/techquanta',
  },
  {
    title: 'AI & ML',
    description: 'Exploring the latest advancements in artificial intelligence and machine learning.',
    icon: <Brain className="w-12 h-12 text-purple-400" />,
    link: 'https://www.kaggle.com/tquanta',
  },
  {
    title: 'Research',
    description: 'Deep diving into academic papers and conducting new experiments.',
    icon: <Search className="w-12 h-12 text-red-400" />,
    link: 'https://scholar.google.com/',
  },
  {
    title: 'Git & Version Control',
    description: 'Mastering Git workflows and collaborative development practices.',
    icon: <GitFork className="w-12 h-12 text-green-400" />,
    link: 'https://techquata.github.io/git_vc',
  },
  {
    title: 'SDE & Web App Dev',
    description: 'Building robust software solutions and creating stunning web applications.',
    icon: <Laptop className="w-12 h-12 text-blue-400" />,
    link: 'https://education.github.com/pack',
  },
  {
    title: 'Web & App Dev',
    description: 'Creating stunning and functional web and mobile applications.',
    icon: <Puzzle className="w-12 h-12 text-orange-400" />,
    link: 'https://github.com/TechQuanta',
  },
];

const DomainCard = ({ domain, index }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef);

  return (
    <a
      href={domain.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className={`relative flex flex-col items-center p-8 rounded-3xl transition-all duration-700 ease-out transform
          
          /* BASE: Solid backgrounds and borders for max contrast */
          /* LIGHT THEME: Solid White background with a subtle border */
          bg-white border border-gray-100 
          /* DARK THEME: Solid Dark Gray background with a subtle border */
          dark:bg-transparent dark:border-gray-700
          
          /* HOVER STYLES: Lift, scale, and theme-aware LEFT border (New Change) */
          /* Light theme hover: Black left border (4px), borders become black 1px */
          hover:border-black hover:border-l-4 
          /* Dark theme hover: White left border (4px), borders become white 1px */
          dark:hover:border-white dark:hover:border-l-4

           transition-transform duration-300 group
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`mb-6 p-4 rounded-full shadow-inner transition-colors duration-300
        /* ICON CONTAINER STYLES */
        bg-gray-100 dark:bg-transparent group-hover:bg-gray-200 dark:group-hover:bg-gray-600`}>
        {/* The icons are configured to use a darker color in light mode and lighter in dark mode for contrast */}
        {React.cloneElement(domain.icon, {
             className: domain.icon.props.className
               .replace('text-slate-400', 'text-slate-700 dark:text-slate-400')
               .replace('text-purple-400', 'text-purple-700 dark:text-purple-400')
               .replace('text-red-400', 'text-red-700 dark:text-red-400')
               .replace('text-green-400', 'text-green-700 dark:text-green-400')
               .replace('text-blue-400', 'text-blue-700 dark:text-blue-400')
               .replace('text-orange-400', 'text-orange-700 dark:text-orange-400')
          })}
      </div>
      <h3 className={`text-2xl font-bold mb-2 text-center transition-colors duration-300
        /* TITLE STYLES: Black on solid light, White on solid dark (Max Contrast) */
        text-black dark:text-white`}>
        {domain.title}
      </h3>
      <p className={`text-center text-sm transition-colors duration-300
        /* DESCRIPTION STYLES: Black on solid light, White on solid dark (Max Contrast) */
        text-black dark:text-white`}>
        {domain.description}
      </p>
      <div
        className={`mt-6 text-sm flex items-center font-semibold transition-colors duration-200
          /* LINK STYLES: Black on solid light, White on solid dark (Max Contrast) */
          text-black group-hover:text-black dark:text-white dark:group-hover:text-white
        `}
      >
        <span className="flex items-center">
          Go to Community <ArrowUpRight className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </a>
  );
};

export default function App() {
  return (
    // Root container is transparent, allowing it to float over the surrounding environment.
    <div className="min-h-screen transition-colors duration-500 font-sans p-6 md:p-12
      relative overflow-hidden bg-transparent flex items-center justify-center">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domainData.map((domain, index) => (
            <DomainCard key={index} domain={domain} index={index} />
          ))}
        </div>
        
      </div>
      
    </div>
  );
}
