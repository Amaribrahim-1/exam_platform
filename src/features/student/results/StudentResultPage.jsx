import Loader from "@/components/Loader";
import useUser from "@/features/auth/hooks/useUser";
import useResult from "@/hooks/useResult";
import { formatDate } from "@/Utils/formatDate";
import { useParams } from "react-router-dom";
import AnswerReviewSheet from "./components/AnswerReviewSheet";
import ResultSummaryCard from "./components/ResultSummaryCard";

// ── Main ─────────────────────────────────────────────────────────────────────
export default function StudentResultPage() {
  const { examId } = useParams();
  const { user } = useUser();
  const { examResults, isFetchingResults } = useResult({
    examId,
    userId: user.id,
  });

  if (isFetchingResults) return <Loader />;

  const { exams, submitted_at, answers } = examResults;

  return (
    <div className='bg-bg flex min-h-screen flex-col'>
      {/* Page header */}
      <div className='px-3 pb-5 sm:px-8'>
        <h1 className='font-display text-text text-2xl font-bold'>
          Results &amp; Analytics
        </h1>
        <p className='text-text-muted mt-1 text-sm'>
          {exams.title} · {exams.instructor_name} · {formatDate(submitted_at)}
          {}
        </p>
      </div>

      {/* Card */}
      <div className='px-3 pb-8 sm:px-8'>
        <ResultSummaryCard examResults={examResults} />
        <div className='pb-8'>
          <AnswerReviewSheet answers={answers} />
        </div>
      </div>
    </div>
  );
}
