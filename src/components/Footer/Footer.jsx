import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  FaLinkedin,
  FaGithub,
  FaTelegramPlane,
} from "react-icons/fa";
import { SiGmail, SiDocker } from "react-icons/si";
import { PiGlobeSimple } from "react-icons/pi";
import Cubes from '../ui/Cubes';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Cube colors remain dark (as requested)
  const cubeFaceColor = "#1a1a2e"; 
  // Adjusted border color to be light grey in light theme for better definition
  const cubeBorderStyle = isDark ? "2px dashed #ff2781ff" : "2px dashed #a0a0a0"; 
  
  // Footer background is transparent in both themes so cubes are visible
  const footerBgClass = isDark ? "bg-transparent text-white" : "bg-transparent text-black"; 

  // Memoize static data
  const linkUrls = useMemo(() => ({
    About: "/about",
    FAQs: "/",
    Join: "https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header",
    Hackathons: "/hackathons",
    Meetups: "/community-work",
    Events:"/community-work",
    Linkedin: "https://www.linkedin.com/in/techquanta-community",
    Contact: "/about", 
    Discord: "https://discord.com/invite/WK3aftq5vg",
    Research: "https://scholar.google.com/citations?user=Vu7GkHwAAAAJ&hl=en&authuser=4",
  }), []);

  const sections = useMemo(() => [
    {
      title: "Organization",
      links: ["About", "FAQs", "Join"],
    },
    {
      title: "Community",
      links: ["Discord","Research"],
    },
    {
      title: "Events",
      links: ["Meetups","Events"],
    },
    {
      title: "Socials",
      links: ["Linkedin"],
    },
    {
      title: "Contact",
      links: ["Contact"],
    },
  ], []);

  const socialIcons = useMemo(() => [
    { icon: <FaLinkedin />, href: linkUrls.Linkedin, label: "LinkedIn" },
    {
      icon: <PiGlobeSimple />,
      href: "https://scholar.google.com/citations?user=Vu7GkHwAAAAJ&hl=en&authuser=4",
      label: "Google Scholar",
    },
    { icon: <FaGithub />, href: "https://github.com/TechQuanta", label: "GitHub" },
    { icon: <SiDocker />, href: "https://hub.docker.com/u/techquanta", label: "Docker Hub" },
    { icon: <SiGmail />, href: "mailto:contact@techquanta.org", label: "Email" },
  ], [linkUrls]);

  return (
    <footer
      className={`font-space-grotesk px-6 sm:px-10 md:px-16 pt-6 pb-8 relative overflow-hidden ${footerBgClass}`}
    >
      <div 
        style={{ 
          height: '100%', 
          position: 'absolute',
          top: 0,
          // CRITICAL FIX: Pin to right edge and set width to 100% of the parent content area
          width: '100%',        
          left: 'auto',          
          right: '0',            
          transform: 'none',     
          // END CRITICAL FIX
          zIndex: -1, 
        }}
      >
        <Cubes 
          gridSize={3} 
          maxAngle={45}
          radius={4}
          borderStyle={cubeBorderStyle}
          faceColor={cubeFaceColor} 
          rippleColor="#ffffffff"
          rippleSpeed={5}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>

      {/* The content remains on top */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm mb-12 justify-center items-start">
          {sections.map(({ title, links }) => (
            <section key={title} aria-labelledby={`${title.toLowerCase()}-heading`}>
              <h4
                id={`${title.toLowerCase()}-heading`}
                className="font-semibold mb-3 border-b border-blue-400 inline-block dark:text-[#00BFFF]"
              >
                {title}
              </h4>
              <ul>
                {links.map((link) => {
                  const url = linkUrls[link] || "#";
                  // Determine if external (starts with http or https)
                  const isExternal = /^https?:\/\//.test(url);
                  return (
                    <li key={link} className="mb-2">
                      <a
                        href={url}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="underline-slide text-black dark:text-white"
                        aria-label={link}
                      >
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="pt-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-blue-500" aria-hidden="true">&lt;/&gt;</span>
            <span className="text-sm text-black dark:text-white select-none" aria-label="TechQuanta">
              Tech<span className="text-[1rem]">Quanta</span>
            </span>
          </div>

          <nav aria-label="Social media links" className="flex gap-4 text-xl justify-center md:justify-end flex-wrap">
            {socialIcons.map(({ icon, href, label }, idx) =>
              href ? (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 text-black dark:text-white"
                  aria-label={label}
                >
                  {icon}
                </a>
              ) : null
            )}
          </nav>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500 md:text-sm text-right select-none">
        &copy; {new Date().getFullYear()} TechQuanta.{" "}
        <span>Join the Revolution for Making Contribution..</span>
      </div>
    </footer>
  );
};

export default Footer;