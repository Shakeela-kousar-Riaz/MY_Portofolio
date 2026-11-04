import React, { useState } from 'react';
import { FileText, Printer, Download, Copy, Check, ExternalLink, Mail, Phone, MapPin, Linkedin, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeSectionProps {
  darkMode: boolean;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ darkMode }) => {
  const [copiedResume, setCopiedResume] = useState(false);
  const [resumeViewMode, setResumeViewMode] = useState<'formatted' | 'document'>('document');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyTextResume = () => {
    const plainText = `
SHAKEELA RIAZ
AI Engineer & Machine Learning Specialist
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
Location: ${PERSONAL_INFO.location}

SUMMARY:
${PERSONAL_INFO.summary}

PROFESSIONAL EXPERIENCE:
${EXPERIENCES.map(
  (exp) => `
${exp.role} - ${exp.company}
${exp.period} | ${exp.location}
Responsibilities:
${exp.responsibilities.map((r) => `* ${r}`).join('\n')}
Core Skills: ${exp.skills.join(', ')}
`
).join('\n')}

EDUCATION:
${EDUCATION.map(
  (edu) => `
${edu.degree}
${edu.institution} (${edu.period}) - ${edu.location}
Focus: ${edu.focus}
`
).join('\n')}

CERTIFICATIONS:
${CERTIFICATIONS.map((c) => `* ${c.title} (${c.issuer}, ${c.year})`).join('\n')}

TOP SKILLS:
FastAPI, Hugging Face Transformers, RAG Architectures, Python, PyTorch, Deep Learning, Prompt Engineering, NLP, Sentiment Analysis, Image Classification.
    `.trim();

    navigator.clipboard.writeText(plainText);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2200);
  };

  return (
    <section id="resume" className="py-20 border-t border-purple-900/40 dark:border-purple-900/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
              CURRICULUM VITAE
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Resume & Professional Credentials
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
              Complete resume verified against real-world machine learning engineering milestones, remote international consulting, and university coursework.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors border flex items-center gap-1.5 ${
                darkMode
                  ? 'bg-[#151226] hover:bg-[#1C1733] border-purple-900/60 text-slate-200'
                  : 'bg-white hover:bg-purple-50/50 border-purple-200 text-purple-950 shadow-sm'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-pink-400" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleCopyTextResume}
              className="px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-md shadow-pink-500/20 active:scale-95"
            >
              {copiedResume ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedResume ? 'Copied Full CV' : 'Copy Plain Text'}</span>
            </button>
          </div>
        </div>

        {/* High-Fidelity Printable Resume Card */}
        <div
          id="printable-cv"
          className={`max-w-4xl mx-auto rounded-2xl border shadow-2xl overflow-hidden transition-all print:border-none print:shadow-none print:bg-white print:text-black ${
            darkMode ? 'bg-[#0E0C1C] border-purple-900/50 text-slate-100 shadow-purple-950/30' : 'bg-white border-purple-200 text-slate-900 shadow-xl'
          }`}
        >
          {/* Resume Header */}
          <div className="p-8 sm:p-10 border-b border-purple-900/40 print:border-b-2 print:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className={`text-sm sm:text-base font-medium mt-1 ${darkMode ? 'text-pink-400' : 'text-purple-700'}`}>
                  AI Engineer · Machine Learning Engineer · RAG & NLP Specialist
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
                  Nexoramind Tech · EmpowerTech Consulting LLC · micro1 · CodeAlpha
                </p>
              </div>

              {/* Contact metadata strip */}
              <div className="space-y-1.5 text-xs font-mono shrink-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {PERSONAL_INFO.linkedinDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 pt-6 border-t border-purple-900/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                Executive Profile Summary
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {PERSONAL_INFO.summary}
              </p>
            </div>
          </div>

          {/* 2-Column Resume Content Grid */}
          <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Column: Experience (8 cols) */}
            <div className="md:col-span-8 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-4 pb-1 border-b border-purple-900/40">
                  Professional Experience
                </h3>

                <div className="space-y-6">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-bold">
                          {exp.role} <span className="font-semibold text-pink-400">@ {exp.company}</span>
                        </h4>
                        <span className="text-xs font-mono text-purple-300/80 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {exp.location} · {exp.type}
                      </div>

                      <ul className="mt-2 space-y-1.5 list-disc list-inside text-xs leading-relaxed">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className={darkMode ? 'text-slate-300' : 'text-slate-700'}>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-4 pb-1 border-b border-purple-900/40">
                  Education & Academic Degrees
                </h3>

                <div className="space-y-4">
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="text-xs space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-bold">{edu.degree}</span>
                        <span className="font-mono text-purple-300/80">{edu.period}</span>
                      </div>
                      <div className="font-medium text-pink-400">{edu.institution}</div>
                      <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                        {edu.focus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column: Skills, Certifications, Languages (4 cols) */}
            <div className="md:col-span-4 space-y-8 border-l border-purple-900/30 md:pl-8">
              {/* Core Technical Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3 pb-1 border-b border-purple-900/40">
                  Technical Stack
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold block text-slate-200">AI & NLP:</span>
                    <span className="text-purple-200/70">
                      FastAPI, Hugging Face, RAG Pipelines, Prompt Engineering, Sentiment Analysis, LangChain, Embeddings
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-200">Deep Learning & CV:</span>
                    <span className="text-purple-200/70">
                      PyTorch, TensorFlow, OpenCV, CNN Image Classification, Data Preprocessing, Model Validation
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-200">Tools & Ops:</span>
                    <span className="text-purple-200/70">
                      Python, RESTful APIs, Git/GitHub, Docker, Linux, SQL/PostgreSQL, Celery
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Certifications */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3 pb-1 border-b border-purple-900/40">
                  Honors & Certifications
                </h3>
                <div className="space-y-2 text-xs">
                  {CERTIFICATIONS.map((cert, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="font-semibold text-slate-200">{cert.title}</div>
                      <div className="text-[11px] font-mono text-pink-400">
                        {cert.issuer} ({cert.year})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-3 pb-1 border-b border-purple-900/40">
                  Languages
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-300">English</span>
                    <span className="text-purple-200/70">Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-300">Urdu</span>
                    <span className="text-purple-200/70">Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-300">Punjabi</span>
                    <span className="text-purple-200/70">Native</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
