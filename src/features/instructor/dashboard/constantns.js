import { BookOpen, FileText, TrendingUp, Users2 } from "lucide-react";

export const INSTRUCTOR_STATS_CONFIG = [
  {
    key: "totalExams",
    label: "Total Exams",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/60",
    glow: "hover:shadow-[0_8px_32px_rgba(108,142,245,0.15)]",
    format: (v) => v,
  },
  {
    key: "totalSubmissions",
    label: "Total Submissions",
    icon: FileText,
    color: "text-[#60C8F5]",
    bg: "bg-[#60C8F5]/10",
    border: "border-[#60C8F5]/60",
    glow: "hover:shadow-[0_8px_32px_rgba(96,200,245,0.15)]",
    format: (v) => v,
  },

  {
    key: "averageScore",
    label: "Students Average Score",
    icon: TrendingUp,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/60",
    glow: "hover:shadow-[0_8px_32px_rgba(245,166,35,0.15)]",
    accent: "before:bg-warning",
    format: (v) => `${v}%`,
  },
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users2,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/60",
    glow: "hover:shadow-[0_8px_32px_rgba(94,207,177,0.15)]",
    accent: "before:bg-accent",
    format: (v) => `${v}`,
  },
];

export const INSTRUCTOR_PIE_CONFIG = [
  { key: "passed", name: "Passed", hex: "#5ECFB1" },
  { key: "failed", name: "Failed", hex: "#E05C6A" },
];
