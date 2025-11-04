// src/pages/CommunityWork.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'; // Import Helmet
import UpcomingEvents from "../components/CommunityWork/UpcommingEvents";
import BecomeSpeakerSection from "../components/CommunityWork/BecomeSpeaker";
import FeaturingProject from "../components/CommunityWork/FeatureProject";
import FeaturingRepos from "../components/CommunityWork/FeaturingRepos";
import Organizers from "../components/CommunityWork/Organizers";
import Loading from "../components/ui/loader";
import "./main.css";

const CommunityWork = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleContentReady = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate content loading time

    return () => clearTimeout(handleContentReady);
  }, []);

  return (
    <div className="communitywork-container">
      {/* Helmet for managing document head tags for the Community Work page */}
      <Helmet>
        <title>Community Work - Events, Projects & Speakers</title>
        <meta
          name="description"
          content="Explore TechQuanta's community initiatives: upcoming events, featured open-source projects, repositories, and opportunities to become a speaker."
        />
        {/* Open Graph / Social Sharing Meta Tags */}
        <meta property="og:title" content="TechQuanta Community Initiatives" />
        <meta property="og:description" content="Discover TechQuanta's vibrant open-source community: events, projects, and ways to contribute." />
        <meta property="og:type" content="website" />
        {/* Replace with your actual website URL for the Community Work page and a relevant image */}
        <meta property="og:url" content="https://yourwebsite.com/community-work" />
        {/* <meta property="og:image" content="https://yourwebsite.com/images/community-share.jpg" /> */}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TechQuanta Community Work" />
        <meta name="twitter:description" content="Engage with TechQuanta's open-source community: events, projects, and speaker opportunities." />
        {/* <meta name="twitter:image" content="https://yourwebsite.com/images/community-share.jpg" /> */}

        <link rel="canonical" href="https://yourwebsite.com/community-work" /> {/* Replace with your actual Community Work page URL */}
      </Helmet>

      {isLoading ? (
        <div className="communitywork-loader">
          <Loading message="Running Quantum Scripts..." /> {/* Renders your custom loading animation */}
        </div>
      ) : (
        <>
          <UpcomingEvents />
          {/* <Organizers /> */}
          {/* <HostedProjectsByCom /> */}
          <BecomeSpeakerSection />
          <FeaturingProject />
          <FeaturingRepos />
        </>
      )}
    </div>
  );
};

export default CommunityWork;