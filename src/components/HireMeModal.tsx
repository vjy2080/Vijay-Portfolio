import React, { useState } from 'react';
import { ProfileData } from '../types/portfolio';
import { X, Check, Mail, Calendar, Sparkles, Send } from 'lucide-react';

interface HireMeModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({
  profile,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [roleType, setRoleType] = useState('Full-Time Senior Role');
  const [timeline, setTimeline] = useState('Immediate (Next 1-2 weeks)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep confirmation visible
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060913]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl bg-[#0f172a]/95 border border-sky-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-sky-500/20 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Hire Vijay &bull; Collaboration Proposal</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex flex-col items-center text-center gap-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shadow-[0_0_20px_#7dd3fc]">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
              <p className="text-sm text-slate-300 font-light">
                Thank you! Vijay will review your project requirements and follow up directly at{' '}
                <span className="text-sky-300 font-mono">{email || 'your email'}</span> within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Opportunity Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'Full-Time Senior Role',
                    'Contract / Mobile Lead',
                    'Technical Advisory',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRoleType(type)}
                      className={`p-2.5 text-xs rounded-xl font-medium text-center transition-all cursor-pointer ${
                        roleType === type
                          ? 'bg-sky-500/20 text-sky-200 border border-sky-400/50 shadow-sm'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Engineering Manager / Recruiter"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/20 text-white text-xs focus:outline-none focus:border-sky-400 placeholder-slate-600"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/20 text-white text-xs focus:outline-none focus:border-sky-400 placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Estimated Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/20 text-white text-xs focus:outline-none focus:border-sky-400 cursor-pointer"
                >
                  <option value="Immediate (Next 1-2 weeks)">Immediate (Next 1-2 weeks)</option>
                  <option value="1 Month Notice Period">1 Month Notice Period</option>
                  <option value="Q3/Q4 Project Kickoff">Upcoming Quarter Project Kickoff</option>
                  <option value="Casual Exploratory Discussion">Casual Exploratory Discussion</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Project / Role Scope &amp; Tech Stack
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell Vijay about the product, responsibilities, team size, or tech requirements..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-sky-500/20 text-white text-xs focus:outline-none focus:border-sky-400 resize-none placeholder-slate-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(125,211,252,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
