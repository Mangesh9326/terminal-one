"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

// Dynamically generate the array for 23 images
// Paths will be: /images/transparent/1.png through /images/transparent/23.png
const clientLogos = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  src: `/images/transparent/${index + 1}.png`,
  alt: `Client ${index + 1}`,
}));

const OurClients = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="relative max-w-350 py-20 lg:py-32 mx-auto flex flex-col items-center justify-center gap-12 md:gap-20 overflow-hidden">
      
      {/* Centered Heading with AOS */}
      <h2 
        data-aos="fade-up"
        className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] uppercase text-[#1a1a1a]"
      >
        Our Clients
      </h2>

      {/* Marquee Wrapper with Fade Mask and AOS */}
      <div 
        data-aos="fade-up"
        data-aos-delay="100"
        className="relative w-full max-w-[1600px] mx-auto overflow-hidden pointer-events-auto"
        style={{
          // Creates the soft fade-out effect on the left and right edges
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* The Animated Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] transition-all">
          
          {/* Set 1 */}
          <div className="flex gap-3 md:gap-7 lg:gap-5 pr-16 md:pr-24 lg:pr-32 items-center">
            {clientLogos.map((logo) => (
              <div 
                key={`set1-${logo.id}`} 
                // Added hover:-translate-y-2 and changed transition-opacity to transition-all
                className="relative shrink-0 h-28 md:h-34 lg:h-40 w-28 md:w-40 lg:w-54 opacity-100 hover:-translate-y-3 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 112px, (max-width: 1024px) 160px, 200px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Set 2 (Exact Duplicate for Seamless Looping) */}
         <div className="flex gap-3 md:gap-7 lg:gap-5 pr-16 md:pr-24 lg:pr-32 items-center">
            {clientLogos.map((logo) => (
              <div 
                key={`set2-${logo.id}`}
                className="relative shrink-0 h-28 md:h-34 lg:h-40 w-28 md:w-40 lg:w-54 opacity-100 hover:-translate-y-3 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 112px, (max-width: 1024px) 160px, 200px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurClients;