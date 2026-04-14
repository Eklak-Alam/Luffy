import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import DevOpsProjects from "@/components/landing/DevOpsProjects";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import TechStack from "@/components/landing/TechStack";
import TestimonialCarousel from "@/components/landing/TestimonialCarousel";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="tech">
        <TechStack />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="testimonial">
        <TestimonialCarousel />
      </section>
{/* 
      <section id="devops">
        <DevOpsProjects />
      </section> */}

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}