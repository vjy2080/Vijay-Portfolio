import React from 'react';
import { ProjectItem } from '../types/portfolio';
import { ExternalLink, ArrowRight, Star } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
}) => {
  const isIndigo = project.badgeColor === 'indigo';

  return (
    <div
      onClick={() => onSelectProject(project)}
      className="group relative rounded-3xl bg-slate-900/40 backdrop-blur-xl p-8 flex flex-col justify-between border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-sky-400/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
    >
      {/* Dynamic hover gradient backdrop */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isIndigo ? 'from-indigo-500/10' : 'from-sky-500/10'
        } via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />

      {/* Card Content Top */}
      <div className="flex flex-col gap-6 relative z-10">
        {/* Project Thumbnail Image with fallback */}
        <div className="w-full h-52 rounded-2xl bg-slate-950 overflow-hidden relative border border-sky-500/10 group-hover:border-sky-500/30 transition-colors">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            onError={(e) => {
              // Graceful styled fallback container
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add(
                  'bg-gradient-to-br',
                  'from-slate-900',
                  'to-sky-950',
                  'flex',
                  'items-center',
                  'justify-center'
                );
              }
            }}
          />
          <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[1px]" />

          {/* Category Tag Pill */}
          <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold border border-sky-500/20 shadow-md">
            <span className={isIndigo ? 'text-indigo-300' : 'text-sky-300'}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold transition-colors ${
            isIndigo ? 'group-hover:text-indigo-300' : 'group-hover:text-sky-300'
          }`}
        >
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Card Content Bottom: Tech tags & Action links */}
      <div className="flex flex-col gap-6 pt-8 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-xl bg-slate-950/60 border border-sky-500/10 text-xs text-sky-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-sky-500/10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProject(project);
            }}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
              isIndigo
                ? 'text-indigo-300 hover:text-indigo-200'
                : 'text-sky-400 hover:text-sky-300'
            }`}
          >
            <span>Live Preview</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-1 group/btn"
          >
            <span>GitHub</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
