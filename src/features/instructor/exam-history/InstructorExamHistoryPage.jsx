import useUser from "@/features/auth/hooks/useUser";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import { formatDate } from "@/Utils/formatDate";
import useExamFilters from "@/hooks/useExamFilters";
import ExamActions from "@/components/ExamActions";
import Modal from "@/components/Modal";
import FilterExamsModal from "@/features/instructor/exam-management/components/FilterExamsModal";
import Empty from "@/components/Empty";
import { instructorHistoryColumns } from "./components/instructorHistoryColumns";
import useInstructorHistory from "./hooks/useInstructorExamsHistory";

function InstructorExamHistoryPage() {
  const { user } = useUser();
  const { examResults, isFetchingResults } = useInstructorHistory(user.id);

  const columns = instructorHistoryColumns();

  const examData = examResults?.map((exam) => ({
    title: exam.title,
    subject: exam.subject,
    difficulty: exam.difficulty,
    studentName: exam.student_name,
    department: exam.department,
    grade: exam.grade,
    score: `${exam.score_percentage} %`,
    status: exam.status,
    reason: exam.reason,
    submittedAt: formatDate(exam.submitted_at),
    examId: exam.exam_id,
    studentId: exam.user_id,
    submissionId: exam.id,
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
    [
      { key: "status" },
      { key: "subject" },
      { key: "difficulty" },
      { key: "grade" },
      { key: "department" },
      { key: "reason" },
    ],
    false,
    "studentName",
  );

  const subjects = ["All", ...new Set(examResults?.map((e) => e.subject))];

  const tabs = [
    { id: "difficulty", label: "Difficulty" },
    { id: "subject", label: "Subject" },
    { id: "status", label: "Status" },
    { id: "grade", label: "Grade" },
    { id: "reason", label: "Reason" },
    { id: "department", label: "Department" },
  ];

  const lists = {
    difficulty: ["All", "Easy", "Medium", "Hard"],
    subject: subjects,
    status: ["All", "Passed", "Failed"],
    grade: ["All", "Grade 1", "Grade 2", "Grade 3", "Grade 4"],
    reason: ["All", "Manual", "Time Up", "Cheat"],
    department: [
      "All",
      "Computer Science",
      "Information Systems",
      "Information Technology",
    ],
  };

  if (isFetchingResults || !examResults) return <Loader />;

  if (!examResults?.length)
    return (
      <div className='flex h-full items-center justify-center p-6'>
        <Empty message='No results found' />
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
        searchKey={"Student Name"}
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
            setIsFilterOpen={setIsFilterOpen}
            tabs={tabs}
            lists={lists}
          />
        </Modal>
      )}

      {sortedExams?.length ? (
        <GenericTable
          key={searchParams.toString()}
          columns={columns}
          data={sortedExams}
        />
      ) : (
        <Empty message='No results found' />
      )}
    </div>
  );
}

export default InstructorExamHistoryPage;
