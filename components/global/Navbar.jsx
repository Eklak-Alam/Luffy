"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react"; // Imported the 45-degree arrow

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Testimonial", href: "#testimonial" }, // Changed Cloud to Testimonial
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") setActiveLink("#home");
  }, [pathname]);

  // SMART SCROLL-TO-CLOSE LOGIC
  useEffect(() => {
    // Store the scroll position when the menu opens
    const initialScrollY = window.scrollY;

    const handleScroll = () => {
      // If the user scrolls more than 20px in any direction, close the menu smoothly
      if (Math.abs(window.scrollY - initialScrollY) > 20) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    tl.fromTo(
      ".nav-item",
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
      "-=0.5"
    );
  }, { scope: navRef });

  return (
    <>
      <header 
        ref={navRef}
        className="relative z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. LEFT: Logo */}
            <div className="flex-1 flex justify-start nav-item">
              <Link 
                href="#home" 
                onClick={() => {
                  setIsOpen(false);
                  setActiveLink("#home");
                }}
                className="text-2xl font-bold tracking-tighter text-foreground transition-opacity hover:opacity-80"
              >
                Eklak<span className="text-primary">.</span>
              </Link>
            </div>

            {/* 2. CENTER: Desktop Links */}
            <nav className="hidden md:flex flex-[2] justify-center items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`nav-item relative py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* 3. RIGHT: CTA & Mobile Toggle */}
            <div className="flex-1 flex justify-end items-center gap-6 nav-item">
              
              {/* Changed from heavy button to clean text link with 45-degree arrow */}
              <a
                href="/https://drive.google.com/file/d/1Qm2bgdkwgphd664EtWRndUk2P3W7BJSE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden md:flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-300"
              >
                Resume
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* SMOOTH ANIMATED HAMBURGER MENU */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] text-foreground focus:outline-none z-50"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
            className="fixed inset-0 z-40 bg-background flex flex-col pt-32 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isActive = activeLink === link.href;
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => {
                        setIsOpen(false);
                        setActiveLink(link.href);
                      }}
                      className={`text-5xl font-black tracking-tighter transition-colors block w-fit uppercase ${
                        isActive ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      {isActive && <span className="text-primary">.</span>}
                    </a>
                  </motion.div>
                );
              })}
            </nav>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto pb-16 pt-10 border-t border-border/50"
            >
              {/* Changed from heavy button to clean text link with 45-degree arrow for mobile too */}
              <a
                href="/https://drive.google.com/file/d/1Qm2bgdkwgphd664EtWRndUk2P3W7BJSE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-2 text-2xl font-extrabold uppercase tracking-widest text-foreground hover:text-primary transition-colors w-fit"
              >
                Resume
                <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}