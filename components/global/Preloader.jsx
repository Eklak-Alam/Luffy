"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const counterRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Unified Sync: Number and Bar load perfectly together
      const counterValue = { val: 0 };
      
      tl.to(counterValue, {
        val: 100,
        duration: 2,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counterValue.val);
          }
        },
      }, 0); // The '0' tells GSAP to start exactly at the beginning

      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 2,
        ease: "power3.inOut"
      }, 0); // Starts at the exact same time as the number

      // 2. The "Premium" Exit Sequence
      // First, the text content slides up and fades out smoothly
      tl.to(".preloader-content", {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      }, "+=0.2"); // Waits 0.2s after hitting 100%

      // Then, the main dark background lifts like a heavy curtain
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut", // The highest-end ease for structural lifts
        onComplete: () => setComplete(true),
      }, "-=0.2"); // Overlaps slightly with the text fade for a seamless feel
    });

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-brand-dark flex flex-col justify-end p-8 md:p-16 overflow-hidden"
    >
      {/* ================= BOTTOM LEFT READOUT ================= */}
      {/* Wrapped in a specific div so we can animate it away before the background */}
      <div className="preloader-content flex flex-col items-start w-full">
        
        <div className="flex items-baseline overflow-hidden">
          <span 
            ref={counterRef}
            className="text-[15vw] md:text-[10vw] font-black italic tracking-tighter text-brand-lightest leading-[0.8]"
          >
            0
          </span>
          <span className="text-primary text-2xl md:text-5xl font-black italic ml-2">
            %
          </span>
        </div>
        
        {/* GSAP Powered Progress Bar */}
        <div className="w-full max-w-[200px] h-[2px] bg-brand-lightest/10 mt-4 relative overflow-hidden">
          <div 
            className="progress-bar absolute inset-0 bg-primary origin-left scale-x-0"
          />
        </div>
        
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-brand-lightest/40">
          Architecture_Loading
        </p>

      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--color-brand-primary)_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  );
}