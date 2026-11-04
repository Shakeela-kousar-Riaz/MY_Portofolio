import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Mail, 
  ArrowRight, 
  Check, 
  Sparkles,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { FAQS, FAQItem, PERSONAL_INFO } from '../data/portfolioData';

interface FAQPageProps {
  darkMode: boolean;
  onOpenContactWithTopic: (topic: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ darkMode, onOpenContactWithTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-roles', 'faq-hallucination']);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'contracts', label: 'Roles & Contracts' },
    { id: 'technical', label: 'Technical & Architecture' },
    { id: 'workflow', label: 'Workflow & Collaboration' },
    { id: 'stack', label: 'Tech Stack & Tools' },
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(FAQS.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  // Filter FAQs based on query and category
  const filteredFAQs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      query === '' || 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-1.5 leading-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Everything You Need to Know
          </h1>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
            Answers regarding my AI engineering experience, technical architectures, remote workflow practices, and collaboration models.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions by keyword (e.g., RAG, hallucination, timezone, stack, fine-tuning)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all ${
                darkMode 
                  ? 'bg-[#120F24]/90 border-purple-900/60 text-white placeholder-slate-500 shadow-lg shadow-purple-950/20' 
                  : 'bg-white border-purple-200 text-slate-900 placeholder-slate-400 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-pink-400 hover:text-pink-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs & Expand/Collapse All Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-xl border bg-[#120F24]/80 border-purple-900/50">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-sm'
                      : darkMode
                      ? 'text-purple-300/70 hover:text-pink-300'
                      : 'text-purple-900/70 hover:text-purple-950'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <button
                onClick={expandAll}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-mono transition-colors ${
                  darkMode 
                    ? 'border-purple-900/60 text-purple-300/80 hover:text-white hover:bg-purple-950/40' 
                    : 'border-purple-200 text-purple-900 hover:bg-purple-50'
                }`}
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-mono transition-colors ${
                  darkMode 
                    ? 'border-purple-900/60 text-purple-300/80 hover:text-white hover:bg-purple-950/40' 
                    : 'border-purple-200 text-purple-900 hover:bg-purple-50'
                }`}
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.length === 0 ? (
            <div className={`p-8 rounded-2xl border text-center ${
              darkMode ? 'bg-[#120F24]/40 border-purple-900/40' : 'bg-white border-purple-100'
            }`}>
              <HelpCircle className="w-8 h-8 text-pink-400 mx-auto mb-2 opacity-80" />
              <h3 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                No questions found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className={`text-xs mt-1 ${darkMode ? 'text-purple-300/60' : 'text-slate-500'}`}>
                Try adjusting your search query or reset category filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 px-3 py-1.5 text-xs font-semibold rounded-lg bg-pink-500 text-white"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? darkMode
                        ? 'bg-[#120F24]/90 border-purple-800/80 shadow-lg shadow-purple-950/30'
                        : 'bg-white border-purple-300 shadow-md shadow-purple-900/5'
                      : darkMode
                      ? 'bg-[#120F24]/40 border-purple-900/40 hover:border-purple-700/60'
                      : 'bg-white border-purple-100 hover:border-purple-200'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className={`text-[11px] font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
                        {faq.categoryLabel}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-1.5 rounded-lg border shrink-0 mt-1 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-pink-500/10 border-pink-500/30 text-pink-400 rotate-180'
                        : darkMode
                        ? 'bg-[#181430] border-purple-900/50 text-purple-300'
                        : 'bg-purple-50 border-purple-200 text-purple-800'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 border-t border-purple-900/20">
                      <p className={`text-sm sm:text-base leading-relaxed ${
                        darkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {faq.answer}
                      </p>
                      <div className="mt-4 pt-3 border-t border-purple-900/20 flex items-center justify-between">
                        <span className={`text-[11px] ${darkMode ? 'text-purple-300/60' : 'text-slate-500'}`}>
                          Have a follow-up on this topic?
                        </span>
                        <button
                          onClick={() => onOpenContactWithTopic(`Follow-up Question: ${faq.question}`)}
                          className="text-xs font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1"
                        >
                          <span>Ask Shakeela Directly</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Banner */}
        <div className={`rounded-3xl border p-8 sm:p-10 text-center transition-all ${
          darkMode 
            ? 'bg-gradient-to-b from-[#120F24] to-[#0E0C1C] border-purple-900/60 shadow-xl' 
            : 'bg-white border-purple-200 shadow-lg'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-pink-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Have a Specific Question or Custom Inquiry?
          </h2>
          <p className={`mt-2 text-sm max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
            If you have an upcoming project, need architectural advice on RAG or computer vision models, or want to discuss a full-time role, feel free to reach out.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenContactWithTopic('Custom Technical Inquiry')}
              className="px-6 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-lg shadow-pink-500/25 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Direct Inquiry</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className={`px-5 py-2.5 text-xs font-medium rounded-lg border transition-colors ${
                darkMode
                  ? 'bg-[#181430] border-purple-900/60 text-purple-200 hover:text-white'
                  : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
              }`}
            >
              Email {PERSONAL_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
