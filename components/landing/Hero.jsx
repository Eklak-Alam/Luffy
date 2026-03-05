"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 }); // Wait slightly for Navbar

    // Animate the text lines in with a heavy, premium glide
    tl.fromTo(
      ".hero-reveal",
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power4.out" 
      }
    );
    // Removed the background fade animation so it loads instantly
  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-10 overflow-hidden"
    >
      {/* Visual Hierarchy: Subtle Infrastructure Grid Background */}
      <div 
        // Pushed up from the bottom slightly with 'bottom-24'
        className="absolute inset-x-0 top-0 bottom-24 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          // CHANGED TO 1: This matches the final brightness your GSAP animation was creating
          opacity: 1, 
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col items-start justify-center">
          
          {/* Eyebrow / Tagline */}
          <div className="hero-reveal flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/60 bg-surface mb-8">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-[10px] sm:text-sm font-semibold text-muted tracking-wide uppercase whitespace-nowrap">
              Full Stack • DevOps • Cloud Engineer
            </span>
          </div>

          {/* Massive Typography: Scales perfectly across all devices */}
          <h1 className="hero-reveal text-[3.5rem] leading-[1.1] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] font-extrabold tracking-tighter text-foreground mb-6">
            Building on Localhost.<br />
            <span className="text-primary">Deploying to the World.</span>
          </h1>

          {/* Subheading: The Value Proposition */}
          <p className="hero-reveal text-lg sm:text-xl md:text-2xl text-muted max-w-3xl leading-relaxed mb-12 font-medium">
            I engineer end-to-end digital solutions. From pixel-perfect React interfaces to scalable cloud infrastructure and CI/CD pipelines. Everything you need, architected in one place.
          </p>

          {/* CTA Buttons (Responsive Flexbox) */}
          <div className="hero-reveal flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary Action */}
            <a 
              href="#work" 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background text-lg font-bold hover:bg-primary hover:text-primary-text hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 shadow-xl"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Action */}
            <a 
              href="#contact" 
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full border-2 border-border text-foreground text-lg font-bold hover:border-foreground hover:bg-foreground hover:text-background hover:-translate-y-1 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}