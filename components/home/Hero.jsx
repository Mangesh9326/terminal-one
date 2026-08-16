"use client";

import React, { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leftImages = [1, 2, 3];
const rightImages = [4, 5, 6];
const buildSrcSet = (n) => `/images/webp/${n}-800.webp 800w, /images/webp/${n}-2000.webp 2000w`;
const IMG_SIZES = "(max-width: 767px) 100vw, 50vw";

const Hero = () => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const textContainerRef = useRef(null);

  const leftImgRefs = useRef([]);
  const rightImgRefs = useRef([]);

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

    const schedule = () => {
      delayedTicker = gsap.delayedCall(1, tick);
    };

    function tick() {
      idx = (idx + 1) % 3;
      applyOpacity();
      schedule();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        delayedTicker?.kill();
      } else {
        schedule();
      }
    };

    schedule();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      delayedTicker?.kill();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const leftAssigned = useRef(false);
  const rightAssigned = useRef(false);

  const deferExtraFrames = useCallback((imgRefs, assignedRef, numbers) => {
    if (assignedRef.current) return;
    assignedRef.current = true;
    const run = () => {
      imgRefs.current.forEach((el, i) => {
        if (i === 0 || !el) return;
        const n = numbers[i];
        el.srcset = buildSrcSet(n);
        el.src = `/images/webp/${n}-800.webp`;
      });
    };
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 1200 });
    } else {
      setTimeout(run, 300);
    }
  }, []);

  useEffect(() => {
    deferExtraFrames(leftImgRefs, leftAssigned, leftImages);
    deferExtraFrames(rightImgRefs, rightAssigned, rightImages);
  }, [deferExtraFrames]);

  // ---- 3. GSAP Scroll Animations (responsive via matchMedia) ------------
  useLayoutEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isMobile } = context.conditions;

          if (isMobile) {
            ScrollTrigger.normalizeScroll(true);
          }
          ScrollTrigger.config({ ignoreMobileResize: true });

          const panels = [leftPanelRef.current, rightPanelRef.current, textContainerRef.current];
          gsap.set(panels, { force3D: true });

          const setWillChange = (on) => gsap.set(panels, { willChange: on ? "transform" : "auto" });

          setWillChange(true);

          const sharedScrollTriggerCallbacks = {
            onEnterBack: () => setWillChange(true),
            onLeave: () => setWillChange(false),
            onLeaveBack: () => setWillChange(false),
          };

          if (isMobile) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=80%", // was +=120% — shorter scroll distance on mobile only
                scrub: 0.3, // light enough to smooth touch jitter without visibly trailing the finger
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                ...sharedScrollTriggerCallbacks,
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
              end: "+=90%", // must match the timeline's end above
              pinSpacing: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            });
          } else {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=150%", // scroll distance unchanged
                scrub: 0.5, // was 1 — a full second of smoothing reads as "laggy" behind fast wheel/trackpad input
                fastScrollEnd: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                ...sharedScrollTriggerCallbacks,
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

    return () => {
      ctx.revert();
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's defaults
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
            className="w-full max-w-7xl mx-auto flex flex-col items-center relative h-full justify-center"
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
              <div className="text-center md:text-left">PREMIUM VISUAL POSITIONING STUDIO</div>
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
          className="absolute top-0 left-0 w-full h-1/2 md:w-1/2 md:h-full z-10 bg-[#e9e9e9] border-b md:border-b-0 md:border-r border-black/5"
          style={{ contain: "layout paint style" }}
        >
          {leftImages.map((n, index) => (
            <img
              key={n}
              ref={(el) => (leftImgRefs.current[index] = el)}
              src={index === 0 ? `/images/webp/${n}-800.webp` : undefined}
              srcSet={index === 0 ? buildSrcSet(n) : undefined}
              sizes={IMG_SIZES}
              alt={`Terminal One Left View ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === 0 ? 1 : 0 }}
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
          className="absolute bottom-0 md:top-0 right-0 w-full h-1/2 md:w-1/2 md:h-full z-10 bg-[#e9e9e9]"
          style={{ contain: "layout paint style" }}
        >
          {rightImages.map((n, index) => (
            <img
              key={n}
              ref={(el) => (rightImgRefs.current[index] = el)}
              src={index === 0 ? `/images/webp/${n}-800.webp` : undefined}
              srcSet={index === 0 ? buildSrcSet(n) : undefined}
              sizes={IMG_SIZES}
              alt={`Terminal One Right View ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === 0 ? 1 : 0 }}
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