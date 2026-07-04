import { useState, useEffect, useRef, useCallback } from "react";

const DATA = {
  name: "Nithyaanadam R",
  title: "Software Engineer",
  subtitle: "Full-Stack Developer · Application Engineer",
  email: "sainithyaanaandamr@gmail.com",
  phone: "+91 7550279496",
  linkedin: "https://linkedin.com",
  tagline: "Building collaborative web experiences that scale.",
  about:
    "A determined software professional with hands-on experience in full-stack development and application engineering at Zoho Corporation. I work on scalable web applications, front-end engineering, and collaborative platforms — with a passion for accessible, performant, and beautifully crafted software.",
  experience: [
    {
      role: "Member Technical Staff",
      company: "Zoho Corporation",
      location: "Chennai",
      period: "June 2023 – Present",
      points: [
        "Part of an extensive web application team focused on front-end engineering.",
        "Delivered features using Web Workers, WebSockets, and integrations across Zoho's product ecosystem.",
        "Deep knowledge of collaborative platforms and Operational Transform techniques.",
        "Ensures web apps meet WCAG accessibility guidelines.",
      ],
    },
    {
      role: "Project Trainee (Intern)",
      company: "Zoho Corporation",
      location: "Chennai",
      period: "Oct 2022 – May 2023",
      points: [
        "Developed a solo Windows AppX application under the Windows App Development team.",
        "Built with C#, XAML, and SQLite following MVVM and Clean Architecture + SOLID Principles.",
        "App inspired by social forums: users could post, comment, and react to content.",
      ],
    },
  ],
  skills: [
    { category: "Languages", items: ["C++", "C#", "JavaScript", "Python", "Java", "C", "HTML5", "CSS3", "SQL"] },
    { category: "Frameworks & Tools", items: ["React.js", "Node.js", "XAML", "SQLite", "Git"] },
    { category: "Concepts", items: ["Operational Transform", "Web Workers", "WebSockets", "WCAG Accessibility", "Protobuf"] },
    { category: "Architecture", items: ["MVVM", "Clean Architecture", "SOLID Principles", "Agile"] },
  ],
  projects: [
    {
      title: "Image Regeneration via Genetic Algorithm",
      tech: ["Python", "GARI", "Image Processing"],
      description:
        "Using GARI (Genetic Algorithm for Reproducing Images), regenerates images from low-quality or downsized versions. Includes in-depth analysis comparing image types, quality, and color formats to identify optimal algorithm conditions.",
      icon: "🧬",
    },
    {
      title: "Smart Traffic Management with Deep Learning",
      tech: ["YOLO", "Object Detection", "Computer Vision"],
      description:
        "A dynamically switching traffic signal system using YOLO-based object recognition. Reads video feeds, takes periodic snapshots, and intelligently opens and closes traffic signals based on real-time vehicle density.",
      icon: "🚦",
    },
  ],
  education: {
    degree: "B.E. in Computer Science & Engineering",
    institution: "Anna University",
    location: "Chennai, India",
    period: "2019 – 2023",
    cgpa: "9.3 / 10",
    distinction: "First Class with Distinction",
  },
};

const NAV_ITEMS = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];

function useTypewriter(phrases, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        zIndex: 9999,
        background: "#E8706A",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "0 0 8px 0",
        fontWeight: 600,
        textDecoration: "none",
      }}
      onFocus={(e) => {
        e.target.style.left = "0";
        e.target.style.width = "auto";
        e.target.style.height = "auto";
      }}
      onBlur={(e) => {
        e.target.style.left = "-9999px";
        e.target.style.width = "1px";
        e.target.style.height = "1px";
      }}
    >
      Skip to main content
    </a>
  );
}

function Nav({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (item) => {
    const el = document.getElementById(item.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      role="navigation"
      aria-label="Primary navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,9,9,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,112,106,0.12)" : "none",
        transition: "background 0.3s, border 0.3s",
        padding: "0 clamp(1rem, 5vw, 3rem)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); document.getElementById("hero").scrollIntoView({ behavior: "smooth" }); }}
          style={{ color: "#B0A8A8", fontWeight: 700, fontSize: 18, textDecoration: "none", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', sans-serif" }}
          aria-label="Nithyaanadam R — back to top"
        >
          N<span style={{ color: "#E8706A" }}>.</span>R
        </a>

        {/* Desktop nav */}
        <ul role="list" style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); handleNav(item); }}
                style={{
                  color: active === item.toLowerCase() ? "#B0A8A8" : "rgba(176,168,168,0.5)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                  padding: "4px 0",
                  borderBottom: active === item.toLowerCase() ? "2px solid #E8706A" : "2px solid transparent",
                }}
                aria-current={active === item.toLowerCase() ? "page" : undefined}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid rgba(232,112,106,0.3)",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            color: "#B0A8A8",
            fontSize: 20,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            background: "rgba(10,9,9,0.97)",
            borderTop: "1px solid rgba(232,112,106,0.15)",
            padding: "1rem",
          }}
        >
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); handleNav(item); }}
                  style={{
                    display: "block",
                    color: "#B0A8A8",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 500,
                    background: active === item.toLowerCase() ? "rgba(232,112,106,0.12)" : "transparent",
                  }}
                  aria-current={active === item.toLowerCase() ? "page" : undefined}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const roles = ["Full-Stack Developer", "Front-End Engineer", "Application Developer", "Web App Architect"];
  const typed = useTypewriter(roles, 75, 2000);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px clamp(1rem,5vw,3rem) 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div aria-hidden="true" style={{ position: "absolute", top: "15%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(232,112,106,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "10%", right: "8%", width: 300, height: 300, background: "radial-gradient(circle, rgba(196,92,86,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 780, width: "100%", textAlign: "center" }}>
        <p style={{ color: "#E8706A", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
          — Available for opportunities —
        </p>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            fontWeight: 700,
            color: "#F5F0F0",
            lineHeight: 1.1,
            margin: "0 0 16px",
            letterSpacing: "-0.03em",
          }}
        >
          {DATA.name}
        </h1>

        <div
          style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Role: ${typed}`}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.1rem, 3.5vw, 1.6rem)", color: "#B0A8A8", fontWeight: 500 }}>
            {typed}
            <span aria-hidden="true" style={{ borderRight: "2px solid #E8706A", marginLeft: 2, animation: "blink 1s step-end infinite" }}>&#8203;</span>
          </span>
        </div>

        <p style={{ color: "rgba(176,168,168,0.7)", fontSize: "clamp(0.95rem,2.2vw,1.1rem)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
          {DATA.tagline}
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={`mailto:${DATA.email}`}
            style={{
              background: "#E8706A",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "background 0.2s, transform 0.15s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#C45C56"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "#E8706A"; e.target.style.transform = "translateY(0)"; }}
          >
            Get in touch
          </a>
          <a
            href="#experience"
            onClick={(e) => { e.preventDefault(); document.getElementById("experience").scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "transparent",
              color: "#B0A8A8",
              padding: "13px 28px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
              fontFamily: "'Space Grotesk', sans-serif",
              border: "1.5px solid rgba(232,112,106,0.4)",
              transition: "border-color 0.2s, color 0.2s, transform 0.15s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#E8706A"; e.target.style.color = "#fff"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(232,112,106,0.4)"; e.target.style.color = "#B0A8A8"; e.target.style.transform = "translateY(0)"; }}
          >
            View work ↓
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{ display: "flex", justifyContent: "center", gap: "clamp(1.5rem,5vw,4rem)", marginTop: 64, flexWrap: "wrap" }}
          role="list"
          aria-label="Quick stats"
        >
          {[
            { value: "3+", label: "Years at Zoho" },
            { value: "9.3", label: "CGPA" },
            { value: "WCAG", label: "Accessibility" },
          ].map(({ value, label }) => (
            <div key={label} role="listitem" style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700, color: "#E8706A", lineHeight: 1 }}>{value}</div>
              <div style={{ color: "rgba(176,168,168,0.5)", fontSize: 13, marginTop: 6, letterSpacing: "0.06em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" style={{ padding: "80px clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>About</SectionLabel>
          <h2 id="about-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#F5F0F0", fontWeight: 700, margin: "12px 0 32px", letterSpacing: "-0.02em" }}>
            Crafting software that connects people.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))", gap: 32 }}>
            <p style={{ color: "rgba(176,168,168,0.75)", fontSize: "clamp(0.95rem,2vw,1.05rem)", lineHeight: 1.85, margin: 0 }}>
              {DATA.about}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "💼", label: "Current role", value: "Member Technical Staff, Zoho" },
                { icon: "📍", label: "Location", value: "Chennai, India" },
                { icon: "🎓", label: "Education", value: "B.E. CSE — 9.3 CGPA" },
                { icon: "🛠", label: "Focus", value: "Collaborative Web Apps & Front-End" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span aria-hidden="true" style={{ fontSize: 20, lineHeight: 1.4 }}>{icon}</span>
                  <div>
                    <div style={{ color: "rgba(176,168,168,0.4)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                    <div style={{ color: "#F5F0F0", fontSize: 15, fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{
      display: "inline-block",
      color: "#E8706A",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      borderLeft: "3px solid #E8706A",
      paddingLeft: 10,
    }}>
      {children}
    </span>
  );
}

function Divider() {
  return <div aria-hidden="true" style={{ height: 1, background: "rgba(232,112,106,0.08)", maxWidth: 1100, margin: "0 auto" }} />;
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" style={{ padding: "80px clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Experience</SectionLabel>
          <h2 id="experience-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#F5F0F0", fontWeight: 700, margin: "12px 0 48px", letterSpacing: "-0.02em" }}>
            Where I've worked.
          </h2>
        </FadeIn>

        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div aria-hidden="true" style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "rgba(232,112,106,0.15)", borderRadius: 2 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {DATA.experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <article
                  aria-label={`${exp.role} at ${exp.company}`}
                  style={{ paddingLeft: 56, position: "relative" }}
                >
                  {/* Dot */}
                  <div aria-hidden="true" style={{
                    position: "absolute",
                    left: 12,
                    top: 6,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: i === 0 ? "#E8706A" : "#1C1818",
                    border: "2px solid #E8706A",
                    boxShadow: i === 0 ? "0 0 0 4px rgba(232,112,106,0.12)" : "none",
                  }} />

                  <div style={{
                    background: "#131010",
                    border: "1px solid rgba(232,112,106,0.12)",
                    borderRadius: 14,
                    padding: "24px 28px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1rem,2.5vw,1.2rem)", color: "#F5F0F0", fontWeight: 700, margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{ color: "#E8706A", fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {exp.period}
                      </span>
                    </div>
                    <p style={{ color: "#B0A8A8", fontSize: 14, marginBottom: 16, fontWeight: 500 }}>
                      {exp.company} · {exp.location}
                    </p>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, color: "rgba(176,168,168,0.75)", fontSize: 14, lineHeight: 1.65 }}>
                          <span aria-hidden="true" style={{ color: "#E8706A", fontSize: 16, flexShrink: 0, marginTop: 1 }}>▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" style={{ padding: "80px clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Skills</SectionLabel>
          <h2 id="skills-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#F5F0F0", fontWeight: 700, margin: "12px 0 48px", letterSpacing: "-0.02em" }}>
            Tools of the trade.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 20 }}>
          {DATA.skills.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.08}>
              <div
                style={{ background: "#131010", border: "1px solid rgba(232,112,106,0.12)", borderRadius: 14, padding: "24px" }}
                role="region"
                aria-label={`${group.category} skills`}
              >
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#E8706A", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  {group.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} role="list">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      role="listitem"
                      style={{
                        background: "rgba(232,112,106,0.06)",
                        color: "#B0A8A8",
                        padding: "5px 12px",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 500,
                        border: "1px solid rgba(232,112,106,0.15)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" style={{ padding: "80px clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Projects</SectionLabel>
          <h2 id="projects-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#F5F0F0", fontWeight: 700, margin: "12px 0 48px", letterSpacing: "-0.02em" }}>
            Things I've built.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 24 }}>
          {DATA.projects.map((proj, i) => (
            <FadeIn key={proj.title} delay={i * 0.1}>
              <article
                aria-label={proj.title}
                style={{
                  background: "#131010",
                  border: "1px solid rgba(232,112,106,0.12)",
                  borderRadius: 14,
                  padding: "28px",
                  height: "100%",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,112,106,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,112,106,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }} role="img" aria-label={proj.icon === "🧬" ? "DNA / biology" : "Traffic light"}>{proj.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "#F5F0F0", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.35 }}>
                  {proj.title}
                </h3>
                <p style={{ color: "rgba(176,168,168,0.7)", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px" }}>
                  {proj.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }} role="list" aria-label="Technologies used">
                  {proj.tech.map((t) => (
                    <span key={t} role="listitem" style={{ background: "rgba(232,112,106,0.06)", color: "#B0A8A8", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "1px solid rgba(232,112,106,0.15)", letterSpacing: "0.02em" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const ed = DATA.education;
  return (
    <section id="education" aria-labelledby="education-heading" style={{ padding: "80px clamp(1rem,5vw,3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Education</SectionLabel>
          <h2 id="education-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#F5F0F0", fontWeight: 700, margin: "12px 0 48px", letterSpacing: "-0.02em" }}>
            Academic foundation.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ background: "#131010", border: "1px solid rgba(232,112,106,0.15)", borderRadius: 14, padding: "32px", display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: 14, background: "rgba(232,112,106,0.08)", border: "1.5px solid rgba(232,112,106,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }} role="img" aria-label="Graduation cap">🎓</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F0F0", fontSize: "clamp(1rem,2.5vw,1.2rem)", fontWeight: 700, margin: "0 0 6px" }}>{ed.degree}</h3>
              <p style={{ color: "#B0A8A8", fontSize: 15, fontWeight: 500, margin: "0 0 4px" }}>{ed.institution} · {ed.location}</p>
              <p style={{ color: "rgba(176,168,168,0.45)", fontSize: 14, margin: 0 }}>{ed.period}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", flexShrink: 0 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#E8706A", lineHeight: 1 }}>{ed.cgpa}</div>
                <div style={{ color: "rgba(176,168,168,0.45)", fontSize: 12, marginTop: 4, letterSpacing: "0.06em" }}>CGPA</div>
              </div>
              <span style={{ background: "rgba(232,112,106,0.08)", color: "#B0A8A8", padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "1px solid rgba(232,112,106,0.2)" }}>
                {ed.distinction}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" style={{ padding: "80px clamp(1rem,5vw,3rem) 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
          <h2 id="contact-heading" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "#F5F0F0", fontWeight: 700, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
            Let's work together.
          </h2>
          <p style={{ color: "rgba(176,168,168,0.6)", fontSize: "clamp(0.9rem,2vw,1.05rem)", marginBottom: 48, lineHeight: 1.75 }}>
            Open to full-time roles, freelance projects, and interesting conversations.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { href: `mailto:${DATA.email}`, label: "Email", value: DATA.email, icon: "✉️" },
              { href: `tel:${DATA.phone}`, label: "Phone", value: DATA.phone, icon: "📞" },
              { href: DATA.linkedin, label: "LinkedIn", value: "View profile", icon: "🔗" },
            ].map(({ href, label, value, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                aria-label={`${label}: ${value}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "#131010",
                  border: "1px solid rgba(232,112,106,0.15)",
                  borderRadius: 12,
                  padding: "18px 24px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.15s",
                  flex: "1 1 200px",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8706A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,112,106,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span aria-hidden="true" style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <div style={{ color: "rgba(176,168,168,0.4)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                  <div style={{ color: "#B0A8A8", fontSize: 14, fontWeight: 500 }}>{value}</div>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(232,112,106,0.08)", padding: "24px clamp(1rem,5vw,3rem)", textAlign: "center" }} role="contentinfo">
      <p style={{ color: "rgba(176,168,168,0.3)", fontSize: 13, margin: 0 }}>
        © {new Date().getFullYear()} Nithyaanadam R · Built with React
      </p>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => n.toLowerCase()).concat(["hero"]);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #0A0909; font-family: 'Inter', sans-serif; color: #F5F0F0; }
        :focus-visible { outline: 3px solid #E8706A; outline-offset: 3px; border-radius: 4px; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; align-items: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <SkipLink />
      <Nav active={activeSection} />

      <main id="main-content">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Education />
        <Divider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}