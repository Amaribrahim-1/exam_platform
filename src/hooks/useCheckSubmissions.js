import { useQuery } from "@tanstack/react-query";
import { checkExamHasSubmissions } from "@/services/examApi";

export default function useCheckSubmissions(examId) {
  const { data: hasSubmissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ["exam-submissions", examId],
    queryFn: () => checkExamHasSubmissions(examId),
    enabled: Boolean(examId),
  });

  return { hasSubmissions, isLoadingSubmissions };
}
