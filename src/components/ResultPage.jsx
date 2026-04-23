import { formatDate } from "@/Utils/formatDate";
import Loader from "./Loader";
import ResultSummaryCard from "./ResultSummaryCard";
import AnswerReviewSheet from "./AnswerReviewSheet";

function ResultPage({ examResults, isFetchingResults }) {
  if (isFetchingResults) return <Loader />;

  const { exams, submitted_at, answers } = examResults;

  return (
    <div className='bg-bg flex min-h-screen flex-col'>
      <div className='px-3 pb-5 sm:px-8'>
        <h1 className='font-display text-text text-2xl font-bold'>
          Results & Analytics
        </h1>
        <p className='text-text-muted mt-1 text-sm'>
          {exams.title} · {exams.instructor_name} · {formatDate(submitted_at)}
        </p>
      </div>
      <div className='px-3 pb-8 sm:px-8'>
        <ResultSummaryCard examResults={examResults} />
        <div className='pb-8'>
          <AnswerReviewSheet answers={answers} />
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
