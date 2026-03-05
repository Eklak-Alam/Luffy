"use client";

export default function TechStack() {
  // Pure typography arrays - Uppercase for that heavy architectural look
  const rowOne = ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "JAVASCRIPT", "HTML5"];
  const rowTwo = ["JAVA", "SPRING BOOT", "PYTHON", "FASTAPI", "NODE.JS", "C"];
  const rowThree = ["AWS", "DOCKER", "KUBERNETES", "LANGCHAIN", "MYSQL", "OLLAMA"];

  return (
    // FIX: Removed the top/bottom borders. Reduced mobile padding to py-8.
    <section id="tech-stack" className="py-8 md:py-16 relative overflow-hidden flex flex-col items-center bg-background">
      
      {/* Magic CSS for infinite scroll, text outlines, and hover-pause */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { 
          animation: scroll-left 35s linear infinite; 
        }
        .animate-scroll-right { 
          animation: scroll-right 35s linear infinite; 
        }
        
        .marquee-container:hover > div {
          animation-play-state: paused;
        }

        /* Desktop Hollow Text */
        .hollow-text {
          color: transparent;
          -webkit-text-stroke: 1px var(--color-border);
          transition: all 0.3s ease;
        }

        /* FIX: Mobile Hollow Text - Thinner stroke so it doesn't look thick/messy */
        @media (max-width: 640px) {
          .hollow-text {
            -webkit-text-stroke: 0.5px var(--color-border);
          }
        }

        .hollow-text:hover {
          color: var(--color-foreground);
          -webkit-text-stroke: 0px var(--color-foreground);
          text-shadow: 0 4px 20px rgba(96, 153, 102, 0.15);
        }
      `}</style>

      {/* The Gradient Mask: Fades the edges out into your specific background color */}
      <div 
        className="absolute inset-0 pointer-events-none z-10" 
        style={{ 
          maskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)", 
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)" 
        }} 
      />

      {/* Tighter gap on mobile (gap-4) so the rows feel connected */}
      <div className="w-full max-w-[120rem] mx-auto flex flex-col gap-4 md:gap-6 relative z-0">
        
        {/* ROW 1: Scrolling Left */}
        <div className="flex w-full overflow-hidden marquee-container">
          <div className="flex animate-scroll-left w-max items-center">
            {[...rowOne, ...rowOne, ...rowOne, ...rowOne].map((tech, i) => (
              <div key={i} className="flex items-center group cursor-default">
                {/* FIX: Text is text-3xl on mobile so the outline is readable, px-4 for tighter mobile spacing */}
                <span className="hollow-text text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase px-4 sm:px-8 lg:px-10 whitespace-nowrap hover:scale-[1.02]">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Scrolling Right */}
        <div className="flex w-full overflow-hidden marquee-container">
          <div className="flex animate-scroll-right w-max items-center">
            {[...rowTwo, ...rowTwo, ...rowTwo, ...rowTwo].map((tech, i) => (
              <div key={i} className="flex items-center group cursor-default">
                <span className="hollow-text text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase px-4 sm:px-8 lg:px-10 whitespace-nowrap hover:scale-[1.02]">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: Scrolling Left */}
        <div className="flex w-full overflow-hidden marquee-container">
          <div className="flex animate-scroll-left w-max items-center" style={{ animationDuration: '40s' }}>
            {[...rowThree, ...rowThree, ...rowThree, ...rowThree].map((tech, i) => (
              <div key={i} className="flex items-center group cursor-default">
                <span className="hollow-text text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase px-4 sm:px-8 lg:px-10 whitespace-nowrap hover:scale-[1.02]">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}