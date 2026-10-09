import React, { useState } from 'react';
import { ProjectItem } from '../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, Activity, ShieldCheck, Zap, ArrowRightLeft, Send } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');

  // Interactive demo states
  const [cryptoAmount, setCryptoAmount] = useState('1.5');
  const [cryptoSwapped, setCryptoSwapped] = useState(false);

  const [saasMetric, setSaasMetric] = useState<'traffic' | 'latency' | 'throughput'>('traffic');

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: 'Hey Vijay! The WebSocket sync module is connected and running with <40ms ping.', time: '12:04' },
    { sender: 'user', text: 'Awesome, tested the offline queue with optimistic updates too.', time: '12:05' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = { sender: 'user' as const, text: inputMessage, time: timeStr };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `[WebSocket Echo] Received: "${newMsg.text}". Synced across iOS/Android nodes in 32ms.`,
          time: timeStr,
        },
      ]);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060913]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-3xl bg-[#0f172a]/95 border border-sky-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto flex flex-col max-h-[90vh]"
      >
        {/* Modal Header Bar */}
        <div className="px-6 py-5 border-b border-sky-500/20 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20">
              {project.category}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">id: {project.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
          {/* Main Title & Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-lg bg-sky-950/60 border border-sky-500/20 text-xs text-sky-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Segmented view switch */}
            <div className="flex items-center p-1 bg-slate-900/80 rounded-xl border border-sky-500/20 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Architecture &amp; Overview
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Simulator
              </button>
            </div>
          </div>

          {activeTab === 'overview' ? (
            <>
              {/* Media banner */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-sky-500/20 bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md border border-sky-500/20">
                    Production Architecture
                  </span>
                  <span className="font-mono text-sky-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md border border-sky-500/20">
                    TypeScript &bull; React
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-4 rounded-2xl bg-slate-900/40 border border-sky-500/20 flex flex-col gap-1 text-center sm:text-left"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                      {key}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-sky-300 font-mono">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* In-depth description */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Engineering Breakdown
                </h4>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Technical Highlights */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Technical Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/50 border border-sky-500/10 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Interactive Simulator Tab */
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-sky-500/20 flex flex-col gap-6">
              {project.id === 'crypto-wallet' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-400" />
                      Cross-Platform Swapper Simulation
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Status: Connected (RPC mainnet)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                      <label className="text-xs text-slate-400">Pay Token</label>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          value={cryptoAmount}
                          onChange={(e) => {
                            setCryptoAmount(e.target.value);
                            setCryptoSwapped(false);
                          }}
                          className="w-28 bg-transparent text-xl font-bold text-white focus:outline-none"
                        />
                        <span className="text-sm font-bold text-sky-400 px-3 py-1 bg-sky-500/10 rounded-lg">
                          ETH (Ethereum)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                      <label className="text-xs text-slate-400">Receive Token (Simulated)</label>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-emerald-400 font-mono">
                          {(parseFloat(cryptoAmount || '0') * 22.4).toFixed(2)}
                        </span>
                        <span className="text-sm font-bold text-indigo-400 px-3 py-1 bg-indigo-500/10 rounded-lg">
                          SOL (Solana)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200 flex items-center justify-between">
                    <span>Biometric FaceID Gate: Active</span>
                    <span className="font-mono">Gas fee: $1.12 · Slippage: 0.2%</span>
                  </div>

                  <button
                    onClick={() => setCryptoSwapped(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(125,211,252,0.3)] cursor-pointer"
                  >
                    {cryptoSwapped ? '✓ Biometric Verified & Swapped!' : 'Simulate Swap Execution'}
                  </button>
                </div>
              )}

              {project.id === 'saas-dashboard' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      Live Telemetry Stream
                    </span>
                    <div className="flex gap-1">
                      {(['traffic', 'latency', 'throughput'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setSaasMetric(m)}
                          className={`px-2.5 py-1 text-xs rounded-md font-mono ${
                            saasMetric === m
                              ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Chart visualization */}
                  <div className="h-44 w-full bg-slate-900 rounded-xl p-4 flex flex-col justify-between border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span>Telemetry stream: 120s rolling window</span>
                      <span className="text-indigo-300">P99: 42ms · Error Rate: 0.001%</span>
                    </div>
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,70 Q50,20 100,50 T200,30 T300,60 T400,20 L400,100 L0,100 Z"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M0,70 Q50,20 100,50 T200,30 T300,60 T400,20"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="3"
                      />
                    </svg>
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>-120s</span>
                      <span>-60s</span>
                      <span>Now</span>
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'chat-collab' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-400" />
                      WebSocket Live Client Emulator
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Connected (Room #eng-core)
                    </span>
                  </div>

                  {/* Message feed */}
                  <div className="h-48 overflow-y-auto bg-slate-900 rounded-xl p-3 flex flex-col gap-2.5 border border-slate-800">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[80%] rounded-xl px-3.5 py-2 text-xs ${
                          msg.sender === 'user'
                            ? 'ml-auto bg-sky-500/20 text-sky-100 border border-sky-500/30'
                            : 'mr-auto bg-slate-800 text-slate-200 border border-slate-700'
                        }`}
                      >
                        <span>{msg.text}</span>
                        <span className="text-[10px] text-slate-400 self-end mt-1 font-mono">
                          {msg.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Send input */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type a message to test WebSocket sync..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-sky-500/20 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-sky-500/20 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4 text-sky-400" />
              <span>Inspect on GitHub</span>
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Preview
              </button>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(125,211,252,0.3)]"
              >
                <span>Live Project View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
