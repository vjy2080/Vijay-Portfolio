import React, { useState } from 'react';
import { ProfileData } from '../types/portfolio';
import { X, ExternalLink, Github, Mail, Phone, MapPin, Copy, Check, Download, FileText } from 'lucide-react';

interface ProfileModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onOpenHireMe: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onOpenHireMe,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadResume = () => {
    // Generate complete readable resume markdown/text download
    const resumeText = `# ${profile.fullName || profile.name}
**${profile.role}**
Location: ${profile.location} | Phone: ${profile.phone} | Email: ${profile.email}
GitHub: ${profile.github}

---

## PROFESSIONAL SUMMARY
${profile.bioSummary}

---

## CORE TECHNICAL SKILLS
- **Frontend:** ReactJS, Next.js, React Native, Flutter, TypeScript, JavaScript, Vue.js
- **UI / Styling:** Tailwind CSS, Bootstrap, jQuery, HTML5, CSS3, Responsive Design, Figma-to-Code
- **Data / Auth:** Firebase Auth, Firestore, REST API integration, JSON Server, Postman, Swagger
- **Tools:** Git, GitHub, Jira, VS Code, Android Studio, Xcode, Cursor, Vercel, Firebase Hosting

---

## PROFESSIONAL EXPERIENCE

### Front-End Developer | Reva Infosoft Pvt. Ltd.
*2+ Years (Present) • Ahmedabad, India*
- Developed production-ready interfaces across ReactJS, Next.js, Vue.js, React Native, and Flutter.
- Built custom, reusable UI components and responsive layouts using Tailwind CSS and native UI frameworks.
- Converted Figma designs into pixel-accurate frontend implementations.
- Integrated Firebase services including Authentication (Email/Password, Google Sign-In, OTP verification), Firestore, and Hosting.
- Worked with JSON Server for mock APIs; tested APIs using Postman and documented APIs with Swagger.
- Implemented application routing using React Navigation and Flutter Navigator.
- Deployed web applications through Vercel/Firebase Hosting and mobile applications to Google Play Store.
- Used Git/GitHub for version control and collaborated with Agile teams through Jira.

### ReactJS Developer — Internship | Tops Technologies Pvt. Ltd.
*6 Months (Mar 2023 – Aug 2023) • Ahmedabad, India*
- Developed ReactJS interfaces with Redux and RESTful API integration.
- Built reusable components and dynamic user interfaces with JavaScript, HTML, and CSS.
- Used Bootstrap for responsive, mobile-friendly layouts and jQuery for DOM manipulation and event handling.

### Production Engineer — Non-Tech | PCB Manufacturer
*11 Years • Gandhinagar, India*
- Worked in a PCB manufacturing company as a Production Engineer before pivoting into software engineering.

---

## SELECTED PROJECTS
- **Huzzle App (Android & iOS):** React Native mobile application with custom UI components, React Navigation, Firebase, and Play Store deployment.
- **Aeon Pass — Multi-App Suite (Mobile + Web):** Guest and Gatekeeper apps built with React Native (Expo) and Web Admin Panel built with Next.js and Tailwind CSS.
- **Orange App (Android):** Flutter application featuring offline data synchronization and low-bandwidth optimization.

---

## EDUCATION
- **Front-end Developer Certificate Course:** Tops Technologies Pvt. Ltd. (Mar 2023 – Aug 2023)
- **Diploma in Mechanical Engineering:** S.K. University, Visnagar (Jun 2006 – Oct 2010)
- **SSC (GSEB):** S.S.S.H, Vihar (Jun 2005 – Jun 2006)

---

## LANGUAGES
- Gujarati (Native) • Hindi (Intermediate) • English (Intermediate)
`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vijay_Prajapati_Resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060913]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-[#0f172a]/95 border border-sky-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto flex flex-col"
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-sky-950/60 to-slate-900 border-b border-sky-500/20">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-[0_0_20px_rgba(125,211,252,0.4)]">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{profile.fullName || profile.name}</h3>
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              </div>
              <p className="text-xs text-sky-300 font-mono mt-0.5">@{profile.handle} &bull; {profile.phone}</p>
              <div className="text-xs text-slate-300 mt-1">{profile.title}</div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Profile Overview
            </span>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {profile.cardDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1">
              <span className="text-slate-500 font-mono uppercase text-[10px]">Location</span>
              <span className="text-slate-200 font-medium">{profile.location}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1">
              <span className="text-slate-500 font-mono uppercase text-[10px]">Availability</span>
              <span className="text-sky-300 font-medium">{profile.status}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Direct Channels
            </span>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="font-mono">{profile.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Github className="w-4 h-4 text-sky-400" />
                <span className="font-mono">{profile.github.replace('https://', '')}</span>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                <span>Visit</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={handleDownloadResume}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-sky-500/20 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download CV / Resume</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenHireMe();
              }}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(125,211,252,0.3)] cursor-pointer"
            >
              Hire Vijay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
