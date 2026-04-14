"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);

  useGSAP(() => {
    // Cinematic fade-up for the intro text
    gsap.fromTo(
      ".about-reveal",
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
        }
      }
    );

    // Stagger the horizontal lines and rows for a "building" effect
    gsap.fromTo(
      ".domain-row",
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".domain-container",
          start: "top 80%",
        }
      }
    );
  }, { scope: aboutRef });

  const domains = [
    {
      id: "01",
      title: "The Interface",
      subtitle: "Frontend Engineering",
      description: "Pixel-perfect, highly kinetic interfaces. Treating the DOM like a canvas to ensure every interaction feels instant and premium.",
      tech: "React • Next.js • Tailwind CSS • TypeScript • GSAP",
    },
    {
      id: "02",
      title: "The Engine",
      subtitle: "System Architecture",
      description: "Resilient, high-throughput microservices. Building secure backend environments that scale without creating bottlenecks.",
      tech: "Node.js • Java • Spring Boot • PostgreSQL • Redis",
    },
    {
      id: "03",
      title: "The Infrastructure",
      subtitle: "DevOps & Cloud",
      description: "Automated pipelines and robust cloud architecture. Ensuring code ships rapidly and the ecosystem never goes offline.",
      tech: "AWS • Docker • Kubernetes • Terraform • CI/CD",
    },
    {
      id: "04",
      title: "The Intelligence",
      subtitle: "AI & LLM Integration",
      description: "Intelligent agents and RAG architectures embedded directly into the product ecosystem, giving applications a real brain.",
      tech: "Python • FastAPI • LangChain • Vector Databases",
    }
  ];

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-24 md:py-48 relative bg-[var(--color-background)]"
    >
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        
        {/* ================= MASSIVE INTRO ================= */}
        <div className="max-w-5xl mb-20 md:mb-32">
          <div className="about-reveal flex items-center gap-3 mb-8 md:mb-10">
            {/* <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" /> */}
            <span className="text-xs sm:text-sm font-bold text-[var(--color-foreground)] tracking-widest uppercase">
              Engineering <span className="text-[#e8751a]">Philosophy</span>
            </span>
          </div>
          
          {/* Breaking the text cleanly for maximum typographic impact */}
          <h2 className="about-reveal text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[var(--color-foreground)] leading-[1.1] md:leading-[1.05] tracking-tighter mb-8 md:mb-10">
            I don't just write code.<br />
            <span className="text-[var(--color-muted)]">I architect scalable ecosystems.</span>
          </h2>

          <p className="about-reveal text-lg sm:text-xl md:text-2xl text-[var(--color-muted)] font-medium max-w-3xl leading-relaxed">
            From the database schema to the final pixel on the screen, every decision is made with scale, performance, and user experience in mind.
          </p>
        </div>

        {/* ================= EDITORIAL INDEX ================= */}
        <div className="domain-container w-full border-t border-[var(--color-border)]/50">
          
          {domains.map((domain, index) => (
            <div 
              key={index} 
              className="domain-row group flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 lg:py-14 border-b border-[var(--color-border)]/50 hover:border-[var(--color-foreground)] transition-colors duration-500 cursor-default"
            >
              
              {/* Left Side: Number & Title */}
              <div className="flex items-start gap-8 lg:gap-12 lg:w-5/12 mb-4 lg:mb-0 w-full">
                {/* ID hidden on mobile, visible on medium screens and up */}
                <span className="hidden md:block text-base font-mono font-bold text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-300 mt-2 shrink-0">
                  {domain.id}
                </span>
                
                {/* Title and Subtitle perfectly flush left */}
                <div className="w-full text-left">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-foreground)] mb-2 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                    {domain.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#e8751a] opacity-80">
                    {domain.subtitle}
                  </span>
                </div>
              </div>

              {/* Right Side: Description & Tech */}
              {/* Removed the left padding on mobile so it aligns cleanly to the left edge */}
              <div className="lg:w-6/12 flex flex-col justify-center w-full text-left">
                <p className="text-base md:text-lg text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors duration-500 leading-relaxed mb-4 md:mb-6">
                  {domain.description}
                </p>
                
                {/* Tech string */}
                <p className="text-sm md:text-base font-bold text-[var(--color-foreground)] font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
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