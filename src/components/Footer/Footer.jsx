import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  FaLinkedin,
  FaGithub,
  FaTelegramPlane,
} from "react-icons/fa";
import { SiGmail, SiDocker } from "react-icons/si";
import { PiGlobeSimple } from "react-icons/pi";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Memoize static data
  const linkUrls = useMemo(() => ({
    About: "/about",
    FAQs: "/faqs",
    Join: "/join",
    Hackathons: "/hackathons",
    Meetups: "/meetups",
    Linkedin: "https://www.linkedin.com/in/techquanta-community",
    Contact: "/contact", // changed to a valid internal route or leave as "#"
    Discord: "https://discord.gg/your-server",
  }), []);

  const sections = useMemo(() => [
    {
      title: "Organization",
      links: ["About", "FAQs", "Join"],
    },
    {
      title: "Community",
      links: ["Discord"],
    },
    {
      title: "Events",
      links: ["Meetups"],
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
    { icon: <SiGmail />, href: "mailto:contact@techquanta.org", label: "Email" }, // mailto added for Gmail icon
  ], [linkUrls]);

  return (
    <footer
      className={`font-space-grotesk px-6 sm:px-10 md:px-16 pt-6 pb-8 ${isDark ? "bg-transparent text-white" : "bg-gray-100 text-black"
        }`}
    >
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
                        className="underline-slide dark:text-white"
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

        <div className="border-t border-gray-600 pt-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-0">
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

      <div className="mt-6 text-xs text-gray-500 md:text-sm text-center select-none">
        &copy; {new Date().getFullYear()} TechQuanta.{" "}
        <span>Join the Revolution for Making Contribution..</span>
      </div>
    </footer>
  );
};

export default Footer;
