"use client";

import React, { useEffect, useRef } from "react";
import { Great_Vibes } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

// Initialize the script font
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const steps = [
  {
    id: 1,
    title: "Strategy & Setup",
    description: "We fully understand your goals and create a tailored social media plan that fits your unique brand.",
  },
  {
    id: 2,
    title: "Content Creation",
    description: "We whip up fun content—like images, videos, and captions—timed just right based on the data.",
  },
  {
    id: 3,
    title: "Launch & Optimize",
    description: "We understand your goals and audience. We create a social media plan that matches your brand.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    // GSAP Responsive ScrollTrigger via matchMedia
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // 💻 Desktop Logic 
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: "+=150%", 
            scrub: 1, 
            pin: true, 
          },
        });

        tl.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
        });
      });

      // 📱 Mobile & Tablet Logic
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });

        tl.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
        });
      });

    }, sectionRef);

    // 🛠️ THE FIX: Watch for any height changes in the document and force GSAP to recalculate
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    // Start observing the entire body for layout shifts
    resizeObserver.observe(document.body);

    // Cleanup both GSAP and the Observer when the component unmounts
    return () => {
      ctx.revert();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-0 md:py-5 bg-white px-6 overflow-hidden flex items-center justify-center min-h-screen"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
        
        {/* Left Column */}
        <div 
          data-aos="fade-right"
          className="flex flex-col items-start h-fit lg:sticky lg:top-40 w-full"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 mb-6 sm:mb-8 shadow-[0_2px_10px_rgb(0,0,0,0.03)]">
            Simple steps — Stronger results
          </div>

          {/* Mixed-Font Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4 sm:mb-6 tracking-tight leading-[1.2]">
            How{" "}
            <span 
              className={`${greatVibes.className} font-normal text-5xl sm:text-6xl lg:text-[4.5rem] text-[#1a1a1a] px-1`}
            >
              MediaCore
            </span>{" "}
            Works
          </h2>

          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-full lg:max-w-md leading-relaxed font-light">
            MediaCore effectively streamlines social media marketing. Set goals & let our team manage content.
          </p>
        </div>

        {/* Right Column (Timeline & Steps) */}
        <div 
          data-aos="fade-left"
          className="relative py-2 sm:py-4 w-full"
        >
          {/* 1. Base Gray Line */}
          <div className="absolute left-[11px] top-4 sm:top-6 bottom-6 sm:bottom-12 w-[2px] bg-gray-100 rounded-full"></div>

          {/* 2. Animated Green Line */}
          <div
            ref={lineRef}
            className="absolute left-[11px] top-4 sm:top-6 bottom-6 sm:bottom-12 w-[2px] bg-[#84ea00] origin-top scale-y-0 rounded-full z-0"
          ></div>

          {/* 3. The Steps Content */}
          {/* Adjusted gaps for mobile to prevent taking up too much vertical space */}
          <div className="flex flex-col gap-10 sm:gap-16 md:gap-24 w-full">
            {steps.map((step) => (
              <div key={step.id} className="relative pl-10 sm:pl-12 md:pl-16 w-full">
                
                {/* Hollow Green Circle Node */}
                {/* Slightly adjusted top position on mobile to align with the smaller heading */}
                <div className="absolute left-1 sm:left-0 top-0.5 sm:top-1.5 w-4 sm:w-6 h-4 sm:h-6 rounded-full border-[3px] border-[#84ea00] bg-white z-10 shadow-sm"></div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-2 sm:mb-3">
                  {step.title}
                </h3>
                
                {/* max-w-full on mobile, max-w-sm on desktop */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed w-full max-w-full lg:max-w-sm font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;