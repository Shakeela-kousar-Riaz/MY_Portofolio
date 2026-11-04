import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Bot, Layers, Workflow, ExternalLink, Play } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  darkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'rag', label: 'RAG & LLMs' },
    { id: 'nlp', label: 'NLP & Text' },
    { id: 'vision', label: 'Computer Vision' },
    { id: 'automation', label: 'Automation & APIs' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 border-t border-purple-900/40 dark:border-purple-900/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
              PORTFOLIO SHOWCASE
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Engineered AI Systems & Machine Learning Deployments
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
              Practical implementations built with Python, FastAPI, Hugging Face, and deep learning backbones solving enterprise data challenges.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto shrink-0 bg-[#120F24]/80 border-purple-900/50">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-sm shadow-pink-500/20'
                    : darkMode
                    ? 'text-purple-300/70 hover:text-pink-300'
                    : 'text-purple-900/70 hover:text-purple-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                darkMode
                  ? 'bg-[#120F24]/60 border-purple-900/40 hover:border-purple-600/60 hover:shadow-xl hover:shadow-purple-950/40'
                  : 'bg-white border-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5'
              }`}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-purple-900/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  {/* Subtle hover prompt */}
                  <div className="absolute inset-0 bg-[#0B0914]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-pink-500/30 flex items-center gap-1.5">
                      <Play className="w-3 h-3" />
                      <span>Inspect Demo & Code</span>
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6">
                  {/* Zero-Pill Unboxed Metadata with · separator */}
                  <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
                    <span>{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Production Ready</span>
                  </div>

                  <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {project.title}
                  </h3>

                  <p className={`mt-2.5 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.shortDescription}
                  </p>

                  {/* Impact metrics strip */}
                  <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl border border-purple-900/40 bg-[#0E0C1C]/60">
                    {project.impactMetrics.map((metric, i) => (
                      <div key={i} className="text-left">
                        <div className="text-base font-bold font-mono tabular-nums text-pink-400">
                          {metric.value}
                        </div>
                        <div className={`text-[11px] leading-tight mt-0.5 ${darkMode ? 'text-purple-200/60' : 'text-slate-500'}`}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack line */}
                  <div className="mt-4 pt-3 border-t border-purple-900/30 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-purple-400/80">Stack:</span>
                    <span>{project.technologies.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all border flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-[#181430] hover:bg-[#201B40] border-purple-900/60 text-purple-200 hover:text-white'
                      : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-900'
                  }`}
                >
                  <span>Interactive Architecture & Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-pink-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
