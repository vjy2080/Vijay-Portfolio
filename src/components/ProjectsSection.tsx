import React, { useState } from 'react';
import { ProjectItem } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  academicProjects?: string[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  academicProjects = [],
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'mobile') {
      return (
        project.category.toLowerCase().includes('mobile') ||
        project.category.toLowerCase().includes('ios') ||
        project.category.toLowerCase().includes('android') ||
        project.category.toLowerCase().includes('flutter')
      );
    }
    if (filter === 'web') {
      return (
        project.category.toLowerCase().includes('web') ||
        project.tags.includes('Next.js') ||
        project.category.toLowerCase().includes('suite')
      );
    }
    return true;
  });

  return (
    <section
      id="projects"
      className="w-full py-28 md:py-36 px-6 lg:px-12 relative bg-[#060913]/60 backdrop-blur-xl border-y border-sky-500/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio Showcase</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Filter buttons */}
            <div className="inline-flex p-1 rounded-xl bg-slate-900/60 border border-sky-500/20 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('mobile')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'mobile'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mobile Apps
              </button>
              <button
                type="button"
                onClick={() => setFilter('web')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'web'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Web &amp; Admin Suite
              </button>
            </div>

            <p className="text-slate-300 max-w-md text-sm md:text-base leading-relaxed font-light">
              Production mobile and web applications built with React Native, Next.js, and Flutter. Featuring offline synchronization, secure Firebase auth, and pixel-accurate UI.
            </p>
          </div>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

        {/* Academic & Specialized Projects Strip */}
        {academicProjects.length > 0 && (
          <div className="pt-8 border-t border-sky-500/10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold">
                  Academic &amp; Showcase Builds
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Additional Built Applications
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {academicProjects.length} Projects
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {academicProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-900/40 border border-sky-500/15 hover:border-sky-400/40 hover:bg-slate-900/70 transition-all flex flex-col justify-between gap-2 group"
                >
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
                    {proj}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Build #{idx + 1}</span>
                    <span className="text-sky-400/80">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
