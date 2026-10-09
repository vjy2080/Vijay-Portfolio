import React, { useState } from 'react';
import { X, Copy, Check, GitBranch, Terminal, ExternalLink, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface GitSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoUrl: string;
}

export const GitSyncModal: React.FC<GitSyncModalProps> = ({
  isOpen,
  onClose,
  repoUrl,
}) => {
  if (!isOpen) return null;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const commandSteps = [
    {
      title: '1. Push to "development" Branch (Terminal)',
      command: `git checkout -b development\ngit add .\ngit commit -m "fix: resolve Vercel esbuild peer dependency conflict with .npmrc"\ngit push -u origin development`,
      note: 'Creates and pushes all code to the new development branch on github.com/vjy2080/Vijay-Portfolio.',
    },
    {
      title: '2. Push directly using GitHub Personal Access Token (PAT)',
      command: `git push https://<YOUR_GITHUB_TOKEN>@github.com/vjy2080/Vijay-Portfolio.git development`,
      note: 'Use this if your terminal prompts for GitHub authentication (Settings > Developer settings > Personal access tokens).',
    },
    {
      title: '3. Push to "main" Branch',
      command: `git checkout main\ngit merge development\ngit push origin main`,
      note: 'Merges the verified build fixes into your production main branch.',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060913]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0f172a]/95 border border-sky-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-sky-500/20 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">GitHub Repository Synchronization</h3>
              <p className="text-xs text-sky-300 font-mono">{repoUrl}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs text-sky-200 leading-relaxed">
              <strong className="text-white">Repository Remote Configured:</strong> The application codebase is configured for your new public repository at <a href="https://github.com/vjy2080/my-portfolio" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-white">vjy2080/my-portfolio</a>. All components, styles, dynamic JSON data, and configuration are ready to commit and push.
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Git Commands for One-Click Push</span>
            </span>

            {commandSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">{step.title}</span>
                  <button
                    onClick={() => handleCopy(step.command, idx)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-sky-300 font-mono transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Command</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-xs text-sky-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {step.command}
                </pre>

                <p className="text-[11px] text-slate-400 font-light">{step.note}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <a
              href="https://github.com/vjy2080/my-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-medium"
            >
              <span>Open vjy2080/my-portfolio on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
