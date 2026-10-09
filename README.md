# VIJAY PRAJAPATI — Frontend Developer Portfolio

A modern, high-performance, responsive portfolio web application crafted with **React 19**, **TypeScript**, and **Tailwind CSS**, designed with the **Glacier Glassmorphism** aesthetic ("Frozen Light").

All content across the application is driven dynamically from `src/data/portfolioData.json`.

---

## 👤 Developer Profile
- **Name:** Vijay Prajapati
- **Role:** Frontend Developer
- **Specialization:** ReactJS • React Native • Flutter
- **Location:** Gandhinagar, Gujarat, India
- **Phone:** +91 9998517185
- **Email:** vjy2080@gmail.com
- **GitHub:** [https://github.com/vjy2080](https://github.com/vjy2080)
- **Repository:** [https://github.com/vjy2080/my-portfolio.git](https://github.com/vjy2080/my-portfolio.git)

---

## 💼 Professional Experience
1. **Reva Infosoft Pvt. Ltd.** — Front-End Developer *(2+ Years • Ahmedabad, India)*
   - Developed production-ready interfaces across ReactJS, Next.js, Vue.js, React Native, and Flutter.
   - Converted Figma designs into pixel-accurate frontend implementations.
   - Integrated Firebase Auth (Email, Google Sign-In, OTP), Firestore, and Hosting.
   - Deployed web apps via Vercel/Firebase and mobile apps to Google Play Store.
2. **Tops Technologies Pvt. Ltd.** — ReactJS Developer (Internship) *(6 Months • Ahmedabad, India)*
   - Developed ReactJS interfaces with Redux and RESTful API integration.
   - Reusable components and responsive layouts with Bootstrap and jQuery.
3. **PCB Manufacturer** — Production Engineer (Non-Tech) *(11 Years • Gandhinagar, India)*
   - 11 years of precision engineering workflow management before pivoting into tech.

---

## 📱 Featured Production Projects
- **Huzzle App (Android & iOS):** Production mobile client built with React Native and TypeScript, featuring custom UI components, React Navigation, and Firebase.
- **Aeon Pass — Multi-App Suite (Mobile + Web):** Dual mobile apps (Guest and Gatekeeper) built with React Native (Expo) and Web Admin Panel built with Next.js and Tailwind CSS.
- **Orange App (Android):** Flutter client with offline data synchronization for low-connectivity environments.
- **Academic & Showcase Builds:** Gyansutra, Swift-shop, Bike-Vista, Live-News App, Weather App, and Developer Portfolio.

---

## 🎓 Education & Credentials
- **Tops Technologies Pvt. Ltd.:** Front-end Developer Certificate Course *(Mar 2023 – Aug 2023)*
- **S.K. University, Visnagar:** Diploma in Mechanical Engineering *(Jun 2006 – Oct 2010)*
- **S.S.S.H, Vihar:** SSC (GSEB) *(Jun 2005 – Jun 2006)*

---

## 💻 Pushing to GitHub (Development Branch)

To push this codebase to your `development` branch:

```bash
git checkout -b development
git add .
git commit -m "fix(build): resolve Vercel esbuild peer conflict and update portfolio"
git push -u origin development
```

Or using your GitHub Personal Access Token (PAT):
```bash
git push https://<YOUR_GITHUB_TOKEN>@github.com/vjy2080/Vijay-Portfolio.git development
```

### ⚡ Note on Vercel Deployment
The Vercel `ERESOLVE esbuild` issue was caused by an explicit `esbuild@^0.25.0` conflicting with Vite 8's peer requirement. This has been resolved by removing the conflicting devDependency and adding `.npmrc` (`legacy-peer-deps=true`). Vercel builds will now run smoothly without dependency errors!
