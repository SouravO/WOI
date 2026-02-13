import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Target, Cpu, Zap, BarChart } from 'lucide-react';

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

const SECTORS = [
  { id: '01', title: "Entrepreneurs", color: COLORS.ELECTRIC_BLUE, projects: ["CEO Square", "YEP", "Next Leader"], desc: "Empowering visionary leaders to scale global impact through decentralized logic.", icon: Target },
  { id: '02', title: "Startups", color: COLORS.VIBRANT_PINK, projects: ["Incubenation", "Franchisify", "Perform100X"], desc: "Accelerating early-stage ventures through strategic architecture and structural engineering.", icon: Cpu },
  { id: '03', title: "Investors", color: COLORS.MANGO_YELLOW, projects: ["Investor Cafe", "VC Circle", "X9 Club"], desc: "High-yield networking and capital alignment for global institutional allocators.", icon: Zap },
  { id: '04', title: "Governments", color: COLORS.FOREST_GREEN, projects: ["Startup Park", "Vision by iQue"], desc: "Developing ecosystem policy and digital infrastructure for national-scale innovation.", icon: BarChart },
];

const GrainFilter = () => (
  <svg className="sr-only" width="0" height="0">
    <filter id="grainy">
      <feTurbulence type="fractalNoise" baseFrequency="0.60" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>
);

export default function WOIShutter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  const clipReveal = useTransform(smoothProgress, [0, 0.12], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const scanBarY = useTransform(smoothProgress, [0, 0.12], ["0%", "100%"]);
  const introOpacity = useTransform(smoothProgress, [0.12, 0.18], [1, 0]);
  const introScale = useTransform(smoothProgress, [0.12, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="h-[800vh] bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black">
      <GrainFilter />
      
      {/* 0. GLOBAL TEXTURE LAYER */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay" style={{ filter: 'url(#grainy)' }} />
      </div>

      {/* FIXED HUD */}
      <div className="fixed top-6 left-6 right-6 md:top-12 md:left-12 md:right-12 z-[120] flex justify-between items-center">
        <div className="font-black text-xl md:text-3xl italic tracking-tighter border-b-2 md:border-b-4 border-white">WOI.</div>
        <div className="flex gap-4 md:gap-8 font-mono text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-40">
          <span className="hidden sm:inline" style={{ color: COLORS.ELECTRIC_BLUE }}>SCAN_ACTIVE</span>
          <span style={{ color: COLORS.VIBRANT_PINK }}>V4.0_BUILD</span>
        </div>
      </div>

      {/* PILLARS OF WOI - INTRO */}
      <motion.div 
        style={{ opacity: introOpacity, scale: introScale }}
        className="fixed inset-0 flex flex-col items-center justify-center z-0 p-6 text-center"
      >
        <div className="relative">
            <h1 
                className="text-[18vw] md:text-[13vw] font-black uppercase leading-[0.75] tracking-tighter italic opacity-10 select-none"
                style={{ WebkitTextStroke: "1px white", color: 'transparent' }}
            >
                PILLARS <br/> OF WOI
            </h1>

            <motion.h1 
                style={{ clipPath: clipReveal }}
                className="absolute inset-0 text-[18vw] md:text-[13vw] font-black uppercase leading-[0.75] tracking-tighter italic text-white"
            >
                PILLARS <br/> OF <span style={{ color: COLORS.ELECTRIC_BLUE }}>WOI</span>
            </motion.h1>

            <motion.div 
                style={{ top: scanBarY }}
                className="absolute left-0 right-0 h-[2px] bg-white z-10 shadow-[0_0_20px_white]"
            />
        </div>

        <p className="mt-8 md:mt-16 text-xs md:text-2xl font-mono uppercase tracking-[0.4em] opacity-40">
            System Initialization...
        </p>
      </motion.div>

      {/* SHUTTER PANELS */}
      <div className="fixed inset-0 flex flex-col md:flex-row">
        {SECTORS.map((sector, i) => (
          <ShutterPanel 
            key={sector.id} 
            sector={sector} 
            index={i} 
            progress={smoothProgress} 
          />
        ))}
      </div>

      {/* FIXED PROGRESS HUD */}
      <div className="fixed bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end z-[120] pointer-events-none">
        <div className="space-y-0 md:space-y-1">
            <p className="font-mono text-[8px] md:text-[10px] opacity-30 uppercase tracking-[0.3em] md:tracking-[0.5em]">Global_Coordinate</p>
            <div className="text-4xl md:text-7xl font-black tabular-nums tracking-tighter italic">
                <ProgressValue progress={smoothProgress} />
            </div>
        </div>
        <div className="text-right max-w-[150px] md:max-w-[280px] opacity-30 font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] leading-loose">
            Architectural Engine v4.0.2
        </div>
      </div>
    </div>
  );
}

function ShutterPanel({ sector, index, progress }) {
  const start = 0.18 + (index * 0.18); 
  const end = 0.18 + ((index + 1) * 0.18);

  // Responsive Animation: Vertical on mobile, Horizontal on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const x = useTransform(progress, [start, end], [isMobile ? "0%" : "100%", "0%"]);
  const y = useTransform(progress, [start, end], [isMobile ? "100%" : "0%", "0%"]);
  
  const brightness = useTransform(progress, [end, end + 0.1], [1, 0.2]);
  const contentOpacity = useTransform(progress, [start, start + 0.05], [0, 1]);

  return (
    <motion.div
      style={{ 
        x: isMobile ? 0 : x, 
        y: isMobile ? y : 0,
        filter: `brightness(${brightness})`, 
        zIndex: index + 10 
      }}
      className="absolute inset-0 bg-[#050505] md:border-l border-t md:border-t-0 border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.9)] md:shadow-[-100px_0_120px_rgba(0,0,0,0.98)] overflow-hidden"
    >
      {/* BACKGROUND TEXT */}
      <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.03] select-none pointer-events-none translate-x-1/4">
        <h2 className="text-[30vh] md:text-[50vh] font-black italic uppercase leading-none tracking-tighter">
            {sector.title}
        </h2>
      </div>

      <div className="relative w-full h-full flex items-center px-6 md:px-32 py-24 md:py-0 overflow-y-auto">
        <motion.div style={{ opacity: contentOpacity }} className="max-w-3xl w-full">
          <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-16">
            <span 
                className="text-6xl md:text-9xl font-black text-transparent italic leading-none" 
                style={{ WebkitTextStroke: `1px ${sector.color}` }}
            >
              {sector.id}
            </span>
            <div className="h-[1px] md:h-[2px] grow md:w-48" style={{ backgroundColor: sector.color }} />
            <sector.icon size={24} className="md:w-11 md:h-11" style={{ color: sector.color }} strokeWidth={1} />
          </div>
          
          <h3 className="text-4xl md:text-[8vw] font-black tracking-tighter mb-6 md:mb-10 uppercase italic leading-[0.85] md:leading-[0.8]">
            {sector.title}
          </h3>
          
          <p className="text-lg md:text-3xl font-light text-white/40 mb-10 md:mb-20 max-w-2xl leading-relaxed">
            {sector.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
            {sector.projects.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.06)" }}
                className="group flex items-center justify-between p-5 md:p-8 border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sector.color }} />
                    <span className="text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">{p}</span>
                </div>
                <ArrowUpRight size={18} md:size={24} style={{ color: sector.color }} className="opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TELEMETRY STRIP (Hidden on mobile for clarity) */}
      <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-16 lg:w-24 border-r border-white/5 items-center justify-center bg-white/[0.01]">
        <span className="rotate-90 font-mono text-[8px] lg:text-[10px] tracking-[0.8em] uppercase opacity-20 whitespace-nowrap">
          SYSTEM_NODE_0{index + 1} // {sector.title.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
}

function ProgressValue({ progress }) {
    const [v, setV] = useState(0);
    useEffect(() => {
        return progress.on("change", (latest) => setV(Math.round(latest * 100)));
    }, [progress]);
    return <span>{v}%</span>;
}