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

// --- UPDATED ARCHITECTURE LAYER COMPONENT ---
const ArchitectureLayer = ({ title, subtitle, content, icon: Icon, progress, range, color }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const x = useTransform(progress, range, [100, 0, 0, -100]);
  const lineScaleY = useTransform(progress, range, [0, 1, 1, 0]);
  const textBlur = useTransform(progress, range, ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 flex items-center justify-center p-6 md:p-20 pointer-events-none"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center pointer-events-auto">
        
        {/* Decorative Side Label */}
        <div className="hidden md:block col-span-1">
            <motion.div 
                style={{ color, opacity: 0.2 }}
                className="text-7xl font-black uppercase tracking-tighter origin-left -rotate-90 whitespace-nowrap translate-x-4"
            >
                {title}
            </motion.div>
        </div>

        {/* Main Content Card */}
        <motion.div 
            style={{ x, filter: textBlur }}
            className="col-span-12 md:col-span-8 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-20 relative overflow-hidden group"
        >
            {/* The "Scanning" Line UI */}
            <motion.div 
                style={{ scaleY: lineScaleY, backgroundColor: color }}
                className="absolute left-0 top-0 w-1.5 h-full origin-top"
            />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px]" style={{ backgroundColor: color }} />
                        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color }}>
                            {subtitle}
                        </span>
                    </div>
                    <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        {title}<span style={{ color }}>.</span>
                    </h3>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 self-start md:self-auto" style={{ color }}>
                    <Icon size={48} strokeWidth={1} />
                </div>
            </div>

            <p className="text-2xl md:text-4xl font-light leading-tight text-white/80 max-w-3xl">
                {content}
            </p>

            {/* Technical Footer Decoration */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center font-mono text-[9px] uppercase tracking-widest opacity-30">
                <span>Ref_ID: {title}_STRAT_01</span>
                <span>Coord: 51.5074° N, 0.1278° W</span>
                <span className="hidden md:inline">Status: System_Optimized</span>
            </div>
        </motion.div>

        {/* Right Side Info Metrics */}
        <div className="hidden md:flex col-span-3 flex-col gap-10 pl-10">
            {[
                { label: "Structural Integrity", val: "98%" },
                { label: "Ecosystem Alignment", val: "100%" },
                { label: "Deployment Velocity", val: "A+" }
            ].map((metric, i) => (
                <div key={i} className="space-y-2">
                    <div className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">{metric.label}</div>
                    <div className="flex items-center gap-4">
                        <div className="h-1 flex-grow bg-white/10 overflow-hidden">
                            <motion.div 
                                className="h-full" 
                                style={{ backgroundColor: color, width: i === 0 ? "98%" : i === 1 ? "100%" : "85%" }} 
                            />
                        </div>
                        <span className="font-mono text-xs" style={{ color }}>{metric.val}</span>
                    </div>
                </div>
            ))}
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
            <h2 key={i} className="text-[20vw] font-black leading-none uppercase italic tracking-tighter select-none">
              ARCHITECTURE
            </h2>
          ))}
        </motion.div>
      </motion.div>

      {/* FIXED HUD */}
      <div className="fixed top-12 left-12 right-12 z-50 flex justify-between items-center">
        <div className="font-black text-3xl italic tracking-tighter" style={{ color: COLORS.WHITE }}>WOI.</div>
        <div className="hidden md:flex gap-8 font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
          <span style={{ color: COLORS.ELECTRIC_BLUE }}>TYPE: ECOSYSTEM_ARCHITECTS</span>
          <span style={{ color: COLORS.VIBRANT_PINK }}>NATION_BUILDING_INITIATIVE</span>
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
        <h1 className="text-[7vw] font-black uppercase leading-[0.85] tracking-tighter mb-8">
            BUILDING NATIONS <br/> THROUGH <span style={{ color: COLORS.FOREST_GREEN }}>ENTREPRENEURSHIP</span>
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-60 max-w-3xl mx-auto leading-relaxed mb-12">
            WOI is a decentralized ecosystem architecture firm. We design, establish, and scale the ventures that bridge the gaps between innovation, capital, and governance.
        </p>
        <div className="flex flex-col md:flex-row gap-6">
            <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-opacity-90 transition-all">
                Explore Our Ventures
            </button>
            <button className="px-10 py-5 border border-white/20 font-black uppercase tracking-widest hover:bg-white/10 transition-all">
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
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
                <div className="w-16 h-1 bg-white" style={{ backgroundColor: COLORS.ELECTRIC_BLUE }} />
                <h3 className="text-6xl font-black uppercase tracking-tighter leading-none">Architecture for <br/> a New Economy.</h3>
                <p className="text-2xl font-light opacity-60">
                    Most ecosystems fail because of structural gaps. We don't just invest; we engineer the infrastructure.
                </p>
            </div>
            <div className="grid gap-8">
                {[
                    { icon: Search, title: "Research-Driven", desc: "Identifying systemic bottlenecks in emerging markets.", color: COLORS.ELECTRIC_BLUE },
                    { icon: Layout, title: "Venture Structuring", desc: "Building independent entities to solve those bottlenecks.", color: COLORS.VIBRANT_PINK },
                    { icon: Globe, title: "Global Integration", desc: "Aligning private innovation with national interests.", color: COLORS.MANGO_YELLOW }
                ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
                        <item.icon style={{ color: item.color }} size={32} strokeWidth={1.5} />
                        <div>
                            <h4 className="font-bold text-xl uppercase mb-2">{item.title}</h4>
                            <p className="opacity-50 font-light leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </motion.div>

      {/* 4. THE WOI FRAMEWORK (ARCHITECTURE LAYERS) */}
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
                y: useTransform(smoothProgress, [0.97, 1], [100, 0]),
                opacity: useTransform(smoothProgress, [0.97, 0.99], [0, 1])
              }}
              className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8"
            >
              READY TO BUILD?
            </motion.h2>
            <motion.p 
              style={{ 
                y: useTransform(smoothProgress, [0.98, 1], [50, 0]),
                opacity: useTransform(smoothProgress, [0.98, 0.995], [0, 0.7])
              }}
              className="text-2xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
                Whether you are a founder, an investor, or a government representative, let’s talk about building your ecosystem.
            </motion.p>
            <motion.div 
               style={{ 
                y: useTransform(smoothProgress, [0.985, 1], [30, 0])
               }}
               className="flex flex-col md:flex-row gap-4 justify-center"
            >
                <button className="px-12 py-6 bg-black text-white font-black uppercase tracking-widest hover:scale-105 transition-transform">
                    Get in Touch
                </button>
                <button className="px-12 py-6 border-2 border-black font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    View Ecosystem Map
                </button>
            </motion.div>
        </div>
      </motion.div>

      {/* PROGRESS HUD */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[60]">
         <div className="w-48 h-[2px] bg-white/10 overflow-hidden">
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
           className="font-mono text-[10px] tracking-widest uppercase"
         >
           System_Architecture_Active
         </motion.span>
      </div>
    </div>
  );
}