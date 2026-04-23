import { useQuery } from "@tanstack/react-query";
import { fetchExamHistoryPerInstructor } from "../services/instructorExamsHistoryApi";

function useInstructorHistory(userId) {
  const { data: examResults, isPending: isFetchingResults } = useQuery({
    queryKey: ["examResults", userId],
    queryFn: () => fetchExamHistoryPerInstructor(userId),
    enabled: Boolean(userId),
  });

  return { examResults, isFetchingResults };
}

export default useInstructorHistory;
