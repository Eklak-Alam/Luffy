import { Layers, Cpu, Network, Sparkles, ArrowDownRight } from "lucide-react";

export default function About() {
  const domains = [
    {
      id: "01",
      title: "The Interface",
      subtitle: "Frontend Engineering",
      description: "Crafting pixel-perfect, highly kinetic interfaces. I treat the DOM like a canvas, ensuring every interaction feels instant and premium.",
      tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
      icon: <Layers className="w-5 h-5 text-primary" />,
    },
    {
      id: "02",
      title: "The Engine",
      subtitle: "System Architecture",
      description: "Designing resilient, high-availability backends. I build microservices capable of handling heavy throughput without breaking a sweat.",
      tech: ["Java", "Spring Boot", "Node.js"],
      icon: <Cpu className="w-5 h-5 text-primary" />,
    },
    {
      id: "03",
      title: "The Infrastructure",
      subtitle: "DevOps & Cloud",
      description: "Automating zero-downtime deployment pipelines. I architect scalable cloud environments so the code ships fast and never goes down.",
      tech: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      icon: <Network className="w-5 h-5 text-primary" />,
    },
    {
      id: "04",
      title: "The Intelligence",
      subtitle: "AI & LLM Integration",
      description: "Embedding intelligent agents and robust RAG architectures directly into the product ecosystem to give applications a real brain.",
      tech: ["Python", "FastAPI", "LangChain"],
      icon: <Sparkles className="w-5 h-5 text-primary" />,
    }
  ];

  return (
    <section id="about" className="py-16 md:py-32 relative">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: The Philosophy */}
          <div className="lg:w-5/12 relative">
            <div className="lg:sticky lg:top-20">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/60 bg-surface mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-muted tracking-wide uppercase">
                  Engineering Philosophy
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 sm:mb-8">
                I don't just write code.<br />
                <span className="text-primary text-opacity-80">I architect products.</span>
              </h2>
              
              <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 sm:mb-8">
                As a developer with a CTO mindset, I see the whole board. From the database schema to the final pixel on the screen, every decision is made with scale, performance, and user experience in mind.
              </p>

              <div className="flex items-center gap-3 sm:gap-4 text-foreground font-bold text-base sm:text-lg">
                <ArrowDownRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Explore the Stack
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Timeline / Domains */}
          <div className="lg:w-7/12 relative mt-4 lg:mt-0">
            {/* The Vertical Connecting Line */}
            <div className="absolute left-[23px] sm:left-[27px] top-4 bottom-0 w-px bg-border/80" />

            <div className="flex flex-col gap-8 sm:gap-16">
              {domains.map((domain, index) => (
                <div key={index} className="relative flex flex-row gap-4 sm:gap-8">
                  
                  {/* Timeline Node & Number (Hover removed, static clean look) */}
                  <div className="flex items-start z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl sm:rounded-2xl bg-surface border border-border/80 flex items-center justify-center shadow-sm">
                      <div className="scale-75 sm:scale-100">
                        {domain.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content Block (Hover removed, clean editorial border/shadow) */}
                  <div className="flex-1 bg-surface border border-border/50 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-2">
                      <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                        {domain.id}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-muted uppercase tracking-wider">
                        {domain.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                      {domain.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-muted leading-relaxed mb-5 sm:mb-8">
                      {domain.description}
                    </p>
                    
                    {/* Tech Stack Pills (Kept the very subtle hover on individual pills for interaction mapping) */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {domain.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium text-foreground bg-background border border-border/80 hover:border-primary/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}