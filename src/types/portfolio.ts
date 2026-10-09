export interface CoreStackItem {
  id: string;
  name: string;
  icon: string;
  lucide: string;
  accent: 'sky' | 'indigo' | 'blue';
}

export interface ProfileData {
  name: string;
  handle: string;
  brand: string;
  role: string;
  title: string;
  status: string;
  location: string;
  email: string;
  userEmail: string;
  phone: string;
  github: string;
  githubRepo: string;
  linkedin: string;
  bioHeadline: string;
  bioSummary: string;
  cardDescription: string;
  coreStack: CoreStackItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badgeColor: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  metrics: Record<string, any>;
}

export interface SkillItem {
  name: string;
  percentage: number;
  experience: string;
  specialty: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: 'sky' | 'indigo';
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badgeColor: string;
  dotColor: string;
  description: string;
  achievements: string[];
}

export interface ContactData {
  kicker: string;
  headline: string;
  description: string;
  directEmail: string;
  phone: string;
  github: string;
  githubUrl: string;
  repoUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface PortfolioData {
  profile: ProfileData;
  projects: ProjectItem[];
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  contact: ContactData;
  navLinks: NavLink[];
  socials: SocialLink[];
}
