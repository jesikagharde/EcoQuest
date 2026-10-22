# EcoQuest — Environmental Learning & Real-World Action Platform

> **Final Internship Project**  
> *Learn. Create. Act.* — A lightweight, client-side web application connecting diagnostic environmental education with ₹0 DIY upcycling activities, real-world action missions, and estimated personal environmental impact tracking.

---

## 🌟 Key Highlights & Architectural Overview

- **Pure Web Stack**: Built with standard **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**.
- **Client-Side & Lightweight**: Core functionality runs in the browser using HTML, CSS and JavaScript, with no backend or external AI API required.
- **Zero API Keys Required**: All decision algorithms, recommendation engines, quiz randomizers, and progress calculations execute locally in real-time.
- **Stateful Persistence & Safe Migrations**: Synchronizes user profiles, assessment histories, topic masteries, and bookmarks through `localStorage` with automated schema migration.
- **Responsive & Accessible**: Optimized across desktop (1920px–1280px), tablet (1024px–768px), and mobile (430px–360px) with off-canvas drawers and keyboard navigation (`Ctrl+K` Global Discovery).

---

## 📁 Professional Directory Structure

```text
EcoQuest/
│
├── index.html                  # Public marketing landing page & authentication portal
├── app.html                    # Main authenticated application shell & SPA dashboard
├── README.md                   # Comprehensive internship evaluation documentation
├── test-validation.js          # Automated unit verification test suite
│
├── assets/
│   ├── css/
│   │   └── style.css           # Design tokens, Light Theme accent variables, 3D card physics
│   │
│   ├── js/
│   │   ├── app.js              # Master application controller, routing, & accent engine
│   │   ├── storage.js          # LocalStorage schema manager & migration engine
│   │   ├── auth.js             # Client-side authentication & session handling
│   │   ├── quiz.js             # EcoIQ assessment platform, randomizer, streak & history
│   │   ├── learning.js         # 25-module environmental library with knowledge checks
│   │   ├── missions.js         # 20 real-world action missions with estimated impacts
│   │   ├── create.js           # Multi-material DIY upcycling recommendation engine
│   │   ├── ecolens.js          # Disposal catalog search, photo scanner & 24 municipal streams
│   │   ├── bookmarks.js        # Multi-category unified bookmarking system
│   │   ├── profile.js          # Profile dashboard with estimated personal impact tracking
│   │   └── progress.js         # Domain mastery progression & 12 milestone badges
│   │
│   └── images/
│       ├── ecoquest-logo.png   # Official EcoQuest logo
│       ├── ecoquest-mark.png   # Standalone emblem for collapsed navigation
│       └── favicon.png         # Web browser favicon
│
└── data/
    ├── topics.js               # 25 in-depth environmental learning topics
    ├── ecoiq.js                # 60+ scenario-based quiz questions across 12 categories
    ├── missions.js             # 20 actionable real-world missions with impact notes
    ├── creative-projects.js    # 16 DIY upcycling project guides & materials definitions
    ├── ecolens.js              # 24 municipal waste segregation catalog decisions
    ├── badges.js               # 12 milestone badges
    ├── journey.js              # 8 dynamic progression roadmap stages
    └── index.js                # Unified dataset repository assembly
```

---

## 🚀 Core Features & Modules

### 1. 🧠 EcoIQ Assessment Platform
- **60+ Scenario-Based Questions** across 12 core sustainability domains:
  1. *Waste & Circular Living*
  2. *Water Conservation*
  3. *Energy & Climate*
  4. *Food & Sustainable Eating*
  5. *E-Waste & Technology*
  6. *Sustainable Fashion*
  7. *Biodiversity & Wildlife*
  8. *Plastic & Oceans*
  9. *Sustainable Transportation*
  10. *Sustainable Consumption*
  11. *Green Homes & Everyday Living*
  12. *Climate Awareness*
- **Quiz Modes**:
  - **Quick Eco Check**: 10 randomized, category-balanced questions.
  - **Full EcoIQ Benchmark**: 20 comprehensive scenario questions.
  - **12 Category Deep Dives**: 5 specialized questions per category.
- **Engagement Mechanics**: In-quiz streak tracker (e.g. `🔥 3 in a row!`), difficulty badges, and timer benchmarks.
- **Post-Assessment Actions**:
  - `[Review Answers]`: Detailed modal inspecting chosen vs correct answers and educational rationales.
  - `[Retake This Assessment]`: Retries the exact same question IDs in the exact same sequence.
  - `[Start New Assessment]`: Generates a fresh randomized set from the pool.
- **Assessment History**: Preserves historical attempts with dates, scores, performance tiers, and 1-click review/retake options.

---

### 2. 📚 Environmental Knowledge Library (25 Modules)
- 25 structured lessons covering waste segregation, water audits, vampire loads, e-waste, microplastics, ocean acidification, cool roofs, regenerative farming, and passive solar design.
- **Multi-Step Learning Flow**:
  $$\text{Not Started} \longrightarrow \text{Started} \longrightarrow \text{Learning} \longrightarrow \text{Knowledge Check} \longrightarrow \text{Completed (+30 XP)}$$
- Requires passing an interactive scenario-based Knowledge Check before awarding completion XP once.

---

### 3. 🎯 Real-World Eco Missions (20 Missions)
- 20 real-world action missions with self-tracked completion and impact estimates (e.g., *5-Minute Tap Leak Audit*, *Standby Vampire Power Hunt*, *Zero-Packaging Lunch*, *Dedicated E-Waste Box*).
- Status Workflow: `Available` $\rightarrow$ `In Progress` $\rightarrow$ `Completed` (or `Skipped`).
- Estimated impact tracking with zero duplicate XP.
- Dynamic recommendation banner prioritizing missions matching the user's weakest EcoIQ categories.

---

### 4. ✂️ Create With What You Have (16 DIY Crafts)
- Multi-material selection chips (Cardboard, Plastic Bottles, Denim, Jars, Newspapers, Cans, Bubble Wrap, Egg Cartons).
- **Recommendation Algorithm**:
  $$\text{Score} = (3 \times \text{Materials Matched}) + (2 \times \text{Multi-Material Bonus}) + (2 \times \text{Filter Matches})$$
- Step-by-step guides with safety warnings, material checklists, bookmarking, and completion XP.

---

### 5. 🔍 EcoLens Photo Scanner & Disposal Assistant
- Instant real-time multi-token search across 24 everyday waste items.
- Working image upload & drag-and-drop photo scanner with simulated laser beam scanning animation.
- 8 quick scan sample presets with clean animated previews.
- Universal municipal segregation fallback for unindexed items.

---

### 6. 🗺️ My Eco Journey Roadmap (8 Stages)
- Exactly 8 requirement-based progression stages:
  1. **Eco Foundations**: Establish segregation habits and benchmark baseline EcoIQ.
  2. **Waste & Circular Living**: Eliminate single-use packaging and complete upcycling crafts.
  3. **Water Stewardship**: Conduct home leak audits and optimize shower water usage.
  4. **Energy & Climate**: Hunt standby vampire loads and maximize daylight.
  5. **Food & Sustainable Consumption**: Prevent kitchen waste and adopt sustainable eating habits.
  6. **E-Waste & Sustainable Technology**: Isolate hazardous battery chemistry and declutter digital footprints.
  7. **Biodiversity & Sustainable Living**: Support urban pollinators and use non-toxic surface cleaners.
  8. **Community Leadership**: Drive neighborhood cleanups and embrace active transit.
- Progression requirements adapt dynamically based on actual completed topics, missions, crafts, and assessments.

---

### 7. 👤 Profile & Progress Dashboards
- Estimated personal environmental impact tracking (Litres of water saved, kg of waste diverted, kWh of electricity cut).
- 12 milestone achievement badges with live dynamic unlock rules.
- 8 domain mastery progression percentage bars.
- User identity editor (Name, Bio with 160-character counter, Avatar Initial).

---

### 8. 🎨 Personalization & Visual Customization
- **Theme**: Light Theme design system built for maximum legibility and accessibility.
- **Accent Color Palette**:
  - 🟢 **Forest Green** (Default)
  - 🔵 **Ocean Teal**
  - 🟤 **Earth Amber**
  - 🌿 **Sage Botanical**
  - 🌅 **Sunset Coral**
- Controlled via CSS custom property tokens (`--accent-primary`, `--accent-hover`, `--accent-soft`, `--accent-border`, `--accent-strong`) and persisted in `localStorage`.

---

## 🔮 Future Scope

### 1. Backend & Cloud Database
Move user accounts, progress, missions, bookmarks and assessments from browser-only localStorage to a secure backend and database for persistent multi-device access.

### 2. Progressive Web App
Convert EcoQuest into a PWA with installable mobile support, offline caching and background synchronization.

### 3. Real-Time Municipal Waste Information
Integrate verified local waste-management information, recycling centers, collection schedules and disposal facilities based on the user's location.

### 4. AI-Powered EcoLens
Future versions could optionally use AI/computer vision to identify waste from uploaded images and suggest appropriate disposal or reuse methods. AI should remain an optional enhancement and must not be required for the core platform.

### 5. Community & College Administration
Add administrator dashboards for colleges, institutions and communities to create challenges, monitor participation and organize environmental campaigns.

### 6. Verified Environmental Impact
Connect completed actions with standardized environmental impact models and, where possible, verified activity data to improve the accuracy of impact estimates.

### 7. Multilingual Support
Expand EcoQuest beyond English to support regional and international languages.

### 8. Notifications & Personalized Reminders
Add optional reminders for unfinished missions, learning activities, community challenges and sustainable habits.

### 9. Expanded Sustainability Database
Continuously expand the environmental knowledge library, EcoLens catalog, missions and upcycling projects with expert-reviewed content.

### 10. Mobile Application
Develop dedicated Android/iOS applications using the existing EcoQuest functionality as the foundation.

### 11. EcoQuest Campus Mode
Allow colleges to create department/class challenges, recycling drives, sustainability campaigns, participation leaderboards, certificates and campus-level environmental impact dashboards.

---

## 🧪 Verification & Testing

To test the application locally:
1. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Register an account or log in.
3. Complete an EcoIQ assessment, solve a Knowledge Check in Learn Topics, complete a Mission, and try the EcoLens scanner.

To run automated unit verification tests with Node.js:
```bash
node test-validation.js
```

---

## 📜 Internship Declaration
This project is developed as the **Final Internship Capstone Project**. Educational topics, quiz scenarios, upcycling activities, and environmental actions are structured to provide practical, user-friendly sustainability learning.
