import React from "react";
import {
  Code,
  BookOpen,
  Brain,
  Globe,
  Feather,
  Zap,
  ArrowRight,
} from "lucide-react";
import MagicBento from "../ui/MagicBento";

const domains = [
  {
    icon: Code,
    title: "Web & App Dev",
    description: "Build robust, scalable full-stack apps and modern websites.",
    color: "text-sky-600 dark:text-sky-400", // Theme adaptable color
    ring: "ring-sky-500/50",
  },
  {
    icon: Brain,
    title: "AI / ML & Data",
    description:
      "Develop models, cutting-edge research, and intelligent systems.",
    color: "text-fuchsia-600 dark:text-fuchsia-400",
    ring: "ring-fuchsia-500/50",
  },
  {
    icon: BookOpen,
    title: "Tech Docs",
    description:
      "Writing and editing ensures projects are accessible and clear.",
    color: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/50",
  },
  {
    icon: Globe,
    title: "Community Ops",
    description: "Organize events, manage outreach, and onboard new members.",
    color: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/50",
  },
  {
    icon: Feather,
    title: "Design & UX/UI",
    description:
      "Shape the user experience by creating wireframes and mockups.",
    color: "text-pink-600 dark:text-pink-400",
    ring: "ring-pink-500/50",
  },
  {
    icon: Zap,
    title: "Infra & DevOps",
    description:
      "Manage servers, CI/CD pipelines, and cloud resources smoothly.",
    color: "text-indigo-600 dark:text-indigo-400",
    ring: "ring-indigo-500/50",
  },
];

const DomainsSectionThemeAdaptable = () => {
  return (
    // Section remains transparent
    <section className="py-12 px-4 sm:px-8 lg:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Theme-Adaptable Header */}
        <div className="text-center mb-10">
          {/* H2: Dark text on light mode, White text on dark mode */}
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            Our Open Source Domains
          </h2>
          {/* P: Medium-gray text on light mode, Light-gray text on dark mode */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find where your skills fit in! Core code, documentation, design, and
            more.
          </p>
        </div>

      
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
      />
      </div>
    </section>
  );
};

export default DomainsSectionThemeAdaptable;
