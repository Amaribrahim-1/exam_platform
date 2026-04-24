import LineChart from "@/components/LineChart";
import StatsCards from "@/components/StatsCards";

function StudentDashboardPage() {
  return (
    <div className='flex flex-col gap-8'>
      <StatsCards />
      <LineChart />
    </div>
  );
}

export default StudentDashboardPage;
