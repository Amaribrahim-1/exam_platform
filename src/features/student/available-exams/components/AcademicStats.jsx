const stats = [
  { label: "Total Exams Taken", value: "24", color: "text-primary" },
  { label: "Average Score", value: "78.4%", color: "text-accent" },
  { label: "Highest Score", value: "98%", color: "text-warning" },
  { label: "Global Rank", value: "#142", color: "text-text" },
];

function AcademicStats() {
  return (
    <div className='bg-surface border-border flex flex-col gap-4 rounded-[12px] border p-6'>
      <h3 className='text-text text-base font-semibold'>Academic Stats</h3>
      <div className='flex flex-col gap-3'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='bg-surface-2 flex items-center justify-between rounded-[8px] px-4 py-3'
          >
            <span className='text-text-muted text-sm'>{stat.label}</span>
            <span className={`font-mono text-base font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AcademicStats;
