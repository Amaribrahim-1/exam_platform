import { BookOpen, FileText, TrendingUp, Users2 } from "lucide-react";

export const INSTRUCTOR_STATS_CONFIG = [
  {
    key: "totalExams",
    label: "Total Exams",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/60",
    glow: "hover:shadow-[0_8px_32px_rgba(212,175,88,0.15)]",
    accent: "bg-primary",
    format: (v) => v,
  },

  {
    key: "totalSubmissions",
    label: "Total Submissions",
    icon: FileText,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/60",
    glow: "hover:shadow-[0_8px_32px_rgba(74,124,255,0.15)]",
    accent: "bg-accent",
    format: (v) => v,
  },
  {
    key: "averageScore",
    label: "Students Average Score",
    icon: TrendingUp,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/60",
    glow: "hover:shadow-[0_8px_32px_rgba(217,70,239,0.15)]",
    accent: "bg-indigo-500",
    format: (v) => `${v}%`,
  },
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users2,
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/60",
    glow: "hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]",
    accent: "bg-emerald",
    format: (v) => `${v}`,
  },
];

export const INSTRUCTOR_PIE_CONFIG = [
  { key: "passed", name: "Passed", hex: "var(--color-accent)" },
  { key: "failed", name: "Failed", hex: "var(--color-danger)" },
];
