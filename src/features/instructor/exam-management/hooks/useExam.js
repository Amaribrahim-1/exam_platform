import { useQuery } from "@tanstack/react-query";
import { fetchExam } from "../../../../services/examApi";

function useExam(examId) {
  const {
    data: exam,
    isPending,
    fetchStatus,
  } = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => fetchExam(examId),
    enabled: Boolean(examId),
  });

  const isFetchingExam = isPending && fetchStatus === "fetching";
  return { exam, isFetchingExam };
}

export default useExam;
