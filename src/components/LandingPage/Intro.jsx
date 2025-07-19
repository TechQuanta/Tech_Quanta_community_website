import React, { useEffect, useRef, useState } from 'react';

// Main App component
const App = () => {
    // Ref for the video iframe to observe intersection and apply transforms
    const videoRef = useRef(null);
    // State to manage the video src (for autoplay/pause)
    const [videoSrc, setVideoSrc] = useState("https://www.youtube.com/embed/pQkaoaI9Ljc");
    // State for the transform style for the parallax/tilt effect
    const [transformStyle, setTransformStyle] = useState({});

    // Effect for IntersectionObserver (autoplay/pause on scroll)
    useEffect(() => {
        const currentVideoIframe = videoRef.current;
        if (!currentVideoIframe) return;

        const videoBaseSrc = currentVideoIframe.src.split('?')[0];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // If video is in view, add autoplay parameter (unmuted)
                    // Note: Browsers may still block autoplay with sound until user interaction.
                    setVideoSrc(`${videoBaseSrc}?autoplay=1`);
                } else {
                    // If video is out of view, remove autoplay to pause it
                    setVideoSrc(videoBaseSrc);
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the video is visible
        });

        observer.observe(currentVideoIframe);

        // Cleanup observer on component unmount
        return () => {
            if (currentVideoIframe) {
                observer.unobserve(currentVideoIframe);
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    // Effect for mousemove parallax/tilt effect (the "page effect")
    useEffect(() => {
        const videoContainer = videoRef.current?.closest('.video-card-container');
        if (!videoContainer) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = videoContainer.getBoundingClientRect();

            // Calculate mouse position relative to the center of the container
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = (clientX - centerX) / (width / 2); // -1 to 1 range
            const deltaY = (clientY - centerY) / (height / 2); // -1 to 1 range

            // Apply rotation and lift for a 3D "page" effect
            const rotateX = -deltaY * 10; // Increased rotation for more dramatic effect
            const rotateY = deltaX * 10;  // Increased rotation for more dramatic effect
            const translateZ = 30;       // Lift off the page even more

            setTransformStyle({
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                transition: 'transform 0.1s ease-out' // Smooth transition for movement
            });
        };

        const handleMouseLeave = () => {
            setTransformStyle({
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                transition: 'transform 0.5s ease-out' // Slower transition back to original
            });
        };

        videoContainer.addEventListener('mousemove', handleMouseMove);
        videoContainer.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners on component unmount
        return () => {
            videoContainer.removeEventListener('mousemove', handleMouseMove);
            videoContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="video-card-container w-full max-w-4xl mx-auto relative group" style={transformStyle}>
            {/* Attractive, layered outer shadow that adapts to the page effect */}
            <div className="absolute inset-0 bg-transparent rounded-lg 
                        shadow-2xl group-hover:shadow-3xl transition-shadow duration-300 
                        dark:shadow-black/50 dark:group-hover:shadow-black/70">
            </div>

            {/* Video Container - Ensures 16:9 aspect ratio and adds the "diving" shadow */}
            <div className="relative w-full video-shadow-inset overflow-hidden">
                <iframe
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full"
                    src={videoSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default App;
