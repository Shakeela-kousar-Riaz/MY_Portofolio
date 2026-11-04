import React from 'react';
import { Award, Check, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';

interface SkillsCertificationsProps {
  darkMode: boolean;
}

export const SkillsCertificationsSection: React.FC<SkillsCertificationsProps> = ({ darkMode }) => {
  return (
    <section id="skills" className="py-20 border-t border-purple-900/40 dark:border-purple-900/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
            CAPABILITIES & CREDENTIALS
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Technical Matrix & Verified Certifications
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-2xl ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
            Comprehensive technical repertoire covering modern AI engineering, deep learning model evaluation, and government-certified prompt engineering credentials.
          </p>
        </div>

        {/* Skills Matrix (4 Columns / Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                darkMode
                  ? 'bg-[#120F24]/60 border-purple-900/40 hover:border-purple-600/60'
                  : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
              }`}
            >
              <h3 className={`text-base font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {cat.name}
              </h3>
              <p className={`text-xs mt-1 mb-4 ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
                {cat.description}
              </p>

              <div className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`py-1.5 px-2.5 rounded-lg flex items-center justify-between text-xs ${
                      darkMode ? 'bg-[#0E0C1C]/70 border border-purple-900/30' : 'bg-purple-50/50 border border-purple-100'
                    }`}
                  >
                    <span className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {skill.name}
                    </span>
                    <span className="text-[11px] font-mono text-pink-400 font-semibold">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Showcase */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-pink-400" />
            <h3 className={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Verified Honors & Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, cIdx) => (
              <div
                key={cIdx}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  cIdx === 0
                    ? darkMode
                      ? 'bg-[#120F24]/90 border-pink-500/50 shadow-xl shadow-purple-950/40'
                      : 'bg-white border-pink-400/60 shadow-md shadow-pink-500/5'
                    : darkMode
                    ? 'bg-[#120F24]/50 border-purple-900/40 hover:border-purple-600/60'
                    : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-pink-400 font-medium">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-mono text-purple-300/80">{cert.year}</span>
                  </div>

                  <h4 className={`text-sm sm:text-base font-bold leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {cert.title}
                  </h4>

                  {cert.highlight && (
                    <p className={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {cert.highlight}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-pink-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Credential</span>
                  </div>
                  {cIdx === 0 && (
                    <span className="font-mono text-[11px] text-pink-300 font-semibold">
                      Global Initiative
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
