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
      className="relative w-full bg-background py-10 sm:py-14 md:py-24 xl:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* ================= CLEAN HEADER ================= */}
        <div className="mb-10 md:mb-16 lg:mb-20">
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
                  className="w-full flex items-center justify-between py-5 sm:py-8 text-left group transition-colors"
                >
                  <div className="flex-1 flex items-center gap-4 sm:gap-6 md:gap-10 transition-transform duration-500 ease-out md:group-hover:translate-x-4 pr-4 min-w-0">
                    
                    <span className={`shrink-0 text-xs sm:text-sm md:text-lg font-bold font-mono transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted/40 group-hover:text-muted"}`}>
                      0{index + 1}
                    </span>
                    
                    {/* THE FIX: Replaced leading-none with leading-tight, and added pb-1 md:pb-2 to save the 'g' and 'p' */}
                    <h3 className={`truncate pb-1 md:pb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                      {project.title}
                    </h3>
                  </div>

                  <div className="shrink-0 ml-2">
                    <motion.div 
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                        className="pb-8 sm:pb-12 md:pb-16 pt-2 md:pt-4 flex flex-col lg:flex-row gap-8 lg:gap-14 items-center"
                      >
                        
                        {/* THE SLEEK BEZEL IMAGE FRAME */}
                        <div className="relative w-full max-w-2xl mx-auto lg:max-w-none lg:mx-0 lg:w-[48%] aspect-video rounded-xl sm:rounded-2xl bg-surface border border-border/60 p-1.5 sm:p-2.5 shadow-sm group/img shrink-0">
                          <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-background shadow-inner transition-all duration-700 ease-out group-hover/img:scale-[1.01] group-hover/img:shadow-2xl group-hover/img:shadow-primary/10">
                            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 z-10 rounded-lg sm:rounded-xl pointer-events-none" />
                            <img 
                              src={project.coverImage} 
                              alt={project.title}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        </div>

                        {/* Right: Description & Action Buttons */}
                        <div className="w-full max-w-2xl mx-auto lg:max-w-none lg:mx-0 lg:w-[52%] flex flex-col justify-center min-w-0">
                          
                          {project.tagline && (
                            <h4 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">
                              {project.tagline}
                            </h4>
                          )}
                          
                          <p className="text-sm sm:text-base md:text-lg text-muted font-medium leading-relaxed mb-6 md:mb-8">
                            {project.description}
                          </p>

                          {/* ACTION BLOCK */}
                          <div className="flex flex-wrap items-center justify-between w-full gap-y-4 gap-x-4 mt-2">
                            
                            {/* LEFT GROUP */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5">
                              
                              <a 
                                href={project.links.live}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-foreground text-background text-xs sm:text-sm md:text-base font-bold rounded-full transition-all duration-300 active:scale-95 group/btn shadow-md shrink-0"
                              >
                                View Project
                                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                              </a>

                              <a 
                                href={`#project-details`}
                                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 border border-border/80 text-foreground text-xs sm:text-sm md:text-base font-bold rounded-full transition-all duration-300 active:scale-95 group/link shadow-sm shrink-0"
                              >
                                <span className="absolute inset-0 bg-primary translate-y-[101%] group-hover/link:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full" />
                                <span className="relative z-10 flex items-center gap-2 group-hover/link:text-primary-text transition-colors duration-300">
                                  Read Case Study
                                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                                </span>
                              </a>
                            </div>

                            {/* RIGHT GROUP */}
                            {project.links.github && (
                              <a 
                                href={project.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="relative inline-flex items-center gap-2 py-2 text-xs sm:text-sm md:text-base font-bold text-muted hover:text-foreground transition-colors duration-300 group/gh shrink-0"
                              >
                                <Github className="w-4 h-4 md:w-5 md:h-5 group-hover/gh:scale-110 group-hover/gh:-rotate-12 transition-transform duration-300" />
                                <span className="relative">
                                  Source
                                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-foreground transition-all duration-300 ease-out group-hover/gh:w-full" />
                                </span>
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