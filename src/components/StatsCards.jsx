import Loader from "./Loader";

function StatsCards({ STATS_CONFIG, stats, isLoading }) {
  if (isLoading) return <Loader />;
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
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
