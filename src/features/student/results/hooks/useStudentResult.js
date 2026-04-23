import { fetchExamResult } from "../services/examResultsApi";
import { useQuery } from "@tanstack/react-query";

function useStudentResult({ examId, userId }) {
  const { data: examResults, isPending: isFetchingResults } = useQuery({
    queryKey: ["results", examId, userId],
    queryFn: () => fetchExamResult(examId, userId),
    enabled: Boolean(examId && userId),
  });

  return { examResults, isFetchingResults };
}

export default useStudentResult;
