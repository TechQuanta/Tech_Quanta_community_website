import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

// Define standard durations for transitions and animations
const ANIMATION_DURATION = 600; // Milliseconds for slide fade-in/out
const SLIDE_DELAY = 8000;       // Milliseconds before auto-advancing to the next slide
const FLIP_ANIMATION_DURATION = 800; // Milliseconds for digit flip animation

// --- Utility Function: Parse DD-MM-YYYY H:MM Date and Time String ---
const parseDateTime = (dateString, timeString) => {
    if (!dateString) return null;

    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) return null;

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(dateParts[2], 10);

    let hours = 0;
    let minutes = 0;

    if (timeString) {
        const timeParts = timeString.split(':');
        if (timeParts.length === 2) {
            hours = parseInt(timeParts[0], 10);
            minutes = parseInt(timeParts[1], 10);
        }
    }

    const date = new Date(year, month, day, hours, minutes, 0);

    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
};

// --- Digit Component ---
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
    <span className="relative w-8 h-10 text-tech-green dark:text-green-400 font-bold text-4xl font-mono inline-flex items-center justify-center 
                     drop-shadow-md glow-text">
      <span
        className={`absolute inset-0 flex items-center justify-center
                    transition-transform duration-[var(--flip-duration)] ease-in-out
                    ${flip ? 'animate-[flipOut_var(--flip-duration)_ease-in-out_forwards]' : 'translate-y-0 opacity-100'}`}
        style={{ '--flip-duration': `${FLIP_ANIMATION_DURATION}ms` }}
      >
        {prev.toString().padStart(2, '0')}
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center
                    transition-transform duration-[var(--flip-duration)] ease-in-out
                    ${flip ? 'animate-[flipIn_var(--flip-duration)_ease-in-out_forwards]' : 'translate-y-0 opacity-100'}`}
        style={{ '--flip-duration': `${FLIP_ANIMATION_DURATION}ms` }}
      >
        {displayValue}
      </span>
    </span>
  );
};

// --- Countdown Timer Component (Adjusted for "Starts in:" visibility) ---
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
        return <p className="mt-6 text-tech-green dark:text-green-400 font-mono text-2xl tracking-widest select-none font-bold glow-text">Event has started!</p>;
    }
    return null;
  }

  return (
    <div className="mt-4 flex items-baseline gap-4 text-tech-green dark:text-green-400 font-mono text-xl tracking-widest select-none">
      {/* MODIFIED: Increased font size for "Starts in:" on all screens, and added margin-right */}
      <span className="text-xl sm:text-yxl md:text-xl font-extrabold glow-text mr-4">Starts in:</span>
      <Digit value={timeLeft.days} /><span className="opacity-70 text-base sm:text-lg mr-2">d</span> {/* Increased mr */}
      <Digit value={timeLeft.hours} /><span className="opacity-70 text-base sm:text-lg mr-2">h</span> {/* Increased mr */}
      <Digit value={timeLeft.minutes} /><span className="opacity-70 text-base sm:text-lg mr-2">m</span> {/* Increased mr */}
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

  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_GOOGLE_MACRO_API);
        const fetchedEvents = response.data?.events || [];

        const formattedSlides = fetchedEvents.map(event => ({
          image: event.post_link || 'https://images.unsplash.com/photo-1517420790278-f7b768b556f0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: event.event_heading || 'Exciting Event Coming Soon!',
          description: event.event_description || 'Join us for an unforgettable experience filled with learning, networking, and innovation. Stay tuned for more details!',
          link: event.event_registration_link || '#',
          date: event.event_date || '', // DD-MM-YYYY
          time: event.event_time || '0:00', // H:MM
        })).filter(slide => slide.image);

        setSlides(formattedSlides);
        sessionStorage.setItem('eventSlides', JSON.stringify(formattedSlides));
        setHasError(false);
      } catch (error) {
        console.error('Failed to fetch event slides from API:', error);
        const cachedSlides = sessionStorage.getItem('eventSlides');
        if (cachedSlides) {
          const parsedCachedSlides = JSON.parse(cachedSlides);
          setSlides(parsedCachedSlides);
          setHasError(false);
        } else {
          setHasError(true);
          setSlides([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

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

  // --- Conditional Rendering Logic ---
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] bg-gradient-to-r from-blue-900 to-purple-900 text-white font-rajdhani">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <p className="text-xl sm:text-2xl md:text-3xl animate-pulse tracking-wide drop-shadow-lg">Loading amazing events...</p>
      </div>
    );
  }

  if (hasError || slides.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] bg-gradient-to-r from-red-900 to-orange-900 text-white font-rajdhani text-center px-4">
        <p className="text-xl sm:text-2xl md:text-3xl drop-shadow-lg mb-4">
          Oops! Couldn't load events.
        </p>
        <p className="text-lg sm:text-xl text-gray-200">
          Please check your connection or try again later.
        </p>
      </div>
    );
  }

  // Destructure current slide data for easier access
  const { image, title, description, link, date, time } = slides[currentIndex];

  return (
    <section
      className="relative w-full min-h-[70vh] flex justify-center items-center font-space-grotesk overflow-hidden select-none shadow-inner-lg"
      aria-live="polite"
      aria-roledescription="carousel"
    >
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-panZoom"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={`Background image for ${title}`}
      />
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent dark:from-gray-950/80 dark:via-gray-900/70" />

      {/* Content Area */}
      <div className="relative z-10 flex items-center justify-start h-full w-full px-6 sm:px-10 lg:px-20 py-24">
        <article
          className={`rounded-3xl p-8 sm:p-10 max-w-2xl bg-white/10 border border-white/20 dark:bg-gray-800/60 dark:border-gray-700
                      backdrop-blur-xl shadow-2xl transition-all duration-${ANIMATION_DURATION}ms ease-in-out
                      ${isFadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      hover:scale-[1.01] hover:shadow-3xl transition-transform duration-300 ease-out cursor-pointer`}
          role="group"
          aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-exo2 font-extrabold text-white drop-shadow-xl text-shadow-md leading-tight mb-4">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-200 dark:text-gray-300 leading-relaxed max-h-[6em] overflow-hidden text-ellipsis line-clamp-3">
            {description}
          </p>

          {/* Display Date and Time Properly */}
          {(date || time) && (
            <div className="mt-4 text-lg text-white font-rajdhani flex items-center gap-2 drop-shadow-md">
              {date && (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-tech-green dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  {date}
                </span>
              )}
              {date && time && <span className="text-gray-400">|</span>}
              {time && (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-tech-green dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  {time}
                </span>
              )}
            </div>
          )}

          <CountdownTimer eventDateString={date} eventTimeString={time} />

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white shadow-lg transition-all duration-300 ease-out
                         hover:bg-green-500 hover:text-white
                         focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-70
                         font-semibold text-lg animate-buttonPop"
            >
              🚀 Register Now
            </a>
          )}
        </article>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={showPrevSlide}
        disabled={isAnimating}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white text-5xl bg-white/10 hover:bg-white/30 p-4 rounded-full shadow-lg backdrop-blur-md transition duration-300 ease-in-out
                   dark:bg-gray-700/40 dark:hover:bg-gray-600/60 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 border border-white/20 dark:border-gray-600"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={showNextSlide}
        disabled={isAnimating}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white text-5xl bg-white/10 hover:bg-white/30 p-4 rounded-full shadow-lg backdrop-blur-md transition duration-300 ease-in-out
                   dark:bg-gray-700/40 dark:hover:bg-gray-600/60 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95 border border-white/20 dark:border-gray-600"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => transitionToSlide(i)}
            disabled={isAnimating}
            className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
              currentIndex === i ? 'bg-tech-green dark:bg-green-400 w-8 animate-pulseDot' : 'bg-gray-400/70 hover:bg-white/60 dark:hover:bg-gray-500/80'
            } disabled:opacity-50 disabled:cursor-not-allowed ring-2 ring-transparent focus:ring-tech-green dark:focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={currentIndex === i ? 'true' : 'false'}
          />
        ))}
      </div>

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

        /* Text Glow for Countdown */
        .glow-text {
          text-shadow:
            0 0 5px rgba(34, 197, 94, 0.5),
            0 0 10px rgba(34, 197, 94, 0.4),
            0 0 15px rgba(34, 197, 94, 0.3);
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
  );
}