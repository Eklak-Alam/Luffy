"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STACK = [
  { name: "Node.js", weight: "font-black", outline: false },
  { name: "Next.js", weight: "font-thin", outline: true },
  { name: "Python", weight: "font-bold", outline: false },
  { name: "Spring Boot", weight: "font-black", outline: false },
  { name: "AWS", weight: "font-black", outline: true },
  { name: "Docker", weight: "font-medium", outline: false },
  { name: "Python", weight: "font-thin", outline: true },
  { name: "LangChain", weight: "font-black", outline: true },
  { name: "K8S", weight: "font-bold", outline: false },
  { name: "FastAPI", weight: "font-medium", outline: true },
  { name: "Node.js", weight: "font-light", outline: true },
  { name: "Tailwind CSS", weight: "font-bold", outline: false },
];

// Duplicating the stack ensures we have enough content to fill massive ultrawide monitors
const MARQUEE_ITEMS = [...STACK, ...STACK, ...STACK]; 

export default function TypographyStack() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Staggering the start and end points directly in Framer Motion 
  // instead of using CSS margins ensures it centers perfectly on big screens.
  const xLeft1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-600, 0]);
  const xLeft2 = useTransform(scrollYProgress, [0, 1], [-200, -800]);

  return (
    <section 
      ref={container} 
      // Upgraded padding for better visual hierarchy across all devices
      className="relative w-full py-12 md:py-16 lg:py-20 bg-background overflow-hidden flex flex-col justify-center min-h-[60vh] lg:min-h-[80vh]"
    >
      {/* Using items-center ensures the block stays vertically and horizontally 
        balanced in the viewport, no matter the screen width. 
      */}
      <div className="flex flex-col items-center space-y-4 md:space-y-8 lg:space-y-12 z-10 w-full max-w-[100vw]">
        
        {/* ROW 1 - Moves Left */}
        <motion.div style={{ x: xLeft1 }} className="flex whitespace-nowrap gap-6 md:gap-12 will-change-transform">
          {MARQUEE_ITEMS.slice(0, 16).map((tech, i) => (
            <TextItem key={`row1-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

        {/* ROW 2 - Moves Right */}
        <motion.div style={{ x: xRight }} className="flex whitespace-nowrap gap-6 md:gap-12 will-change-transform">
          {MARQUEE_ITEMS.slice(8, 24).map((tech, i) => (
            <TextItem key={`row2-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

        {/* ROW 3 - Moves Left */}
        <motion.div style={{ x: xLeft2 }} className="flex whitespace-nowrap gap-6 md:gap-12 will-change-transform">
          {MARQUEE_ITEMS.slice(4, 20).map((tech, i) => (
            <TextItem key={`row3-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

      </div>

      {/* Background Decorative Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0"
        aria-hidden="true"
      >
        <h1 className="text-[25vw] sm:text-[20vw] font-black uppercase text-foreground leading-none">
          Fullstack
        </h1>
      </div>
    </section>
  );
}

function TextItem({ tech }) {
  return (
    <span
      className={`
        /* Fluid typography scales beautifully from mobile to massive 4K monitors */
        text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] 
        uppercase tracking-tighter cursor-default
        ${tech.weight}
        ${tech.outline 
          ? "text-transparent [-webkit-text-stroke:1px_var(--color-foreground)] md:[-webkit-text-stroke:2px_var(--color-foreground)] opacity-60" 
          : "text-foreground opacity-90"}
      `}
    >
      {tech.name}
    </span>
  );
}