import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ChartNoAxesCombined,
  Flame,
  Layers2,
  LockKeyhole,
  Radio,
  Radar,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  TimerReset,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";

const howItWorks = [
  [
    "Instructors publish structured exams",
    "Metadata, questions, and review/publish happen through the 3-step exam wizard.",
  ],
  [
    "Students complete secure timed sessions",
    "Session continuity, anti-cheat checks, and auto-submit protections run through each attempt.",
  ],
  [
    "Everyone acts on refreshed outcomes",
    "Scores are computed from canonical questions, then student and instructor dashboards refresh while admin access remains role-protected.",
  ],
];

const features = {
  student: [
    [UserRoundCheck, "Eligibility-based access by grade and department"],
    [TimerReset, "Timed sessions with auto-save and local storage continuity"],
    [ScanSearch, "Anti-cheat: tab switch, focus loss, devtools, copy attempts, and more"],
    [ShieldCheck, "Auto-submit on timeout or violation threshold"],
    [BarChart3, "Detailed result view with full exam history"],
    [BookOpenCheck, "Profile management required for eligibility"],
  ],
  instructor: [
    [Layers2, "3-step exam wizard: metadata -> questions -> review & publish"],
    [RefreshCw, "Exam lifecycle control across draft, active, and closed"],
    [Radar, "Per-student records with submission-level performance review"],
    [ChartNoAxesCombined, "Aggregate student analytics via materialized views"],
  ],
  everyone: [
    [Radio, "Supabase Realtime exam status updates"],
    [LockKeyhole, "Role-based access for student, instructor, and admin"],
    [Flame, "Fast responsive experience built with React 19 + Vite"],
  ],
  admin: [
    [LockKeyhole, "Admin-protected workspace under /admin/* routing"],
    [BarChart3, "Dashboard, users, exams, and reports pages are scaffolded"],
    [Layers2, "Built on the same protected + role-based route tree as other roles"],
  ],
};

const credibility = [
  "React 19",
  "Supabase",
  "TanStack Query",
  "Framer Motion",
  "Tailwind CSS v4",
];

function LazyMount({ className = "", minHeight = "55vh", children }) {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "260px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className}>
      {ready ? children : <div className='hp-lazy-slot rounded-2xl' style={{ minHeight }} />}
    </div>
  );
}

function ScrollReveal({ className = "", children }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`hp-reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function HomePage() {
  const [activeRole, setActiveRole] = useState("student");
  const progressRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("exam-io-theme", "dark");
  }, []);

  useEffect(() => {
    let raf = null;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      const safeRatio = Math.min(1, Math.max(0, ratio));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${safeRatio})`;
      raf = null;
    };
    const onScroll = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf !== null) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const isDark = true;
  const currentFeatures = useMemo(() => features[activeRole], [activeRole]);

  const rootStyles = {
    backgroundColor: isDark ? "var(--hp-bg-dark)" : "var(--hp-bg-light)",
    color: isDark ? "var(--hp-text-dark)" : "var(--hp-text-light)",
  };

  return (
    <div className={`home-page ${isDark ? "dark" : ""}`} style={rootStyles}>
      <div ref={progressRef} className='hp-progress' />
      <div className='hp-flow relative min-h-screen'>
        <div
          className='pointer-events-none absolute inset-0'
          style={{
            background: isDark
              ? "radial-gradient(circle at 8% 14%, rgba(44,246,201,0.26), transparent 32%), radial-gradient(circle at 85% 16%, rgba(44,246,201,0.18), transparent 28%), radial-gradient(circle at 44% 85%, rgba(13,31,72,0.7), transparent 45%)"
              : "radial-gradient(circle at 8% 14%, rgba(44,246,201,0.1), transparent 36%), radial-gradient(circle at 85% 16%, rgba(44,246,201,0.07), transparent 32%), radial-gradient(circle at 44% 85%, rgba(19,39,80,0.08), transparent 55%)",
          }}
        />
        <div className='hp-noise' />
        <div className='hp-grid' />
        <div className='hp-hero-orb' />

        <header className='relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 md:px-10'>
          <Link to='/' className='hp-display text-2xl font-extrabold tracking-tight'>
            Clarify
          </Link>
        </header>

        <section className='hp-snap relative z-10 mx-auto grid min-h-[74vh] w-full max-w-7xl items-center grid-cols-1 gap-8 px-6 pb-12 pt-6 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
          <div className='w-full max-w-4xl lg:max-w-none lg:pr-10'>
            <p
              className='mb-5 inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]'
              style={{
                borderColor: "var(--hp-accent-soft)",
                color: "var(--hp-accent)",
                backgroundColor: "rgba(44, 246, 201, 0.1)",
              }}
            >
              Academic Assessment Platform
            </p>

            <h1 className='hp-display max-w-4xl text-[10.5vw] leading-[0.92] font-black tracking-[-0.035em] sm:text-6xl lg:text-[4.9rem]'>
              <span className='block'>
                One exam platform
              </span>
              <span className='block text-[var(--hp-accent)]'>
                for students,
              </span>
              <span className='block'>
                instructors, and admins.
              </span>
            </h1>

            <p
              className='mt-5 max-w-3xl text-sm leading-relaxed md:text-base'
              style={{ color: isDark ? "rgba(236,243,255,0.84)" : "rgba(17,24,39,0.74)" }}
            >
              Clarify supports the full examination lifecycle: instructors create and publish,
              students complete timed sessions with integrity checks, and admins operate inside a
              protected oversight space.
            </p>

            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <Link
                to='/login'
                className='rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition hover:-translate-y-0.5 hover:brightness-105'
                style={{
                  backgroundColor: "var(--hp-accent)",
                  color: "#031111",
                  boxShadow: "0 8px 26px rgba(44,246,201,0.24)",
                }}
              >
                Get Started <ArrowRight className='ml-2 inline' size={14} />
              </Link>
              <button
                type='button'
                onClick={() => document.getElementById("role-features")?.scrollIntoView({ behavior: "smooth" })}
                className='rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition hover:-translate-y-0.5 hover:text-[var(--hp-accent)]'
                style={{ borderColor: isDark ? "var(--hp-border-dark)" : "var(--hp-border-light)" }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div className='hidden lg:block'>
            <aside className='hp-section-shell rounded-2xl p-5'>
              <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[var(--hp-accent)]'>
                Shared academic workflow
              </p>
              <div className='mt-3 overflow-hidden rounded-xl border' style={{ borderColor: isDark ? "var(--hp-border-dark)" : "var(--hp-border-light)" }}>
                <svg
                  viewBox='0 0 520 320'
                  className='h-auto w-full'
                  role='img'
                  aria-label='Student, instructor, and admin using exam platform'
                >
                  <rect x='0' y='0' width='520' height='320' fill={isDark ? "#0a1222" : "#eef5ff"} />
                  <rect x='26' y='34' width='468' height='252' rx='18' fill={isDark ? "#0d1830" : "#ffffff"} />
                  <rect x='54' y='58' width='412' height='18' rx='9' fill={isDark ? "#162443" : "#dde7f7"} />
                  <rect x='54' y='90' width='188' height='162' rx='12' fill={isDark ? "#12203b" : "#f4f8ff"} />
                  <rect x='258' y='90' width='208' height='74' rx='12' fill={isDark ? "#12203b" : "#f4f8ff"} />
                  <rect x='258' y='178' width='208' height='74' rx='12' fill={isDark ? "#12203b" : "#f4f8ff"} />
                  <circle cx='126' cy='138' r='22' fill='var(--hp-accent)' opacity='0.82' />
                  <rect x='95' y='166' width='64' height='44' rx='10' fill='var(--hp-accent)' opacity='0.34' />
                  <circle cx='326' cy='126' r='18' fill='var(--hp-accent)' opacity='0.7' />
                  <rect x='300' y='148' width='58' height='10' rx='5' fill={isDark ? "#314361" : "#c7d6ee"} />
                  <circle cx='408' cy='124' r='18' fill='var(--hp-accent)' opacity='0.5' />
                  <rect x='381' y='148' width='58' height='10' rx='5' fill={isDark ? "#314361" : "#c7d6ee"} />
                  <circle cx='326' cy='214' r='18' fill='var(--hp-accent)' opacity='0.56' />
                  <rect x='300' y='236' width='140' height='8' rx='4' fill={isDark ? "#314361" : "#c7d6ee"} />
                </svg>
              </div>
              <div className='mt-4 grid grid-cols-3 gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]'>
                {["Student", "Instructor", "Admin"].map((role) => (
                  <span
                    key={role}
                    className='rounded-full border px-2 py-1 text-center'
                    style={{ borderColor: "var(--hp-accent-soft)", color: "var(--hp-accent)" }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <main className='relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-24 md:px-10'>
          <LazyMount className='hp-snap' minHeight='50vh'>
            <ScrollReveal>
              <section className='hp-section-shell rounded-2xl px-6 py-12 md:px-10 md:py-14'>
                <div className='grid gap-10 lg:grid-cols-[0.7fr_1.3fr]'>
                  <h2 className='hp-display text-4xl font-extrabold md:text-6xl'>How it flows</h2>
                  <div className='space-y-8'>
                    {howItWorks.map((step, index) => (
                      <div key={step[0]} className='border-l pl-5' style={{ borderColor: "var(--hp-accent-soft)" }}>
                        <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--hp-accent)]'>
                          Step {index + 1}
                        </p>
                        <p className='text-xl font-bold'>{step[0]}</p>
                        <p className='mt-2 text-sm leading-relaxed opacity-85'>{step[1]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </LazyMount>

          <LazyMount className='hp-snap' minHeight='60vh'>
            <section id='role-features' className='hp-section-shell rounded-2xl px-6 py-10 md:px-10 md:py-12'>
              <ScrollReveal>
                <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
                  <h2 className='hp-display text-4xl font-extrabold md:text-5xl'>Capabilities by role</h2>
                  <div className='inline-flex rounded-full border p-1' style={{ borderColor: isDark ? "var(--hp-border-dark)" : "var(--hp-border-light)" }}>
                    {["student", "instructor", "admin"].map((role) => (
                      <button
                        key={role}
                        type='button'
                        onClick={() => setActiveRole(role)}
                        className='rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition'
                        style={{
                          color: activeRole === role ? "var(--hp-accent)" : undefined,
                          backgroundColor: activeRole === role ? "rgba(44,246,201,0.14)" : "transparent",
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
                <ScrollReveal>
                  <div key={activeRole} className='grid gap-3'>
                    {currentFeatures.map(([Icon, label]) => (
                      <article
                        key={label}
                        className='group border px-4 py-4 transition hover:-translate-y-0.5'
                        style={{ borderColor: isDark ? "var(--hp-border-dark)" : "var(--hp-border-light)" }}
                      >
                        <p className='flex items-start gap-3 text-sm leading-relaxed md:text-base'>
                          <Icon size={18} className='mt-0.5 shrink-0 text-[var(--hp-accent)]' />
                          <span>{label}</span>
                        </p>
                      </article>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className='space-y-3 border p-5' style={{ borderColor: isDark ? "var(--hp-border-dark)" : "var(--hp-border-light)" }}>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hp-accent)]'>
                      Shared for everyone
                    </p>
                    {features.everyone.map(([Icon, text]) => (
                      <p key={text} className='flex gap-3 text-sm leading-relaxed'>
                        <Icon size={17} className='mt-0.5 shrink-0 text-[var(--hp-accent)]' />
                        <span>{text}</span>
                      </p>
                    ))}
                    <p className='pt-2 text-xs uppercase tracking-[0.15em] opacity-70'>
                      Built for students, instructors, and admins in one platform.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </LazyMount>

          <LazyMount className='hp-snap' minHeight='35vh'>
            <section className='hp-section-shell rounded-2xl px-6 py-8 md:px-10 md:py-9'>
              <ScrollReveal>
                <div className='flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]'>
                  <span className='mr-1 text-[var(--hp-accent)]'>Built with</span>
                  {credibility.map((item) => (
                    <span key={item} className='rounded-full border px-3 py-1' style={{ borderColor: isDark ? "var(--hp-border-dark)" : "var(--hp-border-light)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </section>
          </LazyMount>

        </main>
      </div>
    </div>
  );
}

export default HomePage;
