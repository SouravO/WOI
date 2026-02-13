import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

const SECTORS = [
  { id: '01', title: "Entrepreneurs", color: "#4F46E5", projects: ["CEO Square", "YEP", "Next Leader"], desc: "Empowering visionary leaders to scale global impact." },
  { id: '02', title: "Startups", color: "#EF4444", projects: ["Incubenation", "Franchisify", "Perform100X"], desc: "Accelerating early-stage ventures through strategic architecture." },
  { id: '03', title: "Investors", color: "#10B981", projects: ["Investor Cafe", "VC Circle", "X9 Club"], desc: "High-yield networking for capital allocators." },
  { id: '04', title: "Governments", color: "#F59E0B", projects: ["Startup Park", "Vision by iQue"], desc: "Developing ecosystem policy and digital infrastructure." },
];

export default function WOIShutter() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // The "Heavy" feel: High damping, low stiffness
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  return (
    <div ref={containerRef} className="h-[500vh] bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* FIXED LOGO & NAV */}
      <div className="fixed top-12 left-12 z-[100] flex items-center gap-8">
        <div className="text-2xl font-black tracking-tighter italic border-b-4 border-white">WOI</div>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">System_04_Deployment</span>
      </div>

      <div className="fixed inset-0 flex">
        {SECTORS.map((sector, i) => (
          <ShutterPanel 
            key={sector.id} 
            sector={sector} 
            index={i} 
            progress={smoothProgress} 
          />
        ))}
      </div>

      {/* FIXED PROGRESS INDICATOR */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end z-[100]">
        <div className="space-y-1">
            <p className="text-[10px] opacity-30 uppercase tracking-widest">Global_Position</p>
            <div className="text-4xl font-light tabular-nums">
                {/* Visual percentage tracker */}
                <ProgressValue progress={smoothProgress} />
            </div>
        </div>
        <div className="text-right max-w-[200px] opacity-30 text-[10px] uppercase tracking-widest leading-loose">
            Universe of Influence © 2026 <br />
            All Rights Reserved / V3.0
        </div>
      </div>
    </div>
  );
}

function ShutterPanel({ sector, index, progress }) {
  const start = index * 0.2;
  const end = (index + 1) * 0.25;

  // Each panel slides in from the right and stays until the next one pushes it or it exits
  const x = useTransform(progress, [start, end], ["100%", "0%"]);
  const brightness = useTransform(progress, [end, end + 0.1], [1, 0.3]);

  return (
    <motion.div
      style={{ x, filter: `brightness(${brightness})`, zIndex: index + 10 }}
      className="absolute inset-0 bg-[#050505] border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.9)] flex"
    >
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[40vh] font-black italic uppercase leading-none">{sector.title}</h2>
      </div>

      <div className="relative w-full h-full flex items-center px-24">
        <div className="max-w-xl">
          <div className="flex items-center gap-6 mb-8">
            <span className="text-7xl font-black text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
              {sector.id}
            </span>
            <div className="h-px w-24" style={{ backgroundColor: sector.color }} />
          </div>
          
          <h3 className="text-8xl font-bold tracking-tighter mb-6 uppercase italic">
            {sector.title}
          </h3>
          
          <p className="text-xl text-white/50 mb-12 max-w-md leading-relaxed">
            {sector.desc}
          </p>

          <div className="grid grid-cols-1 gap-4">
            {sector.projects.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between p-4 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all cursor-pointer"
              >
                <span className="text-sm font-bold tracking-widest uppercase">{p}</span>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SIDEBAR STRIP */}
      <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-white/5 flex items-center justify-center">
        <span className="rotate-90 text-[10px] tracking-[0.5em] uppercase opacity-20 whitespace-nowrap">
          Data_Stream_Sector_{sector.id}
        </span>
      </div>
    </motion.div>
  );
}

function ProgressValue({ progress }) {
    const [v, setV] = React.useState(0);
    React.useEffect(() => {
        return progress.on("change", (latest) => setV(Math.round(latest * 100)));
    }, [progress]);
    return <span>{v}%</span>;
}