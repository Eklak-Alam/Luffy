"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  
  const counterRef = useRef(null);
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 0. Initial Setup
      gsap.set(".reveal-item", { y: 100, opacity: 0 });
      gsap.set(curtainRef.current, { yPercent: 100 });

      // 1. Smooth Enter Sequence
      tl.to(".reveal-item", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out"
      });

      // 2. The Loading Sequence
      const counterValue = { val: 0 };
      tl.to(counterValue, {
        val: 100,
        duration: 2.5,
        ease: "power4.inOut", // Ultra-smooth easing curve
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counterValue.val);
          }
        },
      }, "-=1");

      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 2.5,
        ease: "power4.inOut"
      }, "<");

      // 3. The Clean Exit Sequence (Removed blur for better performance)
      tl.to(textContainerRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      }, "+=0.2");

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      }, "-=0.6");

      tl.to(curtainRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => setComplete(true),
      }, "-=1.1");
    });

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <>
      {/* Main Preloader Container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 z-[100] bg-brand-dark flex flex-col justify-end p-6 md:p-12 overflow-hidden"
      >
        <div ref={textContainerRef} className="w-full relative z-10 flex flex-col justify-end">
          
          {/* The Massive Percentage - Clean & Solitary */}
          <div className="flex items-baseline mb-6 md:mb-8 overflow-hidden reveal-item">
            <span 
              ref={counterRef}
              className="text-[25vw] md:text-[14vw] font-black tracking-tighter text-brand-lightest leading-[0.75]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              0
            </span>
            <span className="text-primary text-4xl md:text-7xl font-black ml-2 md:ml-4">
              %
            </span>
          </div>

          {/* The Ultra-Wide Progress Bar */}
          <div className="w-full h-[2px] bg-brand-lightest/10 relative overflow-hidden reveal-item rounded-full">
            <div 
              className="progress-bar absolute inset-0 bg-primary origin-left scale-x-0 shadow-[0_0_15px_rgba(96,153,102,1)]"
            />
          </div>

        </div>

        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Secondary Reveal Curtain */}
      <div 
        ref={curtainRef}
        className="fixed inset-0 z-[99] bg-primary pointer-events-none hidden md:block"
      />
    </>
  );
}