import { useQuery } from "@tanstack/react-query";
import { fetchExams } from "../services/examApi";

function useExams() {
  const { data: exams, isPending: isFetching } = useQuery({
    queryKey: ["studentExams"],
    queryFn: fetchExams,

    retry: 2,
    // refetchIntervalInBackground: false,
    // refetchInterval: 10000,
    // refetchOnWindowFocus: true,
  });

  return { exams, isFetching };
}

export default useExams;
