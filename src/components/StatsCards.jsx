import { TrendingUp, BookOpen, Trophy, CheckCircle } from "lucide-react";

const STATS_CONFIG = [
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

function StatsCards({ stats }) {
  return (
    <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
      {STATS_CONFIG.map((config, i) => (
        <div
          key={config.key}
          style={{ animationDelay: `${i * 0.07}s` }}
          className={[
            "bg-surface relative overflow-hidden rounded-2xl p-4 sm:p-5",
            "border-t-2",
            config.border,
            "transition-all duration-300 ease-out",
            "cursor-default hover:-translate-y-1",
            config.glow,
            "animate-fade-scale",
          ].join(" ")}
        >
          {/* Subtle top-right glow blob */}
          <div
            className={[
              "pointer-events-none absolute -top-4 -right-4 h-16 w-16 rounded-full opacity-20 blur-2xl",
              config.bg,
            ].join(" ")}
          />

          {/* Top row: label + icon */}
          <div className='mb-4 flex items-start justify-between gap-2'>
            <span className='text-text-muted text-[10px] leading-tight font-semibold tracking-[0.08em] uppercase'>
              {config.label}
            </span>
            <div className={`${config.bg} shrink-0 rounded-lg p-2`}>
              <config.icon size={14} className={config.color} />
            </div>
          </div>

          {/* Value */}
          <div
            className={`font-display text-3xl leading-none font-bold sm:text-4xl ${config.color}`}
            style={{
              animation: `numberRoll 0.5s ease ${0.3 + i * 0.07}s both`,
            }}
          >
            {config.format(stats?.[config.key] ?? 0)}
          </div>

          {/* Trend */}
          <p className={`mt-2 text-[11px] ${config.trendColor}`}>
            {config.trend}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
