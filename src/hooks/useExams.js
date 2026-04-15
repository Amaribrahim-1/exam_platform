import { useQuery } from "@tanstack/react-query";
import { fetchExams } from "../services/examApi";

function useExams(instructorId = null) {
  let queryFn = instructorId
    ? () => fetchExams(instructorId)
    : () => fetchExams();

  const { data: exams, isPending: isFetching } = useQuery({
    queryKey: ["exams", instructorId],
    queryFn: queryFn,

    refetchIntervalInBackground: false,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  return { exams, isFetching };
}

export default useExams;
