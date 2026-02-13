import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Layers, Mail, BookOpenText, 
  Menu, X, ArrowRight, Activity,
  Bot, Gamepad2 // <-- Added icons
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home, code: 'NAV-01' },
  { name: 'About', path: '/about', icon: BookOpenText, code: 'NAV-02' },
  // { name: 'Gallery', path: '/blog', icon: Layers, code: 'NAV-03' },
  // { name: 'AI Abot', path: '/chatbot', icon: Bot, code: 'NAV-05' }, // updated path
  // { name: 'SnakeGame', path: '/SnakeGame', icon: Gamepad2, code: 'NAV-06' }, // updated path
  { name: 'Contact', path: '/contact', icon: Mail, code: 'NAV-04' },
];

const FullWidthNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] bg-white text-black font-mono border-b-[12px] border-black">
      <div className="max-w-[1800px] mx-auto flex items-stretch justify-between h-20 md:h-24">
        
        {/* LOGO SECTION */}
        <Link 
          to="/" 
          className="flex items-center px-6 md:px-12 border-r-[1px] border-black hover:bg-[#F2F2F2] transition-colors group"
        >
          <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
            woi<span className="text-[#026F43]">.</span>
          </span>
        </Link>

        {/* DESKTOP NAV - TABLE STYLE */}
        <div className="hidden md:flex flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex-1 flex flex-col justify-center items-center px-6 border-r-[1px] border-black transition-all group relative overflow-hidden
                  ${isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#F2F2F2]'}`}
              >
                <span className="text-[10px] uppercase opacity-40 mb-1 group-hover:opacity-100 transition-opacity">
                  {item.code}
                </span>
                <span className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                  <item.icon size={16} /> {/* Show icon beside label */}
                  [ {item.name} ]
                </span>
                {/* Subtle Scanline Effect on Active */}
                {isActive && (
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* STATUS & CTA SECTION */}
        {/* <div className="hidden xl:flex items-center px-8 border-r-[1px] border-black gap-4">
          <Activity size={16} className="text-[#026F43]" />
          <div className="leading-none">
            <p className="text-[10px] font-black uppercase">System_Live</p>
            <p className="text-[10px] uppercase opacity-40">Node: 2026.RT</p>
          </div>
        </div> */}

        {/* PRIMARY ACTION BUTTON (MATCHES FOOTER INITIATE BUTTON) */}
        <div className="hidden md:flex items-center px-8">
          <button 
            onClick={() => navigate('/contact')}
            className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 hover:invert transition-all"
          >
            Initiate <ArrowRight size={16} />
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden px-6 flex items-center justify-center border-l-[1px] border-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU - FULL SCREEN OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b-[1px] border-black overflow-hidden md:hidden"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-8 border-b-[1px] border-black flex justify-between items-center hover:bg-black hover:text-white transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase opacity-50">{item.code}</span>
                    <span className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
                      <item.icon size={24} /> {item.name}
                    </span>
                  </div>
                </Link>
              ))}
              <div className="p-8 bg-[#F2F2F2]">
                 <button className="w-full bg-black text-white px-8 py-6 text-sm font-black uppercase tracking-[0.2em] flex justify-between items-center transition-all">
                  Initiate System <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default FullWidthNav;