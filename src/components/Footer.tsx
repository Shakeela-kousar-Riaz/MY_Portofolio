import React from 'react';
import { Mail, Linkedin, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  darkMode: boolean;
  setActivePage?: (page: 'home' | 'services' | 'faq') => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, setActivePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageNavigate = (page: 'home' | 'services' | 'faq', anchor?: string) => {
    if (setActivePage) {
      setActivePage(page);
    }
    if (page === 'home' && anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-purple-900/40 dark:border-purple-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <button
              onClick={() => handlePageNavigate('home')}
              className={`text-sm font-bold text-left hover:text-pink-400 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}
            >
              {PERSONAL_INFO.name}
            </button>
            <span className="hidden sm:inline text-purple-900/60">·</span>
            <span className={`text-xs ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
              AI Engineer & Machine Learning Specialist
            </span>
          </div>

          {/* Quick links & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <button
              onClick={() => handlePageNavigate('home', 'about')}
              className={`hover:text-pink-400 transition-colors ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}
            >
              Portfolio
            </button>
            <button
              onClick={() => handlePageNavigate('services')}
              className={`hover:text-pink-400 transition-colors ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}
            >
              Services
            </button>
            <button
              onClick={() => handlePageNavigate('faq')}
              className={`hover:text-pink-400 transition-colors ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}
            >
              FAQ
            </button>
            <button
              onClick={() => handlePageNavigate('home', 'resume')}
              className={`hover:text-pink-400 transition-colors ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}
            >
              Resume
            </button>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-pink-400 transition-colors ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className={`hover:text-pink-400 transition-colors ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}
            >
              Email
            </a>

            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg border transition-colors flex items-center justify-center ${
                darkMode
                  ? 'bg-[#151226] border-purple-900/60 text-purple-300 hover:text-white hover:bg-purple-950/50'
                  : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
              }`}
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-purple-300/60">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div>
            Built with React, TypeScript & Tailwind CSS · Designed for engineering impact
          </div>
        </div>
      </div>
    </footer>
  );
};
