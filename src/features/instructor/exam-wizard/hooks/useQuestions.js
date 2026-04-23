import { useQuery } from "@tanstack/react-query";
import { fetchExamQuestions } from "../../../../services/examApi";

//
function useQuestions(editingExamId) {
  const { data: questions, isPending: isFetchingQuestions } = useQuery({
    queryKey: ["questions", editingExamId],
    queryFn: () => fetchExamQuestions(editingExamId),
    enabled: Boolean(editingExamId),
  });

  return { questions, isFetchingQuestions };
}

export default useQuestions;
