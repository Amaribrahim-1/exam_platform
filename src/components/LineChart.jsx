import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "./Loader";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className='bg-surface-2 border-border rounded-xl border px-4 py-3 shadow-lg'>
      <p className='text-text-muted mb-1 text-xs'>{label}</p>
      <p className='font-display text-primary text-xl font-semibold'>
        {payload[0].value}%
      </p>
    </div>
  );
};

const CustomDot = (props) => {
  const { cx, cy, index, dataLength } = props;
  const isLast = index === dataLength - 1;
  return (
    <g>
      {isLast && (
        <circle
          cx={cx}
          cy={cy}
          r={10}
          fill='#6C8EF5'
          opacity={0.12}
          style={{ animation: "pulseRing 2s ease-in-out infinite" }}
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={isLast ? 5 : 4}
        fill={isLast ? "#6C8EF5" : "#0F1117"}
        stroke='#6C8EF5'
        strokeWidth={2}
        style={{
          animation: `dotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.9 + index * 0.08}s both`,
        }}
      />
    </g>
  );
};

function LineChart({ data = [], isLoading }) {
  if (isLoading) return <Loader />;
  return (
    <div className='bg-surface border-border relative h-full overflow-hidden rounded-2xl border p-5 sm:p-6'>
      {/* BG glow */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(108,142,245,0.06)_0%,transparent_70%)]' />

      <div className='relative'>
        <h3 className='font-display text-text text-sm font-semibold sm:text-base'>
          Performance Over Time
        </h3>
        <p className='text-text-muted mt-0.5 mb-5 text-xs'>
          Score trend across recent exams
        </p>

        <ResponsiveContainer width='100%' height={240}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 4, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id='lineAreaGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#6C8EF5' stopOpacity={0.3} />
                <stop offset='100%' stopColor='#6C8EF5' stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray='3 4'
              stroke='#2E3250'
              strokeWidth={0.5}
              vertical={false}
            />

            <XAxis
              dataKey='date'
              tick={{
                fill: "#7B82A8",
                fontSize: 11,
                fontFamily: "JetBrains Mono",
              }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 20, right: 20 }}
              interval='preserveStartEnd'
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "#7B82A8",
                fontSize: 11,
                fontFamily: "JetBrains Mono",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={38}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#6C8EF5",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />

            <Area
              type='monotone'
              dataKey='score'
              stroke='#6C8EF5'
              strokeWidth={2}
              fill='url(#lineAreaGrad)'
              dot={(props) => <CustomDot {...props} dataLength={data.length} />}
              activeDot={{ r: 6, fill: "#6C8EF5", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChart;
