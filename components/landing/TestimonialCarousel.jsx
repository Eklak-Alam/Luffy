"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

// Updated with exact pastel colors matching your reference image
const testimonials = [
  {
    id: 1,
    name: "Neha Panday",
    role: "Senior Frontend Engineer, PixelCraft",
    text: "Working with Eklak was a great experience. His understanding of modern frontend development using React and performance optimization is impressive. He focuses not just on building UI, but crafting smooth user experiences. His ability to debug complex UI issues and improve responsiveness really helped our team deliver faster.",
    image: "https://i.pravatar.cc/150?img=32",
    linkedin: "https://linkedin.com/in/rohit-sharma-dev",
    bgColor: "#e6f7ff",
  },
  {
    id: 2,
    name: "Anjali Verma",
    role: "Backend Developer, CodeNest",
    text: "Eklak has strong backend fundamentals and a solid grip on Spring Boot. During our collaboration, he built scalable APIs and handled database integration efficiently. His problem-solving mindset and willingness to learn new backend technologies make him a valuable developer.",
    image: "https://i.pravatar.cc/150?img=47",
    linkedin: "https://linkedin.com/in/anjali-verma-tech",
    bgColor: "#f0fdf4",
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "DevOps Engineer, CloudOps",
    text: "I worked with Eklak on deploying applications using Docker and CI/CD pipelines. He quickly adapted to DevOps practices and understood the workflow of automation tools like GitHub Actions. His curiosity in cloud technologies and eagerness to implement real-world solutions stood out.",
    image: "https://i.pravatar.cc/150?img=12",
    linkedin: "https://linkedin.com/in/vikram-singh-devops",
    bgColor: "#fff7ed",
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Full Stack Developer, StackFlow",
    text: "Eklak is a well-rounded full-stack developer. He can seamlessly switch between frontend and backend tasks. While working together, he developed complete features from UI to API integration with clean and maintainable code. His consistency and dedication are commendable.",
    image: "https://i.pravatar.cc/150?img=25",
    linkedin: "https://linkedin.com/in/neha-gupta-fullstack",
    bgColor: "#f5f3ff",
  },
  {
    id: 5,
    name: "Michel James",
    role: "Software Engineering, TechBridge",
    text: "As an intern, Eklak showed great potential and learning ability. He was proactive in asking questions, quickly grasped project requirements, and delivered tasks on time. His enthusiasm for web development and strong basics make him stand out among peers.",
    image: "https://i.pravatar.cc/150?img=15",
    linkedin: "https://linkedin.com/in/aman-khan-intern",
    bgColor: "#ecfeff",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Upgraded 3D logic to match the reference image exactly
  const getCardStyle = (index) => {
    const total = testimonials.length;
    let diff = (index - currentIndex) % total;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    if (diff === 0) {
      // Center Active Card (Flat and elevated)
      return {
        x: "0%",
        z: 0,
        rotateY: 0,
        scale: 1.05,
        zIndex: 30,
        opacity: 1,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
      };
    } else if (diff === -1) {
      // Left Card (Tilted to the right, partially off-screen on mobile to peek)
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 768 ? "-75%" : "-60%", 
        z: -100,
        rotateY: 15,
        scale: 0.95,
        zIndex: 20,
        opacity: 0.9,
        boxShadow: "-10px 10px 20px -10px rgba(0,0,0,0.05)",
      };
    } else if (diff === 1) {
      // Right Card (Tilted to the left, partially off-screen on mobile to peek)
      return {
        x: typeof window !== 'undefined' && window.innerWidth < 768 ? "75%" : "60%",
        z: -100,
        rotateY: -15,
        scale: 0.95,
        zIndex: 20,
        opacity: 0.9,
        boxShadow: "10px 10px 20px -10px rgba(0,0,0,0.05)",
      };
    } else {
      // Hidden Cards (Pushed way back)
      return {
        x: diff < 0 ? "-120%" : "120%",
        z: -300,
        rotateY: diff < 0 ? 30 : -30,
        scale: 0.8,
        zIndex: 10,
        opacity: 0,
        boxShadow: "none",
      };
    }
  };

  if (!isClient) return null;

  return (
    <section id="testimonial" className="py-20 md:py-32 overflow-hidden relative w-full flex flex-col items-center justify-center bg-[var(--color-background)] font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-16 md:mb-24 px-6 relative z-40">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[var(--color-foreground)]">
          Kind words <span className="text-[#e8751a]">from collaborators</span>
        </h2>
        <p className="text-[var(--color-muted)] max-w-xl mx-auto mt-6 text-lg">
          Insights and feedback from the amazing people I have had the pleasure of working with.
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div
        className="relative w-full max-w-[1200px] h-[450px] md:h-[500px] flex justify-center items-center"
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        <AnimatePresence initial={false}>
          {testimonials.map((testimonial, index) => {
            return (
              <motion.div
                key={testimonial.id}
                initial={false}
                animate={getCardStyle(index)}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.35, 1] }}
                className="absolute w-[300px] sm:w-[340px] md:w-[380px] h-[420px] md:h-[480px] rounded-3xl p-8 flex flex-col justify-between cursor-pointer border border-black/5"
                style={{
                  backgroundColor: testimonial.bgColor,
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
                onClick={() => setCurrentIndex(index)}
              >
                {/* Testimonial Text - High-end editorial serif typography */}
                <div className="text-[#4a4a4a] text-sm md:text-base leading-relaxed md:leading-[1.8] font-serif whitespace-pre-line overflow-hidden tracking-wide opacity-90">
                  {testimonial.text}
                </div>

                {/* Author Info */}
                <div className="flex items-end justify-between mt-6 w-full pt-4 border-t border-black/5">
                  <div className="flex items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 shadow-sm border border-white/50">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                      <h4 className="font-serif text-[#222] text-lg md:text-xl font-medium tracking-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-[11px] md:text-xs text-[#666] mt-1 font-sans tracking-wide">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#666] hover:text-[#0a66c2] transition-colors ml-2 shrink-0 mb-1"
                    onClick={(e) => e.stopPropagation()} // Prevents sliding the card when clicking the link
                  >
                    <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Unified Pill Controller matching your reference image */}
      <div className="flex items-center gap-6 mt-12">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-[var(--color-brand-lightest)] transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Pagination Dots */}

        <div className="flex gap-2 bg-[var(--color-border)] px-4 py-2 rounded-full">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-[var(--color-primary)] w-4"
                  : "bg-[var(--color-muted)] opacity-50 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-[var(--color-brand-lightest)] transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}