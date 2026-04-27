import StatsCards from "@/components/StatsCards";
import useAdminStats from "./hooks/useAdminStats";
import { ADMIN_PIE_CONFIG, ADMIN_STATS_CONFIG } from "./constants";
import useAdminPlatformActivity from "./hooks/useAdminPlatformActivity";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import RecentActivityTable from "./components/RecentActivityTable";

function AdminDashboardPage() {
  const { adminStats, isAdminStatsFetching } = useAdminStats();
  const { platformActivity, isPlatformActivityFetching } =
    useAdminPlatformActivity();

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
              Platform Overview and Statistics
            </p>
          </div>
          <span className='text-accent border-accent/20 bg-accent/8 hidden rounded-full border px-3 py-1 font-mono text-xs tracking-wide sm:block'>
            {date}
          </span>
        </div>
      </div>

      <StatsCards
        STATS_CONFIG={ADMIN_STATS_CONFIG}
        stats={adminStats}
        isLoading={isAdminStatsFetching}
      />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <LineChart
            data={platformActivity}
            isLoading={isPlatformActivityFetching}
            xKey='title'
            yKey='average'
            title='Platform Exams Performance'
            subtitle='Average score across recent exams'
          />
        </div>
        <div className='lg:col-span-1'>
          <PieChart
            DATA_CONFIG={ADMIN_PIE_CONFIG}
            data={adminStats?.submissionsBreakdown}
            isLoading={isAdminStatsFetching}
            title='Overall Pass/Fail Rate'
            subtitle='Platform-wide submissions'
          />
        </div>
      </div>

      <div>
        <RecentActivityTable />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
