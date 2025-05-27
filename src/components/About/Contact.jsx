import React, { useState } from "react";
import { motion } from "framer-motion";

const EMAIL_ACCESS_KEY = import.meta.env.VITE_EMAIL_ACCESS_KEY;

const Loading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center h-64 w-full font-sans"
  >
    <svg
      className="animate-spin h-12 w-12 text-[#00BFFF] dark:text-[#2ECC71]"
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
    <p className="mt-4 font-semibold text-lg text-[#00BFFF] select-none">Sending...</p>
  </motion.div>
);

const ContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

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
        setHasError(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      setHasError(true);
    }
  };

  if (isSubmitting) return <Loading />;

  if (isSubmitted) {
    return (
      <div className="text-center font-sans text-transparent bg-clip-text bg-transparent font-semibold text-xl min-h-screen flex items-center justify-center bg-transparent">
        Thank you! We'll be in touch soon.
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-transparent px-4">
        <div className="text-center font-sans text-red-400">
          <p className="text-xl font-semibold mb-4">
            Email couldn't be sent — server issue.
          </p>
          <p className="text-sm">
            Please try again later or{" "}
            <a
              href="mailto:developer@example.com"
              className="text-[#00BFFF] underline hover:text-[#2ECC71]"
            >
              report a bug
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen  flex items-center justify-center px-4">
      <form
        onSubmit={handleFinalSubmit}
        className="group bg-transparent backdrop-blur w-full max-w-md p-8 space-y-8 rounded-xl border-none  transition-colors duration-300 "
      >
        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#8E44AD] from-[#2ECC71 font-sans transition-colors duration-300">
          Contact Us
        </h2>

        <p className="text-center text-sm font-sans text-gray-400">
          Need a faster response?{" "}
          <a
            href="https://discord.com/invite/WK3aftq5vg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00BFFF] underline hover:text-[#2ECC71] transition"
          >
            Join our Discord
          </a>
        </p>

        {step === 1 && (
          <div className="relative w-full h-16 bg-black border border-transparent bg-gradient-to-br from-[#00BFFF]/20 to-[#8E44AD]/20 rounded-md overflow-hidden transition-colors duration-300 group-hover:from-[#2ECC71]/20 group-hover:to-[#27AE60]/20">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-full text-white px-4 pt-5 bg-transparent focus:outline-none font-sans placeholder-transparent"
            />
            <label
              className={`absolute left-4 text-sm text-[#00BFFF] transition-all 
                duration-200 pointer-events-none 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#00BFFF] group-hover:text-[#2ECC71] ${
                  formData.name ? "top-1 text-sm" : ""
                }`}
            >
              Your Name
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 h-full bg-[#00BFFF] text-black font-bold px-6 text-2xl hover:bg-[#8E44AD] hover:text-white transition-colors duration-300 group-hover:bg-[#2ECC71] group-hover:text-black"
            >
              &gt;
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="relative w-full h-16 bg-black border border-transparent bg-gradient-to-br from-[#00BFFF]/20 to-[#8E44AD]/20 rounded-md overflow-hidden transition-colors duration-300 group-hover:from-[#2ECC71]/20 group-hover:to-[#27AE60]/20">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-full text-white px-4 pt-5 bg-transparent focus:outline-none font-sans placeholder-transparent"
            />
            <label
              className={`absolute left-4 text-sm text-[#00BFFF] transition-all 
                duration-200 pointer-events-none 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#00BFFF] group-hover:text-[#2ECC71] ${
                  formData.email ? "top-1 text-sm" : ""
                }`}
            >
              Email Address
            </label>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 h-full bg-[#00BFFF] text-black font-bold px-6 text-2xl hover:bg-[#8E44AD] hover:text-white transition-colors duration-300 group-hover:bg-[#2ECC71] group-hover:text-black"
            >
              &gt;
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="relative h-40 bg-black border border-transparent bg-gradient-to-br from-[#00BFFF]/20 to-[#8E44AD]/20 rounded-md overflow-hidden transition-colors duration-300 group-hover:from-[#2ECC71]/20 group-hover:to-[#27AE60]/20">
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full h-full text-white p-4 pt-6 bg-transparent resize-none focus:outline-none font-sans placeholder-transparent"
              ></textarea>
              <label
                className={`absolute left-4 text-sm text-[#00BFFF] transition-all 
                  duration-200 pointer-events-none 
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                  peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#00BFFF] group-hover:text-[#2ECC71] ${
                    formData.message ? "top-1 text-sm" : ""
                  }`}
              >
                Your Message
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#00BFFF] hover:bg-[#8E44AD] text-black font-bold py-4 rounded-md text-lg transition-colors duration-300 shadow-lg group-hover:bg-[#2ECC71] group-hover:text-black"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
