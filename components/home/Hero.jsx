"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Image sources
// Each entry has a mobile (smaller) and desktop (larger) WebP variant.
// Generate these before upload, e.g.:
//   npx @squoosh/cli --webp '{"quality":75}' ./public/images/*.jpg -d ./public/images/webp
// then resize a second, mobile-width copy (~800px wide) alongside the
// desktop copy (~1600px wide), named like below.
// ---------------------------------------------------------------------------
const leftImages = [
  { mobile: "1-800.webp", desktop: "1-2000.webp" },
  { mobile: "2-800.webp", desktop: "2-2000.webp" },
  { mobile: "3-800.webp", desktop: "3-2000.webp" },
];

const rightImages = [
  { mobile: "4-800.webp", desktop: "4-2000.webp" },
  { mobile: "5-800.webp", desktop: "5-2000.webp" },
  { mobile: "6-800.webp", desktop: "6-2000.webp" },
];

const IMG_WIDTH = 1600;
const IMG_HEIGHT = 1200;

const Hero = () => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textContainerRef = useRef(null);

  const leftImgRefs = useRef([]);
  const rightImgRefs = useRef([]);

  // -------------------------------------------------------------------------
  // 1. Slideshow, driven by GSAP's ticker, paused when the tab is hidden.
  //    Avoids burning CPU/battery on an animation nobody is looking at —
  //    matters most on low-end mobile hardware.
  // -------------------------------------------------------------------------
  useEffect(() => {
    let idx = 0;
    let delayedTicker;

    const applyOpacity = () => {
      leftImgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === idx ? "1" : "0";
      });
      rightImgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === idx ? "1" : "0";
      });
    };

    const scheduleNext = () => {
      delayedTicker = gsap.delayedCall(1, () => {
        idx = (idx + 1) % 3;
        applyOpacity();
        scheduleNext();
      });
    };

    const start = () => {
      if (!delayedTicker) scheduleNext();
    };

    const stop = () => {
      delayedTicker?.kill();
      delayedTicker = null;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // -------------------------------------------------------------------------
  // 2. GSAP Scroll Animations (Responsive via matchMedia)
  // -------------------------------------------------------------------------
  useLayoutEffect(() => {
    // Default lag smoothing (do NOT disable with lagSmoothing(0) — that makes
    // scrub snap/jump to catch up after any frame drop, which is the main
    // cause of visible jitter on real-world devices).

    // normalizeScroll fixes rubber-banding/address-bar jank on mobile Safari
    // & Chrome, but it's also a known cause of scroll getting stuck after a
    // pinned section on some mobile browsers — a worse problem than the jank
    // it fixes. Scope it to non-touch (mouse/trackpad) devices only.
    const hasFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      ScrollTrigger.normalizeScroll(true);
    }
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          let { isMobile, reduceMotion } = context.conditions;

          // ---- Reduced motion: set final state instantly, skip pin/scrub ----
          if (reduceMotion) {
            gsap.set([leftPanelRef.current, rightPanelRef.current], {
              xPercent: 0,
            });
            gsap.set(textContainerRef.current, { opacity: 1, y: 0 });
            if (textContainerRef.current?.children) {
              gsap.set(textContainerRef.current.children, {
                opacity: 1,
                y: 0,
              });
            }
            return; // no ScrollTrigger/pin work at all for this user
          }

          // will-change is only worth its cost on the elements actually
          // doing the scroll-driven transform — not on every image.
          gsap.set(
            [leftPanelRef.current, rightPanelRef.current, textContainerRef.current],
            {
              force3D: true,
              willChange: "transform",
            }
          );

          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerRef.current,
                pin: containerRef.current,
                pinType: "transform",
                pinSpacing: true,
                start: "top top",
                end: "+=100%",
                scrub: 0.4,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            tl.to(
              leftPanelRef.current,
              { xPercent: -100, ease: "none", duration: 1, force3D: true },
              0
            );
            tl.to(
              rightPanelRef.current,
              { xPercent: 100, ease: "none", duration: 1, force3D: true },
              0
            );

            tl.fromTo(
              textContainerRef.current,
              { y: "100vh", opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", force3D: true },
              0.5
            );
          } else {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerRef.current,
                pin: containerRef.current,
                pinSpacing: true,
                start: "top top",
                end: "+=150%",
                scrub: 1,
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            tl.to(
              leftPanelRef.current,
              { xPercent: -70, ease: "none", duration: 0.7, force3D: true },
              0
            );
            tl.to(
              rightPanelRef.current,
              { xPercent: 70, ease: "none", duration: 0.7, force3D: true },
              0
            );

            tl.fromTo(
              textContainerRef.current.children,
              { y: 600, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
                force3D: true,
              },
              0.1
            );

            tl.to(
              leftPanelRef.current,
              { xPercent: -100, ease: "none", duration: 0.3, force3D: true },
              0.7
            );
            tl.to(
              rightPanelRef.current,
              { xPercent: 100, ease: "none", duration: 0.3, force3D: true },
              0.7
            );
          }
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------------------
  // 3. Keep ScrollTrigger's measurements in sync with real viewport changes
  //    (address-bar show/hide, rotation) — the most common cause of pin/scroll
  //    glitches that only show up on real mobile devices, not desktop testing.
  // -------------------------------------------------------------------------
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("load", handleLoad);
    };
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
            PANEL WRAPPER — flex ensures the two panels always
            split exactly 50/50 as a pair, avoiding any rounding
            drift between two independently-positioned elements.
            ========================================= */}
        <div className="absolute inset-0 flex flex-col md:flex-row z-10">
          {/* LEFT PANEL (Top Panel on Mobile) */}
          <div
            ref={leftPanelRef}
            className="relative w-full h-1/2 md:w-1/2 md:h-full bg-[#e9e9e9] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)] md:shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.05)] will-change-transform"
            style={{ contain: "layout paint style" }}
          >
            {leftImages.map((img, index) => (
              <img
                key={img.desktop}
                ref={(el) => (leftImgRefs.current[index] = el)}
                src={`/images/webp/${img.desktop}`}
                srcSet={`/images/webp/${img.mobile} 800w, /images/webp/${img.desktop} 1600w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                alt={`Terminal One Left View ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: index === 0 ? 1 : 0 }}
                loading="eager"
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
              />
            ))}
          </div>

          {/* RIGHT PANEL (Bottom Panel on Mobile) */}
          <div
            ref={rightPanelRef}
            className="relative w-full h-1/2 md:w-1/2 md:h-full bg-[#e9e9e9] will-change-transform"
            style={{ contain: "layout paint style" }}
          >
            {rightImages.map((img, index) => (
              <img
                key={img.desktop}
                ref={(el) => (rightImgRefs.current[index] = el)}
                src={`/images/webp/${img.desktop}`}
                srcSet={`/images/webp/${img.mobile} 800w, /images/webp/${img.desktop} 1600w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                alt={`Terminal One Right View ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                style={{ opacity: index === 0 ? 1 : 0 }}
                loading="eager"
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;