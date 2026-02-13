import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const COLORS = {
  MATRIX_BLACK: "#020202",
  SYSTEM_RED: "#EC3B2E",
  CYBER_GREEN: "#00FF66",
  TEXT_WHITE: "#FFFFFF"
};

const SECTIONS = [
  { code: "INIT", title: "GENESIS", data: "WOI_SYSTEM_DEPLOYED_2026", color: COLORS.CYBER_GREEN },
  { code: "ARCH", title: "STRUCTURE", data: "GLOBAL_INFLUENCE_NODES", color: COLORS.TEXT_WHITE },
  { code: "EXEC", title: "MOMENTUM", data: "HIGH_VELOCITY_SCALING", color: COLORS.SYSTEM_RED },
];

export default function TerminalMatrix() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Create a stepped progress for a "digital" feel rather than smooth
  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return stepProgress.on("change", (v) => {
      if (v < 33) setActiveStep(0);
      else if (v < 66) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [stepProgress]);

  return (
    <div ref={containerRef} className="h-[400vh] bg-[#020202] text-white font-mono selection:bg-[#00FF66] selection:text-black">
      
      {/* 1. THE GRID OVERLAY (Fixed) */}
      <div className="fixed inset-0 grid grid-cols-4 md:grid-cols-8 grid-rows-8 pointer-events-none opacity-10">
        {[...Array(64)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/20" />
        ))}
      </div>

      {/* 2. THE CENTRAL DATA HUD */}
      <div className="fixed inset-0 flex flex-col items-center justify-center p-6 md:p-24">
        
        {/* Dynamic Background ID */}
        <h1 className="fixed text-[30vw] font-black opacity-[0.03] italic pointer-events-none">
          {SECTIONS[activeStep].code}
        </h1>

        <div className="relative w-full max-w-6xl">
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: SECTIONS[activeStep].color }} />
               <span className="text-xs tracking-[0.6em] opacity-40 uppercase">Sector_Analysis_0{activeStep + 1}</span>
            </div>

            <h2 className="text-7xl md:text-[10vw] font-black italic uppercase leading-none tracking-tighter">
                {SECTIONS[activeStep].title}
            </h2>

            <div className="flex flex-col md:flex-row gap-8 pt-12 items-start md:items-center justify-between border-t border-white/10">
                <p className="text-xl font-light opacity-50 max-w-md">
                   {SECTIONS[activeStep].data}
                </p>
                <div className="flex gap-4">
                    <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-all text-[10px] font-bold tracking-[0.4em] uppercase">
                        Access_Nodes
                    </button>
                    <button className="px-8 py-3 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase">
                        Protocol_X
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. SIDEBAR TELEMETRY */}
      <div className="fixed top-12 left-12 bottom-12 w-px bg-white/10 hidden md:block">
         <motion.div 
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            className="w-full bg-[#00FF66] shadow-[0_0_10px_#00FF66]"
         />
      </div>

      <div className="fixed top-12 right-12 text-right space-y-2 opacity-30">
         <p className="text-[8px] tracking-[0.3em]">CORE_TEMP: 32°C</p>
         <p className="text-[8px] tracking-[0.3em]">BUFFER: 100%</p>
         <p className="text-[8px] tracking-[0.3em]">UPLINK: ENCRYPTED</p>
      </div>

      {/* 4. FOOTER LOGS */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end">
          <div className="font-mono text-[10px] space-y-1">
             <p className="opacity-20 uppercase tracking-widest text-[8px]">Current_Task</p>
             <p className="text-[#00FF66]">Executing_{SECTIONS[activeStep].title}_Deployment...</p>
          </div>
          <div className="text-8xl font-black italic tracking-tighter opacity-10">
            {Math.round(scrollYProgress.get() * 100)}%
          </div>
      </div>

    </div>
  );
}