import { useQuery } from "@tanstack/react-query";
import { recentExams as recentExamsApi } from "../services/studentDashboardApi";
import useUser from "@/features/auth/hooks/useUser";

function useRecentExams() {
  const { user } = useUser();
  const { data: recentExams, isFetching: isRecentExamsFetching } = useQuery({
    queryKey: ["recentExams", user?.id],
    queryFn: () => recentExamsApi(user?.id),
    enabled: Boolean(user?.id),
  });

  return { recentExams, isRecentExamsFetching };
}

export default useRecentExams;
