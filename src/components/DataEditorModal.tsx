import React, { useState } from 'react';
import { PortfolioData } from '../types/portfolio';
import { X, Copy, Check, Download, RefreshCw, Database, Sparkles } from 'lucide-react';

interface DataEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  onResetData: () => void;
}

export const DataEditorModal: React.FC<DataEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onResetData,
}) => {
  if (!isOpen) return null;

  const [jsonText, setJsonText] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onUpdateData(parsed);
      setError(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (err: any) {
      setError(err?.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    onResetData();
    onClose();
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
        {/* Header */}
        <div className="px-6 py-5 border-b border-sky-500/20 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dynamic JSON Data Controller</h3>
              <p className="text-xs text-slate-400">
                Primary source for all profile details, projects, skills, and timeline.
              </p>
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
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-300">
              Edit any key/value below and click <strong className="text-sky-300">Apply Live Changes</strong> to update the UI immediately:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Download .json</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
            </div>
          </div>

          {/* JSON Textarea */}
          <div className="relative">
            <textarea
              rows={16}
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setError(null);
              }}
              className="w-full p-4 rounded-2xl bg-slate-950 font-mono text-xs text-sky-200 border border-sky-500/20 focus:outline-none focus:border-sky-400 leading-relaxed resize-none selection:bg-sky-500/30"
              spellCheck={false}
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-200 font-mono">
              JSON Error: {error}
            </div>
          )}

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 font-mono flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Applied successfully! Portfolio content updated live across all sections.</span>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(125,211,252,0.3)] cursor-pointer"
            >
              Apply Live Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
