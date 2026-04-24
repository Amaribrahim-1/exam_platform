import { useQuery } from "@tanstack/react-query";
import { getStudentAnswerStats } from "../services/studentDashboardApi";
import useUser from "@/features/auth/hooks/useUser";

function useStudentAnswerStats() {
  const { user } = useUser();
  const { data: studentAnswerStats, isFetching: isStudentAnswerStatsFetching } =
    useQuery({
      queryKey: ["studentAnswerStats", user?.id],
      queryFn: () => getStudentAnswerStats(user?.id),
      enabled: Boolean(user?.id),
    });

  return { studentAnswerStats, isStudentAnswerStatsFetching };
}

export default useStudentAnswerStats;
