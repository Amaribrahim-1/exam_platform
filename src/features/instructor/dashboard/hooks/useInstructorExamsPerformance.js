import useUser from "@/features/auth/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getInstructorExamsPerformance } from "../services/instructorDashboardApi";

function useInstructorExamsPerformance() {
  const { user } = useUser();
  const {
    data: instructorExamsPerformance,
    isFetching: isInstructorExamsPerformanceFetching,
  } = useQuery({
    queryKey: ["instructorExamsPerformance", user?.id],
    queryFn: () => getInstructorExamsPerformance(user?.id),
    enabled: Boolean(user?.id),
    retry: 2,
  });

  return { instructorExamsPerformance, isInstructorExamsPerformanceFetching };
}

export default useInstructorExamsPerformance;
