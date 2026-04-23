import { fetchExamResults } from "../services/resultsApi";
import { useQuery } from "@tanstack/react-query";

function useResult({ submissionId, userId }) {
  const { data: examResults, isPending: isFetchingResults } = useQuery({
    queryKey: ["instructor-results", submissionId, userId],
    queryFn: () => fetchExamResults(submissionId, userId),
    enabled: Boolean(submissionId && userId),
  });

  return { examResults, isFetchingResults };
}

export default useResult;
