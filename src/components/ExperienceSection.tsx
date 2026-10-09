import React, { useState } from 'react';
import { ExperienceItem } from '../types/portfolio';
import { Briefcase, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="w-full py-28 md:py-36 px-6 lg:px-12 bg-[#060913]/60 backdrop-blur-xl border-y border-sky-500/10 relative"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold flex items-center justify-center md:justify-start gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Experience Timeline
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-light">
            Proven track record designing, building, and deploying mission-critical frontend &amp; mobile solutions at scale.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-8 sm:pl-12 space-y-12 sm:space-y-16 before:absolute before:left-0 sm:before:left-5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-sky-400 before:via-indigo-500 before:to-transparent">
          {experiences.map((exp) => {
            const isIndigo = exp.badgeColor === 'indigo';
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                onClick={() => toggleExpand(exp.id)}
                className="relative flex flex-col gap-4 rounded-3xl bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-sky-400/40 transition-all duration-300 group cursor-pointer"
              >
                {/* Timeline node dot */}
                <div
                  className={`absolute -left-[37px] sm:-left-[53px] top-8 w-5 h-5 rounded-full ring-8 ring-[#0a0f18] transition-all duration-300 ${
                    isIndigo
                      ? 'bg-indigo-400 shadow-[0_0_15px_#818cf8] group-hover:scale-110'
                      : 'bg-sky-400 shadow-[0_0_15px_#7dd3fc] group-hover:scale-110'
                  }`}
                />

                {/* Job Title & Period Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span
                    className={`text-xs px-4 py-1.5 rounded-full font-semibold w-fit border ${
                      isIndigo
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                        : 'bg-sky-500/10 border-sky-500/20 text-sky-300'
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Company & Location */}
                <div
                  className={`font-semibold text-sm ${
                    isIndigo ? 'text-indigo-200/90' : 'text-sky-200/90'
                  }`}
                >
                  {exp.company} &bull; {exp.location}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {exp.description}
                </p>

                {/* Achievements Accordion */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="pt-2 border-t border-sky-500/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(exp.id);
                      }}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? 'Hide Key Impact & Achievements'
                          : `View Key Impact (${exp.achievements.length} highlights)`}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {exp.achievements.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-950/40 p-2.5 rounded-xl border border-sky-500/10"
                          >
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
