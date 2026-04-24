import useUser from "@/features/auth/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getStudentPerformanceOverTime } from "../services/studentDashboardApi";

function useStudentPerformance() {
  const { user } = useUser();
  const { data: studentPerformance, isFetching: isStudentPerformanceFetching } =
    useQuery({
      queryKey: ["studentPerformance", user?.id],
      queryFn: () => getStudentPerformanceOverTime(user?.id),
      enabled: Boolean(user?.id),
    });

  return { studentPerformance, isStudentPerformanceFetching };
}

export default useStudentPerformance;
