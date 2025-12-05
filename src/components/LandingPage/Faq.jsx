import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
// 🚀 Removed HoverBorderGradient component import

// =========================================================================
// FAQ Data (No Change)
// =========================================================================

const faqs = [
  {
    question: "How can I join the TechQuanta community?",
    answer:
      "Connect with us on **Discord** for real-time interaction, follow our **GitHub organization** for project updates, and stay informed via our **LinkedIn page**. You'll find all the direct links on our homepage!",
  },
  {
    question: "What does TechQuanta offer for students and beginners?",
    answer:
      "We're dedicated to empowering new talent! We offer **beginner-friendly learning content**, host **live workshops**, provide opportunities to contribute to **real-world open-source projects**, and facilitate **community mentorship** across diverse tech domains.",
  },
  {
    question: "Do I need to be an expert or have prior experience to join?",
    answer:
      "Absolutely not! TechQuanta is a community built on learning and collaboration. We warmly welcome individuals of all skill levels, from **complete beginners eager to learn** to seasoned learners looking to contribute.",
  },
  {
    question: "How can I start contributing to TechQuanta’s open-source projects?",
    answer:
      "It's easy to get started! Begin by exploring our **GitHub repositories**, paying special attention to issues labeled '**Good First Issue**' for easy entry points. Remember to review our **CONTRIBUTING.md** guidelines, and feel free to jump into our **Discord server** for direct guidance and support from the community.",
  },
  {
    question: "What types of projects does the community actively work on?",
    answer:
      "Our community engages in a wide array of innovative projects, spanning areas like **Web Development**, cutting-edge **AI/ML applications**, robust **DevOps practices**, insightful **Data Science initiatives**, and the creation of valuable **open-source educational tools**.",
  },
  {
    question: "Are there opportunities for me to build my profile and gain recognition?",
    answer:
    "Definitely! We believe in recognizing our contributors. You can gain visibility through our **community leaderboard**, earn **Discord badges**, get featured in our **LinkedIn spotlights**, and receive **certificates of contribution** for your efforts.",
  },
];

// =========================================================================
// FAQ Item Component - Removed HoverBorderGradient
// =========================================================================

const FAQItem = ({ faq, index, openIndex, toggleFAQ }) => {
  const isOpen = openIndex === index;

  // Define class strings clearly on one line to prevent extra whitespace
  const transitionClasses = 'overflow-hidden transition-[max-height,padding,border] duration-500 ease-in-out';
  const baseAnswerClasses = 'px-5 sm:px-6 text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-gray-700';

  // Removed border-t and related border classes to eliminate the internal separator line
  const answerStateClasses = isOpen
    ? 'max-h-96 py-3 sm:py-4'
    : 'max-h-0 pt-0 pb-0';

  // Combine classes for use in the div
  const answerClasses = `${transitionClasses} ${answerStateClasses} ${baseAnswerClasses}`;

  // Function to replace **bold** markdown with HTML <strong>
  const getAnswerHtml = (answer) => {
    return { __html: answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') };
  };

  return (
    // Replaced HoverBorderGradient with a standard div
    <div
      className="p-0 border-none bg-white dark:bg-gray-800 rounded-2xl transition-all duration-200 ease-in-out"
    >
      <button
        onClick={() => toggleFAQ(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className="w-full flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 text-left text-gray-900 dark:text-gray-100 font-medium border-none focus:outline-none transition-colors duration-200 rounded-2xl"
      >
        <span className="text-lg sm:text-xl font-semibold">{faq.question}</span>
        <div
          className={`flex-shrink-0 ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        className={answerClasses}
      >
        <p className="leading-relaxed" dangerouslySetInnerHTML={getAnswerHtml(faq.answer)} />
      </div>
    </div>
  );
}

// =========================================================================
// Main FAQ Component (Two Columns)
// =========================================================================

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const halfLength = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, halfLength);
  const col2 = faqs.slice(halfLength);


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-12 w-full relative bg-transparent">

      <h2 className="text-3xl font-extrabold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white relative z-10">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">

        {/* Column 1 */}
        <div className="space-y-4">
          {col1.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              openIndex={openIndex}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>

        {/* Column 2 (Index offset is needed to correctly map to the faqs array indices) */}
        <div className="space-y-4">
          {col2.map((faq, index) => (
            <FAQItem
              key={index + halfLength}
              faq={faq}
              index={index + halfLength}
              openIndex={openIndex}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
