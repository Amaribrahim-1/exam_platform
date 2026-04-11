import { useQuery } from "@tanstack/react-query";
import { fetchExamQuestions } from "../services/examApi";

//
function useQuestions() {
  const { data: questions, isPending: isFetchingQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchExamQuestions("3e5563f5-760f-4eb2-b3e3-01c904e89385"),
  });

  return { questions, isFetchingQuestions };
}

export default useQuestions;
