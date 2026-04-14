"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { 
  ArrowUpRight, Send, Loader2, Github, Linkedin, Mail, MapPin, ChevronDown 
} from "lucide-react";

// Custom SVG for the new X Logo
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Webkit Autofill fix
const AutofillStyle = () => (
  <style jsx global>{`
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
      -webkit-text-fill-color: var(--color-foreground) !important;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  `}</style>
);

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  // NEW: Validation State
  const [errors, setErrors] = useState({});

  const subjects = [
    "Collaboration", 
    "Freelance Project", 
    "Job Opportunity", 
    "General Inquiry", 
    "Just saying Hi"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as soon as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubjectSelect = (subject) => {
    setFormData(prev => ({ ...prev, subject }));
    setDropdownOpen(false);
    if (errors.subject) {
      setErrors(prev => ({ ...prev, subject: false }));
    }
  };

  // Determine if form is fully filled to unlock button aesthetics
  const isFormValid = 
    formData.name.trim() !== "" && 
    formData.phone.trim() !== "" && 
    formData.email.trim() !== "" && 
    formData.subject !== "" && 
    formData.message.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Custom Validation Check
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.subject) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission and show UI errors
    }

    setStatus("loading");
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(serviceId, templateId, formData, publicKey);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5 md:w-6 md:h-6" />, url: "https://www.linkedin.com/in/eklak-alam/" },
    { name: "GitHub", icon: <Github className="w-5 h-5 md:w-6 md:h-6" />, url: "https://github.com/Eklak-Alam" },
    { name: "X (Twitter)", icon: <XIcon className="w-5 h-5 md:w-6 md:h-6" />, url: "https://x.com/eklak__alam" },
    { name: "Email Me", icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, url: "mailto:eklakalam420@gmail.com" },
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full bg-background py-20 md:py-24 border-t border-border overflow-hidden"
    >
      <AutofillStyle />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-tight">
            Let's <br className="hidden sm:block" />
            {/* Added God Mode Orange Here */}
            <span className="text-[#e8751a]">Connect.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* ================= LEFT: SINGLE COLUMN FORM ================= */}
          <div className="lg:col-span-6 relative z-10">
            
            <div className="mb-8 flex items-center gap-4">
               {/* Added God Mode Orange Here */}
               <span className="h-px w-8 bg-[#e8751a]"></span>
               <h3 className="text-xs font-bold uppercase tracking-widest text-[#e8751a]">Send Transmission</h3>
            </div>
            
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="py-12"
                >
                  <p className="text-3xl md:text-5xl font-black text-foreground mb-4">
                    Handshake Successful.
                  </p>
                  <p className="text-base md:text-lg text-muted font-medium mb-8 max-w-sm">
                    I'll review your transmission and get back to you within 24 hours.
                  </p>
                  {/* Added God Mode Orange Here */}
                  <button onClick={() => setStatus("idle")} className="text-sm font-bold uppercase tracking-widest text-[#e8751a] hover:text-foreground transition-colors border-b-2 border-[#e8751a] hover:border-foreground pb-1">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  noValidate 
                  className="flex flex-col gap-6 md:gap-8"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  
                  {/* Single Column: Name */}
                  <div className="relative group">
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.name ? 'border-red-500' : 'border-border/60'} text-base md:text-lg text-foreground font-medium py-3 outline-none focus:ring-0 ${errors.name ? 'focus:border-red-500' : 'focus:border-[#e8751a]'} transition-colors peer placeholder:text-transparent`}
                      placeholder="Name"
                    />
                    <label className={`absolute left-0 top-3 text-base md:text-lg font-medium pointer-events-none peer-focus:-top-5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-5 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest transition-all duration-300
                      ${errors.name ? 'text-red-500 peer-focus:text-red-500 peer-valid:text-red-500' : 'text-muted/50 peer-focus:text-[#e8751a] peer-valid:text-muted'}
                    `}>
                      Full Name {errors.name && <span className="font-bold ml-1 tracking-normal">— Required</span>}
                    </label>
                  </div>

                  {/* Single Column: Phone */}
                  <div className="relative group">
                    <input 
                      type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.phone ? 'border-red-500' : 'border-border/60'} text-base md:text-lg text-foreground font-medium py-3 outline-none focus:ring-0 ${errors.phone ? 'focus:border-red-500' : 'focus:border-[#e8751a]'} transition-colors peer placeholder:text-transparent`}
                      placeholder="Phone"
                    />
                    <label className={`absolute left-0 top-3 text-base md:text-lg font-medium pointer-events-none peer-focus:-top-5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-5 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest transition-all duration-300
                      ${errors.phone ? 'text-red-500 peer-focus:text-red-500 peer-valid:text-red-500' : 'text-muted/50 peer-focus:text-[#e8751a] peer-valid:text-muted'}
                    `}>
                      Phone Number {errors.phone && <span className="font-bold ml-1 tracking-normal">— Required</span>}
                    </label>
                  </div>

                  {/* Single Column: Email */}
                  <div className="relative group">
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-border/60'} text-base md:text-lg text-foreground font-medium py-3 outline-none focus:ring-0 ${errors.email ? 'focus:border-red-500' : 'focus:border-[#e8751a]'} transition-colors peer placeholder:text-transparent`}
                      placeholder="Email"
                    />
                    <label className={`absolute left-0 top-3 text-base md:text-lg font-medium pointer-events-none peer-focus:-top-5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-5 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest transition-all duration-300
                      ${errors.email ? 'text-red-500 peer-focus:text-red-500 peer-valid:text-red-500' : 'text-muted/50 peer-focus:text-[#e8751a] peer-valid:text-muted'}
                    `}>
                      Email Address {errors.email && <span className="font-bold ml-1 tracking-normal">— Required</span>}
                    </label>
                  </div>

                  {/* Custom Animated Dropdown for Subject */}
                  <div className="relative group">
                    {dropdownOpen && (
                      <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                    )}
                    <div 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`w-full bg-transparent border-0 border-b ${errors.subject ? 'border-red-500' : dropdownOpen ? "border-[#e8751a]" : "border-border/60"} text-base md:text-lg font-medium py-3 outline-none cursor-pointer flex justify-between items-center transition-colors relative z-40`}
                    >
                      <span className={formData.subject ? "text-foreground" : errors.subject ? "text-red-500" : "text-transparent select-none"}>
                        {formData.subject || "Subject"}
                      </span>
                      <ChevronDown className={`transition-transform duration-300 w-4 h-4 md:w-5 md:h-5 ${errors.subject ? 'text-red-500' : dropdownOpen ? "rotate-180 text-[#e8751a]" : "text-muted"}`} />
                    </div>
                    <label className={`absolute left-0 pointer-events-none transition-all duration-300 z-40 
                      ${errors.subject ? 'text-red-500 font-bold -top-5 text-[10px] uppercase tracking-widest' : formData.subject || dropdownOpen ? "-top-5 text-[10px] text-[#e8751a] uppercase tracking-widest font-bold" : "top-3 text-base md:text-lg text-muted/50 font-medium"}
                    `}>
                      Purpose of Inquiry {errors.subject && <span className="font-bold ml-1 tracking-normal">— Required</span>}
                    </label>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[110%] left-0 w-full bg-surface border border-border/80 shadow-2xl rounded-xl overflow-hidden z-50 py-2"
                        >
                          {subjects.map((sub, i) => (
                            <div 
                              key={i}
                              onClick={() => handleSubjectSelect(sub)}
                              className={`px-5 py-3 text-sm md:text-base font-bold cursor-pointer transition-colors ${formData.subject === sub ? "bg-[#e8751a]/10 text-[#e8751a]" : "text-foreground hover:bg-background hover:text-[#e8751a]"}`}
                            >
                              {sub}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <textarea 
                      name="message" required rows="1" value={formData.message} onChange={handleInputChange}
                      className={`w-full bg-transparent border-0 border-b ${errors.message ? 'border-red-500' : 'border-border/60'} text-base md:text-lg text-foreground font-medium py-3 outline-none focus:ring-0 ${errors.message ? 'focus:border-red-500' : 'focus:border-[#e8751a]'} transition-colors peer placeholder:text-transparent resize-y min-h-[40px]`}
                      placeholder="Message"
                    />
                    <label className={`absolute left-0 top-3 text-base md:text-lg font-medium pointer-events-none peer-focus:-top-5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-5 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest transition-all duration-300
                      ${errors.message ? 'text-red-500 peer-focus:text-red-500 peer-valid:text-red-500' : 'text-muted/50 peer-focus:text-[#e8751a] peer-valid:text-muted'}
                    `}>
                      Project Details {errors.message && <span className="font-bold ml-1 tracking-normal">— Required</span>}
                    </label>
                  </div>

                  {/* High-End Fill-from-bottom Action Button */}
                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className={`relative overflow-hidden flex items-center justify-center md:justify-between w-full md:w-auto px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-500 shadow-xl border
                        ${status === "loading" ? "opacity-50 cursor-not-allowed bg-surface text-muted border-border" 
                        : isFormValid 
                          ? "bg-foreground text-background border-foreground cursor-pointer active:scale-95 group" 
                          : "bg-surface border-border text-muted cursor-pointer hover:bg-border/30"}
                      `}
                    >
                      {/* The Fill Animation Layer - ONLY active when form is fully valid */}
                      {isFormValid && status !== "loading" && (
                        <span className="absolute bottom-0 left-0 w-full h-0 bg-[#e8751a] transition-all duration-300 ease-out group-hover:h-full z-0" />
                      )}

                      {/* Button Content */}
                      <div className={`relative z-10 flex items-center justify-between w-full md:w-auto md:gap-4 transition-colors duration-300 ${isFormValid ? "group-hover:text-white" : ""}`}>
                        {status === "loading" ? (
                          <> TRANSMITTING <Loader2 size={20} className="animate-spin ml-3" /> </>
                        ) : (
                          <> 
                            SEND MESSAGE 
                            <Send size={18} className={`ml-2 transition-transform duration-300 ${isFormValid ? "group-hover:translate-x-1 group-hover:-translate-y-1" : "opacity-50"}`} /> 
                          </>
                        )}
                      </div>
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ================= RIGHT: SOCIALS & LOCATION ================= */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-10 md:gap-12 lg:border-l lg:border-border/30 lg:pl-12">
            
            {/* Social Grid */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-4">Network</h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    // Added Orange Hover state to borders/backgrounds here
                    className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-border/50 hover:border-[#e8751a] hover:bg-[#e8751a]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Added Orange Hover state to Icon */}
                      <div className="text-muted group-hover:text-[#e8751a] transition-colors duration-300">
                        {link.icon}
                      </div>
                      {/* Added Orange Hover state to Text */}
                      <span className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-[#e8751a] transition-colors duration-300">
                        {link.name}
                      </span>
                    </div>
                    {/* Added Orange Hover state to Arrow */}
                    <ArrowUpRight className="text-muted group-hover:text-[#e8751a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="pt-4 flex items-start gap-4 text-muted">
              {/* Added Orange to Map Pin and Border */}
              <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#e8751a]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Base of Operations</p>
                <div className="flex flex-col gap-0.5">
                  <span className="text-base md:text-lg font-bold text-foreground">India</span>
                  {/* Added Orange to Coordinates */}
                  {/* <span className="text-[10px] md:text-xs font-mono text-[#e8751a] font-bold tracking-widest">25.7796° N, 84.7499° E</span> */}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}