import React, { useState, useEffect } from 'react';
import { ProfileData, NavLink } from '../types/portfolio';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  profile: ProfileData;
  navLinks: NavLink[];
  onOpenHireMe: () => void;
  onOpenProfile: () => void;
  onOpenGitModal?: () => void;
  onOpenDataEditor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  navLinks,
  onOpenHireMe,
  onOpenProfile,
  onOpenGitModal,
  onOpenDataEditor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section
      const sections = ['contact', 'experience', 'skills', 'projects'];
      let current = 'Home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section.charAt(0).toUpperCase() + section.slice(1);
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0f18]/85 backdrop-blur-2xl border-b border-sky-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-4'
          : 'bg-[#0a0f18]/60 backdrop-blur-xl border-b border-sky-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-xl font-extrabold tracking-wider text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
          >
            {profile.brand}
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive =
              (link.label === 'Home' && activeSection === 'Home') ||
              activeSection.toLowerCase() === link.label.toLowerCase();

            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-[0_0_15px_rgba(125,211,252,0.15)] font-semibold'
                    : 'text-slate-300 hover:text-sky-300 hover:bg-slate-900/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Hire Me CTA */}
          <button
            onClick={onOpenHireMe}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(125,211,252,0.4)] cursor-pointer"
          >
            Hire Me
          </button>

          {/* Profile Quick Avatar */}
          <button
            onClick={onOpenProfile}
            title="View Vijay's Profile Summary"
            aria-label="Vijay Profile"
            className="w-10 h-10 rounded-full bg-slate-900/80 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:text-sky-200 hover:border-sky-400 shadow-inner hover:shadow-[0_0_15px_rgba(125,211,252,0.25)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white border border-sky-500/20"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#0a0f18]/95 backdrop-blur-3xl border-b border-sky-500/20 flex flex-col gap-3 mt-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Navigation</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-slate-200 hover:text-sky-300 hover:bg-slate-900/50 text-base font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
