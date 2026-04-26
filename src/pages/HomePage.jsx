import { useEffect, useRef, useState } from "react";
import "./tokens.css";
import { useNavigate } from "react-router-dom";

function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function FadeUp({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .65s cubic-bezier(0.16,1,0.3,1) ${delay}ms,transform .65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function HeroIllustration() {
  return (
    <svg
      viewBox='0 0 520 420'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ width: "100%", maxWidth: 500, height: "auto" }}
      aria-hidden='true'
    >
      <defs>
        <radialGradient id='g1' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='#D4AF58' stopOpacity='.16' />
          <stop offset='100%' stopColor='#D4AF58' stopOpacity='0' />
        </radialGradient>
        <radialGradient id='g2' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='#4A7CFF' stopOpacity='.12' />
          <stop offset='100%' stopColor='#4A7CFF' stopOpacity='0' />
        </radialGradient>
        <linearGradient id='pg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#1E2330' />
          <stop offset='100%' stopColor='#161A22' />
        </linearGradient>
        <linearGradient id='sg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#1a2040' />
          <stop offset='100%' stopColor='#0d1220' />
        </linearGradient>
        <filter id='bl1'>
          <feGaussianBlur stdDeviation='22' />
        </filter>
        <filter id='bl2'>
          <feGaussianBlur stdDeviation='16' />
        </filter>
      </defs>
      <ellipse
        cx='260'
        cy='210'
        rx='190'
        ry='150'
        fill='url(#g1)'
        filter='url(#bl1)'
      />
      <ellipse
        cx='380'
        cy='130'
        rx='110'
        ry='90'
        fill='url(#g2)'
        filter='url(#bl2)'
      />
      <rect
        x='110'
        y='58'
        width='280'
        height='190'
        rx='14'
        fill='url(#sg)'
        stroke='#D4AF58'
        strokeOpacity='.22'
        strokeWidth='1.5'
      />
      <rect x='126' y='74' width='248' height='158' rx='6' fill='#0A0E1A' />
      <rect x='126' y='74' width='248' height='28' rx='6' fill='#111828' />
      <circle cx='142' cy='88' r='5' fill='#FF5F57' fillOpacity='.7' />
      <circle cx='158' cy='88' r='5' fill='#FFBD2E' fillOpacity='.7' />
      <circle cx='174' cy='88' r='5' fill='#28CA41' fillOpacity='.7' />
      <rect
        x='136'
        y='112'
        width='78'
        height='7'
        rx='3'
        fill='#D4AF58'
        fillOpacity='.65'
      />
      <rect
        x='224'
        y='112'
        width='48'
        height='7'
        rx='3'
        fill='#4A7CFF'
        fillOpacity='.38'
      />
      <rect
        x='308'
        y='108'
        width='56'
        height='16'
        rx='8'
        fill='#D4AF58'
        fillOpacity='.1'
        stroke='#D4AF58'
        strokeOpacity='.38'
        strokeWidth='1'
      />
      <text
        x='336'
        y='120'
        textAnchor='middle'
        fill='#D4AF58'
        fontSize='8'
        fontFamily='DM Sans,sans-serif'
        fontWeight='500'
      >
        23:47
      </text>
      <rect
        x='136'
        y='131'
        width='200'
        height='5'
        rx='2.5'
        fill='#F0EDE6'
        fillOpacity='.16'
      />
      <rect
        x='136'
        y='146'
        width='160'
        height='5'
        rx='2.5'
        fill='#F0EDE6'
        fillOpacity='.1'
      />
      <rect
        x='136'
        y='161'
        width='180'
        height='5'
        rx='2.5'
        fill='#F0EDE6'
        fillOpacity='.1'
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x='136'
            y={180 + i * 18}
            width='224'
            height='13'
            rx='4'
            fill={i === 1 ? "#D4AF58" : "#161A22"}
            fillOpacity={i === 1 ? 0.18 : 0.8}
            stroke={i === 1 ? "#D4AF58" : "#FFFFFF"}
            strokeOpacity={i === 1 ? 0.45 : 0.06}
            strokeWidth='1'
          />
          <circle
            cx='147'
            cy={186 + i * 18}
            r='4'
            fill='none'
            stroke={i === 1 ? "#D4AF58" : "#FFFFFF"}
            strokeOpacity={i === 1 ? 0.65 : 0.18}
            strokeWidth='1.5'
          />
          {i === 1 && (
            <circle cx='147' cy='204' r='2.2' fill='#D4AF58' fillOpacity='.9' />
          )}
          <rect
            x='157'
            y={183 + i * 18}
            width={[80, 100, 70, 90][i]}
            height='4'
            rx='2'
            fill='#F0EDE6'
            fillOpacity={i === 1 ? 0.48 : 0.13}
          />
        </g>
      ))}
      <rect
        x='80'
        y='248'
        width='340'
        height='14'
        rx='4'
        fill='#1C2230'
        stroke='#D4AF58'
        strokeOpacity='.13'
        strokeWidth='1'
      />
      <rect x='160' y='262' width='180' height='6' rx='3' fill='#161A22' />
      <g transform='rotate(-8,75,220)'>
        <rect
          x='28'
          y='150'
          width='100'
          height='130'
          rx='6'
          fill='url(#pg)'
          stroke='#D4AF58'
          strokeOpacity='.2'
          strokeWidth='1'
        />
        <rect
          x='40'
          y='165'
          width='60'
          height='5'
          rx='2'
          fill='#D4AF58'
          fillOpacity='.55'
        />
        {[181, 193, 205, 217, 229, 241, 253].map((y, i) => (
          <rect
            key={i}
            x='40'
            y={y}
            width={[55, 45, 50, 38, 52, 44, 48][i]}
            height='3.5'
            rx='1.5'
            fill='#F0EDE6'
            fillOpacity='.11'
          />
        ))}
        <circle
          cx='115'
          cy='262'
          r='10'
          fill='#D4AF58'
          fillOpacity='.13'
          stroke='#D4AF58'
          strokeOpacity='.4'
          strokeWidth='1.2'
        />
        <polyline
          points='109,262 113,266 121,258'
          stroke='#D4AF58'
          strokeWidth='1.8'
          strokeLinecap='round'
          strokeLinejoin='round'
          fill='none'
          strokeOpacity='.9'
        />
      </g>
      <g transform='rotate(6,440,200)'>
        <rect
          x='385'
          y='128'
          width='105'
          height='120'
          rx='8'
          fill='url(#pg)'
          stroke='#4A7CFF'
          strokeOpacity='.22'
          strokeWidth='1'
        />
        <rect
          x='397'
          y='142'
          width='50'
          height='5'
          rx='2'
          fill='#4A7CFF'
          fillOpacity='.45'
        />
        <circle
          cx='437'
          cy='198'
          r='28'
          fill='none'
          stroke='#1C2230'
          strokeWidth='5'
        />
        <circle
          cx='437'
          cy='198'
          r='28'
          fill='none'
          stroke='#D4AF58'
          strokeWidth='5'
          strokeDasharray='126'
          strokeDashoffset='20'
          strokeLinecap='round'
          transform='rotate(-90,437,198)'
          strokeOpacity='.82'
        />
        <text
          x='437'
          y='194'
          textAnchor='middle'
          fill='#D4AF58'
          fontSize='13'
          fontFamily='Playfair Display,serif'
          fontWeight='700'
        >
          92
        </text>
        <text
          x='437'
          y='206'
          textAnchor='middle'
          fill='#9A9690'
          fontSize='6.5'
          fontFamily='DM Sans,sans-serif'
        >
          SCORE
        </text>
        <rect
          x='397'
          y='233'
          width='80'
          height='4'
          rx='2'
          fill='#F0EDE6'
          fillOpacity='.1'
        />
        <rect
          x='397'
          y='241'
          width='55'
          height='3.5'
          rx='1.5'
          fill='#F0EDE6'
          fillOpacity='.07'
        />
      </g>
      {[
        [72, 98, 3, "#D4AF58", 0.45],
        [455, 93, 2, "#4A7CFF", 0.55],
        [490, 288, 3.5, "#D4AF58", 0.28],
        [35, 308, 2.5, "#2DD4BF", 0.38],
        [300, 378, 2, "#D4AF58", 0.32],
      ].map(([cx, cy, r, fill, op], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} fillOpacity={op} />
      ))}
      <line
        x1='160'
        y1='388'
        x2='360'
        y2='388'
        stroke='#D4AF58'
        strokeOpacity='.12'
        strokeWidth='1'
        strokeDasharray='4 6'
      />
    </svg>
  );
}

function GridBg() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundImage: `linear-gradient(rgba(212,175,88,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,88,0.028) 1px,transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    />
  );
}

/* ── Lucide-style inline SVG icons ── */
const IC = {
  UserRoundCheck: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='m16 11 2 2 4-4' />
    </svg>
  ),
  TimerReset: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M10 2h4' />
      <path d='M12 14v-4' />
      <path d='M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6' />
      <path d='M9 17H4v5' />
    </svg>
  ),
  ScanSearch: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M3 7V5a2 2 0 0 1 2-2h2' />
      <path d='M17 3h2a2 2 0 0 1 2 2v2' />
      <path d='M21 17v2a2 2 0 0 1-2 2h-2' />
      <path d='M7 21H5a2 2 0 0 1-2-2v-2' />
      <circle cx='12' cy='12' r='3' />
      <path d='m16 16-1.9-1.9' />
    </svg>
  ),
  ShieldCheck: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      <path d='m9 12 2 2 4-4' />
    </svg>
  ),
  BarChart3: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M3 3v18h18' />
      <path d='M18 17V9' />
      <path d='M13 17V5' />
      <path d='M8 17v-3' />
    </svg>
  ),
  BookOpenCheck: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4z' />
      <path d='M16 3h6v15h-7c-1.7 0-3 1.3-3 3V7c0-2.2 1.8-4 4-4z' />
      <path d='m9 13 2 2 4-4' />
    </svg>
  ),
  Layers2: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0L2.5 16.87a1 1 0 0 1 0-1.74L8 12' />
      <path d='M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z' />
    </svg>
  ),
  RefreshCw: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
      <path d='M21 3v5h-5' />
      <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
      <path d='M8 16H3v5' />
    </svg>
  ),
  Radar: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M19.07 4.93A10 10 0 0 0 6.99 3.34' />
      <path d='M4 6h.01' />
      <path d='M2.29 9.62A10 10 0 1 0 21.31 8.35' />
      <path d='M16.24 7.76A6 6 0 1 0 8.23 16.67' />
      <path d='M12 18h.01' />
      <path d='M17.99 11.66A6 6 0 0 1 15.77 16.67' />
      <circle cx='12' cy='12' r='2' />
      <path d='m13.41 10.59 5.66-5.66' />
    </svg>
  ),
  ChartNoAxesCombined: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M13 17l4-8' />
      <path d='m7 17 4-4' />
      <path d='M3 17 7 9' />
      <path d='m17 9 4 8' />
    </svg>
  ),
  Radio: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9' />
      <path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5' />
      <circle cx='12' cy='12' r='2' />
      <path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5' />
      <path d='M19.1 4.9C23 8.8 23 15.1 19.1 19' />
    </svg>
  ),
  LockKeyhole: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <circle cx='12' cy='16' r='1' />
      <rect x='3' y='10' width='18' height='12' rx='2' />
      <path d='M7 10V7a5 5 0 0 1 10 0v3' />
    </svg>
  ),
  Flame: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' />
    </svg>
  ),
  UserCog: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <circle cx='18' cy='15' r='3' />
      <circle cx='9' cy='7' r='4' />
      <path d='M10 15H6a4 4 0 0 0-4 4v2' />
      <path d='m21.7 16.4-.9-.3' />
      <path d='m15.2 13.9-.9-.3' />
      <path d='m16.6 18.7.3-.9' />
      <path d='m19.1 12.2.3-.9' />
      <path d='m19.6 18.7-.4-1' />
      <path d='m16.8 12.3-.4-1' />
      <path d='m14.3 16.6 1-.4' />
      <path d='m20.7 13.8 1-.4' />
    </svg>
  ),
  Users: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  ),
  Trash2: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
      <line x1='10' y1='11' x2='10' y2='17' />
      <line x1='14' y1='11' x2='14' y2='17' />
    </svg>
  ),
  LayoutDashboard: (p) => (
    <svg {...p} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
      <rect width='7' height='9' x='3' y='3' rx='1' />
      <rect width='7' height='5' x='14' y='3' rx='1' />
      <rect width='7' height='9' x='14' y='12' rx='1' />
      <rect width='7' height='5' x='3' y='16' rx='1' />
    </svg>
  ),
};

const iconProps = {
  width: 16,
  height: 16,
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const groups = [
  {
    role: "Student",
    color: "#4A7CFF",
    desc: "Everything students need to take exams with confidence.",
    items: [
      [IC.UserRoundCheck, "Eligibility-based access by grade and department"],
      [
        IC.TimerReset,
        "Timed sessions with auto-save and local storage continuity",
      ],
      [
        IC.ScanSearch,
        "Anti-cheat: tab switch, focus loss, devtools, copy attempts, and more",
      ],
      [IC.ShieldCheck, "Auto-submit on timeout or violation threshold"],
      [IC.BarChart3, "Detailed result view with full exam history"],
      [IC.BookOpenCheck, "Profile management required for exam eligibility"],
    ],
  },
  {
    role: "Instructor",
    color: "#D4AF58",
    desc: "Powerful tools to create, publish, and track exams.",
    items: [
      [
        IC.Layers2,
        "3-step exam wizard: metadata → questions → review & publish",
      ],
      [IC.RefreshCw, "Exam lifecycle control across draft, active, and closed"],
      [
        IC.Radar,
        "Per-student records with submission-level performance review",
      ],
      [
        IC.ChartNoAxesCombined,
        "Aggregate student analytics via materialized views",
      ],
    ],
  },
  {
    role: "Admin",
    color: "#2DD4BF",
    desc: "Platform-wide control and oversight.",
    items: [
      [IC.UserCog, "Create and manage instructor accounts"],
      [IC.Trash2, "Remove instructors or students from the platform"],
      [IC.Users, "View all students and instructors platform-wide"],
      [IC.LayoutDashboard, "High-level dashboard with platform-wide metrics"],
    ],
  },
  {
    role: "Everyone",
    color: "#A78BFA",
    desc: "Core capabilities shared across all roles.",
    items: [
      [IC.Radio, "Supabase Realtime exam status updates"],
      [IC.LockKeyhole, "Role-based access for student, instructor, and admin"],
      [IC.Flame, "Fast responsive experience built with React 19 + Vite"],
    ],
  },
];

function FeatureItem({ Icon, text, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        padding: ".9rem 1rem",
        borderRadius: 10,
        transition: "background .18s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.035)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
          borderRadius: 8,
          background: `${color}13`,
          border: `1px solid ${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          marginTop: 2,
        }}
      >
        <Icon {...iconProps} />
      </div>
      <span
        style={{
          color: "var(--hp-text-secondary)",
          fontSize: ".88rem",
          lineHeight: 1.7,
          fontWeight: 300,
          paddingTop: ".35rem",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);
  const fi = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(26px)",
    transition: `opacity .72s cubic-bezier(0.16,1,0.3,1) ${d}ms,transform .72s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "4rem 1.5rem 5rem",
        overflow: "hidden",
      }}
    >
      <GridBg />
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          maxWidth: 800,
          height: 360,
          background:
            "radial-gradient(ellipse,rgba(212,175,88,0.055) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "5%",
          width: 340,
          height: 340,
          background:
            "radial-gradient(ellipse,rgba(74,124,255,0.065) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1150,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3.5rem",
          alignItems: "center",
        }}
        className='hp-hero-grid'
      >
        <div>
          <div style={fi(0)}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: "9999px",
                border: "1px solid rgba(212,175,88,0.3)",
                background: "rgba(212,175,88,0.12)",
                color: "#D4AF58",
                fontSize: ".7rem",
                fontWeight: 500,
                letterSpacing: ".09em",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#D4AF58",
                  display: "block",
                }}
              />
              Digital Exam Platform
            </span>
          </div>
          <h1
            style={{
              ...fi(110),
              fontFamily: "var(--hp-font-display)",
              fontSize: "clamp(2.3rem,4.5vw,4.2rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1.4rem",
              letterSpacing: "-.02em",
              color: "var(--hp-text-primary)",
            }}
          >
            Smarter exams,{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#D4AF58 0%,#EDD88A 50%,#D4AF58 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              zero friction
            </span>
          </h1>
          <p
            style={{
              ...fi(200),
              fontSize: "1.03rem",
              color: "var(--hp-text-secondary)",
              lineHeight: 1.8,
              maxWidth: 440,
              marginBottom: "2rem",
              fontWeight: 300,
            }}
          >
            A full-stack exam platform where instructors build and publish
            exams, students take them securely, and results flow instantly — all
            in one place.
          </p>
          <div
            style={{
              ...fi(290),
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "13px 30px",
                borderRadius: 10,
                background: "linear-gradient(135deg,#D4AF58 0%,#EDD88A 100%)",
                color: "#0A0C0F",
                fontFamily: "var(--hp-font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "transform .2s ease,box-shadow .2s ease",
                boxShadow: "0 4px 20px rgba(212,175,88,.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(212,175,88,.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(212,175,88,.22)";
              }}
            >
              Get started free
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "13px 30px",
                borderRadius: 10,
                background: "transparent",
                color: "var(--hp-text-primary)",
                fontFamily: "var(--hp-font-body)",
                fontSize: "1rem",
                fontWeight: 400,
                border: "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer",
                transition: "all .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,88,.38)";
                e.currentTarget.style.background = "rgba(212,175,88,.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Learn more
            </button>
          </div>
          <div
            style={{
              ...fi(380),
              display: "flex",
              gap: ".65rem",
              flexWrap: "wrap",
            }}
          >
            {[
              ["Student", "#4A7CFF"],
              ["Instructor", "#D4AF58"],
              ["Admin", "#2DD4BF"],
            ].map(([l, c]) => (
              <span
                key={l}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 13px",
                  borderRadius: "9999px",
                  background: `${c}14`,
                  border: `1px solid ${c}28`,
                  color: c,
                  fontSize: ".82rem",
                  fontWeight: 400,
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            ...fi(170),
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-15%",
              background:
                "radial-gradient(ellipse,rgba(212,175,88,0.044) 0%,transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div className='hp-hero-float'>
            <HeroIllustration />
          </div>
        </div>
      </div>

      <div
        style={{
          ...fi(560),
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "#5A5750",
          fontSize: ".7rem",
        }}
      >
        <div
          style={{
            width: 24,
            height: 38,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            justifyContent: "center",
            padding: "6px 0",
          }}
        >
          <div
            style={{
              width: 3,
              height: 7,
              borderRadius: 2,
              background: "#D4AF58",
              opacity: 0.55,
              animation: "hp-sd 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hp-sd{0%,100%{transform:translateY(0);opacity:.55}50%{transform:translateY(9px);opacity:.2}}
        @media(max-width:768px){.hp-hero-grid{grid-template-columns:1fr!important;gap:2.5rem!important;text-align:center}.hp-hero-grid>div:first-child{display:flex;flex-direction:column;align-items:center}}
      `}</style>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: 12400, suffix: "+", label: "Registered students" },
    { value: 850, suffix: "+", label: "Published exams" },
    { value: 320, suffix: "+", label: "Active instructors" },
    { value: 99, suffix: "%", label: "Satisfaction rate" },
  ];
  return (
    <section
      style={{
        padding: "3.5rem 1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1.25rem",
        }}
        className='hp-stats-grid'
      >
        {stats.map(({ value, suffix, label }, i) => (
          <FadeUp key={label} delay={i * 65}>
            <div
              style={{
                textAlign: "center",
                padding: "1.5rem",
                borderRadius: 16,
                background: "#111318",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "border-color .3s ease,background .3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,88,0.28)";
                e.currentTarget.style.background = "#161A22";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "#111318";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--hp-font-display)",
                  fontSize: "clamp(1.7rem,2.4vw,2.4rem)",
                  fontWeight: 700,
                  color: "#D4AF58",
                  lineHeight: 1,
                  marginBottom: ".4rem",
                }}
              >
                <Counter target={value} suffix={suffix} />
              </div>
              <div
                style={{
                  color: "var(--hp-text-secondary)",
                  fontSize: ".82rem",
                  fontWeight: 300,
                }}
              >
                {label}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
      <style>{`@media(max-width:640px){.hp-stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

function FeaturesSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const current = groups[active];
  return (
    <section id='features' style={{ padding: "5rem 1.5rem 6rem" }}>
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "5px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(212,175,88,0.3)",
              background: "rgba(212,175,88,0.12)",
              color: "#D4AF58",
              fontSize: ".7rem",
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Features
          </span>
          <h2
            style={{
              fontFamily: "var(--hp-font-display)",
              fontSize: "clamp(1.9rem,3.4vw,3.1rem)",
              fontWeight: 700,
              color: "var(--hp-text-primary)",
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              marginBottom: "1.1rem",
            }}
          >
            Everything in one platform
          </h2>
          <p
            style={{
              color: "var(--hp-text-secondary)",
              fontSize: "1.03rem",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Each feature is carefully built to serve every role — from the first
            question drafted to the last result reviewed.
          </p>
        </FadeUp>

        {/* Tab bar */}
        <FadeUp
          delay={80}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: ".5rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {groups.map((g, i) => (
            <button
              key={g.role}
              onClick={() => setActive(i)}
              style={{
                padding: "9px 22px",
                borderRadius: "9999px",
                border: `1px solid ${i === active ? g.color + "50" : "rgba(255,255,255,0.07)"}`,
                background: i === active ? `${g.color}14` : "transparent",
                color: i === active ? g.color : "var(--hp-text-secondary)",
                fontFamily: "var(--hp-font-body)",
                fontSize: ".88rem",
                fontWeight: i === active ? 500 : 400,
                cursor: "pointer",
                transition: "all .2s ease",
              }}
              onMouseEnter={(e) => {
                if (i !== active) {
                  e.currentTarget.style.borderColor = `${g.color}30`;
                  e.currentTarget.style.color = g.color;
                }
              }}
              onMouseLeave={(e) => {
                if (i !== active) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "var(--hp-text-secondary)";
                }
              }}
            >
              {g.role}
            </button>
          ))}
        </FadeUp>

        {/* Panel */}
        <FadeUp key={active}>
          <div
            style={{
              background: "#111318",
              border: `1px solid ${current.color}20`,
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.6rem 2rem 1.3rem",
                borderBottom: `1px solid ${current.color}16`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    padding: "4px 13px",
                    borderRadius: "9999px",
                    background: `${current.color}14`,
                    border: `1px solid ${current.color}28`,
                    color: current.color,
                    fontSize: ".72rem",
                    fontWeight: 500,
                    letterSpacing: ".07em",
                    textTransform: "uppercase",
                  }}
                >
                  {current.role}
                </span>
                <p
                  style={{
                    color: "var(--hp-text-secondary)",
                    fontSize: ".88rem",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {current.desc}
                </p>
              </div>
            </div>
            <div
              style={{
                padding: "1rem 1rem 1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
              }}
              className='hp-feat-list'
            >
              {current.items.map(([Icon, text], i) => (
                <FeatureItem
                  key={i}
                  Icon={Icon}
                  text={text}
                  color={current.color}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={140} style={{ textAlign: "center", marginTop: "4rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "2.25rem 3.5rem",
              borderRadius: 22,
              background: "#111318",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              style={{
                color: "var(--hp-text-secondary)",
                fontSize: "1rem",
                marginBottom: "1rem",
                fontWeight: 300,
              }}
            >
              Ready to try Exam.io?
            </p>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "12px 38px",
                borderRadius: 10,
                background: "linear-gradient(135deg,#D4AF58 0%,#EDD88A 100%)",
                color: "#0A0C0F",
                fontFamily: "var(--hp-font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(212,175,88,.22)",
                transition: "transform .2s ease,box-shadow .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(212,175,88,.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(212,175,88,.22)";
              }}
            >
              Sign up for free
            </button>
          </div>
        </FadeUp>
      </div>
      <style>{`@media(max-width:640px){.hp-feat-list{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function FooterBar() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "1.75rem 1.5rem",
        textAlign: "center",
        color: "#5A5750",
        fontSize: ".85rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--hp-font-display)",
          color: "#D4AF58",
          fontWeight: 600,
        }}
      >
        Exam.io
      </span>{" "}
      — Digital Exam Platform · {new Date().getFullYear()}
    </footer>
  );
}

export default function HomePage() {
  return (
    <div
      style={{
        background: "var(--hp-bg-base)",
        color: "var(--hp-text-primary)",
        fontFamily: "var(--hp-font-body)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <FooterBar />
    </div>
  );
}
