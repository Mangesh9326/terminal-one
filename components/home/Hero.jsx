"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leftImages = ["1.jpg", "2.jpg", "3.jpg"];
const rightImages = ["4.jpg", "5.jpg", "6.jpg"];

const Hero = () => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textContainerRef = useRef(null);

  const leftImgRefs = useRef([]);
  const rightImgRefs = useRef([]);

  // 1. Slideshow driven by GSAP's own ticker (same RAF loop as scroll animation)
  // instead of a competing setInterval timer thread — removes main-thread contention.
  useEffect(() => {
    let idx = 0;
    const applyOpacity = () => {
      leftImgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === idx ? "1" : "0";
      });
      rightImgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === idx ? "1" : "0";
      });
    };

    const tick = () => {
      idx = (idx + 1) % 3;
      applyOpacity();
    };

    // repeat: -1 => infinite, on GSAP's shared ticker
    const delayedTicker = gsap.delayedCall(1, function repeatFn() {
      tick();
      gsap.delayedCall(1, repeatFn);
    });

    return () => {
      delayedTicker.kill();
    };
  }, []);

  // 2. GSAP Scroll Animations (Responsive via matchMedia)
  useLayoutEffect(() => {
    // Smoother scrub tracking, avoids GSAP "catching up" after frame drops on low-end devices
    gsap.ticker.lagSmoothing(0);

    // Fixes rubber-banding / address-bar jank on mobile Safari & Chrome during scrub
    ScrollTrigger.normalizeScroll(true);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isMobile } = context.conditions;

          gsap.set([leftPanelRef.current, rightPanelRef.current, textContainerRef.current], {
            force3D: true,
            willChange: "transform",
          });

          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            tl.to(leftPanelRef.current, { xPercent: -100, ease: "none", duration: 1, force3D: true }, 0);
            tl.to(rightPanelRef.current, { xPercent: 100, ease: "none", duration: 1, force3D: true }, 0);

            tl.fromTo(
              textContainerRef.current,
              { y: "100vh", opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", force3D: true },
              0.5
            );

            ScrollTrigger.create({
              trigger: triggerRef.current,
              pin: containerRef.current,
              start: "top top",
              end: "+=200%",
              pinSpacing: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            });
          } else {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=150%",
                scrub: 1,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            tl.to(leftPanelRef.current, { xPercent: -70, ease: "none", duration: 0.7, force3D: true }, 0);
            tl.to(rightPanelRef.current, { xPercent: 70, ease: "none", duration: 0.7, force3D: true }, 0);

            tl.fromTo(
              textContainerRef.current.children,
              { y: 600, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out", force3D: true },
              0.1
            );

            tl.to(leftPanelRef.current, { xPercent: -100, ease: "none", duration: 0.3, force3D: true }, 0.7);
            tl.to(rightPanelRef.current, { xPercent: 100, ease: "none", duration: 0.3, force3D: true }, 0.7);

            ScrollTrigger.create({
              trigger: triggerRef.current,
              pin: containerRef.current,
              start: "top top",
              end: "+=105%",
              pinSpacing: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            });
          }
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef}>
      <div
        ref={containerRef}
        className="relative w-full h-[100dvh] overflow-hidden bg-[#e9e9e9]"
        style={{ contain: "layout paint style" }}
      >
        {/* =========================================
            CENTER TEXT CONTENT 
            ========================================= */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 w-full h-full text-[#1a1a1a] px-6 md:px-8 overflow-hidden">
          <div
            ref={textContainerRef}
            className="w-full max-w-7xl mx-auto flex flex-col items-center relative h-full justify-center will-change-transform"
          >
            {/* Main Title Area */}
            <div className="flex flex-col items-center w-full px-2 md:px-4">
              <img
                src="/images/logo/1.png"
                alt="Terminal One Studio Logo"
                className="w-full h-[180px] md:h-[350px] object-contain md:object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Bottom Branding Details */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end text-[10px] md:text-sm tracking-widest uppercase text-gray-700 gap-6 md:gap-0 mt-8 md:mt-12 md:px-28">
              <div className="text-center md:text-left">
                PREMIUM VISUAL POSITIONING STUDIO
              </div>
              <div className="text-center md:text-right flex flex-col gap-1 md:gap-2">
                <p>CONSISTENCY. DESIRE. PRESENCE.</p>
                <p>BUILT FOR BRANDS THAT DEMAND ALL THREE.</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            LEFT PANEL (Top Panel on Mobile)
            ========================================= */}
        <div
          ref={leftPanelRef}
          className="absolute top-0 left-0 w-full h-1/2 md:w-1/2 md:h-full z-10 bg-[#e9e9e9] border-b md:border-b-0 md:border-r border-black/5 will-change-transform"
          style={{ contain: "layout paint style" }}
        >
          {leftImages.map((src, index) => (
            <img
              key={src}
              ref={(el) => (leftImgRefs.current[index] = el)}
              src={`/images/${src}`}
              alt={`Terminal One Left View ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === 0 ? 1 : 0, willChange: "opacity" }}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          ))}
        </div>

        {/* =========================================
            RIGHT PANEL (Bottom Panel on Mobile)
            ========================================= */}
        <div
          ref={rightPanelRef}
          className="absolute bottom-0 md:top-0 right-0 w-full h-1/2 md:w-1/2 md:h-full z-10 bg-[#e9e9e9] will-change-transform"
          style={{ contain: "layout paint style" }}
        >
          {rightImages.map((src, index) => (
            <img
              key={src}
              ref={(el) => (rightImgRefs.current[index] = el)}
              src={`/images/${src}`}
              alt={`Terminal One Right View ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === 0 ? 1 : 0, willChange: "opacity" }}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;