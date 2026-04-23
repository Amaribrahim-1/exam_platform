import { fetchExamsHistory } from "../services/studentExamsHistoryApi";
import { useQuery } from "@tanstack/react-query";

function useStudentExamsHistory({ userId }) {
  const { data: studentExams, isPending: isFetchingStudentExams } = useQuery({
    queryKey: ["exams-history"],
    queryFn: () => fetchExamsHistory(userId),
    enabled: Boolean(userId),
  });

  return { studentExams, isFetchingStudentExams };
}

export default useStudentExamsHistory;
