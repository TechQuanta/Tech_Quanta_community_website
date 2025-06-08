import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Ensure this icon library is installed

// ---
// Define your Frequently Asked Questions here
// ---
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

// ---
// Animation variants for the staggered appearance of FAQ items on initial render
// ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Slightly reduced stagger for faster initial reveal
    },
  },
};

// ---
// Animation variants for each individual FAQ item's entry (on initial render)
// ---
const itemEntryVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ---
// Animation variants for the answer content (smooth collapse/expand)
// Using `initial` and `exit` for `AnimatePresence`
// ---
const answerVariants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto", // Let Framer Motion calculate height dynamically
    opacity: 1,
    transition: {
      duration: 0.35, // Slightly faster transition
      ease: "easeInOut",
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3, // Slightly faster on exit
      ease: "easeInOut",
    },
  },
};

// ---
// FAQ Component Definition
// ---
export default function FAQComponent() {
  // Manages the index of the currently open FAQ item. Null means no item is open.
  const [openIndex, setOpenIndex] = useState(null);

  /**
   * Toggles the open/closed state of an FAQ item.
   * If the clicked item is already open, it closes it. Otherwise, it opens it.
   * @param {number} index - The index of the FAQ item to toggle.
   */
  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemEntryVariants} // Apply entry animation variant for each item
            className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-200 ease-in-out" // Reduced duration for overall container transition
          >
            <button
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
              className="w-full flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 text-left text-purple-800 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <span className="text-lg sm:text-xl font-semibold">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-2"
              >
                <ChevronDown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  id={`faq-panel-${index}`}
                  role="region"
                  variants={answerVariants} // Use the new answerVariants
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="px-5 py-3 sm:px-6 sm:py-4 text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-gray-700 border-t border-purple-100 dark:border-gray-600"
                >
                  <p className="leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}