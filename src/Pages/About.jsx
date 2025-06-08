// src/pages/About.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'; // Import Helmet
import AboutInfo from "../components/About/AboutInfo";
import Contact from "../components/About/Contact";
import Loading from "../components/ui/loader"; // Assuming this is your custom loader component
import "./main.css"; // Ensure you have the correct path to your main.css

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for the about page content
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="about-loader">
        <Loading /> {/* Renders your custom loading animation */}
      </div>
    );
  }

  return (
    <main className="about-container">
      {/* Helmet for managing document head tags for the About page */}
      <Helmet>
        <title>About TechQuanta - Our Mission, Vision & Team</title>
        <meta 
          name="description" 
          content="Learn about TechQuanta's mission to empower open-source minds, our vision for a sustainable future, and connect with our core team." 
        />
        {/* Open Graph / Social Sharing Meta Tags */}
        <meta property="og:title" content="About TechQuanta" />
        <meta property="og:description" content="Discover TechQuanta's commitment to open source, sustainability, and community growth." />
        <meta property="og:type" content="website" />
        {/* Replace with your actual website URL for the About page and a relevant image */}
        <meta property="og:url" content="https://yourwebsite.com/about" /> 
        {/* <meta property="og:image" content="https://yourwebsite.com/images/about-share.jpg" /> */}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About TechQuanta" />
        <meta name="twitter:description" content="Learn about TechQuanta's mission, vision, and how we foster open-source innovation." />
        {/* <meta name="twitter:image" content="https://yourwebsite.com/images/about-share.jpg" /> */}

        <link rel="canonical" href="https://yourwebsite.com/about" /> {/* Replace with your actual About page URL */}
      </Helmet>

      <AboutInfo />
      <Contact />
    </main>
  );
};

export default About;