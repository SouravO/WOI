import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Quote, ArrowDown, MoveRight, Radio } from 'lucide-react';

const ChairmanPage = () => {
  const containerRef = useRef(null);
  
  // Scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for 3D/Parallax feel
  const imageScale = useTransform(smoothProgress, [0, 0.5], [1.1, 1.5]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [0.6, 0.8, 0]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative bg-zinc-950 text-white selection:bg-red-600">
      
      {/* --- FIXED BACKGROUND OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[1rem] border-zinc-950/20" />
      
      {/* --- HERO SECTION (The Visual) --- */}
      <section className="relative h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Parallax Image Container */}
          <motion.div 
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950 z-10" />
            <img 
              src="/api/placeholder/1920/1080" // Replace with your image url
              alt="Chairman"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </motion.div>

          {/* Floating UI Elements */}
          <div className="absolute top-12 left-12 z-20 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-4">
            <Radio className="text-red-600 animate-pulse" size={14} />
            <span>Executive_Transmission // 2026</span>
          </div>

          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative z-20 text-center px-6"
          >
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[1em] mb-8 text-red-500">
              A Message from the Chair
            </h2>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-12">
              Vision <br /> Beyond <br /> <span className="text-outline text-transparent border-white">Limits.</span>
            </h1>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2 opacity-40"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to Enter</span>
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- THE QUOTE SECTION --- */}
      <section className="relative z-20 px-6 py-32 md:py-64 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-1">
            <Quote className="text-red-600" size={48} fill="currentColor" />
          </div>

          <div className="md:col-span-10">
            <motion.p 
              style={{ y: textY }}
              className="text-3xl md:text-6xl font-light leading-tight tracking-tight mb-20"
            >
              "The future doesn't belong to those who wait for the right moment, but to those who <span className="font-bold italic text-red-600">manufacture</span> the moment themselves. Our community is the furnace where raw ambition is forged into global impact."
            </motion.p>

            <div className="flex flex-col md:flex-row justify-between items-end border-t border-zinc-800 pt-12">
              <div>
                <h4 className="text-2xl font-bold uppercase">Dr. Elias Thorne</h4>
                <p className="font-mono text-sm text-zinc-500 uppercase tracking-widest">Founding Chairman / Lead Strategist</p>
              </div>
              
              <motion.button 
                whileHover={{ x: 10 }}
                className="mt-8 md:mt-0 flex items-center gap-4 group"
              >
                <span className="font-bold uppercase tracking-tighter text-xl">View Full Manifesto</span>
                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                  <MoveRight size={20} />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3D MASK SECTION --- */}
      <section className="h-screen bg-red-600 flex items-center justify-center relative overflow-hidden">
         <motion.div 
            style={{ y: bgY }}
            className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden"
         >
            <h1 className="text-[40vw] font-black leading-none whitespace-nowrap -ml-20">ARCHIVE</h1>
         </motion.div>
         
         <div className="relative z-10 text-center px-4">
            <h3 className="text-zinc-950 text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
              Join the Legacy.
            </h3>
            <p className="text-red-100 max-w-lg mx-auto font-medium mb-12">
              We are currently accepting applications for the 2026 Cohort. Space is limited, ambition is not.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                <button className="px-10 py-5 bg-zinc-950 text-white font-bold uppercase text-xs tracking-widest hover:invert transition-all">
                  Apply for Admission
                </button>
                <button className="px-10 py-5 border-2 border-zinc-950 text-zinc-950 font-bold uppercase text-xs tracking-widest hover:bg-zinc-950 hover:text-white transition-all">
                  Download Prospectus
                </button>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="p-12 bg-zinc-950 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-8">
        <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          © 2026 Archive Labs. All rights reserved. <br />
          Encrypted Connection: Stable
        </div>
        <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-red-500">Twitter</a>
            <a href="#" className="hover:text-red-500">LinkedIn</a>
            <a href="#" className="hover:text-red-500">Intel</a>
        </div>
      </footer>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
    </div>
  );
};

export default ChairmanPage;