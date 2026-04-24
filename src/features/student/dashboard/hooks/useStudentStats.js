import useUser from "@/features/auth/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getStudentDashboardStats } from "../services/studentDashboardApi";

function useStudentStats() {
  const { user } = useUser();
  const { data: studentStats, isFetching: isStudentStatsFetching } = useQuery({
    queryKey: ["studentStats", user?.id],
    queryFn: () => getStudentDashboardStats(user?.id),
    enabled: Boolean(user?.id),
  });

  return { studentStats, isStudentStatsFetching };
}

export default useStudentStats;
