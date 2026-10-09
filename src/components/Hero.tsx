import React, { useState } from 'react';
import { ProfileData } from '../types/portfolio';
import { ArrowRight, Code2, Copy, Check, ExternalLink, Sparkles, Terminal, Smartphone } from 'lucide-react';

interface HeroProps {
  profile: ProfileData;
  onExploreProjects: () => void;
  onOpenProfile: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onExploreProjects,
  onOpenProfile,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden px-6 lg:px-12 pt-32 pb-24 md:py-36">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="lg:col-span-8 flex flex-col items-start gap-8">
          {/* Status Kicker Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/40 backdrop-blur-xl border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
            <span className="text-xs uppercase tracking-widest text-sky-300 font-semibold">
              {profile.role}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] text-white">
            Hi, I'm {profile.fullName || "Vijay Prajapati"}. Building{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-indigo-300 drop-shadow-[0_0_30px_rgba(125,211,252,0.3)]">
              High-Performance
            </span>{' '}
            Web &amp; Mobile Apps.
          </h1>

          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            {profile.bioSummary}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-2 w-full sm:w-auto">
            <button
              onClick={onExploreProjects}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-base hover:opacity-95 active:scale-95 transition-all shadow-[0_0_35px_rgba(125,211,252,0.4)] flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </button>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/40 backdrop-blur-xl hover:bg-slate-900/60 text-slate-200 font-bold text-base transition-all border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-sky-400/40 flex items-center justify-center gap-3 group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:text-sky-300 transition-colors">
                code
              </span>
              <span>GitHub ({profile.handle})</span>
            </a>
          </div>

          {/* Floating Core Tech Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-medium mr-2">
              CORE STACK:
            </span>
            {profile.coreStack.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center gap-2 bg-slate-900/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-sky-500/20 shadow-sm hover:border-sky-400/40 transition-colors"
              >
                <span className={`material-symbols-outlined text-[16px] ${
                  tech.accent === 'indigo' ? 'text-indigo-300' : 'text-sky-400'
                }`}>
                  {tech.icon}
                </span>
                <span className="text-sm font-medium text-slate-200">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Visual Glass Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div
            onClick={onOpenProfile}
            className="cursor-pointer relative rounded-3xl bg-slate-900/40 backdrop-blur-2xl p-8 border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-sky-400/50 hover:shadow-[0_12px_40px_rgba(125,211,252,0.15)] transition-all duration-500 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold">
                  {profile.fullName || "Vijay Prajapati"} • Dev Profile
                </span>
                <span className="w-3 h-3 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_#7dd3fc]"></span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
                  {profile.role}
                </h3>
                <p className="text-xs text-sky-300/80 mt-1 font-mono">ReactJS · React Native · Flutter</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {profile.cardDescription}
              </p>

              <div className="pt-6 border-t border-sky-500/10 flex flex-col gap-2.5 text-xs text-slate-400 font-mono">
                <div className="flex items-center justify-between">
                  <span>GITHUB:</span>
                  <span className="text-sky-300 font-semibold">{profile.github.replace('https://', '')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>LOC:</span>
                  <span className="text-slate-200">{profile.location}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span>EMAIL:</span>
                  <span className="text-slate-300">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span>PHONE:</span>
                  <span className="text-sky-300">{profile.phone}</span>
                </div>
              </div>

              {/* Action row inside profile card */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyEmail();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-sky-500/20 text-xs text-slate-200 hover:text-sky-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href="#contact"
                  onClick={(e) => e.stopPropagation()}
                  className="py-2 px-3.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-xs text-sky-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Connect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
