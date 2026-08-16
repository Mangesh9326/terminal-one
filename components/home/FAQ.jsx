"use client";

import React, { useState, useEffect } from "react";
import { Great_Vibes } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize the script font
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// FAQ Data extracted from the images (with logical placeholders for unreadable answers)
const faqData = [
  {
    question: "What services does MediaCore provide?",
    answer: "MediaCore offers social media strategy, content creation, platform management, paid advertising, analytics, and brand growth solutions for modern businesses.",
  },
  {
    question: "Which social media platforms do you support?",
    answer: "We work with Instagram, Facebook, TikTok, LinkedIn, X (Twitter), Pinterest, and YouTube depending on your goals and audience.",
  },
  {
    question: "How long does it take to see results?",
    answer: "Results vary depending on your specific goals and platforms, but most clients start seeing meaningful engagement growth within the first 30 to 60 days.",
  },
  {
    question: "Do you create custom content for every brand?",
    answer: "Yes, all our content is completely custom-tailored to match your brand's unique voice, aesthetic, and specific target audience.",
  },
  {
    question: "Can I choose only one service instead of a full package?",
    answer: "Absolutely! We offer flexible service options. You can pick individual services like just content creation or combine a few to suit your current needs.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Initialize AOS for the scroll-in fade effect
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);

  const toggleAccordion = (index) => {
    // If clicking the already open item, close it (set to null). Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 md:py-10 bg-white px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight tracking-tight mb-6">
            What You{" "}
            <span 
              className={`${greatVibes.className} font-normal text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] mx-1 md:mx-2`}
            >
              Need to
            </span>
            {/* Force line break on mobile to match the design exactly */}
            <br className="block sm:hidden" />
            {" "}Know?
          </h2>
          
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Choosing wisely is the way to roll! Here are some of the usual
            questions answered in a simple, easy-going style.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index}
                className="w-full border border-gray-200 rounded-[1.25rem] bg-white overflow-hidden transition-colors duration-300 hover:border-gray-300"
              >
                {/* Accordion Header (Clickable) */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-medium text-[#1a1a1a] pr-4">
                    {faq.question}
                  </span>
                  
                  {/* Plus / Minus Icon */}
                  <span className="flex-shrink-0 text-[#1a1a1a] ml-2">
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isOpen ? (
                        /* Minus Icon */
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                      ) : (
                        /* Plus Icon */
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </span>
                </button>

                {/* Accordion Body (Smooth Height Animation via CSS Grid) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? "grid-rows-[1fr] opacity-100" 
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Content padding needs to be inside the overflow-hidden div */}
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;