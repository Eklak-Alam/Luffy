"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const dot = cursorRef.current;
    const ring = followerRef.current;

    // Force GSAP to handle centering so CSS transforms don't conflict
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;

    // 1. Instant Mouse Tracking (Only updates variables, doesn't animate)
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move the inner dot instantly
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // 2. The LERP Engine (The secret to absolute smoothness)
    // This runs on the browser's native refresh rate
    const render = () => {
      // The ring moves 15% of the distance to the mouse every single frame
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      gsap.set(ring, { x: ringX, y: ringY });
    };

    gsap.ticker.add(render);
    window.addEventListener("mousemove", onMouseMove);

    // 3. High-Performance Hover Logic using Event Delegation
    // This automatically works even if buttons are rendered later (like in accordions)
    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, .group");
      if (target && !isHovering) {
        isHovering = true;
        gsap.to(ring, {
          scale: 3.5,
          backgroundColor: "rgba(96, 153, 102, 0.15)", // Premium translucent fill
          borderColor: "rgba(96, 153, 102, 0)", // Hides border on hover
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { scale: 0, duration: 0.2 }); // Hide dot
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, .group");
      if (target && isHovering) {
        isHovering = false;
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(96, 153, 102, 0.4)", // Returns to solid border
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { scale: 1, duration: 0.2 }); // Bring dot back
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <>
      {/* Central Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-brand-primary rounded-full pointer-events-none z-[9999] hidden md:block"
      />
      
      {/* Trailing Ring - Removed CSS transition classes! */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-brand-primary/40 rounded-full pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
}