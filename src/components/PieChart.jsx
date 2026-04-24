import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { name: "Correct", value: 120, color: "#5ECFB1" },
  { name: "Wrong", value: 45, color: "#E05C6A" },
  { name: "Skipped", value: 18, color: "#7B82A8" },
];

function PieChart({ data = mockData }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className='bg-surface border-border rounded-lg border p-6'>
      <h3 className='font-display text-text mb-6 text-lg font-semibold'>
        Answers Breakdown
      </h3>
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <ResponsiveContainer width={200} height={200}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={90}
                dataKey='value'
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1A1D2E",
                  border: "1px solid #2E3250",
                  borderRadius: "8px",
                  color: "#E8EAF6",
                }}
                formatter={(value) => [value, ""]}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-text font-display text-2xl font-semibold'>
              {total}
            </span>
            <span className='text-text-muted text-xs'>Total</span>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          {data.map((entry) => (
            <div key={entry.name} className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <div
                  className='h-2 w-2 rounded-full'
                  style={{ backgroundColor: entry.color }}
                />
                <span className='text-text-muted text-sm'>{entry.name}</span>
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-text text-xl font-semibold'>
                  {entry.value}
                </span>
                <span className='text-text-muted text-xs'>
                  {Math.round((entry.value / total) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PieChart;
