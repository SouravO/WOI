import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, Users, TrendingUp, Landmark, Rocket, Shield, Activity, Command, Target, Cpu, Search, Layout, Lightbulb, Zap, BarChart } from 'lucide-react';

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

// --- MONOLITHIC TERMINAL ARCHITECTURE LAYER ---
const ArchitectureLayer = ({ title, subtitle, content, icon: Icon, progress, range, color }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  
  const clipPath = useTransform(progress, range, [
    "inset(100% 0% 0% 0%)",
    "inset(0% 0% 0% 0%)",
    "inset(0% 0% 0% 0%)",
    "inset(0% 0% 100% 0%)"
  ]);
  
  const textY = useTransform(progress, range, [60, 0, 0, -60]);

  return (
    <motion.div 
      style={{ opacity, clipPath }}
      className="fixed inset-0 flex items-center justify-center bg-[#050505] z-20 overflow-hidden p-4 md:p-10"
    >
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, 
          backgroundSize: '30px 30px' 
        }} 
      />

      <div className="max-w-[95vw] lg:max-w-[90vw] w-full grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-y-auto lg:overflow-hidden max-h-[90vh]">
        
        {/* Visual Terminal Side */}
        <div className="relative h-48 md:h-64 lg:h-[600px] border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center overflow-hidden bg-black/20">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[150%] h-[150%] lg:w-[120%] lg:h-[120%] opacity-20"
                style={{ border: `1px dashed ${color}`, borderRadius: '100%' }}
            />
            
            <div className="relative z-10 flex flex-col items-center scale-75 lg:scale-100">
                <div className="p-6 lg:p-10 mb-4 lg:mb-6 bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]" style={{ color }}>
                    <Icon size={48} className="lg:w-20 lg:h-20" strokeWidth={1} />
                </div>
                <div className="font-mono text-[8px] lg:text-[10px] tracking-[0.6em] uppercase opacity-40">System_Protocol_{title}</div>
            </div>
        </div>

        {/* Content Terminal Side */}
        <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center relative">
            <div className="hidden md:block absolute top-0 right-0 p-4 opacity-20 font-mono text-[8px]" style={{ color }}>
                CORE_ENGINE_v4.0
            </div>

            <motion.div style={{ y: textY }} className="space-y-4 lg:space-y-8">
                <div className="inline-flex items-center gap-4">
                    <div className="w-8 lg:w-12 h-[1px] bg-white/20" />
                    <span className="font-mono text-[10px] lg:text-xs uppercase tracking-widest" style={{ color }}>
                        {subtitle}
                    </span>
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
                    {title}<span className="animate-pulse" style={{ color }}>_</span>
                </h2>

                <p className="text-lg lg:text-3xl font-light text-white/70 leading-tight max-w-xl">
                    {content}
                </p>

                <div className="pt-4 lg:pt-10 flex gap-4 lg:gap-6">
                    <div className="w-1 h-12 lg:h-16" style={{ backgroundColor: color }} />
                    <div className="font-mono text-[8px] lg:text-[10px] opacity-40 uppercase leading-loose tracking-widest">
                        Process: [Executing]<br/>
                        Security: [Verified]<br/>
                        Scale: [Global]
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
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
        <h1 className="text-4xl md:text-6xl lg:text-[7vw] font-black uppercase leading-[0.9] tracking-tighter mb-6 lg:mb-8">
            BUILDING NATIONS <br className="hidden md:block"/> THROUGH <span style={{ color: COLORS.FOREST_GREEN }}>ENTREPRENEURSHIP</span>
        </h1>
        <p className="text-base md:text-xl lg:text-2xl font-light opacity-60 max-w-3xl mx-auto leading-relaxed mb-8 lg:mb-12">
            WOI is a decentralized ecosystem architecture firm. We design, establish, and scale the ventures that bridge the gaps between innovation, capital, and governance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full sm:w-auto">
            <button className="px-8 lg:px-10 py-4 lg:py-5 bg-white text-black font-black uppercase text-xs lg:text-sm tracking-widest hover:bg-opacity-90 transition-all">
                Explore Our Ventures
            </button>
            <button className="px-8 lg:px-10 py-4 lg:py-5 border border-white/20 font-black uppercase text-xs lg:text-sm tracking-widest hover:bg-white/10 transition-all">
                Partner with Us
            </button>
        </div>
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
                <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">Architecture for <br/> a New Economy.</h3>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </motion.div>

      {/* 4. THE WOI FRAMEWORK */}
      <ArchitectureLayer 
        title="Analyze"
        subtitle="Step 01: Identification"
        color={COLORS.ELECTRIC_BLUE}
        icon={Target}
        content="Ecosystem Research & Gap Identification. We pinpoint the exact structural voids preventing national scale."
        progress={smoothProgress}
        range={[0.45, 0.5, 0.55, 0.6]}
      />

      <ArchitectureLayer 
        title="Architect"
        subtitle="Step 02: Design"
        color={COLORS.DARK_LAVENDER}
        icon={Cpu}
        content="Strategic Venture Structuring & Governance Design. Engineering the DNA of future-proof institutions."
        progress={smoothProgress}
        range={[0.6, 0.65, 0.7, 0.75]}
      />

      <ArchitectureLayer 
        title="Activate"
        subtitle="Step 03: Integration"
        color={COLORS.VIBRANT_PINK}
        icon={Zap}
        content="Capital Alignment & Network Integration. Connecting high-potential ventures with the liquidity they deserve."
        progress={smoothProgress}
        range={[0.75, 0.8, 0.85, 0.9]}
      />

      <ArchitectureLayer 
        title="Accelerate"
        subtitle="Step 04: Influence"
        color={COLORS.MANGO_YELLOW}
        icon={BarChart}
        content="Institutional Branding & Policy Collaboration. Scaling impact through systemic policy alignment."
        progress={smoothProgress}
        range={[0.9, 0.92, 0.94, 0.96]}
      />

      {/* FINAL STATE */}
      <motion.div 
        style={{ 
            opacity: useTransform(smoothProgress, [0.96, 0.98], [0, 1]),
            y: useTransform(smoothProgress, [0.96, 0.99], ["100%", "0%"]),
            backgroundColor: COLORS.WHITE
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 text-black"
      >
        <div className="max-w-6xl w-full text-center">
            <motion.h2 
              style={{ 
                y: useTransform(smoothProgress, [0.97, 1], [50, 0]),
                opacity: useTransform(smoothProgress, [0.97, 0.99], [0, 1])
              }}
              className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-6 lg:mb-8"
            >
              READY TO BUILD?
            </motion.h2>
            <motion.p 
              style={{ 
                y: useTransform(smoothProgress, [0.98, 1], [30, 0]),
                opacity: useTransform(smoothProgress, [0.98, 0.995], [0, 0.7])
              }}
              className="text-lg lg:text-2xl font-light max-w-2xl mx-auto mb-8 lg:mb-12 leading-relaxed"
            >
                Whether you are a founder, an investor, or a government representative, let’s talk about building your ecosystem.
            </motion.p>
            <motion.div 
               style={{ 
                y: useTransform(smoothProgress, [0.985, 1], [20, 0])
               }}
               className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <button className="px-8 lg:px-12 py-4 lg:py-6 bg-black text-white font-black uppercase text-xs lg:text-sm tracking-widest hover:scale-105 transition-transform">
                    Get in Touch
                </button>
                <button className="px-8 lg:px-12 py-4 lg:py-6 border-2 border-black font-black uppercase text-xs lg:text-sm tracking-widest hover:bg-black hover:text-white transition-all">
                    View Ecosystem Map
                </button>
            </motion.div>
        </div>
      </motion.div>

      {/* PROGRESS HUD */}
      <div className="fixed bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[60]">
         <div className="w-32 lg:w-48 h-[2px] bg-white/10 overflow-hidden">
            <motion.div 
                className="h-full" 
                style={{ 
                  scaleX: scrollYProgress, 
                  backgroundColor: useTransform(smoothProgress, [0.96, 0.98], [COLORS.VIBRANT_PINK, COLORS.BRICK_RED]) 
                }} 
            />
         </div>
         <motion.span 
           style={{ color: useTransform(smoothProgress, [0.97, 0.98], ["rgba(255,255,255,0.6)", "#000000"]) }}
           className="font-mono text-[8px] lg:text-[10px] tracking-widest uppercase whitespace-nowrap"
         >
           System_Active
         </motion.span>
      </div>
    </div>
  );
}