'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Github } from 'lucide-react';
// IMPORT YOUR DATA HERE (Adjust path as needed)
import { allProjects } from '@/data/projects'; 

// Animation variants for smooth scroll reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  }
};

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(4);
  const visibleProjects = allProjects.slice(0, visibleCount);

  return (
    <section id="work" className="relative w-full bg-[var(--color-background)] py-20 md:py-32 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center relative">
          <div className="hidden md:flex gap-2 mb-6 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-foreground)]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-foreground)]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-foreground)]"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[var(--color-foreground)]">
            Selected <span className="text-[#e8751a]">works</span>
          </h2>
        </div>

        {/* ================= GRID LAYOUT ================= */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-20"
        >
          {visibleProjects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              className="group flex flex-col w-full cursor-pointer"
            >
              {/* IMAGE WRAPPER - Container stays still */}
              <div 
                className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6"
                style={{ backgroundColor: project.bgColor || "#a3b5c1" }}
              >
                {/* Image scales on hover */}
                <div className="absolute inset-0 w-full h-full p-8 md:p-12 transition-transform duration-700 ease-out group-hover:scale-105">
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* CARD METADATA */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)]/50 pb-4 mb-4">
                <div className="text-[var(--color-foreground)] text-sm md:text-base font-serif">
                  {project.tagline}
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="flex flex-col flex-grow">
                <span className="text-[#e8751a] text-xs font-bold tracking-widest mb-2 uppercase">
                  {project.category}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-foreground)] font-medium leading-tight mb-6 group-hover:text-[var(--color-primary)] transition-colors">
                  {project.title}
                </h3>

                {/* Minimalist Action Links */}
                <div className="flex items-center gap-6 mt-auto pt-2">
                  {project.links?.live && (
                    <a 
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-foreground)] hover:text-[#e8751a] transition-colors"
                    >
                      View Project <ArrowUpRight size={16} strokeWidth={2.5} />
                    </a>
                  )}
                  {project.links?.github && (
                    <a 
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                    >
                      <Github size={16} /> Source
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* ================= LOAD MORE BUTTON ================= */}
        {visibleCount < allProjects.length && (
          <div className="w-full flex justify-center mt-16">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="group flex items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all duration-300 active:scale-95 shadow-sm"
            >
              Load More
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}