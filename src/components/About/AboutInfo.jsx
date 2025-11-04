import React, { useState } from 'react';
// Note: Removed Sun/Moon as we removed the toggle functionality
import { Users, Code, Globe, Mail, Send } from 'lucide-react';

// PLACEHOLDER KEY: Replace this with your actual Web3Forms access key
const EMAIL_ACCESS_KEY = process.env.VITE_APP_EMAIL_ACCESS_KEY;

// --- Placeholder Data & Assets ---

// Using a single logo URL now, as theme state is removed.
const ABOUT_IMAGE_URL = "/community.png"; 

const communityValues = [
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with developers globally to share ideas and collaborate.",
    // Base is text-green-500 (light mode), dark: is text-green-400 (dark mode)
    color: "text-green-500 dark:text-green-400",
  },
  {
    icon: Code,
    title: "Open Source Projects",
    description: "Build and contribute to meaningful projects that power the future.",
    color: "text-teal-500 dark:text-teal-400",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Empower developers worldwide and foster technology for good.",
    color: "text-blue-500 dark:text-blue-400",
  },
];

// Loading state component
// Class names adjusted to be system-aware (base classes for light, dark: prefix for dark)
const Loading = () => (
  <div
    // Base BG is white, dark:BG is dark gray
    className="flex flex-col items-center justify-center h-full w-full py-10 min-h-[500px] bg-white dark:bg-gray-900"
  >
    <svg
      className="animate-spin h-12 w-12 text-[#00BFFF]" // Accent color remains constant
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    {/* Base text is black, dark:text is white */}
    <p className="mt-4 font-semibold text-lg text-black dark:text-white select-none font-mono">Sending...</p>
  </div>
);

// Simplified Single-Step Contact Form Component
const ContactForm = ({ onBack }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format.";
    if (!formData.message.trim()) errors.message = "Message cannot be empty.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setHasError(false);

    if (EMAIL_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
        console.error("API Key is a placeholder. Skipping submission.");
        setIsSubmitting(false);
        setHasError(true);
        return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: EMAIL_ACCESS_KEY,
          ...formData,
        }),
      });

      const result = await response.json();
      setIsSubmitting(false);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error("Submission failed:", result);
        setHasError(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setHasError(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    setIsSubmitted(false);
    setHasError(false);
    setValidationErrors({});
  };

  if (isSubmitting) return <Loading />;

  // Success State: Adaptive BG and text
  if (isSubmitted) {
    return (
      <div
        className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-2xl transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[500px]"
      >
        <Send className="w-12 h-12 text-green-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-[#00BFFF] mb-4 font-mono">
          Message Sent!
        </h2>
        {/* Adaptive secondary text color */}
        <p className="text-gray-700 dark:text-gray-300 font-inter text-lg mb-6">
          Thanks for reaching out! We've received your message and will get back to you as soon as possible.
        </p>
        <div className='flex space-x-4'>
            <button
                onClick={resetForm}
                className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-green-600 to-green-400 hover:ring-2 ring-green-400 text-white transition-all duration-300 shadow-xl"
            >
                Send Another
            </button>
            <button
                onClick={onBack}
                // Adaptive button styling
                className="px-6 py-3 font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-all duration-300"
            >
                Back to About
            </button>
        </div>
      </div>
    );
  }

  // Error State: Adaptive BG and text
  if (hasError) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 border border-red-500 rounded-xl shadow-2xl transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[500px]">
        <svg
            className="w-12 h-12 text-red-500 mx-auto mb-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-semibold text-red-400 mb-4 font-mono">
          Submission Error!
        </p>
        {/* Adaptive secondary text color */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
          The email couldn't be sent. Please ensure you have replaced the placeholder API key and try again.
        </p>
        <button
          onClick={resetForm}
          className="mt-6 px-6 py-3 font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 shadow-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Common input classes: Adaptive BG, text, and border
  // Input base: Light mode (white bg, black text)
  // Input dark: Dark mode (gray-800 bg, white text)
  const inputBaseClasses = "peer w-full h-full text-black dark:text-white px-4 pt-5 bg-white dark:bg-gray-800 focus:outline-none placeholder-transparent font-inter";
  
  // Label base: Light mode (gray-500 text), Dark mode (gray-400 text)
  const labelBaseClasses = "absolute left-4 text-sm text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm";
  
  // Focus color remains consistent
  const focusColorClasses = "peer-focus:text-[#00BFFF]";


  return (
    <div className="p-0 bg-transparent rounded-xl transition-all duration-500 min-h-[500px]">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        {/* Base border is gray-300, dark:border is gray-700 */}
        <div className={`relative w-full h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${validationErrors.name ? 'border-red-500' : 'border border-gray-300 dark:border-gray-700 focus-within:border-[#00BFFF]'}`}>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className={inputBaseClasses}
          />
          <label
            className={`${labelBaseClasses} ${validationErrors.name ? 'text-red-500' : focusColorClasses} ${formData.name ? "top-1 text-sm text-[#00BFFF]" : ""}`}
          >
            Your Name
          </label>
        </div>
        {validationErrors.name && <p className="text-red-400 text-xs mt-1 -mb-4">{validationErrors.name}</p>}

        {/* Email Input */}
        <div className={`relative w-full h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${validationErrors.email ? 'border-red-500' : 'border border-gray-300 dark:border-gray-700 focus-within:border-[#00BFFF]'}`}>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            className={inputBaseClasses}
          />
          <label
            className={`${labelBaseClasses} ${validationErrors.email ? 'text-red-500' : focusColorClasses} ${formData.email ? "top-1 text-sm text-[#00BFFF]" : ""}`}
          >
            Email Address
          </label>
        </div>
        {validationErrors.email && <p className="text-red-400 text-xs mt-1 -mb-4">{validationErrors.email}</p>}

        {/* Message Textarea */}
        <div className={`relative h-40 bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${validationErrors.message ? 'border-red-500' : 'border border-gray-300 dark:border-gray-700 focus-within:border-[#00BFFF]'}`}>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full h-full text-black dark:text-white p-4 pt-6 bg-white dark:bg-gray-800 resize-none focus:outline-none placeholder-transparent font-inter"
          ></textarea>
          <label
            className={`absolute left-4 text-sm text-gray-500 dark:text-gray-400 transition-all duration-200 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm ${validationErrors.message ? 'text-red-500' : focusColorClasses} ${
                formData.message ? "top-1 text-sm text-[#00BFFF]" : ""
              }`}
          >
            Your Message
          </label>
        </div>
        {validationErrors.message && <p className="text-red-400 text-xs mt-1 -mb-4">{validationErrors.message}</p>}
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl space-x-2"
        >
          <Send className="w-5 h-5" /> <span>Send Message</span>
        </button>

        {/* Cancel Button - Adaptive text color for hover and base */}
        <button
            type="button"
            onClick={onBack}
            className="w-full p-2 mt-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Cancel and Return to About
          </button>
      </form>
    </div>
  );
};


// Main Application Component
const App = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  // Removed isDark state entirely. Theme is now determined by the system.

  const TextContent = (
    <div className="text-left space-y-4">
      {/* Base: light mode text-gray-700, Dark: dark mode text-gray-400 */}
      <h3 className="text-lg mb-6 font-space-grotesk text-gray-700 dark:text-gray-400">
        A community initiative empowering people to explore open source, stay motivated, and grow together.
      </h3>

      {/* Base: light mode text-gray-800, Dark: dark mode text-gray-200 */}
      <p className="leading-relaxed font-space-grotesk text-gray-800 dark:text-gray-200">
        **Tech Quanta** is a passionate online community that inspires and connects individuals to dive into the
        world of **open source**. Whether you're just starting out or already building, we provide the support and
        motivation to keep you moving forward.
      </p>

      {/* Base: light mode text-gray-700, Dark: dark mode text-gray-300 */}
      <p className="leading-relaxed text-sm font-space-grotesk text-gray-700 dark:text-gray-300">
        Alongside open-source awareness, we offer valuable services including graphic designing, website
        development, online courses, events, and seminars—all delivered remotely to ensure accessibility for
        everyone.
      </p>

      {/* Base: light mode text-gray-700, Dark: dark mode text-gray-300 */}
      <p className="leading-relaxed text-sm font-space-grotesk text-gray-700 dark:text-gray-300">
        Join us to learn, build, and thrive in a space where innovation meets opportunity—completely online.
      </p>
    </div>
  );

  return (
    <div
      // Adaptive Root Container: Base BG is white, Dark BG is [#121212]
      className={`min-h-screen py-16 px-6 md:px-12 lg:px-24 font-inter transition-colors duration-300 bg-white text-black dark:bg-[#121212] dark:text-white`}
    >
      {/* About Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start ">
        
        {/* Left Column: Image (ALWAYS REMAINS) */}
        <div className="flex justify-center md:justify-start sticky top-10">
          <img
            src={ABOUT_IMAGE_URL}
            alt="Tech Quanta About Us Placeholder"
            className="w-full max-w-sm h-auto rounded-xl shadow-2xl object-cover transition-transform duration-500 "
          />
        </div>

        {/* Right Column: Text Content or Form (CONDITIONAL AREA) */}
        <div className="text-left">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center -mt-8">
            {/* Title and Separator */}
            <div>
              <h2 className="text-4xl font-extrabold text-[#00BFFF] font-mono">About</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00BFFF] to-[#0034FF] rounded-full mt-2 sm:mt-0 sm:mb-2"></div>
            </div>
            
            {!showContactForm && (
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-4 sm:mt-0 px-4 py-2 text-sm font-semibold rounded-lg bg-white text-black hover:bg-gray-200 hover:shadow-2xl transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg"
              >
                <Mail className="w-4 h-4 mr-2" /> Contact Us
              </button>
            )}
          </div>
          
          <div className='min-h-[500px] mt-8'> 
            {showContactForm ? (
              <ContactForm onBack={() => setShowContactForm(false)} />
            ) : (
              <div>
                {TextContent}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20  dark:border-gray-700 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-[#00BFFF] font-mono">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {communityValues.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              // Card: Base is white BG, Dark is transparent BG. Base border is gray-200, Dark is gray-800
              className={`flex flex-col items-center max-w-xs mx-auto p-6 rounded-xl bg-white dark:bg-transparent  transition-all duration-300 transform `}
            >
              <Icon className={`${color} text-5xl mb-4 w-12 h-12 transition-colors duration-300`} />
              {/* Title: Base is black, Dark is white */}
              <h4 className={`text-xl font-bold mb-3 font-mono text-black dark:text-white`}>{title}</h4>
              {/* Description: Base is gray-600, Dark is gray-400 */}
              <p className={`text-sm px-2 text-gray-600 dark:text-gray-400`}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;