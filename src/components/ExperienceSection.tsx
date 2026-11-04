import React from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, EDUCATION } from '../data/portfolioData';

interface ExperienceSectionProps {
  darkMode: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ darkMode }) => {
  return (
    <section id="experience" className="py-20 border-t border-purple-900/40 dark:border-purple-900/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
            CAREER & ROLES
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Professional Experience & Academic Background
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-2xl ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
            Demonstrated track record of delivering machine learning models, production RAG systems, and data pipelines across fast-paced AI engineering environments.
          </p>
        </div>

        {/* 2-Column Split: Work Experience on Left (larger), Education on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Work Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-pink-400" />
              <h3 className={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Work Experience
              </h3>
            </div>

            <div className="relative pl-6 space-y-10 border-l border-purple-900/50">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-pink-500 bg-[#0B0916] transition-transform group-hover:scale-125 shadow-sm shadow-pink-500/50"></div>

                  <div
                    className={`p-6 rounded-2xl border transition-all ${
                      darkMode
                        ? 'bg-[#120F24]/60 border-purple-900/40 hover:border-purple-600/60'
                        : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <h4 className={`text-base sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {exp.role}
                      </h4>
                      <div className={`text-xs font-mono whitespace-nowrap ${darkMode ? 'text-pink-400' : 'text-purple-700 font-medium'}`}>
                        {exp.period}
                      </div>
                    </div>

                    {/* Company and Location */}
                    <div className={`flex flex-wrap items-center gap-2 text-xs mb-4 ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
                      <span className="font-semibold text-pink-400">{exp.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.type}</span>
                    </div>

                    {/* Key Contributions */}
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                          <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Core Skills applied */}
                    <div className="pt-3 border-t border-purple-900/30 flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
                      <span className="text-purple-400/80">Core:</span>
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-purple-300/80">
                          {skill}{i < exp.skills.length - 1 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Academic Focus */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-pink-400" />
              <h3 className={`text-lg font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all ${
                    darkMode
                      ? 'bg-[#120F24]/60 border-purple-900/40 hover:border-purple-600/60'
                      : 'bg-white border-purple-100 hover:border-purple-300 shadow-sm'
                  }`}
                >
                  <div className={`text-xs font-mono mb-1 ${darkMode ? 'text-pink-400' : 'text-purple-700 font-medium'}`}>
                    {edu.period}
                  </div>
                  <h4 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {edu.degree}
                  </h4>
                  <div className={`text-xs font-medium mt-1 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
                    {edu.institution}
                  </div>
                  <div className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {edu.location}
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-900/30">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                      Academic Focus & Coursework
                    </span>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {edu.focus}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Language Proficiencies */}
            <div
              className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-[#120F24]/40 border-purple-900/40' : 'bg-purple-50/50 border-purple-200'
              }`}
            >
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-950'}`}>
                Languages & Communication
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-purple-900/30">
                  <span className="font-semibold text-pink-400">English</span>
                  <span className="text-purple-200/70">Professional Working Proficiency</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-purple-900/30">
                  <span className="font-semibold text-pink-400">Urdu</span>
                  <span className="text-purple-200/70">Native / Bilingual</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-semibold text-pink-400">Punjabi</span>
                  <span className="text-purple-200/70">Native Language</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
