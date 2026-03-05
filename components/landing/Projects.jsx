"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ArrowRight, Plus, Github } from "lucide-react";
import { allProjects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleProject = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useGSAP(() => {
    gsap.fromTo(
      ".directory-row",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="relative w-full bg-background py-16 sm:py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* ================= CLEAN HEADER ================= */}
        <div className="mb-10 md:mb-20">
          {/* Fixed mobile text size (text-3xl) while preserving md:text-6xl for PC */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground mb-3 md:mb-4">
            Selected <span className="text-primary">Work.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted font-medium max-w-2xl">
            A look at the systems and platforms I've built. Click any row to expand the details.
          </p>
        </div>

        {/* ================= THE KINETIC ACCORDION ================= */}
        <div className="flex flex-col border-t border-border/50">
          {allProjects.map((project, index) => {
            const isOpen = activeIndex === index;

            return (
              <div 
                key={project.id} 
                className="directory-row flex flex-col border-b border-border/50"
              >
                
                {/* 1. THE CLICKABLE ROW */}
                <button
                  onClick={() => toggleProject(index)}
                  // Tighter mobile padding (py-4)
                  className="w-full flex items-center justify-between py-4 sm:py-6 md:py-10 text-left group transition-colors"
                >
                  <div className="flex-1 flex items-center gap-3 sm:gap-4 md:gap-8 lg:gap-12 transition-transform duration-500 ease-out md:group-hover:translate-x-4 pr-4">
                    <span className={`text-xs sm:text-sm md:text-lg font-bold font-mono transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted/40 group-hover:text-muted"}`}>
                      0{index + 1}
                    </span>
                    {/* Fixed mobile text size (text-xl) while preserving md:text-5xl for PC */}
                    <h3 className={`text-xl sm:text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                      {project.title}
                    </h3>
                  </div>

                  <div className="shrink-0">
                    <motion.div 
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      // Scaled down the plus icon circle for mobile
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                        isOpen 
                          ? "border-primary bg-primary text-primary-text shadow-lg shadow-primary/20" 
                          : "border-border text-muted group-hover:border-foreground group-hover:text-foreground group-hover:bg-surface"
                      }`}
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.div>
                  </div>
                </button>

                {/* 2. THE EXPANDING CONTENT */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        // Tighter mobile padding and gaps
                        className="pb-6 sm:pb-8 md:pb-10 pt-2 flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-12 items-start lg:items-center"
                      >
                        
                        {/* Left: Cinematic Image */}
                        <div className="w-full lg:w-[55%] aspect-video rounded-xl overflow-hidden bg-surface border border-border shadow-lg shrink-0">
                          <img 
                            src={project.coverImage} 
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>

                        {/* Right: Description & Action Buttons */}
                        <div className="w-full lg:w-[45%] flex flex-col justify-center">
                          {/* Scaled down mobile description text */}
                          <p className="text-sm sm:text-base md:text-lg text-muted font-medium leading-relaxed mb-6 md:mb-8">
                            {project.description}
                          </p>

                          {/* ================= ACTION BLOCK ================= */}
                          {/* Tighter gaps on mobile */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
                            
                            {/* Primary Button */}
                            <a 
                              href={project.links.live}
                              target="_blank"
                              rel="noreferrer"
                              // Tighter padding and text-xs for mobile buttons
                              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-foreground text-background text-xs sm:text-sm md:text-base font-bold rounded-full hover:bg-primary hover:text-primary-text transition-all duration-300 active:scale-95 group/btn shadow-md"
                            >
                              View Live
                              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                            </a>

                            {/* Secondary Link: View Details */}
                            <a 
                              href={`#project-details`}
                              className="inline-flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base font-bold text-foreground hover:text-primary transition-colors duration-300 group/link"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                            </a>

                            {/* Tertiary Link: GitHub Source */}
                            {project.links.github && (
                              <a 
                                href={project.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base font-bold text-muted hover:text-foreground transition-colors duration-300 sm:ml-auto group/gh mt-2 sm:mt-0 w-full sm:w-auto"
                              >
                                <Github className="w-4 h-4 md:w-5 md:h-5 group-hover/gh:scale-110 transition-transform duration-300" />
                                <span>Source</span>
                              </a>
                            )}

                          </div>
                        </div>

                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}