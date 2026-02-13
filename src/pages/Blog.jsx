import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Zap, Target, Shield } from 'lucide-react';

const VisionClean = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Subtle transformations
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const lineExtend = useTransform(smoothProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="bg-black text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* SECTION 1: THE SILENT NORTH (FOREST GREEN ACCENT) */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="z-10 text-center">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "80px" }} 
            className="h-1 bg-[#026F43] mx-auto mb-10"
          />
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6">
            The <span className="font-bold">Vision</span>
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto text-lg leading-relaxed">
            A strategic evolution of design and purpose, built on the pillars of clarity and vibrant execution.
          </p>
        </motion.div>

        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#026F43] rounded-full blur-[160px] opacity-20 pointer-events-none" />
        
        <motion.div className="absolute bottom-10 animate-bounce opacity-30">
          <ArrowDown size={30} />
        </motion.div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY (ELECTRIC BLUE & LAVENDER) */}
      <section className="min-h-screen py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#2261F3] font-bold tracking-[0.3em] uppercase text-sm">Foundations</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 leading-tight">
              Built with <br/> 
              <span className="text-[#6B66E1]">Deep Intent.</span>
            </h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-[#2261F3]/10 flex items-center justify-center text-[#2261F3]">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Precision Goalsetting</h4>
                  <p className="text-zinc-400">We don't aim for the middle. We define the edge and move toward it with absolute certainty.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-[#6B66E1]/10 flex items-center justify-center text-[#6B66E1]">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Integrity of Form</h4>
                  <p className="text-zinc-400">Every pixel serves a purpose. If it doesn't add value, it doesn't exist in our ecosystem.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Image Placeholder / Graphic */}
          <div className="relative aspect-square">
            <motion.div 
              style={{ scaleY: lineExtend }}
              className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#2261F3] via-[#6B66E1] to-transparent" 
            />
            <div className="w-full h-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-3xl flex items-center justify-center">
               <Zap size={100} className="text-zinc-800" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE CALL (BRICK RED & MANGO) */}
      <section className="h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-4xl bg-zinc-900/30 border border-zinc-800 p-12 md:p-24 text-center relative overflow-hidden">
          {/* Accent Corners */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#EC3B2E]" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#F6982F]" />
          
          <h2 className="text-4xl md:text-7xl font-bold mb-10">
            Let's build the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC3B2E] to-[#F6982F]">Unforgettable.</span>
          </h2>

          <motion.button
            whileHover={{ y: -5 }}
            className="bg-white text-black px-12 py-4 font-bold text-lg rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Contact the Founder
          </motion.button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-10 border-t border-zinc-900 px-6 text-center">
        <p className="text-zinc-600 text-sm tracking-widest uppercase">Archive 2026 // Visionary Systems</p>
      </footer>
    </div>
  );
};

export default VisionClean;