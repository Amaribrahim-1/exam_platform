import { TrendingUp, BookOpen, Trophy, CheckCircle } from "lucide-react";

const mockStats = [
  {
    label: "Total Exams Taken",
    value: "24",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary",
  },
  {
    label: "Average Score",
    value: "78%",
    icon: TrendingUp,
    color: "text-[#60C8F5]",
    bg: "bg-[#60C8F5]/10",
    border: "border-[#60C8F5]",
  },
  {
    label: "Highest Score",
    value: "96%",
    icon: Trophy,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning",
  },
  {
    label: "Pass Rate",
    value: "85%",
    icon: CheckCircle,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent",
  },
];

function StatsCards({ stats = mockStats }) {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-surface ${stat.border} flex flex-col gap-6 rounded-lg border-t p-6`}
        >
          <div className='flex items-center justify-between'>
            <span className='text-text-muted text-xs font-medium tracking-widest uppercase'>
              {stat.label}
            </span>
            <div className={`${stat.bg} rounded-md p-2`}>
              <stat.icon size={15} className={stat.color} />
            </div>
          </div>
          <span className={`font-display text-4xl font-semibold ${stat.color}`}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
