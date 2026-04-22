import { fetchExamResults } from "@/services/resultsApi";
import { useQuery } from "@tanstack/react-query";

function useExamHistory({ userId }) {
  const { data: studentExams, isPending: isFetchingStudentExams } = useQuery({
    queryKey: ["exams-history"],
    queryFn: () => fetchExamResults(userId),
    enabled: Boolean(userId),
  });

  return { studentExams, isFetchingStudentExams };
}

export default useExamHistory;
