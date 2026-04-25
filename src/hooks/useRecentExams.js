import { useQuery } from "@tanstack/react-query";
import { recentExams as recentExamsApiStudent } from "../features/student/dashboard/services/studentDashboardApi";
import { recentExams as recentExamsApiInstructor } from "../features/instructor/dashboard/services/instructorDashboardApi";
import useUser from "@/features/auth/hooks/useUser";

function useRecentExams() {
  const { user } = useUser();

  const queryFn =
    user?.role === "student" ? recentExamsApiStudent : recentExamsApiInstructor;

  const { data: recentExams, isFetching: isRecentExamsFetching } = useQuery({
    queryKey: ["recentExams", user?.id],
    queryFn: () => queryFn(user?.id),
    enabled: Boolean(user?.id),
  });

  return { recentExams, isRecentExamsFetching };
}

export default useRecentExams;
