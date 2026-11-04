import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  activePage: 'home' | 'services' | 'faq';
  setActivePage: (page: 'home' | 'services' | 'faq') => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  setDarkMode, 
  activePage, 
  setActivePage, 
  onOpenContact 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'services' | 'faq', anchor?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);

    if (page === 'home' && anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Portfolio', page: 'home' as const, anchor: 'about' },
    { label: 'Projects', page: 'home' as const, anchor: 'projects' },
    { label: 'Experience', page: 'home' as const, anchor: 'experience' },
    { label: 'Services', page: 'services' as const },
    { label: 'FAQ', page: 'faq' as const },
    { label: 'Resume', page: 'home' as const, anchor: 'resume' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? darkMode
            ? 'bg-[#0B0A16]/90 backdrop-blur-md border-b border-purple-900/40 shadow-lg shadow-purple-950/20'
            : 'bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className={`group flex items-center gap-2 text-base font-semibold tracking-tight whitespace-nowrap shrink-0 transition-colors text-left ${
            darkMode ? 'text-white hover:text-pink-300' : 'text-slate-900 hover:text-purple-600'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 inline-block transition-transform group-hover:scale-125 shadow-sm shadow-pink-500/50"></span>
          <span>{PERSONAL_INFO.name}</span>
          <span className={`text-xs font-normal transition-colors ${darkMode ? 'text-purple-300/70' : 'text-purple-600/70'}`}>
            / AI Engineer
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activePage === item.page && (item.page !== 'home' || !item.anchor || item.anchor === 'about');
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page, item.anchor)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-pink-400 font-semibold'
                    : darkMode
                    ? 'text-slate-300 hover:text-pink-300'
                    : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Theme toggle & Contact CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle visual theme"
            className={`p-2 rounded-lg transition-colors border ${
              darkMode
                ? 'bg-[#151226] border-purple-900/50 text-slate-300 hover:text-white hover:bg-purple-950/40'
                : 'bg-purple-50/70 border-purple-200 text-purple-900 hover:bg-purple-100'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-700" />}
          </button>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className={`hidden sm:flex p-2 rounded-lg transition-colors border ${
              darkMode
                ? 'bg-[#151226] border-purple-900/50 text-slate-300 hover:text-pink-300 hover:bg-purple-950/40'
                : 'bg-purple-50/70 border-purple-200 text-purple-900 hover:bg-purple-100'
            }`}
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-md shadow-pink-500/20 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              darkMode ? 'bg-[#151226] border-purple-900/50 text-slate-300' : 'bg-purple-50 border-purple-200 text-purple-900'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-4 flex flex-col gap-3 ${
            darkMode ? 'bg-[#0E0C1C] border-purple-900/40' : 'bg-white border-purple-100'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.page, item.anchor)}
              className={`text-sm py-2 px-3 rounded-md transition-colors text-left flex items-center justify-between ${
                activePage === item.page && (item.page !== 'home' || !item.anchor || item.anchor === 'about')
                  ? 'bg-purple-950/40 text-pink-400 font-semibold'
                  : darkMode
                  ? 'text-slate-200 hover:bg-purple-950/30 hover:text-pink-300'
                  : 'text-slate-800 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <span>{item.label}</span>
              {activePage === item.page && <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>}
            </button>
          ))}
          <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between">
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Toba Tek Singh, Pakistan
            </span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-pink-400 flex items-center gap-1 hover:underline"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
