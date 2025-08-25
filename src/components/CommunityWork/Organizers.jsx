import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';
import axios from 'axios';

const Organizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // The provided Google Apps Script URL
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZqXMcKuhgwyA3m4z8QVH5rpPxPt042l2PWOwyOnZ14LrZi0SZe7SQbtU6JP8jZ2jQ8w/exec";

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get(APPS_SCRIPT_URL);
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setOrganizers(data);
          setError(false);
        } else {
          setOrganizers([]);
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch organizers:", error);
        setError(true);
        setOrganizers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || organizers.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          No organizers found or failed to load data.
        </p>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 bg-transparent">
      {/* Centered Heading */}
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
        Event Organizers
      </h2>
      
      {/* Centered Organizers Grid */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-16">
        {organizers.map((organizer, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-xs text-center"
          >
            {/* Profile Image with Dynamic Border */}
            {organizer.organizers_profiles && (
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={organizer.organizers_profiles}
                  alt={organizer.organizers_names || 'Organizer'}
                  className="w-full h-full rounded-full object-cover border-4 border-gray-400 dark:border-white transition-colors duration-300"
                />
              </div>
            )}
            
            {/* Name and Post */}
            <div className="flex flex-col items-center">
              {organizer.organizers_names && (
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {organizer.organizers_names}
                </h3>
              )}
              {organizer.organizers_post && (
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mt-1">
                  {organizer.organizers_post}
                </p>
              )}
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-4 mt-4">
              {organizer.organizers_linkedin && (
                <a
                  href={organizer.organizers_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label={`LinkedIn profile of ${organizer.organizers_names}`}
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {organizer.organizers_socials && (
                <a
                  href={organizer.organizers_socials}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  aria-label={`Socials of ${organizer.organizers_names}`}
                >
                  <FaGlobe size={24} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organizers;