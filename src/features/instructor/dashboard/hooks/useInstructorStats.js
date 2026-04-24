import useUser from "@/features/auth/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getInstructorDashboardStats } from "../services/instructorDashboardApi";

function useInstructorStats() {
  const { user } = useUser();
  const { data: instructorStats, isFetching: isInstructorStatsFetching } =
    useQuery({
      queryKey: ["instructorStats", user?.id],
      queryFn: () => getInstructorDashboardStats(user?.id),
      enabled: Boolean(user?.id),
      retry: 2,
    });

  return { instructorStats, isInstructorStatsFetching };
}

export default useInstructorStats;
