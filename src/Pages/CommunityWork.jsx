// src/pages/CommunityWork.jsx
import React, { useEffect, useState } from "react";
import UpcomingEvents from "../components/CommunityWork/UpcommingEvents";
import BecomeSpeakerSection from "../components/CommunityWork/BecomeSpeaker";
import FeaturingProject from "../components/CommunityWork/FeatureProject";
import FeaturingRepos from "../components/CommunityWork/FeaturingRepos";
import Loading from "../components/ui/loader";
import "./main.css";

const CommunityWork = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleContentReady = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(handleContentReady);
  }, []);

  return (
    <div className="communitywork-container">
      {isLoading ? (
        <div className="communitywork-loader">
          <Loading message="Running Quantum Scripts..." />
        </div>
      ) : (
        <>
          <UpcomingEvents />
          <BecomeSpeakerSection />
          <FeaturingProject />
          <FeaturingRepos />
        </>
      )}
    </div>
  );
};

export default CommunityWork;
