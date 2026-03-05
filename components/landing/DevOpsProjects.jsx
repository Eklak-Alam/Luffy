"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Plus, Server, Github } from "lucide-react";
import { allDevOpsProjects } from "@/data/devopsproject";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DevOpsProjects() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleProject = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useGSAP(() => {
    gsap.fromTo(
      ".devops-row",
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
      id="infrastructure" 
      ref={sectionRef} 
      className="relative w-full bg-background  overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* ================= DEVOPS HEADER ================= */}
        <div className="mb-10 md:mb-20">
          {/* Responsive Typography: text-3xl on mobile, md:text-6xl for PC */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground mb-3 md:mb-4">
            Architected for <span className="text-primary">Scale.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted font-medium max-w-2xl leading-relaxed">
            A deep dive into my cloud deployments, container orchestration, and automated GitOps pipelines.
          </p>
        </div>

        {/* ================= THE KINETIC ACCORDION ================= */}
        <div className="flex flex-col border-t border-border/50">
          {allDevOpsProjects.map((project, index) => {
            const isOpen = activeIndex === index;

            return (
              <div 
                key={project.id} 
                className="devops-row flex flex-col border-b border-border/50"
              >
                
                {/* 1. THE CLICKABLE ROW */}
                <button
                  onClick={() => toggleProject(index)}
                  // Compact padding on mobile (py-4) for better scroll density
                  className="w-full flex items-center justify-between py-4 sm:py-6 md:py-10 text-left group transition-colors"
                >
                  <div className="flex-1 flex items-center gap-3 sm:gap-4 md:gap-8 lg:gap-12 transition-transform duration-500 ease-out md:group-hover:translate-x-4 pr-4">
                    
                    <span className={`text-xs sm:text-sm md:text-lg font-bold font-mono transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted/40 group-hover:text-muted"}`}>
                      0{index + 1}
                    </span>
                    
                    {/* Balanced Mobile Font: text-xl sm:text-2xl */}
                    <h3 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                      {project.title}
                    </h3>

                  </div>

                  <div className="shrink-0">
                    <motion.div 
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      // Scaled icon container for mobile
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
                        // Responsive Gaps: gap-5 for mobile, md:gap-12 for PC
                        className="pb-6 sm:pb-8 md:pb-10 pt-2 flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-12 items-start lg:items-center"
                      >
                        
                        {/* Left: Architecture Image */}
                        <div className="w-full lg:w-[55%] aspect-video rounded-xl overflow-hidden bg-surface border border-border shadow-lg shrink-0 relative group/img">
                          <div className="absolute inset-0 bg-primary/10 group-hover/img:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>

                        {/* Right: Description & Action Buttons */}
                        <div className="w-full lg:w-[45%] flex flex-col justify-center">
                          
                          {/* Scaled Text for Mobile readability */}
                          <p className="text-sm sm:text-base md:text-lg text-muted font-medium leading-relaxed mb-6 md:mb-8">
                            {project.shortDescription}
                          </p>

                          {/* ACTION BLOCK: Optimized button spacing for mobile */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
                            
                            {/* Primary Button: text-xs on mobile */}
                            <a 
                              href={`/case-study/${project.slug}`} 
                              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-foreground text-background text-xs sm:text-sm md:text-base font-bold rounded-full hover:bg-primary hover:text-primary-text transition-all duration-300 active:scale-95 group/btn shadow-md"
                            >
                              Read Case Study
                              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </a>

                            {/* GitHub Config Link: Full width option for tiny screens */}
                            <a 
                              href={project.links?.github || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-bold text-muted hover:text-foreground transition-colors duration-300 group/gh"
                            >
                              <Github className="w-4 h-4 md:w-5 md:h-5 group-hover/gh:scale-110 transition-transform duration-300" />
                              <span>View Config</span>
                            </a>

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