import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';

const Volunteers = () => {
  // Sample volunteer data with high-contrast text avatars (same style as CoreTeam)
  const volunteers = [
    { id: 1, name: "Alpha", image: "https://ui-avatars.com/api/?name=Alpha&background=7209B7&color=fff&bold=true&size=128" },
    { id: 2, name: "Beta", image: "https://ui-avatars.com/api/?name=Beta&background=F72585&color=fff&bold=true&size=128" },
    { id: 3, name: "Gamma", image: "https://ui-avatars.com/api/?name=Gamma&background=4361EE&color=fff&bold=true&size=128" },
    { id: 4, name: "Delta", image: "https://ui-avatars.com/api/?name=Delta&background=3A0CA3&color=fff&bold=true&size=128" },
    { id: 5, name: "Epsilon", image: "https://ui-avatars.com/api/?name=Epsilon&background=4CC9F0&color=fff&bold=true&size=128" },
    { id: 6, name: "Zeta", image: "https://ui-avatars.com/api/?name=Zeta&background=560BAD&color=fff&bold=true&size=128" },
    { id: 7, name: "Eta", image: "https://ui-avatars.com/api/?name=Eta&background=7209B7&color=fff&bold=true&size=128" },
    { id: 8, name: "Theta", image: "https://ui-avatars.com/api/?name=Theta&background=F72585&color=fff&bold=true&size=128" },
    { id: 9, name: "Iota", image: "https://ui-avatars.com/api/?name=Iota&background=4361EE&color=fff&bold=true&size=128" },
    { id: 10, name: "Kappa", image: "https://ui-avatars.com/api/?name=Kappa&background=3A0CA3&color=fff&bold=true&size=128" },
  ];
  
  // Duplicate the volunteers to create a seamless loop effect
  const allVolunteers = [...volunteers, ...volunteers, ...volunteers];
  
  // Animation controls for smooth scrolling
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  
  // Use animation frame for smooth scrolling
  useAnimationFrame(() => {
    const baseVelocity = -0.5; // Reduced speed (negative for right-to-left movement)
    const wrappingPoint = -120 * volunteers.length; // Width of one complete volunteer set
    
    // Update position continuously with constant movement to avoid lag
    let xValue = x.get();
    xValue += baseVelocity; // Constant movement per frame regardless of delta
    
    // Reset position when one complete set has scrolled off screen
    if (xValue <= wrappingPoint) {
      xValue = 0;
    }
    
    x.set(xValue);
  });
  
  return (
    <div className="py-6 sm:py-8 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex justify-center w-full mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white inline-block relative">
            Our Volunteers
            <div className="absolute -bottom-2 left-[20%] w-[60%] h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient" style={{ backgroundSize: '200% 200%' }}></div>
          </h2>
        </div>
        
        {/* Container for scrolling volunteers */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div 
            className="flex items-center py-4" 
            style={{ x }}
            transition={{ type: "linear" }}
          >
            {allVolunteers.map((volunteer, index) => (
              <motion.div 
                key={`${volunteer.id}-${index}`} 
                className="flex-shrink-0 mx-2 sm:mx-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex flex-col items-center" style={{ width: '70px', maxWidth: '100%' }}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-blue-500 mb-1 sm:mb-2 shadow-md hover:shadow-blue-300 transition-shadow duration-300">
                    <img 
                      src={volunteer.image} 
                      alt={volunteer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                    {volunteer.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Volunteers;
