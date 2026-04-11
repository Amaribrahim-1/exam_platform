import { useQuery } from "@tanstack/react-query";
import { fetchExams } from "../services/examApi";

function useExams() {
  const { data: exams, isPending: isFetching } = useQuery({
    queryKey: ["exams"],
    queryFn: fetchExams,
  });

  return { exams, isFetching };
}

export default useExams;
