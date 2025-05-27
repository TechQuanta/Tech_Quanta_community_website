// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import AboutInfo from "../components/About/AboutInfo";
import Contact from "../components/About/Contact";
import Loading from "../components/ui/loader";
import "./main.css"; // Ensure you have the correct path to your main.css

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="about-loader">
        <Loading />
      </div>
    );
  }

  return (
    <main className="about-container">
      <AboutInfo />
      <Contact />
    </main>
  );
};

export default About;
