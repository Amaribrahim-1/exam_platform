import { fetchExamResults } from "@/services/resultsApi";
import { useQuery } from "@tanstack/react-query";

function useResult({ examId, userId }) {
  const { data: examResults, isPending: isFetchingResults } = useQuery({
    queryKey: ["results", examId, userId],
    queryFn: () => fetchExamResults(examId, userId),
    enabled: Boolean(examId && userId),
  });

  return { examResults, isFetchingResults };
}

export default useResult;
