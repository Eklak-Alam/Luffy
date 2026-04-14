"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STACK = [
  { name: "React", weight: "font-thin", outline: false },
  { name: "Node.js", weight: "font-black", outline: false },
  { name: "Python", weight: "font-bold", outline: false },
  { name: "Next.js", weight: "font-thin", outline: true },
  { name: "Spring Boot", weight: "font-black", outline: false },
  { name: "AWS", weight: "font-black", outline: true },
  { name: "Docker", weight: "font-medium", outline: false },
  { name: "LangChain", weight: "font-black", outline: true },
  { name: "K8S", weight: "font-bold", outline: false },
  { name: "FastAPI", weight: "font-medium", outline: true },
  { name: "TypeScript", weight: "font-light", outline: true },
  { name: "Tailwind", weight: "font-bold", outline: false },
];

// Duplicating the stack ensures we have enough content to fill massive screens
const MARQUEE_ITEMS = [...STACK, ...STACK, ...STACK, ...STACK];

export default function TypographyStack() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // ================= HORIZONTAL TRANSFORMS (Desktop) =================
  // Reduced the travel distance (from 30% to 15%) to make the scrolling much slower and smoother
  const xLeft1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);
  const xLeft2 = useTransform(scrollYProgress, [0, 1], ["-5%", "-20%"]);

  // ================= VERTICAL TRANSFORMS (Mobile) =================
  // Reduced travel distance here as well for a consistent smooth feel
  const yUp1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yDown = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);
  const yUp2 = useTransform(scrollYProgress, [0, 1], ["-5%", "-20%"]);

  return (
    <section 
      ref={container} 
      className="relative w-full bg-[var(--color-background)] overflow-hidden flex flex-col justify-center min-h-[80vh] md:min-h-[60vh] lg:min-h-[80vh] py-10"
    >
      
      {/* ================= DESKTOP LAYOUT (Horizontal Scrolling) ================= */}
      <div 
        className="hidden md:flex flex-col items-center justify-center space-y-8 lg:space-y-12 z-10 w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        {/* ROW 1 - Moves Left */}
        <motion.div style={{ x: xLeft1 }} className="flex flex-row whitespace-nowrap gap-12 lg:gap-16 will-change-transform">
          {MARQUEE_ITEMS.slice(0, 20).map((tech, i) => (
            <TextItem key={`row1-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

        {/* ROW 2 - Moves Right */}
        <motion.div style={{ x: xRight }} className="flex flex-row whitespace-nowrap gap-12 lg:gap-16 will-change-transform">
          {MARQUEE_ITEMS.slice(5, 25).map((tech, i) => (
            <TextItem key={`row2-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

        {/* ROW 3 - Moves Left */}
        <motion.div style={{ x: xLeft2 }} className="flex flex-row whitespace-nowrap gap-12 lg:gap-16 will-change-transform">
          {MARQUEE_ITEMS.slice(10, 30).map((tech, i) => (
            <TextItem key={`row3-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>
      </div>


      {/* ================= MOBILE LAYOUT (Vertical Scrolling) ================= */}
      {/* Takes full height, tilted slightly (-6deg) for aggressive, kinetic motion */}
      <div 
        className="flex md:hidden flex-row items-center justify-center space-x-6 h-[85vh] z-10 w-full transform -rotate-6 scale-110"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
        }}
      >
        {/* COL 1 - Moves Up */}
        <motion.div style={{ y: yUp1 }} className="flex flex-col whitespace-nowrap gap-6 will-change-transform">
          {MARQUEE_ITEMS.slice(0, 20).map((tech, i) => (
            <TextItemMobile key={`col1-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

        {/* COL 2 - Moves Down */}
        <motion.div style={{ y: yDown }} className="flex flex-col whitespace-nowrap gap-6 will-change-transform">
          {MARQUEE_ITEMS.slice(5, 25).map((tech, i) => (
            <TextItemMobile key={`col2-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>

        {/* COL 3 - Moves Up */}
        <motion.div style={{ y: yUp2 }} className="flex flex-col whitespace-nowrap gap-6 will-change-transform">
          {MARQUEE_ITEMS.slice(10, 30).map((tech, i) => (
            <TextItemMobile key={`col3-${tech.name}-${i}`} tech={tech} />
          ))}
        </motion.div>
      </div>

      {/* ================= BACKGROUND DECORATION ================= */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none z-0"
        aria-hidden="true"
      >
        {/* Hidden on mobile so it doesn't clash with vertical text */}
        <h1 className="hidden md:block text-[25vw] sm:text-[20vw] font-black uppercase text-[var(--color-foreground)] leading-none tracking-tighter">
          Fullstack
        </h1>
      </div>
    </section>
  );
}

// ---------------- DESKTOP COMPONENT ----------------
function TextItem({ tech }) {
  return (
    <span
      className={`
        text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] 
        uppercase tracking-tighter cursor-default
        ${tech.weight}
        ${tech.outline 
          ? "text-transparent [-webkit-text-stroke:2px_var(--color-border)]" 
          : "text-[var(--color-foreground)]"}
      `}
    >
      {tech.name}
    </span>
  );
}

// ---------------- MOBILE COMPONENT ----------------
// Smaller text so multiple columns fit perfectly side-by-side
function TextItemMobile({ tech }) {
  return (
    <span
      className={`
        text-5xl sm:text-6xl 
        uppercase tracking-tighter cursor-default
        ${tech.weight}
        ${tech.outline 
          ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-border)]" 
          : "text-[var(--color-foreground)]"}
      `}
    >
      {tech.name}
    </span>
  );
}