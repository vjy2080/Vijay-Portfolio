import React from 'react';
import { SocialLink } from '../types/portfolio';
import { GitBranch, Database } from 'lucide-react';

interface FooterProps {
  socials: SocialLink[];
  onOpenGitModal: () => void;
  onOpenDataEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  socials,
  onOpenGitModal,
  onOpenDataEditor,
}) => {
  return (
    <footer className="w-full bg-[#060913] py-16 border-t border-sky-500/10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="text-slate-400 text-sm">
            &copy; 2024 Vijay (vjy2080). All rights reserved.
          </div>
          <span className="hidden sm:inline text-slate-700">&bull;</span>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span>React &bull; TypeScript &bull; Tailwind CSS</span>
          </div>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-sky-300 transition-colors text-sm font-medium"
            >
              {social.name}
            </a>
          ))}

          <button
            type="button"
            onClick={onOpenGitModal}
            className="text-slate-500 hover:text-sky-400 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
            title="Git Setup Instructions"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Git Repo</span>
          </button>

          <button
            type="button"
            onClick={onOpenDataEditor}
            className="text-slate-500 hover:text-sky-400 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
            title="Inspect Dynamic JSON Data"
          >
            <Database className="w-3.5 h-3.5" />
            <span>JSON Data</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
