import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send, Check, Copy, ArrowUpRight, MessageSquare, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  darkMode: boolean;
  initialTopic?: string;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  darkMode, 
  initialTopic, 
  initialMessage 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: initialTopic || 'Full-time AI Engineer Role',
    message: initialMessage || '',
  });

  React.useEffect(() => {
    if (initialTopic) {
      setFormData((prev) => ({ 
        ...prev, 
        topic: initialTopic,
        message: initialMessage || prev.message || `I am reaching out regarding ${initialTopic}.`
      }));
    }
  }, [initialTopic, initialMessage]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    'Full-time AI Engineer Role',
    'Remote ML Contract / Consulting',
    'RAG & NLP Pipeline Development',
    'Computer Vision Project',
    'General Technical Collaboration',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Compose mailto link with encoded URI
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.topic} - from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Shakeela,\n\nMy name is ${formData.name} (${formData.email}).\n\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
    );

    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-20 border-t border-purple-900/40 dark:border-purple-900/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
            COMMUNICATION
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Let&apos;s Connect & Discuss AI Engineering
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-2xl ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
            Whether you are hiring for an AI Engineer role, looking to integrate RAG pipelines into your systems, or seeking technical consulting, my inbox is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#120F24]/60 border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border transition-colors flex items-center gap-1.5 ${
                    darkMode
                      ? 'bg-[#181430] border-purple-900/60 text-purple-200 hover:text-white'
                      : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
                  }`}
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-pink-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="mt-4">
                <div className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
                  Direct Email
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold hover:text-pink-400 transition-colors block mt-0.5"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            {/* LinkedIn Profile Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#120F24]/60 border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg border transition-colors ${
                    darkMode
                      ? 'bg-[#181430] border-purple-900/60 text-purple-200 hover:text-white'
                      : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-4">
                <div className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
                  Professional Network
                </div>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg font-bold hover:text-pink-400 transition-colors block mt-0.5 truncate"
                >
                  Shakeela Riaz on LinkedIn
                </a>
              </div>
            </div>

            {/* Location & Availability Card */}
            <div
              className={`p-6 rounded-2xl border ${
                darkMode ? 'bg-[#120F24]/60 border-purple-900/40' : 'bg-white border-purple-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs uppercase font-mono tracking-wider ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
                    Location & Timezone
                  </div>
                  <div className="text-sm font-bold mt-0.5">{PERSONAL_INFO.location}</div>
                  <div className={`text-xs ${darkMode ? 'text-purple-300/60' : 'text-slate-600'}`}>
                    PKT (UTC+5) · Flexible for US, UK & Global overlap
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-900/30 flex items-center gap-2 text-xs text-pink-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Typical response time: Within 12-24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#120F24]/70 border-purple-900/50' : 'bg-white border-purple-100 shadow-sm'
              }`}
            >
              <h3 className={`text-lg font-bold tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Send a Direct Message
              </h3>
              <p className={`text-xs sm:text-sm mb-6 ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
                Fill out the brief details below to launch your email client or copy the formatted brief directly.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>
                    Your inquiry has been prepared! If your email client did not open automatically, reach out directly at {PERSONAL_INFO.email}.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-purple-200' : 'text-slate-700'}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                        darkMode ? 'bg-[#0E0C1C] border-purple-900/60 text-white' : 'bg-purple-50/40 border-purple-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-purple-200' : 'text-slate-700'}`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                        darkMode ? 'bg-[#0E0C1C] border-purple-900/60 text-white' : 'bg-purple-50/40 border-purple-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-purple-200' : 'text-slate-700'}`}>
                    Primary Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                      darkMode ? 'bg-[#0E0C1C] border-purple-900/60 text-white' : 'bg-purple-50/40 border-purple-200 text-slate-900'
                    }`}
                  >
                    {topics.map((t, idx) => (
                      <option key={idx} value={t} className={darkMode ? 'bg-[#151226] text-white' : 'bg-white text-slate-900'}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-purple-200' : 'text-slate-700'}`}>
                    Message & Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, team requirements, or role specification..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 ${
                      darkMode ? 'bg-[#0E0C1C] border-purple-900/60 text-white' : 'bg-purple-50/40 border-purple-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className={`text-[11px] ${darkMode ? 'text-purple-300/60' : 'text-slate-500'}`}>
                    Sends directly to {PERSONAL_INFO.email}
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-lg shadow-pink-500/25 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
