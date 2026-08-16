"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize the script font to match the previous section
const greatVibes = Great_Vibes({ 
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Success Stories Data
// Make sure to add your actual images to the public folder based on these paths
const successStories = [
  {
    id: 1,
    brand: "GlamoStudio",
    stat1: "3x sales in 60 days",
    stat2: "40K+ new followers",
    image: "/images/webp/4-2000.webp", 
  },
  {
    id: 2,
    brand: "WildBrew",
    stat1: "2.5x monthly orders",
    stat2: "+325% DMs from Ads",
    image: "/images/webp/2-2000.webp",
  },
  {
    id: 3,
    brand: "GrindFuel",
    stat1: "$72K in 90 days",
    stat2: "+175% follower growth",
    image: "/images/webp/3-2000.webp",
  },
];

const SuccessStories = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
  }, []);

  return (
    <section className="w-full py-20 md:py-20 bg-[#fafafa] px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Responsive Heading */}
        <h2 
          data-aos="fade-up"
          className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a]"
        >
          <span>Measurable</span>
          <span 
            className={`${greatVibes.className} text-5xl md:text-6xl lg:text-7xl font-normal text-[#2d2d2d] mt-2 md:mt-0`}
          >
            Success
          </span>
          <span>Stories</span>
        </h2>

        {/* Subheading */}
        <p 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="text-gray-500 text-sm md:text-base max-w-2xl mt-6 leading-relaxed font-light"
        >
          Every case study clearly shows what can happen when you plan 
          and execute things thoughtfully and carefully.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-16">
          {successStories.map((story, index) => (
            <div 
              key={story.id}
              data-aos="fade-up"
              data-aos-delay={index * 150 + 200}
              // Fixed height for the card so the image fills the background entirely
              className="relative flex flex-col rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group h-[400px] sm:h-[450px]"
            >
              {/* Image Container (Now fills the entire card) */}
              <div className="absolute inset-0 bg-gray-100">
                <Image
                  src={story.image}
                  alt={story.brand}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                />
              </div>

              {/* Seamless Tall Gradient Overlay */}
              {/* Spans 60% of the card height, starting solid white at bottom, holding 95% opacity at the 40% mark, then fading out */}
              <div className="absolute inset-x-0 bottom-0 lg:h-[35%] h-[45%] bg-gradient-to-t from-white via-white/95 via-40% to-transparent pointer-events-none z-10"></div>

              {/* Text Content (Positioned at the absolute bottom over the gradient) */}
              <div className="absolute inset-x-0 bottom-0 pb-5 px-6 lg:px-5 z-20 flex flex-col">
                <h3 className="text-xl sm:text-xl font-semibold text-[#1a1a1a] mb-4 lg:text-center text-left">
                  {story.brand}
                </h3>
                
                {/* Stats layout: Centered with space between */}
                <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start font-medium gap-2 text-xs sm:text-sm text-gray-500 px-2 md:px-4">
                  <span>{story.stat1}</span>
                  <span>{story.stat2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;