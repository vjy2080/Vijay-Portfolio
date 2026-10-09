import React, { useState } from 'react';
import { ExperienceItem, EducationItem } from '../types/portfolio';
import { Briefcase, ChevronDown, ChevronUp, CheckCircle2, GraduationCap, Globe } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  education?: EducationItem[];
  languages?: Array<{ name: string; level: string }>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  education = [],
  languages = [],
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
            2+ years of professional front-end and cross-platform mobile development experience building real-world products, backed by a strong engineering foundation.
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
                          ? 'Hide Detailed Contributions'
                          : `View Key Contributions (${exp.achievements.length} points)`}
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

        {/* Education & Credentials Block */}
        <div id="education" className="pt-10 border-t border-sky-500/20 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Background</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Education &amp; Qualifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-3xl bg-slate-900/40 border border-sky-500/20 hover:border-sky-400/40 transition-colors flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-sky-300">{edu.period}</span>
                  <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-slate-300 font-medium">{edu.institution}</p>
                  {edu.location && (
                    <span className="text-[11px] text-slate-400">{edu.location}</span>
                  )}
                </div>
                {edu.highlight && (
                  <p className="text-xs text-slate-400 font-light border-t border-slate-800 pt-3">
                    {edu.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Languages */}
          {languages.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-sky-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-sky-400" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Spoken Languages
                  </span>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {languages.map((lang) => (
                      <span key={lang.name} className="text-xs text-slate-200">
                        <strong className="text-white">{lang.name}:</strong>{' '}
                        <span className="text-sky-300 font-mono text-[11px]">
                          {lang.level}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Location: Gandhinagar, Gujarat, India
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
