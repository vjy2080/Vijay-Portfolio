import React, { useState } from 'react';
import { ProjectItem } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'mobile') {
      return (
        project.category.toLowerCase().includes('mobile') ||
        project.category.toLowerCase().includes('ios') ||
        project.category.toLowerCase().includes('android')
      );
    }
    if (filter === 'web') {
      return project.category.toLowerCase().includes('web') || project.tags.includes('Next.js');
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
                Web &amp; SaaS
              </button>
            </div>

            <p className="text-slate-300 max-w-md text-sm md:text-base leading-relaxed font-light">
              A curated selection of mobile &amp; web applications engineered with extreme performance, offline-first capabilities, and fluid interactions.
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
      </div>
    </section>
  );
};
