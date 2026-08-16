"use client";

import React, { useEffect } from "react";
import { Great_Vibes } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize the script font
const greatVibes = Great_Vibes({ 
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const CTA = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // Smooth 0.8s animation
      once: true,    // Animate only once when scrolling down
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  return (
    <section className="w-full py-20 md:py-8 bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Heading */}
        <h2 
          data-aos="fade-up"
          className="text-3xl min-[400px]:text-4xl sm:text-5xl md:text-7xl flex flex-row flex-nowrap whitespace-nowrap font-bold text-[#1a1a1a] mb-6 items-center justify-center gap-2 sm:gap-4 tracking-tight"
        >
          <span>Social Media</span>
          
          <span 
            className={`${greatVibes.className} text-4xl min-[400px]:text-5xl sm:text-6xl md:text-[5.5rem] text-[#2d2d2d] font-normal tracking-normal`}
          >
            Strategy
          </span>
        </h2>

        {/* Subtext */}
        <p 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="text-gray-500 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light"
        >
          MediaCore helps brands build visibility, engagement, and trust
          across social platforms with smart strategy.
        </p>

        {/* CTA Button */}
        <button 
          data-aos="fade-up" 
          data-aos-delay="200"
          className="group bg-[#84ea00] hover:bg-[#76d100] text-black font-medium text-base md:text-lg px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
        >
          Get Started Free
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        
      </div>
    </section>
  );
};

export default CTA;