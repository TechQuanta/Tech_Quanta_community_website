import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar";
import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Custom hook to detect dark mode preference
function usePrefersDarkMode() {
  const [isDark, setIsDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
}

function Header() {
  const location = useLocation();
  const isDark = usePrefersDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = useMemo(() => [
    { name: "Community Work", link: "community-work" },
    { name: "LeaderBoard", link: "leaderboard" },
    { name: "About", link: "about" },
  ], []);

  // Helper to generate classes for nav items
  const getNavItemClass = (item) => {
    const baseClass = location.pathname === `/${item.link}`
      ? "text-[#2ECC71]"
      : "text-neutral-300 hover:text-white";

    const fontWeight = ["Community Work", "LeaderBoard"].includes(item.name) ? "font-bold" : "font-normal";

    return `${baseClass} ${fontWeight} font-rajdhani`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full text-white font-rajdhani shadow-blue-900/30">
      <Navbar className="max-w-7xl mx-auto px-4 text-[#2ECC71]">
        {/* Desktop Nav */}
        <NavBody>
          <div

            className="z-20 flex items-center space-x-2 px-2 py-1 text-lg font-semibold"
            aria-label="Homepage"
          >
            <NavbarLogo />
            <span className="text-sm text-black dark:text-white select-none">
              Tech<span className="text-[1rem]">Quanta</span>
            </span>
          </div>

          <NavItems
            items={navItems.map((item) => ({
              ...item,
              isActive: location.pathname === `/${item.link}`,
              className: item.name === "Community Work" || item.name === "LeaderBoard" ? "font-bold" : "",
            }))}
          />

          <div className="flex items-center gap-4">
            <NavbarButton
              variant="primary"
              className="bg-[#00BFFF] hover:bg-[#8E44AD] text-white font-['Exo 2'] px-4 py-1 rounded-full transition-all"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header",
                  "_blank",
                )
              }
            >
              Join
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo>
              <NavLink to="/" className="flex items-center space-x-2" aria-label="Homepage">
                <img
                  src="/lightlogo.png"
                  alt="TechQuanta Light Logo"
                  width={40}
                  height={40}
                  className="inline-block rounded-full dark:block"
                />
                <img
                  src="/darklogo.png"
                  alt="TechQuanta Dark Logo"
                  width={40}
                  height={40}
                  className="inline-block rounded-full dark:hidden"
                />
              </NavLink>
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={getNavItemClass(item) + " block py-3 px-4 text-base rounded transition-colors"}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="mt-6 flex flex-col gap-3 px-4">
              <NavbarButton
                variant="primary"
                className="bg-[#00BFFF] hover:bg-[#8E44AD] text-white font-semibold px-4 py-1 rounded-full transition-all"
                style={{ boxShadow: "0 0 10px #2ECC71" }}
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSddiwCoTtyjxuvKq6nPvgE6FXDjlMAz-35X2w8XFqscTDcYuw/viewform?usp=header",
                    "_blank"
                  )
                }
              >
                Join
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}

export default Header;
