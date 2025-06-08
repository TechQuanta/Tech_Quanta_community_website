import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className="flex flex-col rounded-3xl border shadow-xl backdrop-blur-lg max-w-sm w-full mx-auto bg-white/40 dark:bg-white/5 border-white/10 transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex justify-between items-center text-left font-semibold text-lg tracking-tight text-purple-700 dark:text-purple-300 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          className="bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-300 text-sm leading-relaxed p-6 rounded-b-3xl shadow-lg border-t border-purple-400"
        >
          {answer}
        </div>
      )}
    </article>
  );
}
