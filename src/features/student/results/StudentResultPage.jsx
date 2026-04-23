import ResultPage from "@/components/ResultPage";
import useUser from "@/features/auth/hooks/useUser";
import useStudentResult from "@/features/student/results/hooks/useStudentResult";
import { useParams } from "react-router-dom";

export default function StudentResultPage() {
  const { examId } = useParams();
  const { user } = useUser();
  const { examResults, isFetchingResults } = useStudentResult({
    examId,
    userId: user.id,
  });

  return (
    <ResultPage
      examResults={examResults}
      isFetchingResults={isFetchingResults}
    />
  );
}
