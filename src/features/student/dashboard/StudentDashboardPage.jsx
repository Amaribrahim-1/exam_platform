import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import StatsCards from "@/components/StatsCards";
import useStudentStats from "./hooks/useStudentStats";
import useStudentPerformance from "./hooks/useStudentPerformance";
import useStudentAnswerStats from "./hooks/useStudentAnswerStats";
import Loader from "@/components/Loader";

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

  if (
    isStudentStatsFetching ||
    isStudentPerformanceFetching ||
    isStudentAnswerStatsFetching
  ) {
    return <Loader />;
  }

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

      <StatsCards stats={studentStats} />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <LineChart data={studentPerformance} />
        </div>
        <div className='lg:col-span-1'>
          <PieChart data={studentAnswerStats} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;
