import { useState } from "react";
import "./App.css";

/* ---------- Inline SVG Icon Components (no external dependency) ---------- */

const IconCompass = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const IconBook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconBriefcase = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconUsers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconMic = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8"  y1="23" x2="16" y2="23" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ---------- Logo Mark ---------- */

const LogoMark = () => (
  <svg
    className="logo-mark"
    viewBox="0 0 48 48"
    role="img"
    aria-label="KaushalSetu logo"
  >
    <defs>
      <linearGradient id="ksGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ksGrad)" />
    {/* Bridge arch + pillar (Setu = bridge) */}
    <path
      d="M10 32h28M14 32V22c0-5.5 4.5-10 10-10s10 4.5 10 10v10"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="24" cy="20" r="3" fill="#ffffff" />
  </svg>
);

/* ---------- Static content ---------- */

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

const FEATURES = [
  {
    key: "careers",
    title: "Discover Careers",
    description:
      "Explore career paths that match your interests, strengths, and local opportunities.",
    icon: IconCompass,
  },
  {
    key: "skills",
    title: "Learn Skills",
    description:
      "Build practical, job-ready skills through simple lessons in your language.",
    icon: IconBook,
  },
  {
    key: "opportunities",
    title: "Find Opportunities",
    description:
      "Connect to internships, jobs, and training programs near you.",
    icon: IconBriefcase,
  },
  {
    key: "mentors",
    title: "Connect with Mentors",
    description:
      "Get guidance from mentors and role models who understand your journey.",
    icon: IconUsers,
  },
];

/* ---------- Component ---------- */

function App() {
  const [language, setLanguage] = useState("en");

  const handleDiscover = () => {
    // Placeholder — later this will trigger the strengths-assessment flow
    console.log("Discover My Strengths clicked (language:", language, ")");
  };

  const handleVoice = () => {
    // Placeholder — later this will start multilingual voice input
    console.log("Voice input button clicked");
  };

  return (
    <div className="app">
      {/* ================= Header ================= */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <LogoMark />
            <div className="brand-text">
              <span className="brand-name">KaushalSetu</span>
              <span className="brand-tag">कौशल सेतु</span>
            </div>
          </div>

          {/* Language selector */}
          <div
            className="language-switch"
            role="group"
            aria-label="Select language"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={
                  "lang-btn" + (language === lang.code ? " is-active" : "")
                }
                aria-pressed={language === lang.code}
                onClick={() => setLanguage(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================= Main ================= */}
      <main className="container">
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text">
            <p className="hero-eyebrow">For rural learners across India</p>
            <h1 id="hero-title" className="hero-title">
              Discover your strengths.
              <br />
              Learn new skills.
              <br />
              Build your future.
            </h1>
            <p className="hero-subtitle">
              KaushalSetu helps you find the right career path, learn the
              skills that matter, and connect with opportunities and mentors
              — all in the language you are comfortable with.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDiscover}
              >
                <IconCompass className="btn-icon" />
                <span>Discover My Strengths</span>
                <IconArrowRight className="btn-icon btn-icon-right" />
              </button>

              <button
                type="button"
                className="btn btn-voice"
                onClick={handleVoice}
                aria-label="Use voice input"
                title="Speak instead of typing"
              >
                <IconMic className="btn-icon" />
                <span>Speak</span>
              </button>
            </div>

            <p className="voice-hint">
              <IconMic className="hint-icon" />
              Voice support in English, Hindi &amp; Marathi — coming soon.
            </p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card hero-card-a">
              <span className="dot dot-teal" />
              <p>Career path found</p>
              <strong>Agri-Tech Assistant</strong>
            </div>
            <div className="hero-card hero-card-b">
              <span className="dot dot-blue" />
              <p>Skill in progress</p>
              <strong>Digital Payments</strong>
            </div>
            <div className="hero-card hero-card-c">
              <span className="dot dot-teal" />
              <p>Mentor matched</p>
              <strong>Sunita, Nashik</strong>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features" aria-labelledby="features-title">
          <div className="section-head">
            <h2 id="features-title" className="section-title">
              What would you like to do today?
            </h2>
            <p className="section-sub">
              Choose a path — everything is designed to be simple and
              easy to use.
            </p>
          </div>

          <ul className="feature-grid">
            {FEATURES.map(({ key, title, description, icon: Icon }) => (
              <li key={key} className="feature-card">
                <span className="feature-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{description}</p>
                <span className="feature-link" aria-hidden="true">
                  Explore <IconArrowRight className="link-icon" />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* ================= Footer ================= */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <p className="footer-brand">KaushalSetu</p>
          <p className="footer-note">
            A bridge from learning to livelihood — built for rural India.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;