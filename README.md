# KaushalSetu 🌱
### Bridging Learning and Livelihood Opportunities for Rural India

**KaushalSetu** is a multilingual, student-focused learning-to-livelihood platform designed to help rural learners discover suitable career paths, build practical skills, track their progress, and explore employment opportunities.

The project is being developed around the theme **“Reimagining Education & Economic Empowerment for Rural India.”**

## 🎯 Problem Statement

Many students in rural areas face challenges such as limited career guidance, lack of access to structured learning resources, and difficulty connecting their education with practical skills and livelihood opportunities.

KaushalSetu aims to bring career discovery, guided learning, progress tracking, and opportunity exploration into one accessible platform.

## 💡 Our Solution

KaushalSetu provides a guided journey from understanding a learner's interests to exploring careers, following learning paths, building skills, and discovering potential opportunities.

The platform is designed for learners from Class 9 through graduation, with the potential to support village facilitators, educational institutions, CSR initiatives, and employers.

## ✨ Features Implemented in the Current Prototype

### 1. Multilingual Interface
- English, Hindi, and Marathi language options.
- Translation support for interface content.
- Designed to make career exploration more accessible to learners from different language backgrounds.

### 2. Career Discovery and Recommendations
- Learners provide information about their interests, strengths, educational level, and goals.
- A rule-based recommendation engine scores suitable career options.
- Recommendations include scores and explanations to help learners understand why a career may suit them.

**Current implementation:** The recommendation engine uses predefined rules and scoring. It is not yet powered by a live AI model.

### 3. Guided Learning Paths
- Structured learning paths for recommended career options.
- Learning activities and tasks that guide learners through the next steps.
- Progress updates as learners complete activities.

### 4. Skills Development
- A dedicated section for exploring and developing relevant skills.
- Supports the goal of connecting career interests with practical learning.

### 5. Opportunity Exploration
- A section for exploring sample opportunities.
- Supports the transition from learning and skill development to potential employment opportunities.
- Saved opportunities and related interactions are supported in the prototype where implemented.

**Note:** The current opportunities are sample/demo data, not a verified live job listing service.

### 6. Learner Progress
- A progress section to review learning activity and progress.
- Helps demonstrate how learners could track their development over time.

### 7. Facilitator Dashboard
- A prototype dashboard representing how facilitators could support learners.
- Demonstrates a possible role for local educators or community facilitators in the platform.

### 8. Login and Registration
- A frontend login and registration flow.
- Language selection on the authentication screen.
- Demo account and session handling using browser local storage.
- Logout functionality.

**Important:** Authentication is currently frontend-only and intended for demonstration. It is not production-grade authentication and does not use a secure backend.

## 🔄 How the Prototype Works

1. **Register or log in:** The learner enters the prototype through the authentication screen.
2. **Explore the platform:** The learner accesses the home page and available sections.
3. **Enter learner preferences:** The learner provides details such as interests, strengths, education level, and career goals.
4. **View recommendations:** The rule-based engine scores career options and displays recommendations with explanations.
5. **Choose a learning path:** The learner explores a suitable path and works through its activities.
6. **Track progress:** Completed activities contribute to the progress experience.
7. **Explore opportunities:** The learner views sample opportunities and can try the available interactions.
8. **Explore facilitator support:** The facilitator dashboard demonstrates a possible way to support learners.

The exact available actions depend on the current prototype implementation.

## 🛠️ Technology Stack

- **Frontend:** React
- **Build tool and development server:** Vite
- **Languages:** JavaScript, HTML, CSS
- **Development tools:** Visual Studio Code, Node.js, npm
- **Data persistence:** Browser local storage for supported prototype features
- **Version control and collaboration:** Git and GitHub

## 📁 Project Structure

```text
KaushalSetu/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── AuthGate.jsx
│   ├── ClaudeApp.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

### Important Files

- `src/main.jsx` — Application entry point; renders the authentication flow.
- `src/AuthGate.jsx` — Login, registration, session handling, and logout flow.
- `src/ClaudeApp.jsx` — Main KaushalSetu application, including career discovery and other prototype sections.
- `src/App.jsx` — Additional application component file.
- `src/App.css` — Application styling.
- `src/index.css` — Global styling.
- `package.json` — Dependencies and development scripts.

## 🚀 Getting Started

### Prerequisites

Install:
- Node.js and npm
- Git
- Visual Studio Code (recommended)

### Installation

Clone the repository:

```bash
git clone https://github.com/purvakavathekar/KaushalSetu.git
```

Navigate to the project folder:

```bash
cd KaushalSetu
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 👥 Contributing to the Project

We welcome contributions from team members to improve the prototype.

### Recommended Workflow

1. Clone the repository and install dependencies.
2. Create a separate branch for your feature or fix.
3. Make and test your changes locally.
4. Commit and push your branch.
5. Open a Pull Request for review before merging into `main`.

Example:

```bash
git switch -c feature/your-feature
```

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push -u origin feature/your-feature
```

Then create a Pull Request on GitHub.

### Collaboration Guidelines

- Avoid committing directly to `main` when working on shared features.
- Coordinate before editing the same files.
- Test the application after making changes.
- Do not commit passwords, API keys, secrets, or `.env` files.
- Clearly document any new features and known limitations.

## 🔮 Future Scope

Potential improvements include:

- Integration with an AI-powered career guidance service.
- A backend API and database for persistent learner accounts and progress.
- Secure authentication, authorization, and account recovery.
- Verified and regularly updated job, internship, and training opportunities.
- Facilitator-managed learner support and progress monitoring.
- More complete multilingual coverage.
- Voice-based guidance for learners with limited digital literacy.
- Low-bandwidth and offline-friendly experiences.
- Privacy protections, age-appropriate safeguards, and responsible recommendation practices.
- Analytics to measure learning completion, project creation, applications, interviews, and employment outcomes.

These are future development goals and are not all implemented in the current prototype.

## 🌍 Expected Impact

KaushalSetu aims to help learners:

- Discover career options aligned with their interests.
- Access structured learning paths.
- Develop practical skills.
- Track their learning progress.
- Explore opportunities beyond their immediate surroundings.

The long-term vision is to help bridge the gap between education, employable skills, and livelihood opportunities for rural India.

## 📌 Current Project Status

**Status:** Working frontend prototype under development.

The current version demonstrates the core user journey using a rule-based recommendation engine and sample data. A production-ready backend, real AI integration, verified live opportunities, and secure authentication remain areas for future development.

## 🤝 Team

Developed as a collaborative project focused on education, accessibility, and economic empowerment for rural India.

**Repository:** https://github.com/purvakavathekar/KaushalSetu

---

*KaushalSetu — Connecting learning with opportunity.*