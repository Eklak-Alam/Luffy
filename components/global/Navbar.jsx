"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X, Download } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Blogs", href: "https://blogs.eklak.site", isExternal: true },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Testimonial", href: "#testimonial" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Google Drive IDs and Links
  const driveFileId = "1RNWULvINo77g3BybnnRL1f06hHA2UAyd";
  const resumePreviewUrl = `https://drive.google.com/file/d/${driveFileId}/preview`;
  const resumeDownloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;

  useEffect(() => {
    if (pathname === "/") setActiveLink("#home");
  }, [pathname]);

  // SMART SCROLL-TO-CLOSE LOGIC
  useEffect(() => {
    const initialScrollY = window.scrollY;

    const handleScroll = () => {
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

  // LOCK BODY SCROLL WHEN MODAL IS OPEN
  useEffect(() => {
    if (isResumeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isResumeModalOpen]);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );
      tl.fromTo(
        ".nav-item",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
        "-=0.5",
      );
    },
    { scope: navRef },
  );

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
                Eklak<span className="text-[#e8751a]">.</span>
              </Link>
            </div>

            {/* 2. CENTER: Desktop Links */}
            <nav className="hidden md:flex flex-[2] justify-center items-center gap-8">
              {navLinks.map((link) => {
                // Minimal External Link without background
                if (link.isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-item flex items-center gap-1 py-2 text-sm font-bold uppercase tracking-widest text-[#e8751a] hover:opacity-70 transition-opacity duration-300"
                    >
                      {link.name}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  );
                }

                // Standard Link
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
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="group hidden md:flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-300"
              >
                Resume
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* SMOOTH ANIMATED HAMBURGER MENU */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] text-foreground focus:outline-none z-50"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
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
                // Mobile Minimal External Link
                if (link.isExternal) {
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-fit group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-5xl font-black tracking-tighter uppercase text-[#e8751a] transition-opacity duration-300 group-hover:opacity-70">
                          {link.name}
                        </span>
                        <ArrowUpRight className="w-8 h-8 text-[#e8751a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </motion.div>
                  );
                }

                // Standard Mobile Link
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
                        isActive
                          ? "text-foreground"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      {isActive && <span className="text-[#e8751a]">.</span>}
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
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsResumeModalOpen(true), 300);
                }}
                className="group flex items-center gap-2 text-2xl font-extrabold uppercase tracking-widest text-foreground hover:text-primary transition-colors w-fit"
              >
                Resume
                <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-3 md:p-8"
            onClick={() => setIsResumeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl h-[90vh] md:h-[85vh] bg-background border border-border/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border/40 bg-muted/20">
                <h2 className="text-lg md:text-xl uppercase text-[#40513B]">
                  Eklak Alam
                </h2>

                <div className="flex items-center gap-3 md:gap-5">
                  {/* Download Button */}
                  <a
                    href={resumeDownloadUrl}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-transform duration-300 active:scale-95"
                    style={{ backgroundColor: "#40513B", color: "#EDF1D6" }}
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsResumeModalOpen(false)}
                    className="p-1.5 text-[#e8751a] cursor-pointer hover:bg-[#e8751a]/15 rounded-full transition-all duration-300 hover:rotate-90"
                  >
                    <X className="w-6 h-6 md:w-7 md:h-7" />
                  </button>
                </div>
              </div>

              {/* Modal Body (PDF Viewer) */}
              <div className="flex-1 w-full h-full bg-[#f4f4f4] relative">
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <span className="text-sm font-semibold text-muted-foreground animate-pulse">
                    Loading Resume...
                  </span>
                </div>

                <iframe
                  src={resumePreviewUrl}
                  className="w-full h-full border-none z-10"
                  title="Eklak Alam Resume"
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
