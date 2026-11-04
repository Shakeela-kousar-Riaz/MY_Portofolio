import React, { useState } from 'react';
import { X, ExternalLink, Code, Play, Check, Copy, ArrowRight, Bot, Cpu, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  darkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Sentiment Demo State
  const [sentimentInput, setSentimentInput] = useState(
    'The model inference speed and accuracy on the validation dataset was extraordinary, with zero downtime.'
  );
  const [sentimentResult, setSentimentResult] = useState<{
    label: 'positive' | 'neutral' | 'negative';
    confidence: number;
    breakdown: { positive: number; neutral: number; negative: number };
  } | null>(null);

  // RAG Demo State
  const [ragQuery, setRagQuery] = useState('What are the key SLA requirements for document retrieval?');
  const [ragAnswer, setRagAnswer] = useState<{
    text: string;
    citations: { doc: string; chunk: string; score: string }[];
  } | null>(null);

  // Vision Demo State
  const [visionClass, setVisionClass] = useState<string>('Golden Retriever (Canis lupus familiaris)');
  const [visionConfidence, setVisionConfidence] = useState<number>(98.2);

  // Automation Demo State
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  const handleCopyCode = () => {
    if (project.architectureSnippet) {
      navigator.clipboard.writeText(project.architectureSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const runSentimentTest = () => {
    const text = sentimentInput.toLowerCase();
    let label: 'positive' | 'neutral' | 'negative' = 'neutral';
    let pos = 0.15;
    let neu = 0.70;
    let neg = 0.15;

    const positiveWords = ['extraordinary', 'great', 'excellent', 'fast', 'accuracy', 'best', 'good', 'success', 'reliable'];
    const negativeWords = ['slow', 'fail', 'error', 'broken', 'bad', 'poor', 'frustrating', 'delay', 'terrible'];

    const hasPos = positiveWords.some((w) => text.includes(w));
    const hasNeg = negativeWords.some((w) => text.includes(w));

    if (hasPos && !hasNeg) {
      label = 'positive';
      pos = 0.94;
      neu = 0.05;
      neg = 0.01;
    } else if (hasNeg && !hasPos) {
      label = 'negative';
      pos = 0.03;
      neu = 0.09;
      neg = 0.88;
    } else {
      label = 'neutral';
      pos = 0.22;
      neu = 0.68;
      neg = 0.10;
    }

    setSentimentResult({
      label,
      confidence: label === 'positive' ? pos : label === 'negative' ? neg : neu,
      breakdown: { positive: pos, neutral: neu, negative: neg },
    });
  };

  const runRagQuery = () => {
    setRagAnswer({
      text: `Based on Section 4.2 of the Enterprise Service Agreement, retrieval response times must maintain a P95 latency below 500 milliseconds for vector similarity queries, backed by continuous uptime of 99.9%.`,
      citations: [
        { doc: 'Enterprise_SLA_Guidelines_2026.pdf', chunk: 'Section 4.2, Paragraph 3', score: '0.942 Cosine' },
        { doc: 'Vector_Store_Topology.md', chunk: 'Cluster Scaling Parameters', score: '0.887 Cosine' },
      ],
    });
  };

  const runAutomationPipeline = () => {
    setPipelineRunning(true);
    setPipelineLogs([]);
    const steps = [
      'Webhook listener received POST event on /api/v1/webhook',
      'Payload schema validated via Pydantic model: OK',
      'NLP extraction step: extracted entities & sentiment score (0.89)',
      'FastAPI Celery queue dispatched to background worker',
      'Database commit: updated PostgreSQL audit table #84912',
      'Dispatched email notification hook: Status 200 OK',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${step}`]);
        if (idx === steps.length - 1) {
          setPipelineRunning(false);
        }
      }, (idx + 1) * 350);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden my-8 transition-all ${
          darkMode ? 'bg-[#0F0C1E] border-purple-900/60 text-slate-100 shadow-purple-950/40' : 'bg-white border-purple-200 text-slate-900 shadow-xl'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/40">
          <div>
            <div className={`text-xs font-mono tracking-wide ${darkMode ? 'text-pink-400' : 'text-purple-700 font-semibold'}`}>
              PROJECT CASE STUDY · {project.categoryLabel}
            </div>
            <h2 className="text-xl font-bold tracking-tight mt-0.5">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className={`p-2 rounded-lg border transition-colors ${
              darkMode ? 'bg-[#181430] border-purple-900/60 text-slate-300 hover:text-white' : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-purple-900/30">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-pink-500 text-pink-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Architecture
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'interactive'
                ? 'border-pink-500 text-pink-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>Interactive Simulator</span>
          </button>
          {project.architectureSnippet && (
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'border-pink-500 text-pink-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Production Code</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Image banner */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-purple-900/60 bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Impact Metrics Strip */}
              <div className="grid grid-cols-3 gap-4">
                {project.impactMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border text-center ${
                      darkMode ? 'bg-[#0B0916]/80 border-purple-900/40' : 'bg-purple-50/60 border-purple-200'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-pink-400">
                      {metric.value}
                    </div>
                    <div className={`text-xs mt-0.5 ${darkMode ? 'text-purple-200/70' : 'text-slate-600'}`}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold tracking-wide uppercase text-purple-400">Technical Scope</h4>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold tracking-wide uppercase text-purple-400">Engineered Capabilities</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className={`text-xs sm:text-sm p-2.5 rounded-lg border flex items-start gap-2 ${
                        darkMode ? 'bg-[#120F24]/60 border-purple-900/40 text-slate-300' : 'bg-purple-50/50 border-purple-200 text-slate-700'
                      }`}
                    >
                      <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold tracking-wide uppercase text-purple-400 mb-2">Technologies Used</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded border ${
                        darkMode ? 'bg-[#151226] border-purple-900/50 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'interactive' && (
            <div className="space-y-6">
              {project.category === 'nlp' || project.id === 'sentiment-nlp-intelligence' ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0B0916] border-purple-900/40' : 'bg-purple-50/50 border-purple-200'}`}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                      Input Sentence for Real-Time NLP Sentiment Inference
                    </label>
                    <textarea
                      value={sentimentInput}
                      onChange={(e) => setSentimentInput(e.target.value)}
                      rows={3}
                      className={`w-full p-3 rounded-lg text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono ${
                        darkMode ? 'bg-[#151226] border-purple-900/60 text-white' : 'bg-white border-purple-200 text-slate-900'
                      }`}
                      placeholder="Type text to evaluate polarity..."
                    />
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">Sample presets:</span>
                        <button
                          onClick={() => setSentimentInput('The accuracy and speed of the deep learning pipeline exceeded all benchmark SLAs.')}
                          className="text-pink-400 hover:underline"
                        >
                          Positive
                        </button>
                        <span>·</span>
                        <button
                          onClick={() => setSentimentInput('The dataset had missing values and caused pipeline errors during preprocessing.')}
                          className="text-pink-400 hover:underline"
                        >
                          Negative
                        </button>
                      </div>
                      <button
                        onClick={runSentimentTest}
                        className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-lg flex items-center gap-1.5 shadow-md shadow-pink-500/20 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Run Classifier</span>
                      </button>
                    </div>
                  </div>

                  {sentimentResult && (
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#120F24]/80 border-purple-900/50' : 'bg-white border-purple-200 shadow-sm'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono text-purple-400">Classification Result</span>
                        <span
                          className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            sentimentResult.label === 'positive'
                              ? 'bg-pink-500/10 text-pink-400 border border-pink-500/30'
                              : sentimentResult.label === 'negative'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {sentimentResult.label} · {(sentimentResult.confidence * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs font-mono">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Positive Score</span>
                            <span className="text-pink-400">{(sentimentResult.breakdown.positive * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                              style={{ width: `${sentimentResult.breakdown.positive * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Neutral Score</span>
                            <span className="text-purple-300">{(sentimentResult.breakdown.neutral * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-purple-500 transition-all duration-300"
                              style={{ width: `${sentimentResult.breakdown.neutral * 100}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Negative Score</span>
                            <span className="text-rose-400">{(sentimentResult.breakdown.negative * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-rose-500 transition-all duration-300"
                              style={{ width: `${sentimentResult.breakdown.negative * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : project.category === 'rag' || project.id === 'enterprise-rag-assistant' ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0B0916] border-purple-900/40' : 'bg-purple-50/50 border-purple-200'}`}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                      RAG Vector Semantic Search Simulation
                    </label>
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      className={`w-full p-2.5 rounded-lg text-sm border focus:outline-none focus:ring-1 focus:ring-pink-500 font-mono ${
                        darkMode ? 'bg-[#151226] border-purple-900/60 text-white' : 'bg-white border-purple-200 text-slate-900'
                      }`}
                    />
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Embedding: HuggingFace BAAI/bge-large-en · Top-K: 2</span>
                      <button
                        onClick={runRagQuery}
                        className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-lg flex items-center gap-1.5 shadow-md shadow-pink-500/20 active:scale-95"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Execute Hybrid Retrieval</span>
                      </button>
                    </div>
                  </div>

                  {ragAnswer && (
                    <div className={`p-4 rounded-xl border space-y-3 ${darkMode ? 'bg-[#120F24]/80 border-purple-900/50' : 'bg-white border-purple-200 shadow-sm'}`}>
                      <div className="text-xs font-mono uppercase text-pink-400">Synthesized Grounded Response</div>
                      <p className="text-sm leading-relaxed">{ragAnswer.text}</p>
                      <div className="pt-2 border-t border-purple-900/30">
                        <div className="text-xs font-mono text-purple-300 mb-2">Verified Document Citations:</div>
                        <div className="space-y-1.5">
                          {ragAnswer.citations.map((c, i) => (
                            <div key={i} className="text-xs font-mono p-2 rounded bg-[#0E0C1C] border border-purple-900/40 flex justify-between items-center">
                              <span className="text-slate-300">{c.doc} ({c.chunk})</span>
                              <span className="text-pink-400">{c.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : project.category === 'vision' ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0B0916] border-purple-900/40' : 'bg-purple-50/50 border-purple-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase font-mono text-purple-400">Model Inference & Activations</span>
                      <span className="text-xs font-mono text-pink-400">Latency: 24ms · ResNet Backbone</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-purple-900/50 rounded-lg overflow-hidden bg-slate-950 p-2 text-center">
                        <img
                          src={project.image}
                          alt="Test sample"
                          className="w-full h-40 object-cover rounded"
                        />
                        <div className="mt-2 text-xs font-mono text-purple-200">Test Class Prediction: {visionClass}</div>
                      </div>
                      <div className="space-y-3 flex flex-col justify-center">
                        <div className="text-xs font-mono text-slate-300">
                          Class Probability: <strong className="text-pink-400">{visionConfidence}%</strong>
                        </div>
                        <div className="text-xs font-mono text-purple-300/80">Feature Maps: Conv2d_3, Conv2d_5, Conv2d_7 Activated</div>
                        <div className="text-xs font-mono text-slate-400">Preprocessing: Normalized [0.485, 0.456, 0.406] / [0.229, 0.224, 0.225]</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-[#0B0916] border-purple-900/40' : 'bg-purple-50/50 border-purple-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase font-mono text-purple-400">Automated Pipeline Runner</span>
                      <button
                        onClick={runAutomationPipeline}
                        disabled={pipelineRunning}
                        className="px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 text-white rounded-lg flex items-center gap-1.5 shadow-md shadow-pink-500/20 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{pipelineRunning ? 'Executing...' : 'Trigger Pipeline'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-black font-mono text-xs text-pink-300 min-h-36 max-h-56 overflow-y-auto space-y-1 border border-purple-950">
                      {pipelineLogs.length === 0 ? (
                        <span className="text-slate-500">Click &apos;Trigger Pipeline&apos; to run automated workflow execution simulation...</span>
                      ) : (
                        pipelineLogs.map((log, i) => <div key={i}>{log}</div>)
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'code' && project.architectureSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300">Production Python / FastAPI Implementation</span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 text-xs font-mono rounded-lg border flex items-center gap-1.5 text-purple-200 hover:text-white border-purple-800 bg-[#151226] hover:bg-purple-900/40"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-pink-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-purple-900/60 bg-[#0B0916]">
                <pre className="p-4 text-xs font-mono text-pink-200/90 overflow-x-auto leading-relaxed">
                  <code>{project.architectureSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-purple-900/40 flex items-center justify-between">
          <span className={`text-xs ${darkMode ? 'text-purple-300/70' : 'text-slate-500'}`}>
            Developed by Shakeela Riaz
          </span>
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
              darkMode ? 'bg-[#181430] hover:bg-[#201B40] text-purple-200 border-purple-900/60' : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200'
            }`}
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
