import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

// Define standard durations for transitions and animations
const ANIMATION_DURATION = 400; // Milliseconds for slide fade-in/out
const SLIDE_DELAY = 7000;       // Milliseconds before auto-advancing to the next slide
const FLIP_ANIMATION_DURATION = 600; // Milliseconds for digit flip animation

// --- Digit Component ---
// Renders an individual digit with a flipping animation when its value changes.
const Digit = ({ value }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    // Trigger flip animation only when the value actually changes
    if (value !== prev) {
      setFlip(true);
      // Set a timeout to reset the flip state and update `prev` after the animation completes
      const timer = setTimeout(() => {
        setPrev(value);
        setFlip(false);
      }, FLIP_ANIMATION_DURATION);
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts or value changes again
    }
  }, [value, prev]); // Depend on `value` and `prev` to re-run effect

  // Pad the value with a leading zero if it's a single digit (e.g., 5 becomes 05)
  const displayValue = value.toString().padStart(2, '0');

  return (
    // Relative positioning for absolute children, consistent size for all digits
    <span className="relative w-6 h-8 text-tech-green dark:text-green-400 font-mono inline-flex items-center justify-center overflow-hidden">
      {/* Previous value, animates out */}
      <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-[${FLIP_ANIMATION_DURATION}ms] ease-in-out
                       ${flip ? 'animate-flipOut' : 'translate-y-0 opacity-100'}`}>
        {prev.toString().padStart(2, '0')}
      </span>
      {/* New value, animates in */}
      <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-[${FLIP_ANIMATION_DURATION}ms] ease-in-out
                       ${flip ? 'animate-flipIn' : 'translate-y-0 opacity-100'}`}>
        {displayValue}
      </span>
    </span>
  );
};

// --- Countdown Timer Component ---
// Displays a dynamic countdown to a specified target date.
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime(); // Convert target date string to milliseconds

    // Function to calculate and update time remaining
    const calculateTimeLeft = () => {
      const difference = target - Date.now(); // Difference in milliseconds

      if (difference <= 0) {
        setTimeLeft(null); // If countdown is over, clear time left
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft(); // Initial calculation
    const intervalId = setInterval(calculateTimeLeft, 1000); // Update every second

    // Cleanup interval on component unmount or targetDate change
    return () => clearInterval(intervalId);
  }, [targetDate]); // Effect re-runs if targetDate changes

  if (!timeLeft) {
    // Render a message if the event has passed or is ongoing
    return <p className="mt-6 text-tech-green dark:text-green-400 font-mono text-lg tracking-widest select-none">Event has started!</p>;
  }

  return (
    <div className="mt-6 flex items-baseline gap-1 text-tech-green dark:text-green-400 font-mono text-lg tracking-widest select-none">
      <span>Event starts in:</span>
      <Digit value={timeLeft.days} /><span className="opacity-70 mr-1">d</span>
      <Digit value={timeLeft.hours} /><span className="opacity-70 mr-1">h</span>
      <Digit value={timeLeft.minutes} /><span className="opacity-70 mr-1">m</span>
      <Digit value={timeLeft.seconds} /><span className="opacity-70">s</span>
    </div>
  );
};

// --- Main SliderShowcase Component ---
// Fetches event data and manages the display logic for the image slider.
export default function SliderShowcase() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Controls slide transition
  const [isFadeIn, setIsFadeIn] = useState(false);       // Controls current slide's fade-in
  const [hasError, setHasError] = useState(false);       // New state to track critical fetching errors
  const autoAdvanceTimeoutRef = useRef(null);             // Ref to hold the timeout ID for auto-advancing slides

  // Effect to fetch slide data on component mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GOOGLE_MACRO_API);
        const fetchedEvents = response.data?.events || [];
        // Map fetched data to desired slide structure
        const formattedSlides = fetchedEvents.map(event => ({
          image: event.post_link || '',
          title: event.event_heading || 'Untitled Event',
          description: event.event_description || 'No description available.',
          link: event.event_registration_link || '',
          date: event.event_date || '2025-12-31T23:59:59Z', // Default date for fallback
        }));
        setSlides(formattedSlides);
        // Store in session storage for basic caching
        sessionStorage.setItem('eventSlides', JSON.stringify(formattedSlides));
        setHasError(false); // Clear any previous error if fetch was successful
      } catch (error) {
        console.error('Failed to fetch event slides:', error);
        // Attempt to load from session storage if API fails
        const cachedSlides = sessionStorage.getItem('eventSlides');
        if (cachedSlides) {
          setSlides(JSON.parse(cachedSlides));
          setHasError(false); // If cached data exists, no error in terms of displaying content
        } else {
          // If no data from API AND no cache, set hasError to true
          setHasError(true);
          setSlides([]); // Ensure slides is empty so the component won't render
        }
      }
    };

    fetchSlides();
  }, []); // Empty dependency array means this runs once on mount

  // Function to change the current slide with animation
  const transitionToSlide = useCallback((newIndex) => {
    if (isAnimating || slides.length === 0) return; // Prevent multiple animations or when no slides

    setIsAnimating(true); // Start animation sequence
    setIsFadeIn(false);    // Fade out current slide

    // After a short delay, update the index and fade in the new slide
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFadeIn(true);
      setIsAnimating(false); // Animation sequence complete
    }, ANIMATION_DURATION);
  }, [isAnimating, slides.length]); // Dependencies for useCallback

  // Navigation functions
  const showNextSlide = useCallback(() => {
    transitionToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, slides.length, transitionToSlide]);

  const showPrevSlide = useCallback(() => {
    transitionToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, slides.length, transitionToSlide]);

  // Effect for auto-advancing slides
  useEffect(() => {
    if (!slides.length) return; // Don't auto-advance if no slides

    setIsFadeIn(true); // Ensure the current slide fades in initially
    // Clear any existing timeout to prevent multiple auto-advances
    clearTimeout(autoAdvanceTimeoutRef.current);
    // Set a new timeout to advance to the next slide
    autoAdvanceTimeoutRef.current = setTimeout(showNextSlide, SLIDE_DELAY);

    // Cleanup function: clear timeout when component unmounts or dependencies change
    return () => clearTimeout(autoAdvanceTimeoutRef.current);
  }, [currentIndex, slides, showNextSlide]); // Dependencies for auto-advance

  // Effect for keyboard navigation (Arrow Left/Right)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        showNextSlide();
      } else if (event.key === 'ArrowLeft') {
        showPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    // Cleanup event listener
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showNextSlide, showPrevSlide]); // Dependencies for keyboard navigation

  // --- Conditional Rendering Logic ---
  // If a critical error occurred and no cached data is available, return null.
  if (hasError) {
    return null;
  }

  // If slides are still loading (or no slides fetched yet and no error), show loading message.
  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <p className="text-xl animate-pulse">Loading amazing events...</p>
      </div>
    );
  }

  // Destructure current slide data for easier access
  const { image, title, description, link, date } = slides[currentIndex];

  return (
    <section
      className="relative w-full min-h-[60vh] flex justify-center items-center font-space-grotesk overflow-hidden select-none"
      aria-live="polite" // Announce changes to screen readers
      aria-roledescription="carousel"
    >
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 animate-pulseBackground"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-label={`Background image for ${title}`}
      />
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent dark:from-gray-900/80 dark:via-gray-900/70" />

      {/* Content Area */}
      <div className="relative z-10 flex items-center justify-start h-full w-full px-6 sm:px-10 lg:px-20 py-24">
        <article
          className={`rounded-xl p-8 max-w-2xl bg-white/20 backdrop-blur-md dark:bg-gray-800/70 dark:backdrop-blur-lg
                     transition-all duration-${ANIMATION_DURATION}ms ease-in-out
                     ${isFadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          role="group"
          aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-exo2 font-extrabold text-white drop-shadow-md">{title}</h1>
          <p className="mt-6 text-base text-gray-200 dark:text-gray-300 leading-relaxed max-h-[8em] overflow-hidden text-ellipsis">
            {description}
          </p>
          <CountdownTimer targetDate={date} />
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-tech-green hover:bg-primary text-white rounded-md shadow-lg transition focus:ring-2 focus:ring-offset-2 focus:ring-tech-green dark:bg-[#27ae60] dark:hover:bg-[#1DA1F2]"
            >
              Register Now
            </a>
          )}
        </article>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={showPrevSlide}
        disabled={isAnimating}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white text-4xl bg-white/20 hover:bg-white/40 py-8 px-2 rounded-full shadow-xl backdrop-blur-md transition duration-300 dark:bg-gray-700/50 dark:hover:bg-gray-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        onClick={showNextSlide}
        disabled={isAnimating}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white text-4xl bg-white/20 hover:bg-white/40 py-8 px-2 rounded-full shadow-xl backdrop-blur-md transition duration-300 dark:bg-gray-700/50 dark:hover:bg-gray-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => transitionToSlide(i)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === i ? 'bg-tech-green dark:bg-green-400 w-5' : 'bg-gray-400/70 hover:bg-gray-300/80'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={currentIndex === i ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
}