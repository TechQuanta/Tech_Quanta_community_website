import React, { useState, useCallback } from "react";

// 1. Utility function (replaces import from "../../lib/utils")
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// 2. HeroHighlight Component (Fixed for dynamic height and compilation)
export const HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  // Use standard useState instead of framer-motion's useMotionValue
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // SVG patterns for different states and themes
  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }) => {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    // Update state directly, replacing mouseX.set and mouseY.set
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  }, []);

  // Calculate mask style dynamically (replaces useMotionTemplate)
  const maskStyle = `radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <div
      className={cn(
        // CRITICAL FIX: Removed fixed height h-[40rem] and centering (items-center, justify-center)
        // Added flex-grow and padding to ensure it uses available space and looks good.
        "group relative flex flex-grow w-full bg-white dark:bg-[#121212] overflow-hidden min-h-96",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Default Dot Pattern (Light) */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden opacity-20"
        style={{
          backgroundImage: dotPatterns.light.default,
        }}
      />
      {/* Default Dot Pattern (Dark) */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block opacity-20"
        style={{
          backgroundImage: dotPatterns.dark.default,
        }}
      />

      {/* Motion Effect (Light - now a regular div) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.hover,
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
        }}
      />
      {/* Motion Effect (Dark - now a regular div) */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
        }}
      />

      {/* Content */}
      <div className={cn("relative z-20 w-full p-8", className)}>
        {children}
      </div>
    </div>
  );
};

// 3. Highlight Component (Fixed for compilation)
export const Highlight = ({
  children,
  className
}) => {
  return (
    <span // Replaced motion.span with regular span
      // Removed initial, animate, and transition props as they rely on framer-motion
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "100% 100%", // Static highlight
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500 opacity-80`,
        className
      )}>
      {children}
    </span>
  );
};
