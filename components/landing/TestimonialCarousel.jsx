"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

// Exact data mapping with pastel colors
const testimonials = [
  {
    id: 1,
    name: "Linsha Watson",
    role: "Senior Product Designer, Way.com",
    text: "I had the chance to work with Jithuna at Way.com, and collaborating with her was always a really enriching experience. What stands out the most about Jithuna is her storytelling ability. She has a way of bringing insights together and presenting them in a way that makes the whole team see the bigger picture clearly.\n\nJithuna also puts an incredible amount of effort into research. She goes beyond the obvious, digs deep into problems, and brings thoughtful perspectives.",
    image: "https://i.pravatar.cc/150?img=47",
    linkedin: "#",
    bgColor: "#d6eeff", // Pastel Blue
  },
  {
    id: 2,
    name: "Chintu Varghese",
    role: "CEO, TabEdu",
    text: "Ms. Jithuna is an extremely talented designer. She has done an excellent job in designing our pitch deck, illustrations for our new web site and investor presentations.\nWorking closely with me during her tenure at TabEdu, she has been very patient in her approach, has no hesitance in working extra hours to meet our deadlines, demonstrated positive attitude, willing to listen to ideas and develop good design options.",
    image: "https://i.pravatar.cc/150?img=11",
    linkedin: "#",
    bgColor: "#fcfbf8", // Off-white
  },
  {
    id: 3,
    name: "Ajay Dev",
    role: "Product Manager, Way.com",
    text: "I think Jithuna is one of the most humble, creative, talented and user empathetic designer that I have came across during my journey in Way.com. She could easily resonate and shape my thoughts and ideas into great designs. And I can easily vouch for her in terms of design sense and clarity in her execution.",
    image: "https://i.pravatar.cc/150?img=12",
    linkedin: "#",
    bgColor: "#fef3b9", // Pastel Yellow
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Frontend Lead",
    text: "Working alongside this design system was an absolute breeze. The attention to brutalist minimalism and functional component structure made the developer handoff seamless. Highly recommended for complex projects.",
    image: "https://i.pravatar.cc/150?img=5",
    linkedin: "#",
    bgColor: "#e8f3e8", // Pastel Green
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
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // 3D calculation logic
  const getCardStyle = (index) => {
    const total = testimonials.length;
    let diff = (index - currentIndex) % total;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    if (diff === 0) {
      // Center Active Card
      return {
        x: "0%",
        z: 0,
        rotateY: 0,
        scale: 1.05,
        zIndex: 30,
        opacity: 1,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      };
    } else if (diff === -1) {
      // Left Card
      return {
        x: "-65%", // Keeps it visible on the edges
        z: -100,
        rotateY: 22,
        scale: 0.95,
        zIndex: 20,
        opacity: 0.9,
        boxShadow: "none",
      };
    } else if (diff === 1) {
      // Right Card
      return {
        x: "65%",
        z: -100,
        rotateY: -22,
        scale: 0.95,
        zIndex: 20,
        opacity: 0.9,
        boxShadow: "none",
      };
    } else {
      // Hidden Cards
      return {
        x: diff < 0 ? "-100%" : "100%",
        z: -200,
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
    <section className="py-16 md:py-20 overflow-hidden relative w-full flex flex-col items-center justify-center bg-[var(--color-background)] font-sans">
      {/* Header Section */}

      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[var(--color-foreground)]">
          Kind words <span className="text-[#e8751a]">from collaborators</span>
        </h2>

        <p className="text-[var(--color-muted)] max-w-xl mx-auto mt-4">
          Insights and feedback from the amazing people I have had the pleasure
          of working with on various projects.
        </p>
      </div>

      {/* 3D Carousel Container - height adjusted for responsiveness */}
      <div
        className="relative w-full max-w-6xl h-[480px] md:h-[550px] flex justify-center items-center perspective-1000"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <AnimatePresence initial={false}>
          {testimonials.map((testimonial, index) => {
            return (
              <motion.div
                key={testimonial.id}
                initial={false}
                animate={getCardStyle(index)}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                // Responsive card sizing: small on mobile (280px) so sides show, larger on desktop (380px)
                className="absolute w-[280px] sm:w-[320px] md:w-[380px] h-[440px] md:h-[520px] rounded-[1.25rem] md:rounded-[1.5rem] p-6 md:p-8 flex flex-col justify-between cursor-pointer"
                style={{
                  backgroundColor: testimonial.bgColor,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => setCurrentIndex(index)}
              >
                {/* Testimonial Text - smaller text on mobile to prevent overflow */}
                <div className="text-[#555555] text-[13px] md:text-[14px] leading-[1.7] md:leading-[1.8] font-serif whitespace-pre-line text-justify opacity-90 overflow-hidden">
                  {testimonial.text}
                </div>

                {/* Author Info */}
                <div className="flex items-center mt-4 md:mt-6 w-full">
                  <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 md:ml-4 flex flex-col justify-center flex-grow">
                    <h4 className="font-serif text-[#333333] text-base md:text-xl font-medium tracking-tight leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-[10px] md:text-xs text-[#666666] mt-0.5 font-sans line-clamp-1">
                      {testimonial.role}
                    </p>
                  </div>
                  <a
                    href={testimonial.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#666666] hover:text-[#0a66c2] transition-colors ml-auto flex-shrink-0"
                  >
                    <Linkedin
                      className="w-5 h-5 md:w-[22px] md:h-[22px]"
                      strokeWidth={1.5}
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
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
