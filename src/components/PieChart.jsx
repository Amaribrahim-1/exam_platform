import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "./Loader";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className='bg-surface-2 border-border rounded-xl border px-4 py-3 shadow-lg'>
      <p className='text-text-muted mb-1 text-xs'>{payload[0].name}</p>
      <p className='font-display text-text text-xl font-semibold'>
        {payload[0].value}
      </p>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill='rgb(255, 255, 255)'
      textAnchor='middle'
      dominantBaseline='central'
      fontSize={12}
      fontFamily='JetBrains Mono'
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieChart({
  DATA_CONFIG,
  data,
  isLoading,
  title = "Answers Breakdown",
  subtitle = "Distribution by outcome",
}) {
  if (isLoading) return <Loader />;
  const chartData = DATA_CONFIG.map((config) => ({
    ...config,
    value: data?.[config.key] ?? 0,
  }));
  const total = chartData.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className='bg-surface border-border relative h-full overflow-hidden rounded-2xl border p-5 sm:p-6'>
      {/* BG glow */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(94,207,177,0.05)_0%,transparent_70%)]' />

      <div className='relative'>
        <h3 className='font-display text-text text-sm font-semibold sm:text-base'>
          {title}
        </h3>
        <p className='text-text-muted mt-0.5 mb-5 text-xs'>{subtitle}</p>

        {/* Pie + legend stacked on mobile, side-by-side on sm+ */}
        <div className='flex flex-col items-center gap-5 sm:flex-row sm:items-center'>
          {/* Donut */}
          <div className='relative shrink-0'>
            <ResponsiveContainer width={160} height={160}>
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx='50%'
                  cy='50%'
                  innerRadius={52}
                  outerRadius={76}
                  dataKey='value'
                  strokeWidth={0}
                  labelLine={false}
                  // label={renderCustomLabel}
                  isAnimationActive
                  animationBegin={400}
                  animationDuration={900}
                  animationEasing='ease-out'
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.key}
                      fill={entry.hex}
                      style={{
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>

            {/* Center total */}
            <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
              <span className='font-display text-text text-2xl leading-none font-bold'>
                {total}
              </span>
              <span className='text-text-muted mt-0.5 text-[10px]'>Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className='flex w-full flex-col gap-3 sm:gap-4'>
            {chartData.map((entry, i) => (
              <div
                key={entry.key}
                className='flex items-center justify-between'
                style={{
                  animation: `slideIn 0.4s ease ${0.6 + i * 0.1}s both`,
                }}
              >
                <div className='flex items-center gap-2.5'>
                  <div
                    className='h-2 w-2 shrink-0 rounded-full'
                    style={{ backgroundColor: entry.hex }}
                  />
                  <span className='text-text-muted text-xs'>{entry.name}</span>
                </div>
                <div className='flex items-baseline gap-2'>
                  <span className='font-display text-text text-lg leading-none font-semibold'>
                    {entry.value}
                  </span>
                  <span className='text-text-faint font-mono text-[11px]'>
                    {total > 0 ? Math.round((entry.value / total) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}

            {/* Mini progress bars */}
            <div className='mt-1 flex flex-col gap-2'>
              {chartData.map((entry) => (
                <div
                  key={entry.key}
                  className='bg-surface-2 h-1 w-full overflow-hidden rounded-full'
                >
                  <div
                    className='h-full rounded-full transition-all duration-700'
                    style={{
                      width:
                        total > 0 ? `${(entry.value / total) * 100}%` : "0%",
                      backgroundColor: entry.hex,
                      opacity: 1,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
