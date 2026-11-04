import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, FileText, Mail, Linkedin, MapPin, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  darkMode: boolean;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ darkMode, onOpenResume, onOpenContact }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="about" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Professional Kicker - Clean unboxed text with separators */}
            <div className={`flex items-center flex-wrap gap-2 text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
              <span>AI ENGINEER</span>
              <span aria-hidden="true">·</span>
              <span>RAG SYSTEMS</span>
              <span aria-hidden="true">·</span>
              <span>COMPUTER VISION & NLP</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-balance ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Engineering reliable AI agents, RAG pipelines, and production machine learning models.
            </h1>

            {/* Lead Copy */}
            <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Hello! I am <strong className={darkMode ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>Shakeela Riaz</strong>, an AI Engineer based in Pakistan with active engineering experience at Nexoramind Tech, EmpowerTech Consulting LLC, micro1, and CodeAlpha. I specialize in building contextual RAG assistants, production sentiment classification pipelines, and deep learning computer vision platforms.
            </p>

            {/* Quick Location & Status */}
            <div className={`flex flex-wrap items-center gap-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className={darkMode ? 'text-pink-400 font-medium' : 'text-purple-700 font-medium'}>{PERSONAL_INFO.availability}</span>
            </div>

            {/* Primary Action Buttons & Quick Copy */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-pink-500/25 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white active:scale-95"
              >
                <span>View Selected Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors border flex items-center gap-2 ${
                  darkMode
                    ? 'bg-[#151226] hover:bg-[#1C1733] border-purple-900/60 text-slate-200 hover:text-white'
                    : 'bg-white hover:bg-purple-50/50 border-purple-200 text-purple-950 shadow-sm'
                }`}
              >
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Resume & Qualifications</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className={`px-4 py-2.5 text-xs font-mono rounded-lg transition-colors border flex items-center gap-2 ${
                  darkMode
                    ? 'bg-[#100D20] hover:bg-[#181430] border-purple-900/50 text-slate-300'
                    : 'bg-purple-50/60 hover:bg-purple-100 border-purple-200 text-purple-900'
                }`}
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-pink-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-purple-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Visual Portrait Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square">
              {/* Subtle structural framing with purple/pink glow */}
              <div
                className={`absolute inset-0 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-[#120F24]/80 border-purple-800/50 shadow-2xl shadow-purple-950/50'
                    : 'bg-gradient-to-tr from-purple-100 to-pink-50 border-purple-200 shadow-xl shadow-purple-900/10'
                }`}
              ></div>

              {/* Portrait Image with Zero-Broken-Image fallback */}
              <div className="relative h-full w-full p-2.5">
                <img
                  src={PERSONAL_INFO.avatarImage}
                  alt="Shakeela Riaz - AI Engineer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl object-top filter contrast-[1.02]"
                />
              </div>

              {/* Verified Qualification Marker */}
              <div
                className={`absolute -bottom-4 -left-4 sm:left-4 p-3 rounded-xl border backdrop-blur-md shadow-xl flex items-center gap-3 ${
                  darkMode
                    ? 'bg-[#120F24]/95 border-purple-800/60 text-white'
                    : 'bg-white/95 border-purple-200 text-slate-900'
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight">Dubai 1M Prompters</div>
                  <div className={`text-[11px] leading-tight ${darkMode ? 'text-purple-300/80' : 'text-purple-600'}`}>
                    Certified AI & Prompt Engineer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Metric Strip below the split */}
        <div className="mt-16 pt-8 border-t border-purple-900/40 dark:border-purple-900/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PERSONAL_INFO.stats.map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-colors ${
                  darkMode
                    ? 'bg-[#120F24]/50 border-purple-900/40 hover:border-purple-700/60'
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
                }`}
              >
                <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight ${
                  darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400' : 'text-purple-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`mt-1 text-xs font-medium ${darkMode ? 'text-purple-200/70' : 'text-purple-700/80'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
