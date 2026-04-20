import { useQuery } from "@tanstack/react-query";
import { fetchExamSession } from "../services/examSessionApi";

function useExamSession(examId) {
  const { data: examSession, isPending: isFetchingExamSession } = useQuery({
    queryKey: ["examSession", examId],
    queryFn: () => fetchExamSession(examId),
    enabled: Boolean(examId),
  });

  return { examSession, isFetchingExamSession };
}

export default useExamSession;
