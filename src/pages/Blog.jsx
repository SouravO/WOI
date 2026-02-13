import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Globe, ArrowUpRight, Zap } from 'lucide-react';

const AsymmetricVision = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Parallax Values
  const leftColumnY = useTransform(smoothProgress, [0, 1], [0, -800]);
  const rightColumnY = useTransform(smoothProgress, [0, 1], [0, 800]);
  const centerScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const pinkRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-[#E75893]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* SECTION 1: THE SPLIT ASCENSION (LAVENDER & WHITE) */}
      <section className="relative h-[150vh] overflow-hidden flex items-center justify-center">
        
        {/* Left Floating Track */}
        <motion.div style={{ y: leftColumnY }} className="absolute left-[5%] top-20 w-[20%] space-y-20 opacity-40 hidden md:block">
          <div className="h-96 bg-[#6B66E1] border border-white/20" />
          <div className="h-64 bg-zinc-900 border border-white/10" />
          <div className="h-96 bg-[#026F43] border border-white/20" />
        </motion.div>

        {/* Right Floating Track */}
        <motion.div style={{ y: rightColumnY }} className="absolute right-[5%] top-[-50%] w-[20%] space-y-20 opacity-40 hidden md:block">
          <div className="h-64 bg-zinc-900 border border-white/10" />
          <div className="h-96 bg-[#E75893] border border-white/20" />
          <div className="h-96 bg-[#F6982F] border border-white/20" />
        </motion.div>

        <div className="z-10 text-center max-w-4xl px-6">
          <motion.div style={{ scale: centerScale }}>
            <h1 className="text-[12vw] font-black leading-none mb-4">
              THE <br /> <span className="text-[#6B66E1]">ARCHITECT</span>
            </h1>
            <p className="text-xl tracking-[0.5em] uppercase font-light text-zinc-500">Visionary Foundations</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE OFFSET CONTENT (PINK & FOREST GREEN) */}
      <section className="min-h-screen py-40 px-6 relative bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-start">
            
            {/* Column 1: Image/Graphic with Parallax */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="relative"
            >
              <div className="bg-[#E75893] w-full aspect-[3/4] p-12 flex items-center justify-center relative z-10">
                <motion.div style={{ rotate: pinkRotate }}>
                   <Sparkles size={180} className="text-white" />
                </motion.div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-[#026F43] -z-10" />
            </motion.div>

            {/* Column 2: Text that "overtakes" the scroll */}
            <div className="pt-20">
              <span className="text-xs font-black uppercase tracking-widest bg-black text-white px-2 py-1">Philosophy 01</span>
              <h2 className="text-6xl font-bold mt-6 mb-10 leading-tight">
                Disrupting the <br /> <span className="italic underline decoration-[#E75893]">Status Quo</span>
              </h2>
              <p className="text-2xl leading-relaxed text-zinc-700 mb-8">
                "We don't look for gaps in the market. We create entirely new landscapes where the market didn't know it could exist."
              </p>
              <hr className="border-black mb-8" />
              <div className="flex justify-between items-center group cursor-pointer">
                <span className="text-xl font-bold">Read the Manifesto</span>
                <div className="p-4 bg-black text-white rounded-full group-hover:rotate-45 transition-transform">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: THE TERMINAL EXIT (VIBRANT PINK & MANGO) */}
      <section className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 w-full border-t border-b border-zinc-800"
        >
          {[
            { label: "Stability", val: "99%", color: "#026F43" },
            { label: "Vision", val: "∞", color: "#F6982F" },
            { label: "Speed", val: "MAX", color: "#E75893" },
            { label: "Input", val: "LIVE", color: "#2261F3" }
          ].map((stat, i) => (
            <div key={i} className="p-10 border-r border-zinc-800 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</span>
              <span className="text-4xl font-black" style={{ color: stat.color }}>{stat.val}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-24 text-center">
          <h3 className="text-4xl md:text-6xl font-black mb-12">CHART THE UNKNOWN</h3>
          <motion.button 
            whileHover={{ scale: 1.1, letterSpacing: "4px" }}
            className="px-16 py-6 border-2 border-[#F6982F] text-[#F6982F] font-black uppercase text-xl hover:bg-[#F6982F] hover:text-black transition-all"
          >
            Connect with Founder
          </motion.button>
        </div>

        {/* Floating UI Elements */}
        <div className="absolute top-10 right-10 flex items-center gap-4 text-zinc-500">
           <Zap size={16} />
           <span className="text-[10px] font-mono tracking-tighter">SYSTEMS_ACTIVE_2026</span>
        </div>
      </section>

    </div>
  );
};

export default AsymmetricVision;