# VIJAY.DEV — Frontend & Mobile Developer Portfolio

A modern, high-performance, responsive portfolio web application crafted with **React 19**, **TypeScript**, and **Tailwind CSS**, designed according to the **Glacier Glassmorphism** aesthetic ("Frozen Light").

All content across the application is driven dynamically from `src/data/portfolioData.json`.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/vjy2080/my-portfolio.git](https://github.com/vjy2080/my-portfolio.git)
- **Developer**: Vijay (`vjy2080`)
- **Focus**: React Native, React.js, Next.js architecture, TypeScript, Cross-Platform Engineering

---

## 🎨 Design Philosophy — Glacier Glassmorphism
- **North Star**: "Frozen Light" — Layered translucent glass surfaces with ice-blue (`#7dd3fc`) accents and deep navy-black (`#0a0f18`) background.
- **Micro-Interactions**: Ambient radial glow fields, animated status indicators, custom scrollbars, and tactile hover states.
- **Zero-Pill Static Typography**: Content-first typography hierarchy with balanced headings and accessible contrast.

---

## 📁 Key Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Glass navigation with active section indicator & quick actions
│   │   ├── Hero.tsx               # Atmospheric hero section with core tech badges & profile card
│   │   ├── ProjectsSection.tsx    # Responsive grid with category filtering (All, Mobile, Web)
│   │   ├── ProjectCard.tsx        # Glass project card with image preview, tags & action links
│   │   ├── ProjectModal.tsx       # Interactive architecture breakdown & live simulation playground
│   │   ├── SkillsSection.tsx      # Interactive Skills Matrix with animated progress & details
│   │   ├── ExperienceSection.tsx  # Career timeline with gradient connector & expandable achievements
│   │   ├── ContactSection.tsx     # Direct email/phone cards & interactive messaging form
│   │   ├── HireMeModal.tsx        # Collaboration proposal & inquiry drawer
│   │   ├── ProfileModal.tsx       # Quick developer profile snapshot & CV download
│   │   ├── GitSyncModal.tsx       # GitHub push helper & command guide
│   │   ├── DataEditorModal.tsx    # Live in-browser JSON data inspector & editor
│   │   └── Footer.tsx             # Quiet footer with copyright, links, and JSON inspector
│   ├── data/
│   │   └── portfolioData.json     # Primary single-source-of-truth for all dynamic content
│   ├── types/
│   │   └── portfolio.ts           # Strict TypeScript interfaces
│   ├── App.tsx                    # Root application component
│   ├── index.css                  # Tailwind CSS rules & glassmorphism utilities
│   └── main.tsx                   # React DOM entry point
├── metadata.json                  # AI Studio applet metadata
├── index.html                     # HTML5 entry point with Inter font & OpenGraph meta tags
└── vite.config.ts                 # Vite bundler configuration
```

---

## 🛠️ Dynamic Data Customization

All copy, project entries, skills, milestones, and links are stored in `src/data/portfolioData.json`.

You can also use the in-app **JSON Data Controller** (click `{ } JSON Data` in the top navbar or footer) to edit fields in real time with instant previews and download the updated `.json` file.

---

## 💻 Pushing to GitHub

To push this codebase to your GitHub repository:

```bash
git init
git add .
git commit -m "feat: complete Vijay developer portfolio with Glacier glassmorphism and dynamic JSON data"
git branch -M main
git remote add origin https://github.com/vjy2080/my-portfolio.git
git push -u origin main
```

If prompted for credentials, use a [GitHub Personal Access Token (PAT)](https://github.com/settings/tokens):

```bash
git push https://<YOUR_GITHUB_TOKEN>@github.com/vjy2080/my-portfolio.git main
```

---

## 📦 Scripts

- `npm run dev` — Launch the local Vite development server on port 3000
- `npm run build` — Build production bundle
- `npm run lint` — Type check codebase with TypeScript
