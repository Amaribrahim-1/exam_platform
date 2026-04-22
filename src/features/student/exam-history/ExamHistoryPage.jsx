import useUser from "@/features/auth/hooks/useUser";

import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import { formatDate } from "@/Utils/formatDate";
import { studentExamsColumns } from "./components/StudentExamsColumns";
import useExamHistory from "./hooks/useExamHistory";

function ExamHistoryPage() {
  const { user } = useUser();
  const { studentExams, isFetchingStudentExams } = useExamHistory({
    userId: user.id,
  });

  if (isFetchingStudentExams) return <Loader />;

  const examColumns = studentExamsColumns();

  const examData = studentExams?.map((exam) => ({
    title: exam.exams.title,
    instructorName: exam.exams.instructor_name,
    difficulty: exam.exams.difficulty,
    score: `${Math.round((exam.total_score / exam.full_mark) * 100)} %`,
    submittedAt: formatDate(exam.submitted_at),
    isPassed: exam.is_passed ? "Passed" : "Failed",
    id: exam.exams.id,
  }));

  return (
    <div>
      <GenericTable columns={examColumns} data={examData} />
    </div>
  );
}

export default ExamHistoryPage;
