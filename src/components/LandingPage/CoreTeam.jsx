import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';

const CoreTeam = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const [circleSize, setCircleSize] = useState({ width: 0, height: 0 });
  
  // Update circle dimensions on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (circleRef.current) {
        const rect = circleRef.current.getBoundingClientRect();
        setCircleSize({ width: rect.width, height: rect.height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Sample team members data with high-contrast text avatars
  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Founder",
      image: "https://ui-avatars.com/api/?name=Alex+Chen&background=0077B6&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=F72585&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Developer",
      image: "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=7209B7&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 4,
      name: "Emily Kim",
      role: "Designer",
      image: "https://ui-avatars.com/api/?name=Emily+Kim&background=4CC9F0&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 5,
      name: "David Park",
      role: "Marketing",
      image: "https://ui-avatars.com/api/?name=David+Park&background=3A0CA3&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 6,
      name: "Jessica Lee",
      role: "Content Creator",
      image: "https://ui-avatars.com/api/?name=Jessica+Lee&background=4361EE&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 7,
      name: "Robert Wilson",
      role: "Developer",
      image: "https://ui-avatars.com/api/?name=Robert+Wilson&background=00B4D8&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 8,
      name: "Olivia Martinez",
      role: "Designer",
      image: "https://ui-avatars.com/api/?name=Olivia+Martinez&background=0096C7&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 9,
      name: "James Thompson",
      role: "Developer",
      image: "https://ui-avatars.com/api/?name=James+Thompson&background=0077B6&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 10,
      name: "Sophia Garcia",
      role: "Content Creator",
      image: "https://ui-avatars.com/api/?name=Sophia+Garcia&background=90E0EF&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 11,
      name: "Daniel Lee",
      role: "Developer",
      image: "https://ui-avatars.com/api/?name=Daniel+Lee&background=48CAE4&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 12,
      name: "Ava Brown",
      role: "UX Researcher",
      image: "https://ui-avatars.com/api/?name=Ava+Brown&background=ADE8F4&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 13,
      name: "Ethan Davis",
      role: "DevOps Engineer",
      image: "https://ui-avatars.com/api/?name=Ethan+Davis&background=0077B6&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    },
    {
      id: 14,
      name: "Isabella Wright",
      role: "Community Manager",
      image: "https://ui-avatars.com/api/?name=Isabella+Wright&background=0096C7&color=fff&bold=true&size=128",
      linkedin: "https://linkedin.com/in/"
    }
  ];

  // Use framer-motion's animation frame for smoother rotation
  useAnimationFrame(frame => {
    // Only animate if no member is selected
    if (!selectedMember) {
      // Smoother rotation using animation frame
      // The divisor controls speed - higher number = slower rotation
      const rotationSpeed = frame / 60; // Increased from 25 to 60 for slower rotation
      setRotation(rotationSpeed % 360);
    }
  });
  
  // Handle profile click
  const handleProfileClick = (member, e, position) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedPosition(position);
    setSelectedMember(member);
    setIsClosing(false);
  };
  
  // Close profile view
  const closeProfile = () => {
    setSelectedMember(null);
  };

  // Handle click anywhere to close profile
  const handleContainerClick = () => {
    // Close the profile if one is open
    if (selectedMember) {
      closeProfile();
    }
  };

  // Adding a document-level click handler would cause conflicts
  // Instead, we'll use a full-screen overlay when a profile is selected
  
  return (
    <div className="flex flex-col items-center py-6 max-w-7xl mx-auto" ref={containerRef}>
      <div className="flex justify-center w-full mb-3 sm:mb-5">
        <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white inline-block relative">
        Community Core Members
        <div className="absolute -bottom-2 left-[20%] w-[60%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-gradient" style={{ backgroundSize: '200% 200%' }}></div>
        </h2>
      </div>
      {selectedMember && (
        <div 
          className="fixed inset-0 z-5 bg-transparent cursor-pointer" 
          onClick={handleContainerClick}
        />
      )}
      
      {/* Circle container */}
      <div ref={circleRef} className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px] mb-8 z-0" onClick={handleContainerClick}>
        {/* Center point for reference (invisible) */}
        <div className="absolute top-1/2 left-1/2 w-0 h-0"></div>

        <AnimatePresence>
          {selectedMember && (
            <motion.div 
              className="absolute z-40 flex flex-col items-center w-32"
              key={selectedMember.id}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                top: 'calc(50% - 43px)',  /* Move up by 43px */
                left: 'calc(50% - 43px)', /* Move left by 43px */
                transform: 'translate(-50%, -50%)', /* Offset by half width/height */
                pointerEvents: 'auto'
              }}
              onClick={(e) => {
                // Clicking the focused profile should close it
                e.stopPropagation();
                closeProfile();
              }}
            >
              {/* Profile image with LinkedIn badge */}
              <motion.div 
                className="relative mb-2"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {/* LinkedIn badge */}
                <motion.a 
                  href={selectedMember.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-md z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
                
                {/* Profile image */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-blue-500 shadow-lg">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Name and role only */}
              <motion.h3 
                className="font-bold text-black dark:text-white text-sm text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {selectedMember.name}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 text-xs text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedMember.role}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Profile circles */}
        {teamMembers.map((member, index) => {
          // Calculate position in circle
          const angle = (index * (360 / teamMembers.length) + rotation) % 360;
          // Responsive radius based on screen size
          const baseRadius = 130;
          const radius = window.innerWidth < 640 ? baseRadius * 0.8 : baseRadius; // Smaller radius on mobile
          const radian = angle * (Math.PI / 180);
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);
          
          // All profiles have the same size
          const zIndex = Math.round(10 + Math.cos(radian) * 5);
          
          return (
            <motion.div 
              key={member.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"

              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                zIndex: zIndex + 50, // Ensure profile circles are above the overlay
                pointerEvents: selectedMember && selectedMember.id === member.id ? 'none' : 'auto' // Only allow clicking on non-selected profiles
              }}
              animate={{
                opacity: selectedMember && selectedMember.id === member.id ? 0 : 1,
                scale: selectedMember && selectedMember.id === member.id ? 0.8 : 1,
                transition: { duration: 0.15 }
              }}
            >
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer shadow-md hover:shadow-blue-300 transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    animate={{
                      borderColor: selectedMember && selectedMember.id === member.id ? '#34D399' : '#3B82F6'
                    }}
                    style={{
                      zIndex: 50 // Make sure these are always above the overlay
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      
                      // Always directly switch to the clicked profile, even if one is already open
                      setSelectedMember(member);
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Hover information with dynamic positioning based on angle */}
                  <div className={`
                    absolute opacity-0 group-hover:opacity-100 bg-black/80 text-white px-2 py-1 rounded-md text-center transition-opacity duration-300 whitespace-nowrap
                    ${angle > 45 && angle < 135 ? 'bottom-auto top-full mt-2 left-1/2 transform -translate-x-1/2' : ''} /* Bottom profiles - tooltip above */
                    ${angle >= 135 && angle < 225 ? 'top-1/2 left-auto right-full mr-2 transform -translate-y-1/2' : ''} /* Left profiles - tooltip right */
                    ${angle >= 225 && angle < 315 ? 'top-auto bottom-full mb-2 left-1/2 transform -translate-x-1/2' : ''} /* Top profiles - tooltip below */
                    ${(angle >= 315 || angle < 45) ? 'top-1/2 right-auto left-full ml-2 transform -translate-y-1/2' : ''} /* Right profiles - tooltip left */
                  `}>
                    <p className="font-semibold text-xs">{member.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CoreTeam;
