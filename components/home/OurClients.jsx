import React from "react";
import Image from "next/image";

// Dynamically generate the array for 24 images
// Paths will be: /images/transparent/1.png through /images/transparent/24.png
const clientLogos = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  src: `/images/transparent/${index + 1}.png`,
  alt: `Client ${index + 1}`,
}));

const OurClients = () => {
  return (
    <section className="relative max-w-350 py-20 md:py-32 mx-auto flex flex-col items-center justify-center gap-12 md:gap-20">
      
      {/* Centered Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] uppercase text-[#1a1a1a]">
        Our Clients
      </h2>

      {/* Marquee Wrapper with Fade Mask */}
      <div 
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
          <div className="flex gap-3 md:gap-24 lg:gap-5 pr-16 md:pr-24 lg:pr-32 items-center">
            {clientLogos.map((logo) => (
              <div 
                key={`set1-${logo.id}`} 
                className="relative flex-shrink-0 h-28 md:h-16 lg:h-44 w-28 md:w-40 lg:w-54 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 112px, (max-width: 1024px) 160px, 200px"
                  className="object-contain saturate-150"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Set 2 (Exact Duplicate for Seamless Looping) */}
          <div className="flex gap-16 md:gap-24 lg:gap-32 pr-16 md:pr-24 lg:pr-32 items-center">
            {clientLogos.map((logo) => (
              <div 
                key={`set2-${logo.id}`} 
                className="relative flex-shrink-0 h-12 md:h-16 lg:h-20 w-28 md:w-40 lg:w-48 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 112px, (max-width: 1024px) 160px, 192px"
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