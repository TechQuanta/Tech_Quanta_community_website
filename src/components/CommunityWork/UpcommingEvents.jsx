import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';

// --- Configuration Constants ---
const ANIMATION_DURATION = 600;
const SLIDE_DELAY = 8000;
const FLIP_ANIMATION_DURATION = 800;

// --- Utility Function: Parse DD-MM-YYYY Date and Extract Time ---
const parseDateTime = (dateString, timeString) => {
    if (!dateString) {
        console.warn("parseDateTime: dateString is empty.");
        return null;
    }
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
        console.warn(`parseDateTime: Invalid dateString format: ${dateString}. Expected DD-MM-YYYY.`);
        return null;
    }
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    let hours = 0;
    let minutes = 0;

    if (timeString) {
        if (timeString.includes('T') && timeString.includes('Z')) {
            const isoTimeObj = new Date(timeString);
            if (!isNaN(isoTimeObj.getTime())) {
                hours = isoTimeObj.getUTCHours();
                minutes = isoTimeObj.getUTCMinutes();
            } else {
                console.warn(`parseDateTime: Failed to parse timeString as ISO 8601: ${timeString}`);
            }
        } else {
            const timeParts = timeString.split(':');
            if (timeParts.length === 2) {
                hours = parseInt(timeParts[0], 10);
                minutes = parseInt(timeParts[1], 10);
            } else {
                console.warn(`parseDateTime: Invalid timeString format (not H:MM or ISO): ${timeString}`);
            }
        }
    }
    const finalDate = new Date(year, month, day, hours, minutes, 0);
    if (isNaN(finalDate.getTime())) {
        console.error(`parseDateTime: Resulting Date object is invalid for date: ${dateString}, time: ${timeString}`);
        return null;
    }
    return finalDate;
};

// --- Digit Component for Countdown ---
const Digit = ({ value }) => {
    const [prev, setPrev] = useState(value);
    const [flip, setFlip] = useState(false);
    useEffect(() => {
        if (value !== prev) {
            setFlip(true);
            const timer = setTimeout(() => {
                setPrev(value);
                setFlip(false);
            }, FLIP_ANIMATION_DURATION);
            return () => clearTimeout(timer);
        }
    }, [value, prev]);
    const displayValue = value.toString().padStart(2, '0');
    return (
        <span className="relative w-8 h-10 text-orange-400 dark:text-orange-300 font-bold text-4xl font-mono inline-flex items-center justify-center
                             drop-shadow-md glow-text-orange">
            <span className={`absolute inset-0 flex items-center justify-center
                             transition-transform duration-[var(--flip-duration)] ease-in-out
                             ${flip ? 'animate-[flipOut_var(--flip-duration)_ease-in-out_forwards]' : 'translate-y-0 opacity-100'}`}
                style={{ '--flip-duration': `${FLIP_ANIMATION_DURATION}ms` }}
            >
                {prev.toString().padStart(2, '0')}
            </span>
            <span className={`absolute inset-0 flex items-center justify-center
                             transition-transform duration-[var(--flip-duration)] ease-in-out
                             ${flip ? 'animate-[flipIn_var(--flip-duration)_ease-in-out_forwards]' : 'translate-y-0 opacity-100'}`}
                style={{ '--flip-duration': `${FLIP_ANIMATION_DURATION}ms` }}
            >
                {displayValue}
            </span>
        </span>
    );
};

// --- Countdown Timer Component ---
const CountdownTimer = ({ eventDateString, eventTimeString }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTimeMs, setTargetTimeMs] = useState(null);

    useEffect(() => {
        const dateObj = parseDateTime(eventDateString, eventTimeString);
        if (dateObj) {
            setTargetTimeMs(dateObj.getTime());
        } else {
            setTargetTimeMs(null);
            setTimeLeft(null);
        }
    }, [eventDateString, eventTimeString]);

    useEffect(() => {
        if (targetTimeMs === null) {
            setTimeLeft(null);
            return;
        }
        const calculateTimeLeft = () => {
            const difference = targetTimeMs - Date.now();
            if (difference <= 0) {
                setTimeLeft(null);
                return;
            }
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        };
        calculateTimeLeft();
        const intervalId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(intervalId);
    }, [targetTimeMs]);

    if (targetTimeMs === null) {
        return null;
    }
    if (!timeLeft) {
        if (targetTimeMs <= Date.now()) {
            return <p className="mt-6 text-purple-400 dark:text-purple-300 font-mono text-2xl tracking-widest select-none font-bold glow-text-purple">No More Tickets!</p>;
        }
        return null;
    }
    return (
        <div className="mt-4 flex items-baseline gap-4 text-orange-400 dark:text-orange-300 font-mono text-xl tracking-widest select-none">
            <span className="text-xl sm:text-yxl md:text-xl font-extrabold glow-text-orange mr-4">Starts in:</span>
            <Digit value={timeLeft.days} /><span className="opacity-70 text-base sm:text-lg mr-2">d</span>
            <Digit value={timeLeft.hours} /><span className="opacity-70 text-base sm:text-lg mr-2">h</span>
            <Digit value={timeLeft.minutes} /><span className="opacity-70 text-base sm:text-lg mr-2">m</span>
            <Digit value={timeLeft.seconds} /><span className="opacity-70 text-base sm:text-lg">s</span>
        </div>
    );
};

// --- Main SliderShowcase Component ---
export default function SliderShowcase() {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFadeIn, setIsFadeIn] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const autoAdvanceTimeoutRef = useRef(null);

    // API URLs from your data
    const EVENTS_API_URL = import.meta.env.VITE_APP_GOOGLE_MACRO_API;
    const ORGANIZERS_API_URL = "https://script.google.com/macros/s/AKfycbxZqXMcKuhgwyA3m4z8QVH5rpPxPt042l2PWOwyOnZ14LrZi0SZe7SQbtU6JP8jZ2jQ8w/exec";

    // Data Fetching and Merging Logic
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [eventsResponse, organizersResponse] = await Promise.all([
                    axios.get(EVENTS_API_URL),
                    axios.get(ORGANIZERS_API_URL)
                ]);

                const events = eventsResponse.data?.events || [];
                const organizersData = organizersResponse.data || [];

                const organizersMap = organizersData.reduce((acc, org) => {
                    if (!acc.has(org.event_id)) {
                        acc.set(org.event_id, []);
                    }
                    acc.get(org.event_id).push(org);
                    return acc;
                }, new Map());

                const mergedSlides = events.map(event => {
                    const organizers = organizersMap.get(event.event_id) || [];
                    return {
                        ...event,
                        organizers: organizers
                    };
                });
                
                const filteredEvents = mergedSlides.filter(slide => 
                    slide.event_heading || slide.post_link || slide.event_description
                );

                if (filteredEvents.length === 0) {
                    setHasError(true);
                    setSlides([]);
                } else {
                    setSlides(filteredEvents);
                    sessionStorage.setItem('eventSlides', JSON.stringify(filteredEvents));
                    setHasError(false);
                }
            } catch (error) {
                console.error('Failed to fetch and merge data:', error);
                const cachedSlides = sessionStorage.getItem('eventSlides');
                if (cachedSlides) {
                    try {
                        const parsedCachedSlides = JSON.parse(cachedSlides);
                        if (parsedCachedSlides.length > 0) {
                            setSlides(parsedCachedSlides);
                            setHasError(false);
                            console.log('Loaded slides from session storage.');
                        } else {
                            setHasError(true);
                            setSlides([]);
                        }
                    } catch (parseError) {
                        console.error('Failed to parse cached slides:', parseError);
                        setHasError(true);
                        setSlides([]);
                    }
                } else {
                    setHasError(true);
                    setSlides([]);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [EVENTS_API_URL, ORGANIZERS_API_URL]);

    const transitionToSlide = useCallback((newIndex) => {
        if (isAnimating || slides.length === 0) return;
        setIsAnimating(true);
        setIsFadeIn(false);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setIsFadeIn(true);
            setIsAnimating(false);
        }, ANIMATION_DURATION);
    }, [isAnimating, slides.length]);

    const showNextSlide = useCallback(() => {
        transitionToSlide((currentIndex + 1) % slides.length);
    }, [currentIndex, slides.length, transitionToSlide]);

    const showPrevSlide = useCallback(() => {
        transitionToSlide((currentIndex - 1 + slides.length) % slides.length);
    }, [currentIndex, slides.length, transitionToSlide]);

    useEffect(() => {
        if (!slides.length) return;
        setIsFadeIn(true);
        clearTimeout(autoAdvanceTimeoutRef.current);
        autoAdvanceTimeoutRef.current = setTimeout(showNextSlide, SLIDE_DELAY);
        return () => clearTimeout(autoAdvanceTimeoutRef.current);
    }, [currentIndex, slides, showNextSlide]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowRight') {
                showNextSlide();
            } else if (event.key === 'ArrowLeft') {
                showPrevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showNextSlide, showPrevSlide]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-rajdhani">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p className="text-xl sm:text-2xl md:text-3xl animate-pulse tracking-wide drop-shadow-lg">Loading amazing events...</p>
            </div>
        );
    }

    if (hasError || slides.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] bg-gradient-to-r from-red-600 to-orange-600 text-white font-rajdhani text-center px-4">
                <p className="text-xl sm:text-2xl md:text-3xl drop-shadow-lg mb-4">Oops! Couldn't load events.</p>
                <p className="text-lg sm:text-xl text-gray-200">Please check your connection or try again later.</p>
            </div>
        );
    }

    const currentSlide = slides[currentIndex];
    
    return (
        <main>
            {/* Event Slider Section */}
            <section
                className="relative w-full min-h-[70vh] flex justify-center items-center font-space-grotesk overflow-hidden select-none"
                aria-live="polite"
                aria-roledescription="carousel"
            >
                {/* Background Image and Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center animate-panZoom"
                    style={{ backgroundImage: `url(${currentSlide.post_link})` }}
                    role="img"
                    aria-label={`Background image for ${currentSlide.event_heading}`}
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-transparent" />

                {/* Content Area - Full-width, less height */}
                <article
                    className={`relative z-10 w-full rounded-none p-8 sm:p-10 max-w-7xl h-fit bg-white/10 border-t border-b border-white/20 dark:bg-gray-800/60 dark:border-gray-700
                                backdrop-blur-xl shadow-2xl transition-all duration-${ANIMATION_DURATION}ms ease-in-out
                                ${isFadeIn ? 'opacity-100' : 'opacity-0'}
                                flex flex-col md:flex-row gap-8`}
                    role="group"
                    aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
                >
                    {/* Left Side: Event Details */}
                    <div className="flex-1 flex flex-col justify-center text-white">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-exo2 font-extrabold drop-shadow-xl text-shadow-md leading-tight mb-4">
                            {currentSlide.event_heading}
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-200 dark:text-gray-300 leading-relaxed max-h-[6em] overflow-hidden text-ellipsis line-clamp-3">
                            {currentSlide.event_description}
                        </p>
                        
                        {/* Event Metadata (Venue, Mode) */}
                        {(currentSlide.event_venue || currentSlide.event_mode) && (
                            <div className="mt-4 text-lg font-rajdhani flex flex-wrap items-center gap-4 drop-shadow-md">
                                {currentSlide.event_venue && (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-1 text-purple-400 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M5.051 4.34A1 1 0 015.93 4h8.14a1 1 0 01.879.52l1.65 3.3a1 1 0 010 .76l-1.65 3.3a1 1 0 01-.879.52H5.93a1 1 0 01-.879-.52L3.402 8.32a1 1 0 010-.76L5.05 4.34zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                        </svg>
                                        {currentSlide.event_venue}
                                    </span>
                                )}
                                {currentSlide.event_venue && currentSlide.event_mode && <span className="text-gray-400">|</span>}
                                {currentSlide.event_mode && (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-1 text-purple-400 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 13a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z" clipRule="evenodd"></path>
                                        </svg>
                                        {currentSlide.event_mode}
                                    </span>
                                )}
                            </div>
                        )}
                        
                        {/* Date and Time */}
                        {(currentSlide.event_date || currentSlide.event_time) && (
                            <div className="mt-4 text-lg font-rajdhani flex flex-wrap items-center gap-4 drop-shadow-md">
                                {currentSlide.event_date && (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-1 text-purple-400 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                        </svg>
                                        {currentSlide.event_date}
                                    </span>
                                )}
                                {currentSlide.event_date && currentSlide.event_time && <span className="text-gray-400">|</span>}
                                {currentSlide.event_time && (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-1 text-purple-400 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path>
                                        </svg>
                                        {currentSlide.event_time}
                                    </span>
                                )}
                            </div>
                        )}
                        
                        <CountdownTimer eventDateString={currentSlide.event_date} eventTimeString={currentSlide.event_time} />

                        {currentSlide.event_registration_link && (
                            <a
                                href={currentSlide.event_registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-8 px-8 py-4 bg-purple-600 text-white shadow-lg transition-all duration-300 ease-out
                                             hover:bg-pink-500 hover:text-white
                                             focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 focus:ring-opacity-70
                                             font-semibold text-lg animate-buttonPop"
                            >
                                🚀 Register Now
                            </a>
                        )}
                    </div>

                    {/* Right Side: Organizer Details */}
                    {currentSlide.organizers && currentSlide.organizers.length > 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-white/90 p-4 rounded-lg bg-transparent text-black dark:text-white">
                             {/* Organizer Heading */}
                             <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black dark:text-white">
                                Organizers
                            </h2>
                            <div className="flex flex-wrap justify-center gap-8">
                                {currentSlide.organizers.map((organizer, index) => (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        {organizer.profilePicUrl && (
                                            <div className="relative w-28 h-28 mb-4">
                                                <img
                                                    src={organizer.profilePicUrl}
                                                    alt={organizer.name || 'Organizer'}
                                                    className="w-full h-full rounded-full object-cover border-4 border-gray-400 dark:border-white transition-colors duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col items-center">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                {organizer.name}
                                            </h3>
                                            {organizer.post && (
                                                <p className="text-sm font-medium text-purple-300 mt-1">
                                                    {organizer.post}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex justify-center space-x-4 mt-2 text-black dark:text-white">
                                            {organizer.linkedin && (
                                                <a
                                                    href={organizer.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-black dark:text-white hover:text-blue-400 transition-colors duration-200"
                                                >
                                                    <FaLinkedin size={24} />
                                                </a>
                                            )}
                                            {organizer.socials && (
                                                <a
                                                    href={organizer.socials}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-black dark:text-whtie hover:text-gray-300 transition-colors duration-200"
                                                >
                                                    <FaGlobe size={24} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                {/* Navigation Controls */}
                {slides.length > 1 && (
                    <>
                        <button
                            onClick={showPrevSlide}
                            disabled={isAnimating}
                            className="group hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-16 text-white text-5xl bg-gradient-to-r from-black/50 to-transparent transition-all duration-300 ease-in-out hover:bg-black/80
                                         disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                            aria-label="Previous Slide"
                        >
                            <span className="m-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300">‹</span>
                        </button>
                        <button
                            onClick={showNextSlide}
                            disabled={isAnimating}
                            className="group hidden md:flex absolute right-0 top-0 bottom-0 z-20 w-16 text-white text-5xl bg-gradient-to-l from-black/50 to-transparent transition-all duration-300 ease-in-out hover:bg-black/80
                                         disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                            aria-label="Next Slide"
                        >
                            <span className="m-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300">›</span>
                        </button>
                    </>
                )}

                {/* Slide Indicators (Dots)
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => transitionToSlide(i)}
                            disabled={isAnimating}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
                                currentIndex === i ? 'bg-orange-400 dark:bg-orange-300 w-8 animate-pulseDot' : 'bg-gray-400/70 hover:bg-white/60 dark:hover:bg-gray-500/80'
                            } disabled:opacity-50 disabled:cursor-not-allowed ring-2 ring-transparent focus:ring-orange-400 dark:focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-transparent`}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={currentIndex === i ? 'true' : 'false'}
                        />
                    ))}
                </div> */}

                {/* Custom Styles for Animations and Effects */}
                <style>{`
                    /* Digit Flip Animations */
                    @keyframes flipOut {
                        0% { transform: translateY(0) rotateX(0deg); opacity: 1; }
                        100% { transform: translateY(-100%) rotateX(90deg); opacity: 0; }
                    }

                    @keyframes flipIn {
                        0% { transform: translateY(100%) rotateX(-90deg); opacity: 0; }
                        100% { transform: translateY(0) rotateX(0deg); opacity: 1; }
                    }

                    /* Background Pan-Zoom Animation */
                    @keyframes panZoom {
                        0% { background-position: 0% 0%; transform: scale(1.05); }
                        50% { background-position: 100% 100%; transform: scale(1.1); }
                        100% { background-position: 0% 0%; transform: scale(1.05); }
                    }
                    .animate-panZoom {
                        animation: panZoom 40s linear infinite alternate;
                    }

                    /* Button Pop Animation */
                    @keyframes buttonPop {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.02); }
                    }
                    .animate-buttonPop {
                        animation: buttonPop 2s ease-in-out infinite;
                    }

                    /* Text Glow for Countdown - Orange */
                    .glow-text-orange {
                        text-shadow:
                            0 0 5px rgba(251, 146, 60, 0.5),
                            0 0 10px rgba(251, 146, 60, 0.4),
                            0 0 15px rgba(251, 146, 60, 0.3);
                    }
                    
                    /* Text Glow for Event Started Message - Purple */
                    .glow-text-purple {
                        text-shadow:
                            0 0 5px rgba(168, 85, 247, 0.5),
                            0 0 10px rgba(168, 85, 247, 0.4),
                            0 0 15px rgba(168, 85, 247, 0.3);
                    }

                    /* Pulse for active dot */
                    @keyframes pulseDot {
                        0%, 100% {
                            transform: scale(1);
                            opacity: 1;
                        }
                        50% {
                            transform: scale(1.2);
                            opacity: 0.8;
                        }
                    }
                    .animate-pulseDot {
                        animation: pulseDot 2s ease-in-out infinite;
                    }

                    /* Custom text shadow for title */
                    .text-shadow-md {
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    }
                    .text-shadow-lg {
                        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
                    }
                    /* Deeper inner shadow for the section */
                    .shadow-inner-lg {
                        box-shadow: inset 0px 0px 50px -15px rgba(0, 0, 0, 0.8) !important;
                    }

                    /* Loader animation */
                    .loader {
                        border-top-color: #3498db;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </section>
        </main>
    );
}