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
    icon: <Code className="w-12 h-12 text-slate-500 dark:text-slate-400" />,
    link: 'https://hub.docker.com/',
  },
  {
    title: 'AI & ML',
    description: 'Exploring the latest advancements in artificial intelligence and machine learning.',
    icon: <Brain className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
    link: 'https://www.kaggle.com/',
  },
  {
    title: 'Research',
    description: 'Deep diving into academic papers and conducting new experiments.',
    icon: <Search className="w-12 h-12 text-red-500 dark:text-red-400" />,
    link: 'https://scholar.google.com/',
  },
  {
    title: 'Git & Version Control',
    description: 'Mastering Git workflows and collaborative development practices.',
    icon: <GitFork className="w-12 h-12 text-green-500 dark:text-green-400" />,
    link: 'https://techquata.github.io/git_vc',
  },
  {
    title: 'SDE & Web App Dev',
    description: 'Building robust software solutions and creating stunning web applications.',
    icon: <Laptop className="w-12 h-12 text-blue-500 dark:text-blue-400" />,
    link: 'https://education.github.com/pack',
  },
  {
    title: 'Web & App Dev',
    description: 'Creating stunning and functional web and mobile applications.',
    icon: <Puzzle className="w-12 h-12 text-orange-500 dark:text-orange-400" />,
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
        bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-2 hover:scale-[1.03] transition-transform duration-300 group
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`mb-6 p-4 rounded-full shadow-inner transition-colors duration-300
        bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600`}>
        {domain.icon}
      </div>
      <h3 className={`text-2xl font-bold mb-2 text-center transition-colors duration-300
        text-gray-900 dark:text-gray-200`}>
        {domain.title}
      </h3>
      <p className={`text-center text-sm transition-colors duration-300
        text-gray-600 dark:text-gray-400`}>
        {domain.description}
      </p>
      <div
        className={`mt-6 text-sm flex items-center font-semibold transition-colors duration-200
          text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200
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
    <div className="min-h-screen transition-colors duration-500 text-gray-900 dark:text-white font-sans p-6 md:p-12
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
