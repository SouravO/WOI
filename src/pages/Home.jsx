import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MoveRight, Smartphone, Mail, Globe, Layers, Target } from 'lucide-react';

const COLORS = {
  FOREST_GREEN: "#026F43",
  ELECTRIC_BLUE: "#2261F3",
  DARK_LAVENDER: "#6B66E1",
  CORAL_PINK: "#C67CB8",
  VIBRANT_PINK: "#E75893",
  BRICK_RED: "#EC3B2E",
  MANGO_YELLOW: "#F6982F",
  WHITE: "#FFFFFF"
};

const GrainFilter = () => (
  <svg className="sr-only" width="0" height="0">
    <filter id="grainy">
      <feTurbulence type="fractalNoise" baseFrequency="0.60" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>
);

export default function DraftingTablePortal() {
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile to disable horizontal scroll logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ 
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // Only apply horizontal transform if NOT on mobile
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  const [formData, setFormData] = useState({ identity: '', email: '', objective: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeUplink = (e) => {
    e.preventDefault();
    const subject = `Architectural Request: ${formData.identity}`;
    const body = `Identity: ${formData.identity}\nChannel: ${formData.email}\nObjective: ${formData.objective}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@ique.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div ref={scrollRef} className={`relative ${isMobile ? 'h-auto' : 'h-[300vh]'} bg-[#050505] text-white selection:bg-white selection:text-black`}>
      <GrainFilter />

      {/* STICKY WRAPPER: Fixed on desktop, static on mobile */}
      <div className={`${isMobile ? 'relative' : 'sticky top-0 h-screen overflow-hidden'} w-full border-y border-white/10`}>
        
        {/* GLOBAL TEXTURE */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ filter: 'url(#grainy)' }} />
        </div>

        {/* TOP RULER - Hidden on very small screens for cleanliness */}
        <div className="hidden sm:flex absolute top-0 left-0 w-full h-12 border-b border-white/10 items-center px-4 gap-12 z-20 bg-[#050505]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[9px] font-mono opacity-30 tracking-tighter whitespace-nowrap">
              0{i}_SYS_LAYER_{i * 100}
            </span>
          ))}
        </div>

        <motion.div 
          style={{ x: isMobile ? 0 : springX }} 
          className={`flex ${isMobile ? 'flex-col' : 'h-full w-[300vw]'} relative z-10`}
        >
          {/* SECTION 01: THE CORE DATA */}
          <section className="w-screen min-h-[80vh] lg:h-full flex items-center px-6 md:px-32 border-r border-white/10 relative py-20 lg:py-0">
            <div className="max-w-2xl space-y-8 md:space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <Layers size={14} style={{ color: COLORS.ELECTRIC_BLUE }} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">Node_01</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
                  Liaison <br /> <span style={{ color: COLORS.ELECTRIC_BLUE }}>Protocols</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-10">
                <LinkItem icon={<Smartphone />} label="Direct_Line" value="+91-9036354727" color={COLORS.ELECTRIC_BLUE} />
                <LinkItem icon={<Mail />} label="Secure_Uplink" value="info@woi.com" color={COLORS.VIBRANT_PINK} />
                <LinkItem icon={<Globe />} label="Geographic_Base" value="Bengaluru, IN" color={COLORS.MANGO_YELLOW} />
              </div>

              <div className="flex items-center gap-4 opacity-40 group">
                <span className="text-[10px] font-mono uppercase tracking-widest">{isMobile ? 'Scroll Down' : 'Lateral Scroll'}</span>
                <MoveRight size={16} className={isMobile ? 'rotate-90' : ''} />
              </div>
            </div>
          </section>

          {/* SECTION 02: THE TRANSMISSION CONSOLE */}
          <section className="w-screen min-h-screen lg:h-full flex items-center px-6 md:px-32 border-r border-white/10 bg-white/[0.02] backdrop-blur-3xl relative py-20 lg:py-0">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
              <div className="space-y-6 md:space-y-8">
                <div className="text-3xl md:text-4xl font-black italic tracking-tighter" style={{ color: COLORS.VIBRANT_PINK }}>02.</div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Architectural <br /> Request.</h2>
                <p className="text-base md:text-lg font-light opacity-50 leading-relaxed max-w-md">
                  Submit your venture architecture for structural analysis. 
                  Our team evaluates for systemic gaps and liquidity alignment.
                </p>
              </div>

<<<<<<< Updated upstream
const StaggeredText = ({ text, className, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: delay }
        }
      }}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { y: 100, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", damping: 12, stiffness: 200 }
            }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function WOISingularity() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const clipPathValue = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [
    "circle(15% at 50% 50%)",
    "circle(100% at 50% 50%)",
    "circle(15% at 20% 80%)",
    "circle(100% at 50% 50%)",
    "circle(15% at 80% 20%)",
    "circle(150% at 50% 50%)"
  ]);

  return (
    <div ref={containerRef} className="h-[1200vh] bg-[#050505] text-white overflow-hidden">

      {/* BACKGROUND DECO */}
      <motion.div style={{ clipPath: clipPathValue }} className="fixed inset-0 z-0 bg-[#080808]">
        <motion.div style={{ y: bgY }} className="absolute inset-0 flex flex-col items-center justify-around opacity-5">
          {[...Array(8)].map((_, i) => (
            <h2 key={i} className="text-[30vw] lg:text-[20vw] font-black leading-none uppercase italic tracking-tighter select-none">
              ARCHITECTURE
            </h2>
          ))}
        </motion.div>
      </motion.div>

      {/* FIXED HUD */}
      <div className="fixed top-6 left-6 right-6 lg:top-12 lg:left-12 lg:right-12 z-50 flex justify-between items-center">
        <div className="font-black text-xl lg:text-3xl italic tracking-tighter" style={{ color: COLORS.WHITE }}>WOI.</div>
        <div className="flex flex-col text-right lg:flex-row gap-2 lg:gap-8 font-mono text-[8px] lg:text-[10px] tracking-[0.2em] lg:tracking-[0.3em] uppercase opacity-60">
          <span style={{ color: COLORS.ELECTRIC_BLUE }}>ECOSYSTEM_ARCHITECTS</span>
          <span className="hidden sm:inline" style={{ color: COLORS.VIBRANT_PINK }}>NATION_BUILDING</span>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <motion.div
        style={{
          opacity: useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]),
          scale: useTransform(smoothProgress, [0, 0.12], [1, 0.9])
        }}
        className="fixed inset-0 flex flex-col items-center justify-center z-10 p-6 text-center"
      >
        {/* YOUTUBE VIDEO BACKGROUND */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay for readability */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Hgg7M3kSqyE?autoplay=1&mute=1&controls=0&loop=1&playlist=Hgg7M3kSqyE&showinfo=0&rel=0&iv_load_policy=3&disablekb=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover scale-[3.5] md:scale-110 opacity-60"
          ></iframe>
        </div>

        <div className="flex flex-col items-center mb-6 lg:mb-8 text-white drop-shadow-lg">
          <StaggeredText
            text="BUILDING"
            className="text-7xl md:text-6xl lg:text-[10vw] font-black uppercase leading-[0.9] tracking-tighter"
            delay={0.2}
          />
          <StaggeredText
            text="NATIONS"
            className="text-7xl md:text-6xl lg:text-[9vw] font-black uppercase leading-[0.9] tracking-tighter "
            delay={0.8}
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 1.5 }}
          className="text-base md:text-xl lg:text-2xl font-light opacity-60 max-w-3xl mx-auto leading-relaxed mb-8 lg:mb-12"
        >
          WOI is a decentralized ecosystem architecture firm. We design, establish, and scale the ventures that bridge the gaps between innovation, capital, and governance.
        </motion.p>



      </motion.div>

      {/* 2. THE ECOSYSTEM GAP */}
      <motion.div
        style={{
          opacity: useTransform(smoothProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]),
          y: useTransform(smoothProgress, [0.15, 0.4], [100, -100])
        }}
        className="fixed inset-0 flex items-center justify-center z-10 p-6"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 overflow-y-auto max-h-screen py-20 md:py-0">
          <div className="space-y-4 lg:space-y-8">
            <div className="w-12 lg:w-16 h-1 bg-white" style={{ backgroundColor: COLORS.ELECTRIC_BLUE }} />
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">Architecture for <br /> a New Economy.</h3>
            <p className="text-lg lg:text-2xl font-light opacity-60">
              Most ecosystems fail because of structural gaps. We don't just invest; we engineer the infrastructure.
            </p>
          </div>
          <div className="grid gap-4 lg:gap-8">
            {[
              { icon: Search, title: "Research-Driven", desc: "Identifying systemic bottlenecks in emerging markets.", color: COLORS.ELECTRIC_BLUE },
              { icon: Layout, title: "Venture Structuring", desc: "Building independent entities to solve those bottlenecks.", color: COLORS.VIBRANT_PINK },
              { icon: Globe, title: "Global Integration", desc: "Aligning private innovation with national interests.", color: COLORS.MANGO_YELLOW }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 lg:gap-6 items-start p-4 lg:p-6 bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
                <item.icon className="shrink-0" style={{ color: item.color }} size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-bold text-lg lg:text-xl uppercase mb-1">{item.title}</h4>
                  <p className="text-sm lg:text-base opacity-50 font-light leading-relaxed">{item.desc}</p>
=======
              <form onSubmit={executeUplink} className="space-y-8 md:space-y-12 bg-white/5 p-6 md:p-12 border border-white/10 backdrop-blur-md">
                <DraftInput label="Venture_Identity" placeholder="NAME / CODE" color={COLORS.VIBRANT_PINK} name="identity" value={formData.identity} onChange={handleChange} />
                <DraftInput label="Comms_Channel" placeholder="EMAIL_ADDRESS" color={COLORS.ELECTRIC_BLUE} name="email" value={formData.email} onChange={handleChange} />
                <div className="space-y-4">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-50">Project_Objective</label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-lg md:text-xl font-light text-white outline-none focus:border-white transition-colors h-20 resize-none placeholder:opacity-10"
                    placeholder="DESCRIBE THE SYSTEMIC GAP..."
                  />
>>>>>>> Stashed changes
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 md:py-6 font-black uppercase text-xs tracking-[0.4em] hover:invert transition-all active:scale-95">
                  Execute_Uplink
                </button>
              </form>
            </div>
          </section>

          {/* SECTION 03: THE GEOSPATIAL MAP */}
          <section className="w-screen min-h-screen lg:h-full flex items-center justify-center lg:justify-start px-6 md:px-32 relative overflow-hidden py-20 lg:py-0">
            
            {/* MAP BACKGROUND - Responsive scale */}
            <div className="absolute inset-0 z-0">
              <iframe
                title="Geospatial Node"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.3341496229!2d77.4817112108781!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfad3685100bcf!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1715600000000!5m2!1sen!2sin"
                className="w-full h-full grayscale invert contrast-[1.2] opacity-20 scale-150 lg:scale-110"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-90" />
            </div>

            <div className="relative z-10 bg-black/60 backdrop-blur-3xl border border-white/10 p-8 md:p-16 max-w-2xl w-full">
              <div className="flex items-center gap-4 mb-6 md:mb-10">
                <Target style={{ color: COLORS.MANGO_YELLOW }} size={24} />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Target_Acquired</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                Bengaluru <br /> <span style={{ color: COLORS.MANGO_YELLOW }}>Headquarters</span>
              </h2>
              <p className="text-sm md:text-xl font-light opacity-60 leading-relaxed mb-8 md:mb-12 uppercase tracking-wide">
                Operating out of India's Silicon Valley. The heart of the venture ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/10 pt-8 gap-6">
                <div className="font-mono text-[10px] tracking-widest" style={{ color: COLORS.MANGO_YELLOW }}>
                  12.9716° N <br /> 77.5946° E
                </div>
                <button className="w-full sm:w-auto px-8 py-3 border border-white/20 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
                  Navigate_To_Node
                </button>
              </div>
            </div>
          </section>
        </motion.div>

        {/* BOTTOM HUD - Now handles mobile wrapping */}
        <div className="absolute bottom-0 left-0 w-full h-16 border-t border-white/10 flex items-center px-6 md:px-12 justify-between z-20 bg-[#050505]">
          <div className="flex gap-4 md:gap-6 items-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-8 md:w-12 h-[2px] bg-white/10 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: i === 0 ? COLORS.ELECTRIC_BLUE : i === 1 ? COLORS.VIBRANT_PINK : COLORS.MANGO_YELLOW,
                    scaleX: useTransform(scrollYProgress, [i * 0.33, (i + 1) * 0.33], [0, 1])
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 md:gap-8 font-mono text-[8px] md:text-[9px] opacity-40 uppercase tracking-widest">
            <span className="hidden xs:inline">Latency: 24ms</span>
            <span>AES-256</span>
            <span className="text-white/20">STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated Sub-components with responsive text
function LinkItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-4 md:gap-8 group cursor-pointer border-l-2 border-transparent hover:border-white pl-0 hover:pl-4 md:hover:pl-6 transition-all duration-500">
      <div style={{ color }} className="transition-transform duration-500 group-hover:scale-110 shrink-0">{icon}</div>
      <div className="overflow-hidden">
        <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mb-1">{label}</p>
        <p className="text-lg md:text-2xl font-black tracking-tight uppercase italic leading-none truncate">{value}</p>
      </div>
    </div>
  );
}

function DraftInput({ label, placeholder, color, ...props }) {
  return (
    <div className="space-y-3 md:space-y-4">
      <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-50" style={{ color }}>{label}</label>
      <input
        className="w-full bg-transparent border-b border-white/10 py-2 md:py-4 text-xl md:text-2xl font-black uppercase tracking-tighter text-white outline-none focus:border-white transition-colors placeholder:opacity-5"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}