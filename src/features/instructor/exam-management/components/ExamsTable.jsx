import Button from "@/components/Button";
import ExamActions from "@/components/ExamActions";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
// import useExamFilters from "@/hooks/useExamFilters";
import Empty from "@/components/Empty";
import useUser from "@/features/auth/hooks/useUser";
import useExamFilters from "@/hooks/useExamFilters";
import { formatDate } from "@/Utils/formatDate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useDeleteExam from "../hooks/useDeleteExam";
import useUpdateStatus from "../hooks/useUpdateStatus";
import DeleteExamModal from "./DeleteExamModal";
import { examColumns } from "./ExamColumns";
import FilterExamsModal from "./FilterExamsModal";
import useInstructorExams from "../hooks/useInstructorExams";

function ExamsTable() {
  const { user, isFetchingUser } = useUser();

  const { instructorExams, isFetchingInstructorExams } = useInstructorExams(
    user?.id,
  );

  const { deleteExam, isDeleting } = useDeleteExam();
  const [deletingId, setDeletingId] = useState(null);
  const { updateStatus } = useUpdateStatus();
  const navigate = useNavigate();

  const examData = instructorExams?.map((exam) => ({
    ...exam,
    startDate: formatDate(exam.start_date),
    endDate: formatDate(exam.end_date),
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
  const examToDelete = instructorExams?.find((e) => e.id === deletingId);

  useEffect(() => {
    // update status if end date is passed
    instructorExams?.forEach((e) => {
      console.log(e.end_date < new Date());
      if (e.status === "active" && new Date(e.end_date) < new Date()) {
        updateStatus(
          { examId: e.id, status: "closed" },
          {
            onSuccess: () => {
              toast.success("Expired exams have been updated");
            },
          },
        );
      }
    });
  }, [instructorExams, updateStatus]);

  if (isFetchingInstructorExams || !instructorExams || isFetchingUser)
    return <Loader />;

  if (!instructorExams?.length)
    return (
      <div className='flex h-full items-center justify-center p-6'>
        <Empty message='No exams found, create one now'>
          <Button
            onClick={() => navigate("/instructor/exam-wizard")}
            variation='primary'
            size='md'
            className='shadow-glow mt-8 transition-transform hover:scale-105'
          >
            + New Exam
          </Button>
        </Empty>
      </div>
    );

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

      {sortedExams?.length ? (
        <GenericTable
          key={searchParams.toString()}
          columns={columns}
          data={sortedExams}
        />
      ) : (
        <Empty message='No exams found' />
      )}

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
