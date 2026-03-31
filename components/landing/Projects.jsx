"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, ChevronDown } from "lucide-react";
import { allProjects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef(null);
  
  // STATE CHANGE: Now we track the exact number of projects to show on mobile (starts at 3)
  const [visibleCount, setVisibleCount] = useState(3);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const wrappers = gsap.utils.toArray(".card-sticky-wrapper");

      wrappers.forEach((wrapper, index) => {
        if (index === wrappers.length - 1) return;

        const innerCard = wrapper.querySelector(".card-inner");

        ScrollTrigger.create({
          trigger: wrappers[index + 1],
          start: "top bottom", 
          end: "top top+=100", 
          scrub: 0.5,
          animation: gsap.to(innerCard, {
            scale: 0.94,
            opacity: 0.4,
            y: -25,
            transformOrigin: "top center",
            ease: "power2.inOut",
          }),
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="relative w-full bg-background py-16 md:pt-24 overflow-visible"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .desktop-sticky {
            position: sticky;
            top: var(--sticky-top);
          }
        }
      `}} />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-3">
            Selected <span className="text-primary">Work.</span>
          </h2>
          <p className="text-sm md:text-base text-muted font-medium max-w-xl">
            A look at the systems and platforms I've built. Scroll to explore.
          </p>
        </div>

        {/* ================= CARDS CONTAINER ================= */}
        <div className="relative flex flex-col pb-4 md:pb-[10vh]">
          {allProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            const layoutClass = isEven ? "lg:flex-row" : "lg:flex-row-reverse";
            
            const themeClass = isEven 
              ? "bg-surface border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
              : "bg-foreground border-foreground shadow-2xl";

            const titleColor = isEven ? "text-foreground" : "text-background";
            const mutedTextClass = isEven ? "text-foreground/75" : "text-background/80"; 
            const numberClass = isEven ? "text-foreground/10" : "text-background/10"; 

            const btnBaseClass = isEven
              ? "bg-foreground text-background"
              : "bg-background text-foreground";

            const imgWrapperBg = isEven 
              ? "bg-foreground/[0.03] border border-border/40" 
              : "bg-background/10";
              
            const stickyTop = `calc(5rem + ${index * 1.5}rem)`;

            // MOBILE DISPLAY LOGIC: 
            // Hide the card if its index is greater than or equal to our visibleCount (only affects mobile)
            const isMobileHidden = index >= visibleCount;
            const mobileDisplayClass = isMobileHidden ? "hidden md:block" : "block";

            return (
              <div 
                key={project.id} 
                className={`card-sticky-wrapper relative desktop-sticky w-full mb-8 md:mb-20 ${mobileDisplayClass}`}
                style={{ "--sticky-top": stickyTop }}
              >
                <div className={`card-inner w-full border rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-10 flex flex-col ${layoutClass} gap-6 md:gap-12 origin-top ${themeClass}`}>
                  
                  {/* === MINIMALIST NUMBER SIDE === */}
                  <div className={`hidden lg:flex relative w-full lg:w-[45%] h-[400px] rounded-2xl flex-col items-start justify-between p-8 shrink-0 overflow-hidden ${imgWrapperBg}`}>
                    <div className={`absolute -bottom-10 -right-4 text-[320px] font-black leading-none select-none pointer-events-none ${numberClass}`}>
                      0{index + 1}
                    </div>
                  </div>

                  {/* === CONTENT SIDE === */}
                  <div className="w-full lg:w-[55%] flex flex-col justify-center py-2 relative z-10">
                    
                    <span className={`text-sm md:text-base font-bold font-mono mb-3 lg:mb-4 block opacity-50 ${titleColor}`}>
                      0{index + 1}
                    </span>

                    <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 lg:mb-4 ${titleColor}`}>
                      {project.title}
                    </h3>
                    
                    {project.tagline && (
                      <h4 className={`text-base md:text-lg font-bold mb-3 lg:mb-4 ${mutedTextClass}`}>
                        {project.tagline}
                      </h4>
                    )}
                    
                    <p className={`text-sm md:text-base font-medium leading-relaxed mb-6 md:mb-8 max-w-lg ${mutedTextClass}`}>
                      {project.description}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-auto">
                      <a 
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className={`group relative inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold rounded-full overflow-hidden transition-all duration-300 active:scale-95 shadow-sm ${btnBaseClass}`}
                      >
                        <span className="absolute bottom-0 left-0 w-full h-0 bg-primary transition-all duration-300 ease-out group-hover:h-full"></span>
                        
                        <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-text">
                          View Project
                          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </a>

                      {project.links.github && (
                        <a 
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className={`group relative inline-flex items-center gap-2 py-2 text-sm md:text-base font-bold transition-opacity hover:opacity-100 ${mutedTextClass}`}
                        >
                          <Github className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                          <span className="relative overflow-hidden pb-1">
                            Source
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })}

          {/* ================= LOAD MORE BUTTON (MOBILE ONLY) ================= */}
          {/* Only shows on mobile (md:hidden) AND only if there are more projects to show */}
          {visibleCount < allProjects.length && (
            <div className="w-full flex justify-center mt-2 md:hidden">
              <button
                // Increments the count by 3 every time it is clicked
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-full overflow-hidden transition-all duration-300 active:scale-95 border border-border bg-surface text-foreground shadow-sm"
              >
                <span className="absolute bottom-0 left-0 w-full h-0 bg-primary transition-all duration-300 ease-out group-hover:h-full"></span>
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-text">
                  Load More Projects
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}