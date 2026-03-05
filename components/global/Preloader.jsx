"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing System...");
  
  const counterRef = useRef(null);
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const curtainRef = useRef(null);

  // Cycle through high-end engineering states
  useEffect(() => {
    const states = [
      "Booting The Engine...",
      "Provisioning Cloud Infrastructure...",
      "Waking up Intelligence Agents...",
      "Rendering The Interface..."
    ];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % states.length;
      setLoadingText(states[currentIndex]);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 0. Initial Setup
      gsap.set(".reveal-item", { y: 50, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" });
      gsap.set(curtainRef.current, { yPercent: 100 });

      // 1. Enter Sequence
      tl.to(".reveal-item", {
        y: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // 2. The Loading Sequence
      const counterValue = { val: 0 };
      tl.to(counterValue, {
        val: 100,
        duration: 2.2,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counterValue.val);
          }
        },
      }, "-=0.8");

      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 2.2,
        ease: "power3.inOut"
      }, "<");

      // 3. The "Fly-Through" Exit Sequence
      tl.to(textContainerRef.current, {
        scale: 1.15,
        y: -20,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.8,
        ease: "power3.in",
      }, "+=0.2");

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
      }, "-=0.4");

      tl.to(curtainRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => setComplete(true),
      }, "<0.1");
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
          
          {/* Top section of the container: Number and Meta data */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-6 reveal-item">
            
            {/* The Huge Percentage */}
            <div className="flex items-baseline overflow-hidden">
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

            {/* The Technical Readout */}
            <div className="flex flex-col items-start md:items-end gap-3 mb-2 md:mb-4">
              {/* Frosted Glass Pill Badge */}
              <div className="flex items-center gap-3 bg-brand-lightest/5 px-4 md:px-5 py-2.5 rounded-full border border-brand-lightest/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(96,153,102,0.8)]" />
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-brand-lightest/90">
                  {loadingText}
                </p>
              </div>
              
              {/* Subtle System Signature */}
              <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-brand-lightest/30 pr-2">
                SYS.ARCH // EKLAK.ALAM // KERNEL_INIT
              </p>
            </div>

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

      {/* The Secondary Reveal Curtain */}
      <div 
        ref={curtainRef}
        className="fixed inset-0 z-[99] bg-primary pointer-events-none hidden md:block"
      />
    </>
  );
}