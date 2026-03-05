"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroller({ children }) {
  useEffect(() => {
    // THE STANDARD SETTINGS: Crisp, predictable, and professional.
    const lenis = new Lenis({
      lerp: 0.1,            // The industry standard. Smooth, but stops quickly when you stop scrolling.
      wheelMultiplier: 1,   // Native mouse wheel speed. No sluggishness.
      smoothWheel: true,
      touchMultiplier: 2,   // Keeps mobile touch scrolling feeling native and fast.
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}