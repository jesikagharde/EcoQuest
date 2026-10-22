# EcoQuest — Environmental Learning & Real-World Action Platform

> **Final Internship Project**  
> *Learn. Create. Act.* — A browser-based environmental learning and sustainability platform combining EcoIQ assessments, DIY upcycling activities, self-tracked eco missions, and estimated environmental impact tracking.

---

## 🌟 Key Highlights

- **Frontend-Only Application:** Built with HTML5, CSS3, and Vanilla JavaScript (ES6+).
- **No Backend Required:** Core features run in the browser without a server-side database.
- **No External AI API Required:** Learning activities, assessments, recommendations, and calculations use application logic and bundled datasets.
- **Browser-Based Data Storage:** Uses `localStorage` to retain supported profile information, assessment history, bookmarks, learning progress, and other application data.
- **Personalized Learning:** Connects assessments, learning activities, and recorded progress to relevant recommendations.
- **Estimated Environmental Impact:** Presents estimates based on recorded activities; these are not independently measured or verified.
- **Responsive Design:** Designed for desktop, tablet, and mobile screens.
- **Customizable Appearance:** Includes a light theme with five accent color palettes.

**Data note:** Information stored in `localStorage` belongs to the current browser and origin. It is not automatically synchronized across devices, and clearing browser storage may remove saved data.

---

## 📁 Project Structure

```text
ECOQUEST/
├── .gitignore
├── index.html
├── app.html
├── LICENSE
├── README.md
├── test-validation.js
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── images/
│   │   ├── ecoquest-logo.png
│   │   ├── ecoquest-mark.png
│   │   └── favicon.png
│   │
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── bookmarks.js
│       ├── create.js
│       ├── ecolens.js
│       ├── learning.js
│       ├── missions.js
│       ├── profile.js
│       ├── progress.js
│       ├── quiz.js
│       └── storage.js
│
└── data/
    ├── badges.js
    ├── creative-projects.js
    ├── ecoiq.js
    ├── ecolens.js
    ├── index.js
    ├── journey.js
    ├── missions.js
    └── topics.js
```

---

## 🚀 Core Features

### 1. 🧠 EcoIQ Assessment Platform

Explore environmental knowledge through scenario-based questions across 12 sustainability categories.

**Assessment options include:**
- Quick Eco Check
- Full EcoIQ Benchmark
- Category-specific assessments

**Topics include:**
1. Waste & Circular Living
2. Water Conservation
3. Energy & Climate
4. Food & Sustainable Eating
5. E-Waste & Technology
6. Sustainable Fashion
7. Biodiversity & Wildlife
8. Plastic & Oceans
9. Sustainable Transportation
10. Sustainable Consumption
11. Green Homes & Everyday Living
12. Climate Awareness

**Features:**
- Answer feedback and educational explanations.
- Assessment scores and performance tiers.
- Assessment history and answer review.
- Options to retake assessments or start new ones.
- Randomized questions and engagement features.

### 2. 📚 Environmental Knowledge Library

Explore environmental lessons covering topics such as waste segregation, water conservation, energy consumption, electronic waste, microplastics, biodiversity, sustainable farming, and passive solar design.

**Features:**
- Structured learning modules.
- Interactive knowledge checks.
- Learning progress tracking.
- Experience points (XP) for eligible activities.
- Practical examples that connect environmental knowledge with everyday decisions.

### 3. 🎯 Eco Missions

Turn environmental awareness into practical everyday actions.

**Example missions:**
- 5-Minute Tap Leak Audit
- Standby Vampire Power Hunt
- Zero-Packaging Lunch
- Dedicated E-Waste Box

**Features:**
- Available, in-progress, completed, and skipped mission states.
- User-recorded mission completion.
- Estimated environmental impact.
- Recommendations based on learning interests and progress.
- Progress and reward tracking.

Mission completion is self-reported by the user; the application does not independently verify that an action occurred.

### 4. ✂️ Create With What You Have

Discover creative ways to reuse everyday materials instead of immediately discarding them.

**Example materials:**
- Cardboard
- Plastic bottles
- Denim
- Jars
- Newspapers
- Cans
- Bubble wrap
- Egg cartons

**Features:**
- Material-selection filters.
- Project recommendations based on selected materials.
- Step-by-step instructions.
- Material checklists and safety guidance.
- Bookmarks and completion progress.

This feature encourages practical, accessible upcycling using materials people may already have.

### 5. 🔍 EcoLens — Disposal Assistant

Find disposal guidance using the application's built-in waste catalog.

**Features:**
- Search across supported waste items.
- Image upload and drag-and-drop interactions.
- Simulated scanning animation and sample previews.
- Catalog-based disposal recommendations.
- General guidance for items not found in the catalog.

**Important:** EcoLens does not currently perform AI-powered image recognition. The scanning animation is a visual interaction, and disposal recommendations rely on the built-in catalog and application rules. Automatic identification of waste from uploaded images could be introduced as a future enhancement.

Waste-management rules can vary by location. Where available, follow guidance from your local municipal authority.

### 6. 🗺️ My Eco Journey

Progress through eight sustainability learning stages based on recorded learning and activities.

1. **Eco Foundations** — Build basic environmental awareness.
2. **Waste & Circular Living** — Explore waste segregation and reuse.
3. **Water Stewardship** — Learn water conservation and leak prevention.
4. **Energy & Climate** — Explore energy efficiency and climate-friendly habits.
5. **Food & Sustainable Consumption** — Reduce food waste and make thoughtful consumption choices.
6. **E-Waste & Sustainable Technology** — Learn about responsible electronic waste handling.
7. **Biodiversity & Sustainable Living** — Explore biodiversity and environmentally conscious practices.
8. **Community Leadership** — Encourage community participation and sustainable transportation.

Progression reflects the assessments, learning activities, missions, and creative projects recorded by the application.

### 7. 👤 Profile & Progress Dashboard

Review personal learning activity and recorded sustainability progress.

**Features include:**
- Profile editing.
- Learning and assessment history.
- Progress indicators.
- Achievement badges.
- Recorded mission and project completion.
- Estimated environmental impact, including supported measures such as water saved, waste diverted, and electricity reduced.

Environmental impact figures are estimates based on application calculations, not direct measurements of real-world outcomes.

### 8. 🎨 Personalization & Visual Design

EcoQuest features a light-theme interface with customizable accent colors.

**Available palettes:**
- Forest Green
- Ocean Teal
- Earth Amber
- Sage Botanical
- Sunset Coral

CSS custom properties help maintain consistent styling, while supported appearance preferences are saved in browser storage.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Responsive styling, visual design, and animations |
| Vanilla JavaScript (ES6+) | Application logic and interactive features |
| Browser `localStorage` | Local persistence of supported user data and progress |
| Bundled JavaScript datasets | Learning content, questions, missions, projects, and waste catalog information |
| Node.js | Optional: running the included validation script |

EcoQuest does not require a backend, server-side database, or external AI API for its core features.

Some externally hosted resources, if used, may require an internet connection.

---

## 💻 Getting Started

### Prerequisites

- A modern web browser, such as Google Chrome, Microsoft Edge, Firefox, or Safari.
- Node.js **only if you want to run the optional validation script**.

### Run the application

1. Download or clone this repository from GitHub.
2. If you downloaded a ZIP file, extract it.
3. Open the `ECOQUEST` project folder.
4. Open `index.html` in your browser to launch the application.

**No Python installation, backend setup, database configuration, or API keys are required.**

If your browser blocks any functionality when opening the HTML file directly, you can optionally use a local static web server. This is only an alternative way to serve the frontend; it does not mean EcoQuest requires a backend.

### First-time use

1. Open the landing page.
2. Use the application's available registration or login flow.
3. Explore EcoIQ assessments, learning topics, Eco Missions, creative projects, and EcoLens.
4. Complete activities and review your progress dashboard.

### Important data and security note

EcoQuest is a client-side project. Profile and progress data are stored in browser storage rather than a secure server-side account database. Data is not automatically synchronized across browsers or devices, and clearing browser storage may remove it.

The browser-based account flow is intended for this project and should not be treated as production-grade authentication or secure account management.

---

## 🧪 Verification & Testing

The repository includes `test-validation.js`, a project validation script.

To run it, first install Node.js if it is not already available. Then open a terminal in the main project folder and execute:

```bash
node test-validation.js
```

The script checks the project according to its implemented validation rules. Passing this script does not replace testing the complete application in a browser.

**Recommended manual checks:**
- Landing page and account flow.
- EcoIQ assessments and answer feedback.
- Learning modules and knowledge checks.
- Mission status updates.
- DIY project filtering and completion.
- EcoLens search and image-upload interactions.
- Profile editing and progress tracking.
- Accent color changes and responsive layouts.

---

## 🔮 Future Scope

Potential future improvements include:

1. **Backend & Cloud Database:** Secure account management, cloud persistence, and multi-device access.
2. **Progressive Web App:** Installable application support and offline capabilities.
3. **Local Waste-Management Information:** Verified recycling facilities, collection schedules, and municipal disposal guidance.
4. **AI-Powered EcoLens:** Optional image recognition for waste identification.
5. **Community & College Administration:** Community challenges, institutional dashboards, and environmental campaign management.
6. **Improved Environmental Impact Estimates:** Documented methodologies and more reliable reference data.
7. **Multilingual Support:** Regional and international language options.
8. **Notifications & Reminders:** Optional reminders for learning activities and sustainability habits.
9. **Expanded Sustainability Content:** More learning modules, missions, waste catalog entries, and upcycling projects.
10. **Mobile Application:** Explore dedicated Android and iOS applications.
11. **EcoQuest Campus Mode:** Campus sustainability challenges, recycling drives, participation tracking, and campus-level impact dashboards.

---

## 📜 Internship Project Declaration

EcoQuest was developed as a final internship capstone project focused on environmental education, creative reuse, and practical sustainability actions.

The platform aims to make environmental learning more interesting, interactive, and creative by connecting educational content with everyday activities. Users can explore sustainability concepts, record their progress, and discover practical ways to make more environmentally conscious choices.

**EcoQuest — Learn. Create. Act.** 🌱
