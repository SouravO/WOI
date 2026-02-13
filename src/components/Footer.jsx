import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, Cpu, Command, Shield,
  Youtube, Facebook, Instagram, Linkedin, X,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Protocol', path: '/privacy' },
    { name: 'System FAQ', path: '/faq' },
    { name: 'Security Audit', path: '/audit' },
  ];

  const socialLinks = [
    { icon: Linkedin, link: 'https://www.linkedin.com' },
    { icon: Facebook, link: 'https://www.facebook.com/worldofique/' },
    { icon: Instagram, link: 'https://www.instagram.com/world_of_ique/' },
    { icon: Youtube, link: 'https://youtube.com/@world_of_ique?si=5-LnnxtHVhUgTIau' },
    { icon: X, link: 'https://x.com/WorldOfIque' }
  ];

  return (
    <footer className="bg-white text-black font-mono border-t-[12px] border-black">
      <div className="max-w-[1800px] mx-auto">

        {/* UPPER TIER: THE HERO GRID */}
        <div className="flex flex-col lg:flex-row border-b-[1px] border-black">

          {/* LOGO & MANIFESTO */}
          <div className="lg:w-1/2 p-8 md:p-16 border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-black bg-[#F2F2F2]">
            <h2 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-12">
              iQue<span className="text-[#026F43]">.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
              <p className="text-sm font-bold leading-tight max-w-[300px] uppercase">
                World of iQue: Decentralized holdings and architectural infrastructure. Established 2026.
              </p>
              <button className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 hover:invert transition-all">
                Initiate <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* SYSTEM CATEGORIES (STATIC BLOCKS) */}
          <div className="lg:w-1/2 grid grid-cols-2">
            {[
              { label: 'Network', icon: Globe, code: 'GLB-01' },
              { label: 'Compute', icon: Cpu, code: 'CPU-04' },
              { label: 'Command', icon: Command, code: 'CMD-09' },
              { label: 'Security', icon: Shield, code: 'SHL-07' }
            ].map((item, i) => (
              <div key={i} className="p-10 border-r-[1px] border-b-[1px] border-black last:border-r-0 flex flex-col justify-between aspect-square lg:aspect-auto">
                <item.icon size={32} strokeWidth={2.5} />
                <div>
                  <span className="block text-[10px] opacity-40 mb-1">{item.code}</span>
                  <span className="block text-xl font-black uppercase leading-none">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE TIER: NAVIGATION TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-b-[1px] border-black">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.path)}
              className="p-6 text-left text-xs font-bold uppercase border-r-[1px] border-black last:border-r-0 hover:bg-black hover:text-white transition-colors"
            >
              [ {link.name} ]
            </button>
          ))}
        </div>

        {/* BOTTOM TIER: DATA & SOCIALS */}
        <div className="flex flex-col md:flex-row justify-between items-center p-8 gap-12">

          <div className="flex items-center gap-12">
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  <Icon size={20} strokeWidth={3} />
                </a>
              ))}
            </div>
            <div className="hidden xl:block">
              <p className="text-[10px] font-black uppercase leading-none">Status: Operational</p>
              <p className="text-[10px] uppercase opacity-40">Identity: Verified_Root</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[4rem] md:text-[6rem] font-black leading-[0.7] opacity-5 tracking-tighter uppercase pointer-events-none select-none">
              DH_2026
            </div>
            <p className="text-[10px] font-bold uppercase mt-2">© All Rights Reserved — World of iQue</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;