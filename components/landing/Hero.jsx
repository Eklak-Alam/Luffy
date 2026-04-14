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

    // Stagger the logos in smoothly after the text
    tl.fromTo(
      ".brand-logo",
      { y: 20, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.1, 
        ease: "back.out(1.2)" 
      },
      "-=0.6" // Overlap with the text animation for a faster feel
    );
  }, { scope: heroRef });

  // Split into explicit rows to guarantee the 4-top / 3-bottom layout everywhere
  const rowOne = [
    { name: "Gaprio", logo: "/logos/gaprio1.png" },
    { name: "GogalEdu", logo: "/logos/gogaledu.png" },
    { name: "Adichr", logo: "/logos/adichr.png" },
    { name: "WeCare Diagnostics", logo: "/logos/wecarediagnostic.png" },
  ];

  const rowTwo = [
    { name: "Shanaya Training", logo: "/logos/shanaya.png" },
    { name: "Greggantic", logo: "/logos/greggantic.webp" },
    { name: "Balaji Shikshan", logo: "/logos/balaji.webp" },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-[var(--color-background)]"
    >
      {/* Visual Hierarchy: Subtle Infrastructure Grid Background 
        Fades out cleanly before hitting the logos, with transparent upper corners
      */}
      <div 
        className="absolute inset-x-0 top-0 h-[70vh] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 120% 100% at 50% 10%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 100% at 50% 10%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col items-start">
        
        {/* ================= MAIN HERO TEXT ================= */}
        <div className="flex flex-col items-start justify-center max-w-5xl w-full">
          
          {/* Eyebrow / Tagline */}
          <div className="hero-reveal flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--color-border)]/60 bg-[var(--color-surface)] mb-8">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8751a]" />
            <span className="text-[10px] sm:text-sm font-semibold text-[var(--color-muted)] tracking-wide uppercase whitespace-nowrap">
              Full Stack • DevOps • Cloud Engineer
            </span>
          </div>

          {/* Massive Typography */}
          <h1 className="hero-reveal text-[3.25rem] leading-[1.1] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] font-extrabold tracking-tighter text-[var(--color-foreground)] mb-6">
            Building on Localhost.<br />
            <span className="text-[var(--color-primary)]">Deploying to the World.</span>
          </h1>

          {/* Subheading: The Value Proposition */}
          <p className="hero-reveal text-base sm:text-xl md:text-2xl text-[var(--color-muted)] max-w-3xl leading-relaxed mb-12 font-medium">
            I engineer end-to-end digital solutions. From pixel-perfect React interfaces to scalable cloud infrastructure and CI/CD pipelines. Everything you need, architected in one place.
          </p>

          {/* CTA Buttons */}
          <div className="hero-reveal flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a 
              href="#work" 
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-foreground)] text-[var(--color-background)] text-lg font-bold hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 transition-all duration-300 shadow-xl"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#contact" 
              className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full border-2 border-[var(--color-border)] text-[var(--color-foreground)] text-lg font-bold hover:border-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] hover:-translate-y-1 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* ================= STRICT 2-ROW LOGO SHOWCASE ================= */}
        <div className="hero-reveal mt-20 sm:mt-24 pt-10 sm:pt-12 w-full max-w-4xl mx-auto flex flex-col items-center">
          
          <p className="text-[10px] sm:text-sm font-bold text-[var(--color-foreground)] tracking-widest uppercase mb-8 sm:mb-10 opacity-80 text-center">
            Projects & <span className="text-[#e8751a]">Collaborations</span>
          </p>
          
          <div className="flex flex-col items-center gap-6 sm:gap-10 w-full">
            
            {/* ROW 1: Exactly 4 Logos */}
            <div className="flex items-center justify-center w-full gap-3 sm:gap-8 md:gap-16">
              {rowOne.map((company, index) => (
                <div 
                  key={`r1-${index}`} 
                  // Scaled down mobile widths (w-[70px]) to fit 4 in a row perfectly
                  className="brand-logo group relative flex items-center justify-center w-[70px] sm:w-[120px] md:w-[150px] shrink-0"
                >
                  {/* The 30% Green Premium Ambient Glow on Hover */}
                  <div className="absolute inset-0 bg-[var(--color-primary)]/30 blur-xl md:blur-2xl rounded-full scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-500 ease-out z-0 pointer-events-none"></div>
                  
                  {/* Full Color Logo */}
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    // Scaled down mobile height (max-h-7) to match the width
                    className="relative z-10 max-h-7 sm:max-h-10 md:max-h-12 w-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-400 ease-out cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* ROW 2: Exactly 3 Logos */}
            <div className="flex items-center justify-center w-full gap-5 sm:gap-12 md:gap-20">
              {rowTwo.map((company, index) => (
                <div 
                  key={`r2-${index}`} 
                  className="brand-logo group relative flex items-center justify-center w-[75px] sm:w-[120px] md:w-[150px] shrink-0"
                >
                  {/* The 30% Green Premium Ambient Glow on Hover */}
                  <div className="absolute inset-0 bg-[var(--color-primary)]/30 blur-xl md:blur-2xl rounded-full scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-100 transition-all duration-500 ease-out z-0 pointer-events-none"></div>
                  
                  {/* Full Color Logo */}
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="relative z-10 max-h-7 sm:max-h-10 md:max-h-12 w-full sm:opacity-100 object-contain lg:opacity-70 md:opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-400 ease-out cursor-pointer"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}