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
              {/* Simulator 1: Huzzle App */}
              {(project.id === 'huzzle-app' || project.id === 'crypto-wallet') && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-400" />
                      React Native Mobile Client Simulator
                    </span>
                    <span className="text-xs text-emerald-400 font-mono">Build: Google Play &bull; v2.4.1</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                      <span className="font-semibold text-white">Screen: React Navigation Stack</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 font-mono text-[10px]">
                        Firebase Auth: Google Verified
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/20 flex flex-col gap-3">
                      <div className="text-xs font-semibold text-white">Huzzle Community &amp; Career Hub</div>
                      <p className="text-xs text-slate-300 font-light">
                        Cross-platform interface built with custom React Native UI components, pixel-perfect Figma styling, and real-time backend state.
                      </p>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setCryptoSwapped(!cryptoSwapped)}
                          className="px-3 py-1.5 rounded-lg bg-sky-500 text-slate-950 text-xs font-bold hover:brightness-110 cursor-pointer"
                        >
                          {cryptoSwapped ? 'Profile Active' : 'Switch Tab (Explore)'}
                        </button>
                        <span className="text-[11px] text-slate-400 self-center font-mono">
                          React Navigation: Stack Navigator
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200 flex items-center justify-between">
                    <span>Platforms: Android (Play Store) &amp; iOS (App Store)</span>
                    <span className="font-mono">Figma-to-Code: 100% Pixel Accurate</span>
                  </div>
                </div>
              )}

              {/* Simulator 2: Aeon Pass Multi-App Suite */}
              {(project.id === 'aeon-pass' || project.id === 'saas-dashboard') && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      Aeon Pass: Mobile &amp; Next.js Admin Suite
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
                          {m === 'traffic' ? 'Admin Analytics' : m === 'latency' ? 'Gatekeeper App' : 'Guest Pass'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aeon Pass interactive visualization */}
                  <div className="p-4 bg-slate-900 rounded-xl flex flex-col justify-between border border-slate-800 gap-3">
                    <div className="flex justify-between text-xs text-slate-400 font-mono">
                      <span className="text-indigo-300 font-semibold">
                        {saasMetric === 'traffic'
                          ? 'Next.js Web Admin Panel — Real-time Visitor Stream'
                          : saasMetric === 'latency'
                          ? 'Gatekeeper Mobile Client — QR Scan & OTP Check'
                          : 'Guest Mobile Client — Pass Request & Approval'}
                      </span>
                      <span className="text-emerald-400">Firebase Firestore: Synced</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/20 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-200 font-medium">Active Facility Entries: 342 Today</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                          OTP Verified
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full w-[78%]" />
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Admin dashboard equipped with role-based permissions, automated visitor logs, and export controls.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulator 3: Orange App (Flutter) */}
              {(project.id === 'orange-app' || project.id === 'chat-collab') && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-400" />
                      Flutter Offline Sync Engine (Android)
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Status: {cryptoSwapped ? 'Offline (Cached Mode)' : 'Online (Sync Active)'}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl flex flex-col gap-3 border border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Network Simulation:</span>
                      <button
                        type="button"
                        onClick={() => setCryptoSwapped(!cryptoSwapped)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          cryptoSwapped
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {cryptoSwapped ? '⚡ Switch to Online' : '📶 Simulate Disconnect (Go Offline)'}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/20 text-xs text-slate-300 flex flex-col gap-1.5">
                      <div className="flex justify-between font-mono text-[11px] text-slate-400">
                        <span>Local SQLite Store</span>
                        <span>REST API Sync Queue: {cryptoSwapped ? '4 pending records' : '0 pending'}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        When internet connectivity drops, transactions and field logs are immediately queued in local storage and batch-reconciled when reconnection occurs.
                      </p>
                    </div>
                  </div>
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
