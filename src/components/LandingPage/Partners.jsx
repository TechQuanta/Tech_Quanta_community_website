// components/LandingPage/TestimonialsSection.jsx
import React from "react";
import { HeroHighlight } from "../ui/hero-highlight";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Balram from "../../assets/profiles/dhakadbalram.png";
import Ashmeet from "../../assets/profiles/singashmeet.webp";
import Himanshu from "../../assets/profiles/sahuhimanshu.webp";
import Kishan from "../../assets/profiles/rathorekishan.jpg";
import Jayesh from "../../assets/profiles/tapadiyajayesh.webp";

const testimonials = [
    {
    quote:
      "As a Co-Founder, what stood out most was the intuitive design. It enabled our team to hit the ground running with minimal friction.",
    name: "Jayesh Tapadiya",
    designation: "Founder",
    src: Jayesh,
  },
    {
    quote:
      "From idea to execution, this product supported us at every stage. It's rare to find something so founder-friendly yet scalable.",
    name: "Himanshu Sahu",
    designation: "CEO",
    src: Himanshu,
  },
  {
    quote:
      "As a CEO, I constantly seek efficiency and innovation. This platform delivered both—elevating our operations to new heights.",
    name: "Balram Dhakad",
    designation: "CEO",
    src: Balram,
  },
  {
    quote:
      "Being in a leadership role, ease of integration and reliability are non-negotiables. This solution checked all the boxes and more.",
    name: "Ashmeet Singh",
    designation: "Co-Founder",
    src: Ashmeet,
  },

  {
    quote:
      "As a Co-Founder scaling a fast-paced team, performance and adaptability are everything. This solution delivered exceptionally well.",
    name: "Kishan Rathore",
    designation: "Co-Founder",
    src: Kishan,
  },
];

const Partners = () => {
  return (
    <div className="flex justify-center flex-col items-center h-full w-full px-4 py-5 pt-[200px]">
      <div className="pb-[100px]">
        <HeroHighlight>
          <span className="text-black dark:text-white font-mono text-5xl text-center mb-5">
            Community Founders
          </span>
          <AnimatedTestimonials testimonials={testimonials} />
        </HeroHighlight>
      </div>
    </div>
  );
};

export default Partners;
