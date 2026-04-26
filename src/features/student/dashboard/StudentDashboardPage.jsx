import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import StatsCards from "@/components/StatsCards";
import RecentExamsTable from "./components/RecentExamsTable";
import { ANSWERS_DATA_CONFIG, STUDENT_STATS_CONFIG } from "./constants";
import useStudentAnswerStats from "./hooks/useStudentAnswerStats";
import useStudentPerformance from "./hooks/useStudentPerformance";
import useStudentStats from "./hooks/useStudentStats";

function StudentDashboardPage() {
  const { studentStats, isStudentStatsFetching } = useStudentStats();
  const { studentPerformance, isStudentPerformanceFetching } =
    useStudentPerformance();
  const { studentAnswerStats, isStudentAnswerStatsFetching } =
    useStudentAnswerStats();

  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className='flex flex-col gap-6 p-4 sm:p-6'>
      {/* Header */}
      <div className='animate-fade-up'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='font-display text-text text-2xl font-semibold tracking-tight'>
              Dashboard
            </h1>
            <p className='text-text-muted mt-1 text-sm'>
              Track your performance and progress
            </p>
          </div>
          <span className='text-accent border-accent/20 bg-accent/8 hidden rounded-full border px-3 py-1 font-mono text-xs tracking-wide sm:block'>
            {date}
          </span>
        </div>
      </div>

      <StatsCards
        STATS_CONFIG={STUDENT_STATS_CONFIG}
        stats={studentStats}
        isLoading={isStudentStatsFetching}
      />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <LineChart
            data={studentPerformance}
            isLoading={isStudentPerformanceFetching}
            xKey='title'
          />
        </div>
        <div className='lg:col-span-1'>
          <PieChart
            DATA_CONFIG={ANSWERS_DATA_CONFIG}
            data={studentAnswerStats}
            isLoading={isStudentAnswerStatsFetching}
          />
        </div>
      </div>

      <div>
        <RecentExamsTable />
      </div>
    </div>
  );
}

export default StudentDashboardPage;
