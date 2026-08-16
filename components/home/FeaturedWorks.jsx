"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";

// Import JSON data directly
import worksData from "../../public/data/featured-works.json";

// Initialize the script font to match the previous headings
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const FeaturedWorks = () => {
  // Start by showing 4 projects
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);

  const handleLoadMore = () => {
    // Add 4 more projects when clicked
    setVisibleCount((prev) => prev + 4);
    
    // Refresh AOS so newly rendered elements animate properly
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  return (
    <section className="w-full py-20 md:py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Heading matching previous styles */}
        <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] tracking-tight uppercase flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span>Featured</span>
            <span 
              className={`${greatVibes.className} font-normal text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] normal-case mt-1 sm:mt-0`}
            >
              Works
            </span>
          </h2>
          
          {/* Subtext matching reference image */}
          <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mt-6 leading-relaxed font-light">
            Every project in this portfolio began with a single question: what does this brand deserve to look
            like? At Terminal | One, we don't document spaces or products. We build visual systems that make
            luxury brands legible, desirable, and impossible to ignore across every screen, every platform, every
            scroll.
          </p>
        </div>

        {/* 
          Grid Layout:
          Mobile: 1 column (grid-cols-1)
          Tablet & Desktop: 2 columns (md:grid-cols-2)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16 w-full">
          {worksData.slice(0, visibleCount).map((work, index) => (
            <div 
              key={work.id}
              data-aos="fade-up"
              // Stagger the animation based on its position in the current batch of 4
              data-aos-delay={(index % 4) * 150} 
              className="flex flex-col group cursor-pointer"
            >
              {/* Image Container (Hover Effects Applied Here) */}
              <div className="relative w-full aspect-video overflow-hidden bg-gray-100 mb-5">
                
                {/* 
                  1. Primary Image (Visible by default)
                  On hover: Rotates and scales up, while fading out
                */}
                <Image
                  src={work.imagePrimary}
                  alt={`${work.title} - Primary View`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-300 ease-in-out z-10 opacity-100 group-hover:opacity-0 group-hover:scale-105 group-hover:rotate-1"
                />

                {/* 
                  2. Hover Image (Hidden by default)
                  On hover: Fades in, while rotating and scaling up
                */}
                <Image
                  src={work.imageHover}
                  alt={`${work.title} - Hover View`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-300 ease-in-out z-0 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 group-hover:rotate-1"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="text-lg md:text-xl font-medium text-[#1a1a1a] uppercase tracking-wide">
                  {work.title}
                </h3>
                <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.15em] mt-1">
                  {work.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < worksData.length && (
          <div className="mt-16 md:mt-24" data-aos="fade-up">
            <button
    onClick={handleLoadMore}
    className="w-auto px-6 py-3.5 md:px-10 md:py-4 bg-transparent border border-gray-300 text-[#1a1a1a] text-xs md:text-sm uppercase tracking-widest hover:text-[#1a1a1a] hover:bg-(--accent) transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95"
  >
              Load More Works
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedWorks;