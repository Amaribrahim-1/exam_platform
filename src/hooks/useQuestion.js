import { useQuery } from "@tanstack/react-query";
import { fetchExamQuestions } from "../services/examApi";

function useExamQuestions(examId) {
  const {
    data: examQuestions,
    isPending,
    fetchStatus,
  } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => fetchExamQuestions(examId),
    enabled: Boolean(examId),
  });

  const isFetchingQuestions = isPending && fetchStatus === "fetching";
  return { examQuestions, isFetchingQuestions };
}

export default useExamQuestions;
