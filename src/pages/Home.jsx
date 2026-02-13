import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, Users, TrendingUp, Landmark, Rocket, Shield, Activity, Command, Target, Cpu, Search } from 'lucide-react';

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

const NarrativeLayer = ({ title, subtitle, content, icon: Icon, projects, progress, range, color }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [100, 0, 0, -100]);
  const scale = useTransform(progress, range, [0.8, 1, 1.1, 1.2]);

  return (
    <motion.div 
      style={{ opacity, y, scale }}
      className="fixed inset-0 flex items-center justify-center p-6 pointer-events-none"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
            <Icon size={14} /> {subtitle}
          </div>
          <h2 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]" style={{ color }}>
            {title}
          </h2>
          <p className="text-xl text-gray-100 font-light max-w-md opacity-80 leading-relaxed">{content}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2">Venture Infrastructure</p>
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 20, backgroundColor: "rgba(255,255,255,0.05)", borderColor: color }}
              className="p-6 border-l-2 border-white/10 flex justify-between items-center group cursor-pointer transition-colors"
            >
              <span className="text-2xl font-bold uppercase tracking-tight">{p}</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Command size={16} />
              </div>
            </motion.div>
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
    <div ref={containerRef} className="h-[1400vh] bg-[#050505] text-white overflow-hidden">
      
      {/* 1. THE MASKED BACKGROUND LAYER */}
      <motion.div style={{ clipPath: clipPathValue }} className="fixed inset-0 z-0 bg-[#080808]">
        <motion.div style={{ y: bgY }} className="absolute inset-0 flex flex-col items-center justify-around opacity-10">
          {[...Array(10)].map((_, i) => (
            <h2 key={i} className="text-[25vw] font-black leading-none uppercase italic tracking-tighter select-none">
              NATION BUILDERS
            </h2>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-transparent" />
      </motion.div>

      {/* 2. THE FLOATING HUD */}
      <div className="fixed top-12 left-12 right-12 z-50 flex justify-between items-center">
        <div className="font-black text-3xl italic tracking-tighter" style={{ color: COLORS.WHITE }}>WOI.</div>
        <div className="flex gap-8 font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">
          <span style={{ color: COLORS.ELECTRIC_BLUE }}>TYPE: DECENTRALIZED_HOLDING</span>
          <span style={{ color: COLORS.VIBRANT_PINK }}>STATUS: ACTIVE_ARCH</span>
          <span style={{ color: COLORS.MANGO_YELLOW }}>EST_2026</span>
        </div>
      </div>

      {/* SECTION 0: ABOUT WOI */}
      <motion.div 
        style={{ 
            opacity: useTransform(smoothProgress, [0, 0.08, 0.1], [1, 1, 0]),
            scale: useTransform(smoothProgress, [0, 0.1], [1, 0.8])
        }}
        className="fixed inset-0 flex flex-col items-center justify-center z-10 p-6 text-center"
      >
        <div className="w-24 h-24 mb-12 relative">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 rounded-full"
                style={{ borderColor: COLORS.ELECTRIC_BLUE }}
            />
            <div className="absolute inset-4 border border-white/10 rounded-full flex items-center justify-center">
                <Globe className="opacity-40" style={{ color: COLORS.DARK_LAVENDER }} size={32} />
            </div>
        </div>
        <h1 className="text-[9vw] font-black uppercase leading-[0.75] tracking-tighter mb-6">
            WORLD OF <br/> <span style={{ color: COLORS.FOREST_GREEN }}>IQUE</span>
        </h1>
        <p className="font-mono text-sm tracking-[0.4em] uppercase opacity-60 max-w-2xl mx-auto leading-relaxed" style={{ color: COLORS.CORAL_PINK }}>
            Empowering the Pillars of National Growth through Independent Venture Design.
        </p>
      </motion.div>

      {/* MISSION & RESEARCH LAYER */}
      <motion.div 
        style={{ 
            opacity: useTransform(smoothProgress, [0.12, 0.15, 0.25, 0.28], [0, 1, 1, 0]),
            y: useTransform(smoothProgress, [0.12, 0.28], [100, -100])
        }}
        className="fixed inset-0 flex items-center justify-center z-10 p-6"
      >
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
                <Search style={{ color: COLORS.VIBRANT_PINK }} />
                <h3 className="text-5xl font-black uppercase italic tracking-tighter">Ecosystem Research</h3>
                <p className="text-xl font-light opacity-70 leading-relaxed">
                    We identify structural gaps in emerging markets and design ventures that act as the strategic architecture layer for national economic development.
                </p>
            </div>
            <div className="space-y-6 border-l border-white/10 pl-12">
                <Target style={{ color: COLORS.ELECTRIC_BLUE }} />
                <h3 className="text-5xl font-black uppercase italic tracking-tighter">The Vision</h3>
                <p className="text-xl font-light opacity-70 leading-relaxed">
                    To build powerful entrepreneurial ecosystems that accelerate innovation, strengthen capital networks, and contribute to nation building.
                </p>
            </div>
        </div>
      </motion.div>

      {/* PILLAR 1: ENTREPRENEURS */}
      <NarrativeLayer 
        title="Entrepreneurs"
        subtitle="Pillar 01: Building Leaders"
        color={COLORS.ELECTRIC_BLUE}
        icon={Users}
        content="Grooming visionary leaders with the mindset, network, and capabilities to scale impact-driven ventures."
        projects={["CEO Square", "YEP Programme", "Next Leader", "StartupTV"]}
        progress={smoothProgress}
        range={[0.3, 0.4, 0.45, 0.5]}
      />

      {/* PILLAR 2: STARTUPS */}
      <NarrativeLayer 
        title="Startups"
        subtitle="Pillar 02: Scalable Companies"
        color={COLORS.DARK_LAVENDER}
        icon={Rocket}
        content="Supporting incubation, structured scaling, and operational excellence through proven expansion frameworks."
        projects={["Incubenation", "Franchisify", "Perform100X"]}
        progress={smoothProgress}
        range={[0.5, 0.6, 0.65, 0.7]}
      />

      {/* PILLAR 3: INVESTORS */}
      <NarrativeLayer 
        title="Investors"
        subtitle="Pillar 03: Capital Networks"
        color={COLORS.FOREST_GREEN}
        icon={TrendingUp}
        content="Creating intelligent networks that connect capital with structured, high-potential innovation opportunities."
        projects={["Investor Cafe", "VC Circle", "X9 Club"]}
        progress={smoothProgress}
        range={[0.7, 0.8, 0.85, 0.9]}
      />

      {/* PILLAR 4: GOVERNMENTS */}
      <NarrativeLayer 
        title="Governments"
        subtitle="Pillar 04: Infrastructure"
        color={COLORS.MANGO_YELLOW}
        icon={Landmark}
        content="Designing innovation zones, policy collaboration, and public-private partnerships for long-term growth."
        projects={["Startup Park", "Vision by iQue", "iQue Infra"]}
        progress={smoothProgress}
        range={[0.9, 0.94, 0.96, 0.98]}
      />

      {/* FINAL STATE: CHAIRMAN'S MESSAGE */}
      <motion.div 
        style={{ 
            opacity: useTransform(smoothProgress, [0.98, 0.99], [0, 1]),
            backgroundColor: COLORS.WHITE
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 text-black"
      >
        <div className="max-w-4xl w-full">
            <div className="flex justify-between items-end mb-16">
                <h2 className="text-7xl font-black uppercase tracking-tighter leading-none" style={{ color: COLORS.BRICK_RED }}>STRENGTHEN <br/> THE NATION.</h2>
                <div className="text-right">
                    <p className="font-mono text-xs mb-2 opacity-50 uppercase tracking-widest">Chairman, WOI</p>
                    <Activity size={40} style={{ color: COLORS.VIBRANT_PINK }} />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/10 pt-12">
                <div className="space-y-6">
                    <p className="text-2xl font-light italic leading-relaxed">
                        "Entrepreneurs are the ones who can bring real change to a nation. Our goal is to identify problems and solve them structurally so that more entrepreneurs can emerge. Innovation strengthens the nation."
                    </p>
                </div>
                <div className="space-y-4">
                    <button 
                      className="w-full py-6 text-white font-black uppercase tracking-widest hover:opacity-90 transition-all"
                      style={{ backgroundColor: COLORS.FOREST_GREEN }}
                    >
                      Establish Advisory
                    </button>
                    <button 
                      className="w-full py-6 border-2 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                      style={{ borderColor: COLORS.BRICK_RED, color: COLORS.BRICK_RED }}
                    >
                      Explore Ventures
                    </button>
                </div>
            </div>
        </div>
      </motion.div>

      {/* 4. SCROLL PROGRESS HUD */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[60]">
         <div className="w-48 h-[2px] bg-white/10 overflow-hidden">
            <motion.div 
                className="h-full" 
                style={{ scaleX: scrollYProgress, backgroundColor: COLORS.VIBRANT_PINK }} 
            />
         </div>
         <span className="font-mono text-[10px] tracking-widest opacity-60 uppercase">Ecosystem_Sync_Stable</span>
      </div>
    </div>
  );
}