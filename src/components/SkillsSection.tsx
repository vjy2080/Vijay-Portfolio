import React, { useState } from 'react';
import { SkillCategory, SkillItem } from '../types/portfolio';
import { Sparkles, Terminal, Layers, Cpu, CheckCircle } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [selectedSkill, setSelectedSkill] = useState<{
    catTitle: string;
    skill: SkillItem;
  } | null>(null);

  return (
    <section id="skills" className="w-full py-28 md:py-36 px-6 lg:px-12 bg-[#0a0f18] relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Interactive Skills Matrix
          </h2>
          <p className="text-slate-400 text-sm max-w-xl font-light">
            Engineered through enterprise production experience. Click or hover any skill bar to view detailed specialization and production experience.
          </p>
        </div>

        {/* 3 Categories Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const isIndigo = category.accent === 'indigo';

            return (
              <div
                key={category.id}
                className="rounded-3xl bg-slate-900/40 backdrop-blur-xl p-8 sm:p-10 flex flex-col gap-8 border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-sky-400/40 transition-all duration-500"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-sky-500/20 ${
                      isIndigo
                        ? 'bg-indigo-500/10 text-indigo-300'
                        : 'bg-sky-500/10 text-sky-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {category.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    <p className="text-xs text-slate-400">{category.subtitle}</p>
                  </div>
                </div>

                {/* Skills Bars */}
                <div className="flex flex-col gap-6">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill?.skill.name === skill.name;

                    return (
                      <div
                        key={skill.name}
                        onClick={() =>
                          setSelectedSkill(
                            isSelected ? null : { catTitle: category.title, skill }
                          )
                        }
                        className={`flex flex-col gap-2 p-2.5 -mx-2.5 rounded-xl transition-all cursor-pointer ${
                          isSelected ? 'bg-slate-800/60 ring-1 ring-sky-400/40' : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className="text-slate-200 flex items-center gap-2">
                            <span>{skill.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              ({skill.experience})
                            </span>
                          </span>
                          <span
                            className={`font-mono font-bold ${
                              isIndigo ? 'text-indigo-300' : 'text-sky-400'
                            }`}
                          >
                            {skill.percentage}%
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-sky-500/10">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              isIndigo
                                ? 'bg-gradient-to-r from-indigo-400 to-sky-400 shadow-[0_0_10px_#818cf8]'
                                : category.id === 'state-architecture'
                                ? 'bg-gradient-to-r from-sky-300 to-indigo-400 shadow-[0_0_10px_#7dd3fc]'
                                : 'bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_10px_#7dd3fc]'
                            }`}
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>

                        {/* Specialization micro info */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                          <span className="truncate">{skill.specialty}</span>
                          <span className="text-sky-400/70 text-[10px] shrink-0 font-mono">
                            {isSelected ? 'Active' : 'Click to inspect'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Highlight Toast / Drawer */}
        {selectedSkill && (
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{selectedSkill.skill.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/20 font-mono">
                    {selectedSkill.skill.percentage}% Proficiency
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Category: <span className="text-sky-300">{selectedSkill.catTitle}</span> &bull; Production Track Record: <span className="text-slate-100">{selectedSkill.skill.experience}</span> &bull; Core Stack Focus: <span className="text-slate-100">{selectedSkill.skill.specialty}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer self-start sm:self-auto"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
