import React, { useState } from 'react';
import initialPortfolioData from './data/portfolioData.json';
import { PortfolioData, ProjectItem } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { HireMeModal } from './components/HireMeModal';
import { ProfileModal } from './components/ProfileModal';
import { GitSyncModal } from './components/GitSyncModal';
import { DataEditorModal } from './components/DataEditorModal';

export default function App() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData as unknown as PortfolioData);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGitModalOpen, setIsGitModalOpen] = useState(false);
  const [isDataEditorOpen, setIsDataEditorOpen] = useState(false);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateData = (newData: PortfolioData) => {
    setData(newData);
  };

  const handleResetData = () => {
    setData(initialPortfolioData as unknown as PortfolioData);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0f18] text-[#e0e8f0] selection:bg-sky-500/30 selection:text-sky-200">
      {/* Persistent Glass Navigation */}
      <Navbar
        profile={data.profile}
        navLinks={data.navLinks}
        onOpenHireMe={() => setIsHireMeOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenGitModal={() => setIsGitModalOpen(true)}
        onOpenDataEditor={() => setIsDataEditorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero
          profile={data.profile}
          onExploreProjects={handleExploreProjects}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Featured Projects Grid */}
        <ProjectsSection
          projects={data.projects}
          academicProjects={data.academicProjects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Interactive Skills Matrix */}
        <SkillsSection categories={data.skills} />

        {/* Career Experience Timeline */}
        <ExperienceSection
          experiences={data.experiences}
          education={data.education}
          languages={data.profile.languages}
        />

        {/* Get in Touch / Contact Section */}
        <ContactSection contact={data.contact} />
      </main>

      {/* Footer */}
      <Footer
        socials={data.socials}
        onOpenGitModal={() => setIsGitModalOpen(true)}
        onOpenDataEditor={() => setIsDataEditorOpen(true)}
      />

      {/* Interactive Project Detail & Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Hire Vijay Proposal Modal */}
      <HireMeModal
        profile={data.profile}
        isOpen={isHireMeOpen}
        onClose={() => setIsHireMeOpen(false)}
      />

      {/* Developer Profile Snapshot Modal */}
      <ProfileModal
        profile={data.profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenHireMe={() => setIsHireMeOpen(true)}
      />

      {/* GitHub Setup & Push Instructions Modal */}
      <GitSyncModal
        isOpen={isGitModalOpen}
        onClose={() => setIsGitModalOpen(false)}
        repoUrl={data.profile.githubRepo}
      />

      {/* Dynamic JSON Data Inspector & Live Editor */}
      <DataEditorModal
        isOpen={isDataEditorOpen}
        onClose={() => setIsDataEditorOpen(false)}
        data={data}
        onUpdateData={handleUpdateData}
        onResetData={handleResetData}
      />
    </div>
  );
}
