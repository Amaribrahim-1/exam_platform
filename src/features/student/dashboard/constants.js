import { BookOpen, CheckCircle, TrendingUp, Trophy } from "lucide-react";

export const STUDENT_STATS_CONFIG = [
  {
    key: "totalExams",
    label: "Total Exams",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/60",
    glow: "hover:shadow-[0_8px_32px_rgba(108,142,245,0.15)]",
    accent: "before:bg-primary",
    format: (v) => v,
  },
  {
    key: "averageScore",
    label: "Average Score",
    icon: TrendingUp,
    color: "text-[#60C8F5]",
    bg: "bg-[#60C8F5]/10",
    border: "border-[#60C8F5]/60",
    glow: "hover:shadow-[0_8px_32px_rgba(96,200,245,0.15)]",
    accent: "before:bg-[#60C8F5]",
    format: (v) => `${v}%`,
  },
  {
    key: "highestScore",
    label: "Highest Score",
    icon: Trophy,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/60",
    glow: "hover:shadow-[0_8px_32px_rgba(245,166,35,0.15)]",
    accent: "before:bg-warning",
    format: (v) => `${v}%`,
  },
  {
    key: "passRate",
    label: "Pass Rate",
    icon: CheckCircle,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/60",
    glow: "hover:shadow-[0_8px_32px_rgba(94,207,177,0.15)]",
    accent: "before:bg-accent",
    format: (v) => `${v}%`,
  },
];

export const ANSWERS_DATA_CONFIG = [
  { key: "correct", name: "Correct", hex: "#5ECFB1" },
  { key: "wrong", name: "Wrong", hex: "#E05C6A" },
  { key: "skipped", name: "Skipped", hex: "#7B82A8" },
];
