import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// =========================================================================
// FAQ Data
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
// FAQ Item Component
// =========================================================================

const FAQItem = ({ faq, index, openIndex, toggleFAQ }) => {
    const isOpen = openIndex === index;
    
    // Smooth collapse/expand using max-height for CSS transition
    const answerClasses = `
        overflow-hidden transition-[max-height,padding,border] duration-500 ease-in-out
        ${isOpen ? 'max-h-96 py-3 sm:py-4 border-t border-purple-100 dark:border-gray-600' : 'max-h-0 pt-0 pb-0 border-t-0'}
        px-5 sm:px-6 text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-gray-700
    `;

    // Function to replace **bold** markdown with HTML <strong>
    const getAnswerHtml = (answer) => {
        return { __html: answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') };
    };

    return (
        <div 
            key={index}
            className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-2xl transition-all duration-200 ease-in-out" 
        >
            <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="w-full flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 text-left text-purple-800 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
    
    // Split the FAQs into two equal halves for the two-column layout
    const halfLength = Math.ceil(faqs.length / 2);
    const col1 = faqs.slice(0, halfLength);
    const col2 = faqs.slice(halfLength);


  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-12 w-full">
      <h2 className="text-3xl font-extrabold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      {/* Grid container for two columns on medium and larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
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
