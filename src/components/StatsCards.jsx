import { cn } from "@/lib/utils";
import Loader from "./Loader";

function StatsCards({ STATS_CONFIG, stats, isLoading }) {
  if (isLoading) return <Loader />;
  return (
    <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
      {STATS_CONFIG.map((config, i) => (
        <div
          key={config.key}
          style={{ animationDelay: `${i * 0.07}s` }}
          className={cn(
            "bg-surface relative overflow-hidden rounded-2xl p-4 sm:p-5",
            "border border-border/70 border-t-2",
            config.border,
            "transition-all duration-300 ease-out",
            "cursor-default hover:-translate-y-1 hover:border-opacity-100",
            config.glow,
            "animate-fade-scale",
          )}
        >
          {/* Accent edge for stronger visual identity */}
          <div
            className={[
              "pointer-events-none absolute top-0 left-0 h-full w-0.5 opacity-65",
              config.accent ?? "bg-primary",
            ].join(" ")}
          />

          {/* Soft tint layer to make each card color distinct */}
          <div
            className={[
              "pointer-events-none absolute inset-[1px] rounded-[15px] opacity-30",
              config.bg,
            ].join(" ")}
          />

          {/* Subtle top-right glow blob */}
          <div
            className={[
              "pointer-events-none absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-30 blur-2xl",
              config.bg,
            ].join(" ")}
          />

          {/* Top row: label + icon */}
          <div className='relative mb-4 flex items-start justify-between gap-2'>
            <span className='text-text-muted text-[10px] leading-tight font-semibold tracking-[0.08em] uppercase'>
              {config.label}
            </span>
            <div
              className={`shrink-0 rounded-lg border border-white/5 p-2 ${config.bg}`}
            >
              <config.icon size={14} className={config.color} />
            </div>
          </div>

          {/* Value */}
          <div
            className={`relative font-display text-3xl leading-none font-bold sm:text-4xl ${
              config.key === "totalExams" ? "text-primary" : "text-text"
            }`}
            style={{
              animation: `numberRoll 0.5s ease ${0.3 + i * 0.07}s both`,
            }}
          >
            {config.format(stats?.[config.key] ?? 0)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
