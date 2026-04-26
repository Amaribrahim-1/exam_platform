import { BookOpen, CheckCircle, TrendingUp, Trophy } from "lucide-react";

export const STUDENT_STATS_CONFIG = [
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
    key: "averageScore",
    label: "Average Score",
    icon: TrendingUp,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/60",
    glow: "hover:shadow-[0_8px_32px_rgba(74,124,255,0.15)]",
    accent: "bg-accent",
    format: (v) => `${v}%`,
  },
  {
    key: "highestScore",
    label: "Highest Score",
    icon: Trophy,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/60",
    glow: "hover:shadow-[0_8px_32px_rgba(217,70,239,0.15)]",
    accent: "bg-indigo-500",
    format: (v) => `${v}%`,
  },
  {
    key: "passRate",
    label: "Pass Rate",
    icon: CheckCircle,
    color: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/60",
    glow: "hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]",
    accent: "bg-emerald",
    format: (v) => `${v}%`,
  },
];

export const ANSWERS_DATA_CONFIG = [
  { key: "correct", name: "Correct", hex: "var(--color-accent)" },
  { key: "wrong", name: "Wrong", hex: "var(--color-danger)" },
  { key: "skipped", name: "Skipped", hex: "var(--color-text-muted)" },
];
