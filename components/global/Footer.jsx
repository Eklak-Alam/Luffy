"use client";

import { useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".footer-fade",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      ref={footerRef}
      // On mobile, standard padding. On desktop, full screen height.
      className="relative w-full bg-foreground text-background flex flex-col justify-between overflow-hidden z-20 py-16 md:py-0 md:min-h-[100dvh]"
    >
      {/* ================= TOP SECTION: LET'S CHAT ================= */}
      <div className="max-w-[1400px] 2xl:max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 md:flex-1 flex flex-col justify-center">
        
        <div className="footer-fade flex flex-col items-start w-full">
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary mb-4 md:mb-6">
            Ready to scale?
          </p>
          
          <a 
            href="mailto:eklakalam420@gmail.com" 
            className="group flex flex-row items-center justify-between md:justify-start w-full md:w-auto gap-4 md:gap-8 cursor-pointer"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-background leading-none">
              Let's chat.
            </h2>
            
            <div className="relative overflow-hidden w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border border-background/20 group-hover:border-primary flex items-center justify-center transition-colors duration-500 shrink-0 bg-background/5 group-hover:bg-primary/10">
              {/* Arrow 1: Shoots out to the top right on hover */}
              <ArrowUpRight className="absolute w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-background group-hover:text-primary translate-x-0 translate-y-0 group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-500 ease-in-out" />
              {/* Arrow 2: Glides in from the bottom left on hover */}
              <ArrowUpRight className="absolute w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </div>
          </a>
        </div>

      </div>

      {/* ================= BOTTOM SECTION: METADATA & NAME ================= */}
      <div className="w-full flex flex-col mt-20 md:mt-auto">
        
        {/* Mobile-Only Back to Top (Centered for easy thumb access) */}
        <div className="footer-fade flex justify-center w-full mb-16 md:hidden">
           <button 
             onClick={scrollToTop} 
             className="group flex items-center justify-center gap-3 w-full max-w-[200px] px-5 py-4 rounded-full bg-background/5 border border-background/10 active:bg-primary active:border-primary transition-all duration-300"
           >
             <span className="text-xs font-bold uppercase tracking-widest text-background">
               Back to Top
             </span>
             <ArrowUp size={16} strokeWidth={3} className="text-background/80 group-active:-translate-y-1 transition-all duration-300" />
           </button>
        </div>

        {/* Metadata Bar */}
        <div className="footer-fade max-w-[1400px] 2xl:max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 md:pb-12 border-t md:border-t-0 border-background/10 pt-8 md:pt-0">
           
           {/* Info Stack */}
           <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 w-full md:w-auto">
              <p className="text-xs md:text-sm font-bold text-background/80 tracking-wider">
                System Architect & Full-Stack Engineer
              </p>
              
              <span className="hidden md:block w-1 h-1 rounded-full bg-primary" />
              
              <p className="text-xs md:text-sm font-bold text-background/60 uppercase tracking-[0.2em]">
                India
              </p>
           </div>

           {/* Desktop-Only Back to Top */}
           <button 
             onClick={scrollToTop} 
             className="hidden md:flex group items-center gap-3 px-5 py-2.5 rounded-full bg-background/5 hover:bg-primary border border-background/10 hover:border-primary transition-all duration-300"
           >
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-background group-hover:text-primary-text transition-colors">
               Back to Top
             </span>
             <ArrowUp size={14} strokeWidth={3} className="text-background/60 group-hover:text-primary-text group-hover:-translate-y-1 transition-all duration-300" />
           </button>
           
        </div>

        {/* THE NAME - Adaptive Hierarchy */}
        {/* On Mobile: It is an elegant, editorial size at the bottom left. */}
        {/* On Desktop: It is the massive resting giant taking up the whole screen width. */}
        <div className="footer-fade w-full overflow-hidden flex justify-start md:justify-center items-end px-6 md:px-8 pb-0 md:pb-6">
          <h1 className="text-3xl md:text-[13.5vw] font-black tracking-tighter leading-[0.75] uppercase text-background md:opacity-90 text-left md:text-center w-full">
            Eklak Alam
          </h1>
        </div>

      </div>
    </footer>
  );
}