import Button from "@/components/Button";
import ExamActions from "@/components/ExamActions";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
// import useExamFilters from "@/hooks/useExamFilters";
import useExamFilters from "@/hooks/useExamFilters";
import { formatExamDate } from "@/Utils/formatDate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteExam from "../hooks/useDeleteExam";
import useExams from "../hooks/useExams";
import DeleteExamModal from "./DeleteExamModal";
import { examColumns } from "./ExamColumns";
import FilterExamsModal from "./FilterExamsModal";

function ExamsTable() {
  const { exams, isFetching } = useExams();
  const { deleteExam, isDeleting } = useDeleteExam();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const examData = exams?.map((exam) => ({
    ...exam,
    startDate: formatExamDate(exam.start_date),
    endDate: formatExamDate(exam.end_date),
    duration: `${exam.duration} min`,
  }));

  const {
    search,
    setSearch,
    isFilterOpen,
    setIsFilterOpen,
    searchParams,
    setSearchParams,
    sortedExams,
  } = useExamFilters(examData, [{ key: "status" }]);

  const subjects = ["All", ...new Set(examData?.map((e) => e.subject))];

  const tabs = [
    { id: "difficulty", label: "Difficulty" },
    { id: "subject", label: "Subject" },
    { id: "status", label: "Status" },
  ];

  const lists = {
    difficulty: ["All", "Easy", "Medium", "Hard"],
    subject: subjects,
    status: ["All", "Active", "Draft", "Closed"],
  };

  const columns = examColumns(setDeletingId);
  const examToDelete = exams?.find((e) => e.id === deletingId);

  if (isFetching || !exams) return <Loader />;

  return (
    <div className='space-y-10'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold'>Exam Management</h1>
          <p className='text-text-muted'>
            Manage, edit, and track all your exams.
          </p>
        </div>
        <Button
          onClick={() => navigate("/instructor/exam-wizard")}
          variation='primary'
          size='md'
        >
          + New Exam
        </Button>
      </div>

      <ExamActions
        search={search}
        setSearch={setSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onFilterOpen={() => setIsFilterOpen(true)}
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
            subjects={subjects}
            setIsFilterOpen={setIsFilterOpen}
            tabs={tabs}
            lists={lists}
          />
        </Modal>
      )}

      <GenericTable
        key={searchParams.toString()}
        columns={columns}
        data={sortedExams}
      />

      <Modal
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        title='Delete Exam'
        actions={
          <>
            <button
              onClick={() => setDeletingId(null)}
              className='border-border text-text hover:bg-surface/50 cursor-pointer rounded-lg border px-4 py-2 font-medium transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteExam(deletingId);
                setDeletingId(null);
              }}
              disabled={isDeleting}
              className='bg-danger/20 text-danger border-danger/30 hover:bg-danger/30 cursor-pointer rounded-lg border px-4 py-2 font-medium transition-colors disabled:opacity-50'
            >
              {isDeleting ? "Deleting..." : "Delete Exam"}
            </button>
          </>
        }
      >
        <DeleteExamModal examToDelete={examToDelete} />
      </Modal>
    </div>
  );
}

export default ExamsTable;
