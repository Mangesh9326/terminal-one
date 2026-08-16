"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

// Import the JSON data directly. Adjust path as needed.
import servicesData from "../../public/data/services.json"; 

const Services = () => {
  // State to track how many services are currently visible
  const [visibleCount, setVisibleCount] = useState(3);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true,    // Whether animation should happen only once - while scrolling down
      easing: "ease-out-cubic", // Smooth easing
      offset: 100,   // Offset (in px) from the original trigger point
    });
  }, []);

  const handleLoadMore = () => {
    // Load 3 more services each time the button is clicked
    setVisibleCount((prevCount) => prevCount + 3);
    
    // Refresh AOS layout calculations after rendering new elements
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  return (
    <section className="w-full py-20 md:py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Services List */}
        {servicesData.slice(0, visibleCount).map((service, index) => {
          // Determine if the layout should be reversed (image on right)
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={service.id}
              className={`flex flex-col gap-8 md:gap-16 items-center ${
                isReversed ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* 
                Image Container
                If reversed (Image on right), slide from right (fade-left). 
                If normal (Image on left), slide from left (fade-right). 
              */}
              <div 
                data-aos={isReversed ? "fade-left" : "fade-right"}
                className="w-full md:w-1/2 relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* 
                Content Container 
                If reversed (Content on left), slide from left (fade-right).
                If normal (Content on right), slide from right (fade-left).
              */}
              <div 
                data-aos={isReversed ? "fade-right" : "fade-left"}
                className="w-full md:w-1/2 flex flex-col gap-6 md:px-8"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-3 mt-2">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500 text-sm md:text-base">
                      {/* Custom Orange Bullet Icon */}
                      <span className="w-1.5 h-1.5 rounded-sm bg-[#ff4a1c] flex-shrink-0 mt-2"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <button className="mt-4 px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-[#1a1a1a] w-fit flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
                  Learn More
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        {/* Load More Button Wrapper */}
        {visibleCount < servicesData.length && (
         <div className="w-full flex justify-center mt-8 px-4 sm:px-0">
  <button
    onClick={handleLoadMore}
    className="w-auto px-6 py-3.5 md:px-10 md:py-4 bg-transparent border border-gray-300 text-[#1a1a1a] text-xs md:text-sm uppercase tracking-widest hover:text-[#1a1a1a] hover:bg-(--accent) transition-all duration-300 rounded-xl shadow-sm hover:shadow-md active:scale-95"
  >
    Load More Services
  </button>
</div>
        )}
  
      </div>
    </section>
  );
};

export default Services;