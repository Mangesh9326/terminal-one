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

const Contact = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);

  return (
    <section className="w-full py-20 md:py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Text Content & Contact Details */}
        <div data-aos="fade-right" className="flex flex-col items-start">

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-bold text-[#1a1a1a] mb-6 tracking-tight flex flex-wrap items-center gap-x-3 md:gap-x-4 leading-none">
            <span>Contact</span>
            <span 
              className={`${greatVibes.className} font-normal text-6xl md:text-7xl lg:text-[5rem] text-[#2d2d2d] mt-1 md:mt-2`}
            >
              MediaCore
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-lg md:text-xl max-w-md leading-relaxed font-light mb-12">
            Have questions or ideas? Our team is here to help. Let's turn your vision into momentum.
          </p>

          {/* Direct Contact Details */}
          <div className="flex flex-col gap-8 w-full">
            {/* Email Block */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm md:text-base">Send an email</span>
              <a 
                href="mailto:OJES@TERMINALONESTUDIO.COM" 
                // Using font-mono and wide tracking to match the structured font style in the image
                className="font-mono text-lg md:text-xl lg:text-2xl text-[#1a1a1a] tracking-widest uppercase hover:text-gray-500 transition-colors duration-300 w-fit break-all"
              >
                OJES@TERMINALONESTUDIO.COM
              </a>
            </div>

            {/* Phone Block */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm md:text-base">Phone</span>
              <a 
                href="tel:+918879900803" 
                className="font-sans text-xl md:text-2xl font-medium text-[#1a1a1a] hover:text-gray-500 transition-colors duration-300 w-fit"
              >
                +91 8879900803
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Form Card */}
        <div data-aos="fade-left" className="w-full">
          <div className="bg-[#f4f4f5] p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-sm w-full">
            
            <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-6">
              Let's Talk Growth
            </h3>

            <form className="flex flex-col gap-4">
              
              {/* Name Row (Stacked on mobile, side-by-side on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full name" 
                  className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#84ea00]/20 transition-all text-sm md:text-base"
                />
                <input 
                  type="text" 
                  placeholder="Last name" 
                  className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#84ea00]/20 transition-all text-sm md:text-base"
                />
              </div>

              {/* Email */}
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#84ea00]/20 transition-all text-sm md:text-base"
              />

              {/* Website */}
              <input 
                type="url" 
                placeholder="Website" 
                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#84ea00]/20 transition-all text-sm md:text-base"
              />

              {/* Message Textarea */}
              <textarea 
                placeholder="Right a message" 
                rows="4"
                className="w-full px-5 py-3.5 bg-white border border-transparent rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#84ea00]/20 transition-all text-sm md:text-base resize-y"
              ></textarea>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#84ea00] hover:bg-[#76d100] text-black font-medium text-base py-4 rounded-xl transition-all duration-300 mt-2 shadow-sm hover:shadow active:scale-[0.98]"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;