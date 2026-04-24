import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import StatsCards from "@/components/StatsCards";

function StudentDashboardPage() {
  return (
    <div className='flex flex-col gap-8'>
      <StatsCards />
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]'>
        <LineChart />
        <PieChart />
      </div>
    </div>
  );
}

export default StudentDashboardPage;
