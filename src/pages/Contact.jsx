import React from 'react';
import { 
  Terminal, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  ShieldCheck, 
  Activity, 
  Cpu,
  Globe
} from 'lucide-react';

const WOIIndustrialFooter = () => {
  const currentYear = new Date().getFullYear();

  // Mapping the requested hex codes
  const BRAND = {
    FOREST_GREEN: "#026F43",
    ELECTRIC_BLUE: "#2261F3",
    DARK_LAVENDER: "#6B66E1",
    CORAL_PINK: "#C67CB8",
    WHITE: "#FFFFFF",
    MANGO: "#F6982F",
    BRICK_RED: "#EC3B2E",
    VIBRANT_PINK: "#E75893"
  };

  return (
    <footer className="text-white font-mono border-t-[12px]" style={{ backgroundColor: '#000', borderColor: '#000' }}>
      
      {/* 1. KINETIC STATUS BAR */}
      <div className="flex flex-col md:row border-b border-white/10" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div 
          className="px-8 py-3 flex items-center gap-3 font-black text-xs uppercase italic tracking-widest text-white"
          style={{ backgroundColor: BRAND.VIBRANT_PINK }}
        >
          <Activity size={16} className="animate-pulse" />
          WOI_CORE: OPERATIONAL
        </div>
        <div className="flex-1 px-8 py-3 flex items-center gap-6 overflow-hidden border-l border-white/10">
          <span className="text-[10px] text-white/60 uppercase whitespace-nowrap flex items-center gap-2">
            <Cpu size={12} style={{ color: BRAND.MANGO }} /> 
            Node: BENGALURU_MAIN_UNIT
          </span>
          <span className="text-[10px] text-white/60 uppercase whitespace-nowrap flex items-center gap-2">
            <Globe size={12} style={{ color: BRAND.ELECTRIC_BLUE }} /> 
            Network: GLOBAL_DECENTRALIZED
          </span>
          <div className="hidden lg:flex gap-1 ml-auto">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="w-3 h-1" style={{ backgroundColor: i < 6 ? BRAND.ELECTRIC_BLUE : 'rgba(255,255,255,0.1)' }} />
             ))}
          </div>
        </div>
      </div>

      {/* 2. THE INFRASTRUCTURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12" style={{ backgroundColor: BRAND.FOREST_GREEN }}>
        
        {/* WOI IDENTITY COLUMN */}
        <div className="md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="p-2 skew-x-[-12deg]" 
              style={{ backgroundColor: BRAND.WHITE, boxShadow: `4px 4px 0px ${BRAND.VIBRANT_PINK}` }}
            >
               <Terminal size={28} style={{ color: BRAND.FOREST_GREEN }} />
            </div>
            <h3 className="text-4xl font-[1000] uppercase tracking-tighter leading-none text-white">
              WORLD OF <br/> <span style={{ color: BRAND.MANGO }}>IQUE.</span>
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-white/80 max-w-sm uppercase font-bold tracking-tight">
            Integrated architecture for decentralized holdings. 
            We build the systems that power the next evolution of digital sovereignty.
          </p>
          
          {/* WOI SOCIAL INTERFACE */}
          <div className="mt-10 flex gap-3">
            {[Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="p-4 border border-white/20 transition-all group hover:text-white"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BRAND.ELECTRIC_BLUE}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* PROTOCOL NAVIGATION */}
        <div className="md:col-span-4 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10" style={{ backgroundColor: BRAND.DARK_LAVENDER }}>
          <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-8" style={{ color: BRAND.MANGO }}>System_Directory</p>
          <ul className="space-y-4">
            {['Infrastructures', 'Holdings', 'Security_Vault', 'Governance', 'Operational_FAQ'].map((item) => (
              <li key={item} className="group flex items-center gap-2 cursor-pointer">
                <div className="w-2 h-2 bg-white/40 group-hover:scale-125 transition-transform" style={{ backgroundColor: BRAND.WHITE }} />
                <span className="text-sm font-black uppercase tracking-tighter transition-all text-white/70 group-hover:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* AUTHENTICATION COLUMN */}
        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-between" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="space-y-6">
            <div className="flex items-center gap-2" style={{ color: BRAND.MANGO }}>
              <ShieldCheck size={20} />
              <span className="text-[10px] font-black uppercase italic">Verified_Architecture</span>
            </div>
            <div className="p-4 border border-white/10" style={{ backgroundColor: BRAND.FOREST_GREEN }}>
              <p className="text-[9px] text-white/60 uppercase leading-tight font-bold">
                Transmission Source: <br/>
                <span className="text-white">WOI-SRV-0922</span>
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-right">
             <div className="h-[4px] w-12 ml-auto mb-4" style={{ backgroundColor: BRAND.BRICK_RED }} />
             <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">UNIT_EST_2026</p>
          </div>
        </div>
      </div>

      {/* 3. TERMINAL BASE STRIP */}
      <div 
        className="text-black px-8 py-5 flex flex-col sm:row justify-between items-center gap-4"
        style={{ backgroundColor: BRAND.WHITE }}
      >
        <div className="flex items-center gap-4 font-black">
           <span className="text-[10px] uppercase tracking-tighter" style={{ color: BRAND.FOREST_GREEN }}>
             © {currentYear} World of iQue Holdings // Architectural Layer 4.0
           </span>
        </div>
        <div className="flex gap-8">
           <button className="text-[10px] font-black uppercase transition-colors italic underline decoration-2" style={{ color: BRAND.ELECTRIC_BLUE }}>
             Legal_Protocols
           </button>
           <button className="text-[10px] font-black uppercase transition-colors italic underline decoration-2" style={{ color: BRAND.BRICK_RED }}>
             Security_Privacy
           </button>
        </div>
      </div>
    </footer>
  );
};

export default WOIIndustrialFooter;