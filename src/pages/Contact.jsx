import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MoveRight, Smartphone, Mail, Globe, Hash, Layers, Target, Cpu, Zap } from 'lucide-react';

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

// SVG Grain Component for texture
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
  const { scrollYProgress } = useScroll({ target: scrollRef });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  const [formData, setFormData] = useState({
    identity: '',
    email: '',
    objective: ''
  });

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
    <div ref={scrollRef} className="relative h-[300vh] bg-[#050505] text-white selection:bg-white selection:text-black">
      <GrainFilter />

      <div className="sticky top-0 h-screen w-full overflow-hidden border-y border-white/10">

        {/* 0. GLOBAL TEXTURE LAYER */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ filter: 'url(#grainy)' }} />
        </div>

        {/* TOP RULER DECORATION */}
        <div className="absolute top-0 left-0 w-full h-12 border-b border-white/10 flex items-center px-4 gap-12 z-20 bg-[#050505]">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="text-[9px] font-mono opacity-30 tracking-tighter">
              {i < 10 ? `0${i}` : i}_SYS_LAYER_{i * 100}
            </span>
          ))}
        </div>

        <motion.div style={{ x: springX }} className="flex h-full w-[300vw] relative z-10">

          {/* SECTION 01: THE CORE DATA */}
          <section className="w-screen h-full flex items-center px-12 md:px-32 border-r border-white/10 relative">
            <div className="max-w-2xl space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <Layers size={14} style={{ color: COLORS.ELECTRIC_BLUE }} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">Node_01 // Structural_Data</span>
                </div>
                <h2 className="text-7xl font-black uppercase tracking-tighter italic leading-none">
                  Liaison <br /> <span style={{ color: COLORS.ELECTRIC_BLUE }}>Protocols</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-10">
                <LinkItem icon={<Smartphone />} label="Direct_Line" value="+91-9036354727" color={COLORS.ELECTRIC_BLUE} />
                <LinkItem icon={<Mail />} label="Secure_Uplink" value="info@woi.com" color={COLORS.VIBRANT_PINK} />
                <LinkItem icon={<Globe />} label="Geographic_Base" value="Bengaluru, IN" color={COLORS.MANGO_YELLOW} />
              </div>

              <div className="flex items-center gap-4 opacity-40 group">
                <span className="text-[10px] font-mono uppercase tracking-widest group-hover:translate-x-2 transition-transform">Lateral Scroll to Proceed</span>
                <MoveRight size={16} />
              </div>
            </div>
          </section>

          {/* SECTION 02: THE TRANSMISSION CONSOLE */}
          <section className="w-screen h-full flex items-center px-12 md:px-32 border-r border-white/10 bg-white/[0.02] backdrop-blur-3xl relative">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
              <div className="space-y-8">
                <div className="text-4xl font-black italic tracking-tighter" style={{ color: COLORS.VIBRANT_PINK }}>02.</div>
                <h2 className="text-7xl font-black uppercase tracking-tighter leading-[0.9]">Architectural <br /> Request.</h2>
                <p className="text-lg font-light opacity-50 leading-relaxed max-w-md">
                  Submit your venture architecture for structural analysis.
                  Our team evaluates for systemic gaps and liquidity alignment.
                </p>
                <div className="flex gap-4 font-mono text-[9px] uppercase tracking-widest opacity-40">
                  <span>Status: Receiving_Active</span>
                  <span className="animate-pulse text-green-500">●</span>
                </div>
              </div>

              <form onSubmit={executeUplink} className="space-y-12 bg-white/5 p-12 border border-white/10 backdrop-blur-md">
                <DraftInput
                  label="Venture_Identity"
                  placeholder="NAME / CODE"
                  color={COLORS.VIBRANT_PINK}
                  name="identity"
                  value={formData.identity}
                  onChange={handleChange}
                />
                <DraftInput
                  label="Comms_Channel"
                  placeholder="EMAIL_ADDRESS"
                  color={COLORS.ELECTRIC_BLUE}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="space-y-4">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-50">Project_Objective</label>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light text-white outline-none focus:border-white transition-colors h-24 resize-none placeholder:opacity-10"
                    placeholder="DESCRIBE THE SYSTEMIC GAP..."
                  />
                </div>
                <button type="submit" className="w-full bg-white text-black py-6 font-black uppercase text-xs tracking-[0.4em] hover:invert transition-all active:scale-95">
                  Execute_Uplink
                </button>
              </form>
            </div>
          </section>

          {/* SECTION 03: THE GEOSPATIAL MAP */}
          <section className="w-screen h-full flex items-center px-12 md:px-32 relative overflow-hidden">

            {/* FULL SCREEN MAP BACKGROUND */}
            <div className="absolute inset-0 z-0">
              <iframe
                title="Geospatial Node"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.2312211626!2d77.51401316527415!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full scale-110"
                style={{
                  filter: 'grayscale(1) invert(1) contrast(1.2) opacity(0.25)',
                  border: 0
                }}
              />
              {/* Visual Blending Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-90" />
              <div className="absolute inset-0 bg-[#050505]/50" />
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                  backgroundSize: '60px 60px'
                }}
              />
            </div>

            <div className="relative z-10 bg-black/60 backdrop-blur-3xl border border-white/10 p-16 max-w-2xl">
              <div className="flex items-center gap-4 mb-10">
                <Target style={{ color: COLORS.MANGO_YELLOW }} size={32} />
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]">Target_Acquired</span>
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Bengaluru <br /> <span style={{ color: COLORS.MANGO_YELLOW }}>Headquarters</span>
              </h2>
              <p className="text-xl font-light opacity-60 leading-relaxed mb-12 uppercase tracking-wide">
                Operating out of India's Silicon Valley. The heart of the venture ecosystem.
                Drop by for a high-bandwidth physical sync.
              </p>
              <div className="flex justify-between items-end border-t border-white/10 pt-8">
                <div className="font-mono text-[10px] tracking-widest" style={{ color: COLORS.MANGO_YELLOW }}>
                  12.9716° N <br /> 77.5946° E
                </div>
                <button className="px-8 py-3 border border-white/20 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
                  Navigate_To_Node
                </button>
              </div>
            </div>

            <h2 className="absolute bottom-12 right-12 text-[18vw] font-black opacity-[0.03] uppercase italic select-none pointer-events-none">
              NODE_03
            </h2>
          </section>

        </motion.div>

        {/* BOTTOM HUD */}
        <div className="absolute bottom-0 left-0 w-full h-16 border-t border-white/10 flex items-center px-12 justify-between z-20 bg-[#050505]">
          <div className="flex gap-6 items-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-12 h-[2px] bg-white/10 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: i === 0 ? COLORS.ELECTRIC_BLUE : i === 1 ? COLORS.VIBRANT_PINK : COLORS.MANGO_YELLOW,
                    scaleX: useTransform(scrollYProgress, [i * 0.33, (i + 1) * 0.33], [0, 1])
                  }}
                />
              </div>
            ))}
            <span className="font-mono text-[9px] opacity-40 uppercase tracking-widest ml-4">Architecture_Map_v2.0</span>
          </div>
          <div className="hidden md:flex gap-8 font-mono text-[9px] opacity-40 uppercase tracking-widest">
            <span>Latency: 24ms</span>
            <span>Encrypted: AES-256</span>
            <span className="text-white/20">WOI_PORTAL_STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function LinkItem({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-8 group cursor-pointer border-l-2 border-transparent hover:border-white pl-0 hover:pl-6 transition-all duration-500">
      <div style={{ color }} className="transition-transform duration-500 group-hover:scale-125">{icon}</div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mb-1">{label}</p>
        <p className="text-2xl font-black tracking-tight uppercase italic leading-none">{value}</p>
      </div>
    </div>
  );
}

function DraftInput({ label, placeholder, color, ...props }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-50" style={{ color }}>{label}</label>
      <input
        className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-black uppercase tracking-tighter text-white outline-none focus:border-white transition-colors placeholder:opacity-5"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}