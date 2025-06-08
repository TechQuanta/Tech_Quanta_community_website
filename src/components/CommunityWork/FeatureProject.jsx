import React from 'react';

const FeaturingProject = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white px-6 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-16">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk tracking-tight bg-white bg-clip-text text-transparent">
            Featuring Projects
          </h2>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full">
            {/* Project Details Card */}
            <div className="bg-white/10 backdrop-blur-sm text-white p-10 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none lg:rounded-bl-3xl lg:rounded-br-none shadow-2xl border border-white/10 flex h-full text-left justify-center">
              <div className="flex flex-col justify-center items-start gap-8">
                <div className="space-y-6">
                  {/* Applied font-exo2 to the project title */}
                  <h3 className="text-3xl font-bold font-exo2">Quantum App</h3>
                  {/* Applied font-space-grotesk to the description */}
                  <p className="text-base font-medium text-gray-300 leading-relaxed font-space-grotesk">
                    A futuristic web-based application that leverages quantum-inspired design, real-time interactivity, and smooth animations across all devices. Built with elegance and performance in mind.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {/* Applied font-rajdhani to buttons for a distinct look */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition font-semibold tracking-wide font-rajdhani">
                    GitHub
                  </button>
                  {/* Applied font-rajdhani to buttons for a distinct look */}
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition font-semibold tracking-wide font-rajdhani">
                    Live Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project Video using iframe with glow */}
            {/* Applied glow-custom animation here as requested */}
            <div className="w-full aspect-video border-t-2 border-b-2 border-green-400 lg:border-r-2 rounded-b-3xl lg:rounded-r-3xl lg:rounded-tl-none lg:rounded-bl-none overflow-hidden glow-custom">
              <iframe
                src="https://www.youtube.com/embed/ly36kn0ug4k?si=NwPEdeAGsRT8rcTv"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturingProject;