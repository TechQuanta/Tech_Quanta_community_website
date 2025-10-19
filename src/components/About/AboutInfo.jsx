import React, { useState } from 'react';
import { Users, Code, Globe, Mail, Send } from 'lucide-react';

// PLACEHOLDER KEY: Replace this with your actual Web3Forms access key
const EMAIL_ACCESS_KEY = process.env.VITE_APP_EMAIL_ACCESS_KEY;

// --- Placeholder Data & Assets ---

const ABOUT_IMAGE_URL = "http://localhost:5173/src/assets/lightlogo.png";
const communityValues = [
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with developers globally to share ideas and collaborate.",
    color: "text-green-400",
  },
  {
    icon: Code,
    title: "Open Source Projects",
    description: "Build and contribute to meaningful projects that power the future.",
    color: "text-teal-400",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Empower developers worldwide and foster technology for good.",
    color: "text-green-400",
  },
];

// Loading state component
const Loading = () => (
  <div
    className="flex flex-col items-center justify-center h-full w-full py-10 min-h-[500px]"
  >
    <svg
      className="animate-spin h-12 w-12 text-[#00BFFF]" // Using app's accent color
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
    <p className="mt-4 font-semibold text-lg text-white select-none font-mono">Sending...</p>
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
    // Clear error for the field being edited
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  // Handles API submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop submission if validation fails

    setIsSubmitting(true);
    setHasError(false);

    // Guardrail: Inform the user if the key is still a placeholder
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

  // Resets all state for a new message or retry
  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
    setIsSubmitted(false);
    setHasError(false);
    setValidationErrors({});
  };

  if (isSubmitting) return <Loading />;

  // NOTE: Keeping a slight background for success/error messages for visual clarity
  if (isSubmitted) {
    return (
      <div
        className="p-6 bg-gray-900 border border-[#00BFFF] rounded-xl shadow-2xl transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[500px]"
      >
        <Send className="w-12 h-12 text-green-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-[#00BFFF] mb-4 font-mono">
          Message Sent!
        </h2>
        <p className="text-gray-300 font-inter text-lg mb-6">
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
                className="px-6 py-3 font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
            >
                Back to About
            </button>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="p-6 bg-gray-900 border border-red-500 rounded-xl shadow-2xl transition-all duration-500 text-center flex flex-col items-center justify-center min-h-[500px]">
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
        <p className="text-sm text-gray-300 mb-6">
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

  // Common input classes
  const inputBaseClasses = "peer w-full h-full text-white px-4 pt-5 bg-transparent focus:outline-none placeholder-transparent font-inter";
  const labelBaseClasses = "absolute left-4 text-sm text-gray-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm";

  return (
    // Updated container to be transparent and less bulky
    <div className="p-0 bg-transparent rounded-xl transition-all duration-500 min-h-[500px]">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div className={`relative w-full h-16 bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${validationErrors.name ? 'border-red-500' : 'border border-gray-700 focus-within:border-[#00BFFF]'}`}>
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
            className={`${labelBaseClasses} ${validationErrors.name ? 'text-red-500' : 'peer-focus:text-[#00BFFF]'} ${formData.name ? "top-1 text-sm text-[#00BFFF]" : ""}`}
          >
            Your Name
          </label>
        </div>
        {validationErrors.name && <p className="text-red-400 text-xs mt-1 -mb-4">{validationErrors.name}</p>}

        {/* Email Input */}
        <div className={`relative w-full h-16 bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${validationErrors.email ? 'border-red-500' : 'border border-gray-700 focus-within:border-[#00BFFF]'}`}>
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
            className={`${labelBaseClasses} ${validationErrors.email ? 'text-red-500' : 'peer-focus:text-[#00BFFF]'} ${formData.email ? "top-1 text-sm text-[#00BFFF]" : ""}`}
          >
            Email Address
          </label>
        </div>
        {validationErrors.email && <p className="text-red-400 text-xs mt-1 -mb-4">{validationErrors.email}</p>}

        {/* Message Textarea */}
        <div className={`relative h-40 bg-gray-800 rounded-lg overflow-hidden transition-colors duration-300 ${validationErrors.message ? 'border-red-500' : 'border border-gray-700 focus-within:border-[#00BFFF]'}`}>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full h-full text-white p-4 pt-6 bg-transparent resize-none focus:outline-none placeholder-transparent font-inter"
          ></textarea>
          <label
            className={`absolute left-4 text-sm text-gray-400 transition-all duration-200 pointer-events-none 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm ${validationErrors.message ? 'text-red-500' : 'peer-focus:text-[#00BFFF]'} ${
                formData.message ? "top-1 text-sm text-[#00BFFF]" : ""
              }`}
          >
            Your Message
          </label>
        </div>
        {validationErrors.message && <p className="text-red-400 text-xs mt-1 -mb-4">{validationErrors.message}</p>}
        
        {/* Submit Button - Updated with consistent hover shadow */}
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl space-x-2"
        >
          <Send className="w-5 h-5" /> <span>Send Message</span>
        </button>

        {/* Cancel Button */}
        <button
            type="button"
            onClick={onBack}
            className="w-full p-2 mt-2 text-sm text-gray-400 hover:text-white transition-colors"
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
  const isDark = true; // Hardcoded dark theme for consistent look

  const TextContent = (
    <div className="text-left space-y-4">
      <h3 className={`text-lg mb-6 font-space-grotesk ${isDark ? "text-gray-400" : "text-gray-700"}`}>
        A community initiative empowering people to explore open source, stay motivated, and grow together.
      </h3>

      <p className={`leading-relaxed font-space-grotesk ${isDark ? "text-gray-200" : "text-gray-800"}`}>
        **Tech Quanta** is a passionate online community that inspires and connects individuals to dive into the
        world of **open source**. Whether you're just starting out or already building, we provide the support and
        motivation to keep you moving forward.
      </p>

      <p className={`leading-relaxed text-sm font-space-grotesk ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Alongside open-source awareness, we offer valuable services including graphic designing, website
        development, online courses, events, and seminars—all delivered remotely to ensure accessibility for
        everyone.
      </p>

      <p className={`leading-relaxed text-sm font-space-grotesk ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        Join us to learn, build, and thrive in a space where innovation meets opportunity—completely online.
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen py-16 px-6 md:px-12 lg:px-24 font-inter transition-colors duration-300 ${
        isDark ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}
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
          
          {/* NEW: Flex container for Title, Separator, and Contact Button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center -mt-8">
            {/* Title and Separator */}
            <div>
              <h2 className="text-4xl font-extrabold text-[#00BFFF] font-mono">About</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00BFFF] to-[#0034FF] rounded-full mt-2 sm:mt-0 sm:mb-2"></div>
            </div>
            
            {/* Contact Button (Now next to About, visible only when form is hidden) */}
            {!showContactForm && (
              <button
                onClick={() => setShowContactForm(true)}
                // UPDATED: Using the requested theme style: white background, black text, with nice hover effects
                className="mt-4 sm:mt-0 px-4 py-2 text-sm font-semibold rounded-lg bg-white text-black hover:bg-gray-200 hover:shadow-2xl transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg"
              >
                <Mail className="w-4 h-4 mr-2" /> Contact Us
              </button>
            )}
          </div>
          
          {/* Conditional Rendering Block for main content/form */}
          <div className='min-h-[500px] mt-8'> 
            {showContactForm ? (
              <ContactForm onBack={() => setShowContactForm(false)} />
            ) : (
              // Original Text Content only
              <div>
                {TextContent}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {communityValues.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              // Updated to use bg-transparent and border-gray-800 for a clean, non-boxy look
              className={`flex flex-col items-center max-w-xs mx-auto p-6 rounded-xl bg-transparent  hover:border-[#00BFFF] transition-all duration-300 transform  shadow-lg`}
            >
              <Icon className={`${color} text-5xl mb-4 w-12 h-12 transition-colors duration-300`} />
              <h4 className="text-xl font-bold mb-3 font-mono text-white">{title}</h4>
              <p className={`text-sm px-2 text-gray-400`}>
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
