import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { date: "Oct 5", score: 65 },
  { date: "Oct 18", score: 72 },
  { date: "Nov 2", score: 70 },
  { date: "Nov 20", score: 80 },
  { date: "Dec 8", score: 75 },
  { date: "Jan 3", score: 85 },
  { date: "Jan 25", score: 82 },
  { date: "Feb 10", score: 90 },
  { date: "Mar 1", score: 88 },
  { date: "Mar 20", score: 96 },
];

function LineChart({ data = mockData }) {
  return (
    <div className='bg-surface border-border rounded-lg border p-6'>
      <h3 className='font-display text-text mb-6 text-lg font-semibold'>
        Performance Over Time
      </h3>
      <ResponsiveContainer width='100%' height={300}>
        <RechartsLineChart data={data}>
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#2E3250'
            vertical={false}
          />
          <XAxis
            dataKey='date'
            tick={{ fill: "#7B82A8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 30 }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#7B82A8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1D2E",
              border: "1px solid #2E3250",
              borderRadius: "8px",
              color: "#E8EAF6",
            }}
            formatter={(value) => [`${value}%`, "Score"]}
          />
          <Line
            type='monotone'
            dataKey='score'
            stroke='#6C8EF5'
            strokeWidth={2}
            dot={{ fill: "#6C8EF5", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
