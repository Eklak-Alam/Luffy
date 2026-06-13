"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Safely register ScrollTrigger only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    // 1. Cinematic Intro Reveal (Upgraded with Skew & Expo Easing)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(
      ".about-tag",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", force3D: true }
    )
    // The "Expensive" text reveal: using skewY and expo.out for that physical, heavy feel
    .fromTo(
      ".about-heading-line",
      { y: "130%", skewY: 4 }, 
      { 
        y: "0%", 
        skewY: 0,
        duration: 1.6, 
        stagger: 0.12, 
        ease: "expo.out",
        force3D: true // Forces GPU rendering to eliminate all lag
      },
      "-=0.8" // Tighter overlap for kinetic fluidity
    )
    .fromTo(
      ".about-paragraph",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", force3D: true },
      "-=1.2"
    );

    // 2. Subtle Parallax on the Intro (Creates depth as you scroll past it)
    gsap.to(".intro-content", {
      y: 100,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth, lag-free scrubbing
      }
    });

    // 3. Domain Rows Reveal (Upgraded with Micro-Scale & Deep Stagger)
    const rowElements = gsap.utils.toArray(".domain-row");
    
    rowElements.forEach((row) => {
      const rowTl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
        }
      });

      // Instead of just sliding, it scales slightly from 0.98 to 1 for a "settling" effect
      rowTl.fromTo(
        row,
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "expo.out", force3D: true }
      )
      // Multi-directional stagger for the internal content
      .fromTo(
        row.querySelectorAll(".row-content"),
        { opacity: 0, x: -20, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, stagger: 0.08, ease: "power4.out", force3D: true },
        "-=1.1"
      );
    });

  }, { scope: aboutRef }); // Scope completely prevents memory leaks and lag

  const domains = [
    {
      id: "01",
      title: "The Interface",
      subtitle: "Frontend Engineering",
      description: "Pixel-perfect, highly kinetic interfaces. Treating the DOM like a canvas to ensure every interaction feels instant and premium.",
      tech: "React • Next.js • Tailwind CSS • GSAP",
    },
    {
      id: "02",
      title: "The Engine",
      subtitle: "System Architecture",
      description: "Resilient, high-throughput microservices. Building secure backend environments that scale without creating bottlenecks.",
      tech: "Node.js • Java • Spring Boot • PostgreSQL",
    },
    {
      id: "03",
      title: "The Infrastructure",
      subtitle: "DevOps & Cloud",
      description: "Automated pipelines and robust cloud architecture. Ensuring code ships rapidly and the ecosystem never goes offline.",
      tech: "AWS • Docker • Kubernetes • CI/CD",
    },
    {
      id: "04",
      title: "The Intelligence",
      subtitle: "AI & LLM Integration",
      description: "Intelligent agents and RAG architectures embedded directly into the product ecosystem, giving applications a real brain.",
      tech: "Python • FastAPI • LangChain • Vector DBs",
    }
  ];

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-24 md:py-48 relative bg-[var(--color-background)] overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        
        {/* ================= MASSIVE INTRO ================= */}
        {/* Added "intro-content" class here for the parallax effect */}
        <div className="intro-content max-w-5xl mb-20 md:mb-32 will-change-transform">
          
          <div className="about-tag flex items-center gap-3 mb-8 md:mb-10 will-change-transform">
            <span className="text-xs sm:text-sm font-bold text-[var(--color-foreground)] tracking-widest uppercase">
              Engineering <span className="text-[#e8751a]">Philosophy</span>
            </span>
          </div>
          
          {/* Masking containers: overflow-hidden hides the text before it animates up */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[var(--color-foreground)] leading-[1.1] md:leading-[1.05] tracking-tighter mb-8 md:mb-10">
            <div className="overflow-hidden pb-2">
              <div className="about-heading-line will-change-transform origin-top-left">I don't just write code.</div>
            </div>
            <div className="overflow-hidden pb-2">
              <div className="about-heading-line text-[var(--color-muted)] will-change-transform origin-top-left">I architect scalable ecosystems.</div>
            </div>
          </h2>

          <p className="about-paragraph text-lg sm:text-xl md:text-2xl text-[var(--color-muted)] font-medium max-w-3xl leading-relaxed will-change-transform">
            From the database schema to the final pixel on the screen, every decision is made with scale, performance, and user experience in mind.
          </p>
        </div>

        {/* ================= EDITORIAL INDEX ================= */}
        <div className="domain-container w-full border-t border-[var(--color-border)]/50">
          
          {domains.map((domain, index) => (
            <div 
              key={index} 
              className="domain-row group flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 lg:py-14 border-b border-[var(--color-border)]/50 hover:border-[var(--color-foreground)] transition-colors duration-500 cursor-default will-change-transform"
            >
              
              {/* Left Side: Number & Title */}
              <div className="flex items-start gap-8 lg:gap-12 lg:w-5/12 mb-4 lg:mb-0 w-full">
                <span className="row-content hidden md:block text-base font-mono font-bold text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-300 mt-2 shrink-0">
                  {domain.id}
                </span>
                
                <div className="w-full text-left">
                  <h3 className="row-content text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)] mb-2 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                    {domain.title}
                  </h3>
                  <span className="row-content block text-xs sm:text-sm font-bold tracking-widest uppercase text-[#e8751a] opacity-80">
                    {domain.subtitle}
                  </span>
                </div>
              </div>

              {/* Right Side: Description & Tech */}
              <div className="lg:w-6/12 flex flex-col justify-center w-full text-left">
                <p className="row-content text-base md:text-lg text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors duration-500 leading-relaxed mb-4 md:mb-6">
                  {domain.description}
                </p>
                
                <p className="row-content text-sm md:text-base font-bold text-[var(--color-foreground)] font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                  {domain.tech}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}