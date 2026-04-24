import useUser from "@/features/auth/hooks/useUser";

import Button from "@/components/Button";
import Empty from "@/components/Empty";
import ExamActions from "@/components/ExamActions";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import FilterExamsModal from "@/features/instructor/exam-management/components/FilterExamsModal";
import useExamFilters from "@/hooks/useExamFilters";
import { formatDate } from "@/Utils/formatDate";
import { useNavigate } from "react-router-dom";
import { studentExamsColumns } from "./components/StudentExamsColumns";
import useStudentExamsHistory from "./hooks/useStudentExamsHistory";
import { formatTime } from "@/Utils/formatTime";

function StudentExamsHistoryPage() {
  const { user } = useUser();
  const { studentExams, isFetchingStudentExams } = useStudentExamsHistory({
    userId: user.id,
  });

  const navigate = useNavigate();

  const examColumns = studentExamsColumns();

  const examData = studentExams?.map((exam) => ({
    title: exam.exams.title,
    subject: exam.exams.subject,
    instructorName: exam.exams.instructor_name,
    difficulty: exam.exams.difficulty.toLowerCase(),
    score: `${Math.round((exam.total_score / exam.full_mark) * 100)} %`,
    timeTaken: formatTime(exam.time_taken),
    submittedAt: formatDate(exam.submitted_at),
    status: exam.status,
    id: exam.exams.id,
  }));

  const {
    search,
    setSearch,
    isFilterOpen,
    setIsFilterOpen,
    searchParams,
    setSearchParams,
    sortedExams,
  } = useExamFilters(
    examData,
    [{ key: "status" }, { key: "subject" }, { key: "instructors" }],
    false,
  );

  const subjects = [
    "All",
    ...new Set(studentExams?.map((exam) => exam.exams.subject)),
  ];
  const instructors = [
    "All",
    ...new Set(studentExams?.map((exam) => exam.exams.instructor_name)),
  ];

  const tabs = [
    { id: "difficulty", label: "Difficulty" },
    { id: "subject", label: "Subject" },
    { id: "status", label: "Status" },
    { id: "instructors", label: "Instructors" },
  ];

  const lists = {
    difficulty: ["All", "Easy", "Medium", "Hard"],
    subject: subjects,
    instructors: instructors,
    status: ["All", "Passed", "Failed"],
  };

  if (isFetchingStudentExams || !studentExams) return <Loader />;

  if (!studentExams?.length)
    return (
      <div className='flex h-full items-center justify-center p-6'>
        <Empty message='No exams found, take an exam'>
          <Button
            onClick={() => navigate("/student/exams")}
            variation='primary'
            size='md'
            className='shadow-glow mt-8 transition-transform hover:scale-105'
          >
            Take an Exam
          </Button>
        </Empty>
      </div>
    );

  return (
    <div className='gap-md flex flex-col'>
      <ExamActions
        search={search}
        setSearch={setSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onFilterOpen={() => setIsFilterOpen(true)}
        isSortEnabled={false}
      />

      {isFilterOpen && (
        <Modal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          title='Filter By'
          pad={false}
        >
          <FilterExamsModal
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            // subjects={subjects}
            setIsFilterOpen={setIsFilterOpen}
            tabs={tabs}
            lists={lists}
          />
        </Modal>
      )}

      {sortedExams?.length ? (
        <GenericTable
          key={searchParams.toString()}
          columns={examColumns}
          data={sortedExams}
        />
      ) : (
        <Empty message='No exams found' />
      )}
    </div>
  );
}

export default StudentExamsHistoryPage;
