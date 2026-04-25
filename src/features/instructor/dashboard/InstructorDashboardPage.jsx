import StatsCards from "@/components/StatsCards";
import useInstructorStats from "./hooks/useInstructorStats";
import { INSTRUCTOR_PIE_CONFIG, INSTRUCTOR_STATS_CONFIG } from "./constantns";
import useInstructorExamsPerformance from "./hooks/useInstructorExamsPerformance";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import RecentExamsTable from "./components/RecentExamsTable";

function InstructorDashboardPage() {
  const { instructorStats, isInstructorStatsFetching } = useInstructorStats();
  const { instructorExamsPerformance, isInstructorExamsPerformanceFetching } =
    useInstructorExamsPerformance();

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
        STATS_CONFIG={INSTRUCTOR_STATS_CONFIG}
        stats={instructorStats}
        isLoading={isInstructorStatsFetching}
      />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <LineChart
            data={instructorExamsPerformance}
            isLoading={isInstructorExamsPerformanceFetching}
            xKey='date'
            yKey='average'
            title='Exams Performance Over Time'
            subtitle='Average score per exam'
          />
        </div>
        <div className='lg:col-span-1'>
          <PieChart
            DATA_CONFIG={INSTRUCTOR_PIE_CONFIG}
            data={instructorStats?.submissionsBreakdown}
            isLoading={isInstructorStatsFetching}
            title='Submissions Breakdown'
            subtitle='Pass vs fail rate'
          />
        </div>
      </div>

      <div>
        {/* // Delete Nav, add logout to sidebar, add Avg Score Passed to instructor students  */}
        <RecentExamsTable />
      </div>
    </div>
  );
}

export default InstructorDashboardPage;
