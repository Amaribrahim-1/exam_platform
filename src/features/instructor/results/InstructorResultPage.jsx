import useUser from "@/features/auth/hooks/useUser";
import { useParams } from "react-router-dom";
import useResult from "./hooks/useResult";
import ResultPage from "@/components/ResultPage";

export default function InstructorResultPage() {
  const { submissionId } = useParams();
  const { user } = useUser();
  const { examResults, isFetchingResults } = useResult({
    submissionId,
    userId: user.id,
  });

  examResults;

  return (
    <ResultPage
      examResults={examResults}
      isFetchingResults={isFetchingResults}
    />
  );
}
