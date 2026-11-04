import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Workflow, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Send, 
  Calculator,
  Sliders,
  ShieldCheck,
  Check
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/portfolioData';

interface ServicesPageProps {
  darkMode: boolean;
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ darkMode, onSelectServiceForInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Interactive Project Scope Estimator State
  const [selectedServices, setSelectedServices] = useState<string[]>(['rag-systems']);
  const [targetTimeline, setTargetTimeline] = useState<'rapid' | 'standard' | 'enterprise'>('standard');
  const [deploymentTarget, setDeploymentTarget] = useState<'cloud' | 'onprem' | 'edge'>('cloud');
  const [estimatedSuccess, setEstimatedSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'rag', label: 'RAG & Knowledge' },
    { id: 'nlp', label: 'NLP & Sentiment' },
    { id: 'vision', label: 'Computer Vision' },
    { id: 'automation', label: 'Workflow Automation' },
    { id: 'prompt', label: 'Prompt Engineering' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'rag':
        return <Bot className="w-5 h-5 text-pink-400" />;
      case 'nlp':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'vision':
        return <Cpu className="w-5 h-5 text-pink-400" />;
      case 'automation':
        return <Workflow className="w-5 h-5 text-fuchsia-400" />;
      case 'prompt':
        return <Sparkles className="w-5 h-5 text-pink-400" />;
      default:
        return <FileText className="w-5 h-5 text-purple-400" />;
    }
  };

  const toggleEstimatorService = (id: string) => {
    setSelectedServices((prev) => 
      prev.includes(id) 
        ? prev.filter((s) => s !== id) 
        : [...prev, id]
    );
  };

  const handleInquireFromEstimator = () => {
    const titles = SERVICES
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.title)
      .join(', ');
    
    const summary = `Project Scope Inquiry: ${titles || 'Custom AI Engineering'} [Timeline: ${targetTimeline}, Deployment: ${deploymentTarget}]`;
    onSelectServiceForInquiry(summary);
    setEstimatedSuccess(true);
    setTimeout(() => setEstimatedSuccess(false), 3000);
  };

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="max-w-3xl mb-14">
          <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
            ENGINEERING & CONSULTING
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-1.5 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Specialized AI Engineering & Machine Learning Services
          </h1>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
            Architecting production-ready RAG assistants, scalable NLP sentiment pipelines, computer vision classifiers, and automated Python backend microservices.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto shrink-0 mb-10 bg-[#120F24]/80 border-purple-900/50 w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat.id
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                darkMode
                  ? 'bg-[#120F24]/60 border-purple-900/40 hover:border-purple-600/60 hover:shadow-xl hover:shadow-purple-950/40'
                  : 'bg-white border-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5'
              }`}
            >
              <div>
                {/* Service Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                    {getServiceIcon(service.category)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-pink-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-pink-400/90' : 'text-purple-700'}`}>
                  {service.subtitle}
                </p>

                <p className={`mt-3.5 text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-5 border-t border-purple-900/30">
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span className={darkMode ? 'text-purple-100/90' : 'text-slate-700'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best for & Tech stack */}
                <div className="mt-5 p-3 rounded-xl bg-[#0E0C1C]/60 border border-purple-900/40 text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-pink-400">Best For: </span>
                    <span className={darkMode ? 'text-purple-200/80' : 'text-slate-600'}>{service.bestFor}</span>
                  </div>
                  <div className="pt-2 border-t border-purple-900/30 font-mono text-slate-400">
                    <span className="text-purple-400/80">Stack: </span>
                    <span>{service.techStack.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-7 pt-4">
                <button
                  onClick={() => onSelectServiceForInquiry(service.title)}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-md shadow-pink-500/20 active:scale-95"
                >
                  <span>Request Proposal for this Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Scope & Deliverables Estimator */}
        <div className={`rounded-3xl border p-8 sm:p-10 transition-all ${
          darkMode ? 'bg-[#0E0C1C] border-purple-900/50 shadow-2xl shadow-purple-950/30' : 'bg-white border-purple-200 shadow-xl'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-900/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-pink-400 mb-1">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE ESTIMATOR</span>
              </div>
              <h2 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Custom Project Scope & Timeline Estimator
              </h2>
            </div>
            <div className={`text-xs ${darkMode ? 'text-purple-300/70' : 'text-slate-500'} max-w-sm`}>
              Select your required capabilities to estimate architecture milestones and auto-generate an inquiry brief.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Configuration Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Select Services */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${darkMode ? 'text-purple-300' : 'text-slate-700'}`}>
                  1. Select Capabilities Needed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((s) => {
                    const isChecked = selectedServices.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleEstimatorService(s.id)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-purple-950/40 border-pink-500 text-white shadow-sm shadow-pink-500/20'
                            : darkMode
                            ? 'bg-[#151226]/50 border-purple-900/40 text-slate-300 hover:border-purple-700'
                            : 'bg-purple-50/40 border-purple-200 text-slate-700 hover:border-purple-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-pink-500 border-pink-400 text-white' : 'border-purple-700 bg-transparent'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="font-semibold">{s.title.split(' & ')[0]}</div>
                          <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-purple-300/60' : 'text-slate-500'}`}>
                            {s.timeline}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Timeline Preference */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-purple-300' : 'text-slate-700'}`}>
                  2. Timeline Pace
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rapid', label: 'Rapid Sprint', sub: '1 - 2 Weeks' },
                    { id: 'standard', label: 'Standard Iterative', sub: '3 - 4 Weeks' },
                    { id: 'enterprise', label: 'Deep Milestone', sub: '6 - 8 Weeks' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTargetTimeline(t.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        targetTimeline === t.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold'
                          : darkMode
                          ? 'bg-[#151226]/40 border-purple-900/40 text-slate-300 hover:text-white'
                          : 'bg-purple-50/50 border-purple-200 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-medium">{t.label}</div>
                      <div className="text-[10px] opacity-80 font-mono mt-0.5">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deployment Environment */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-purple-300' : 'text-slate-700'}`}>
                  3. Target Infrastructure
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cloud', label: 'Cloud VPC / Managed', sub: 'AWS / GCP / Cloud Run' },
                    { id: 'onprem', label: 'Private Container', sub: 'Air-gapped Docker' },
                    { id: 'edge', label: 'Edge / Low-Latency', sub: 'ONNX / Quantized' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDeploymentTarget(d.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        deploymentTarget === d.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold'
                          : darkMode
                          ? 'bg-[#151226]/40 border-purple-900/40 text-slate-300 hover:text-white'
                          : 'bg-purple-50/50 border-purple-200 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-medium">{d.label}</div>
                      <div className="text-[10px] opacity-80 font-mono mt-0.5">{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Estimated Architecture Scope Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className={`p-6 rounded-2xl border h-full flex flex-col justify-between ${
                darkMode ? 'bg-[#151226]/70 border-purple-900/60' : 'bg-purple-50/40 border-purple-200'
              }`}>
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                    <span className="text-xs font-mono uppercase text-pink-400">Estimated Architecture Scope</span>
                    <span className="text-xs font-mono text-purple-300/80">
                      {selectedServices.length} {selectedServices.length === 1 ? 'Module' : 'Modules'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div className="flex justify-between items-center py-1">
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Selected Capabilities:</span>
                      <span className="font-semibold text-pink-400 text-right">
                        {selectedServices.length === 0 ? 'None selected' : `${selectedServices.length} AI Pipelines`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Target Pace:</span>
                      <span className="font-semibold text-purple-300 capitalize">{targetTimeline} Sprint</span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Infrastructure:</span>
                      <span className="font-semibold text-purple-300 capitalize">{deploymentTarget} Deployment</span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Testing & Evaluation:</span>
                      <span className="font-semibold text-pink-400">Included (F1/Confusion)</span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>Code Ownership:</span>
                      <span className="font-semibold text-purple-300">100% Client IP</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-purple-900/30">
                    <div className="flex items-center gap-2 text-xs text-pink-400 font-medium mb-1">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Direct Engineering by Shakeela Riaz</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-purple-300/60' : 'text-slate-500'}`}>
                      Zero outsource risk. Direct communication with daily git commits, benchmark results, and production FastAPI code.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  {estimatedSuccess && (
                    <div className="mb-3 p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs text-center font-medium">
                      ✓ Scope captured! Redirecting to message composer...
                    </div>
                  )}
                  <button
                    onClick={handleInquireFromEstimator}
                    disabled={selectedServices.length === 0}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 text-white shadow-lg shadow-pink-500/25 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire for this Project Scope</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
