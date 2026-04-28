import Button from "@/components/Button";
import ExamActions from "@/components/ExamActions";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import Empty from "@/components/Empty";
import useUser from "@/features/auth/hooks/useUser";
import useExamFilters from "@/hooks/useExamFilters";
import { formatDate } from "@/Utils/formatDate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCheckSubmissions from "@/hooks/useCheckSubmissions";
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
  const [selectedAction, setSelectedAction] = useState({ type: null, examId: null });
  const { updateStatus } = useUpdateStatus();
  const navigate = useNavigate();

  const { hasSubmissions, isLoadingSubmissions } = useCheckSubmissions(selectedAction.examId);

  useEffect(() => {
    // Auto-navigate to edit page if it's an edit action and there are no submissions
    if (selectedAction.type === "edit" && !isLoadingSubmissions && hasSubmissions === false) {
      navigate(`/instructor/exam-wizard/${selectedAction.examId}`);
      setSelectedAction({ type: null, examId: null });
    }
  }, [selectedAction, isLoadingSubmissions, hasSubmissions, navigate]);

  const examData = instructorExams?.map((exam) => ({
    ...exam,
    startDate: formatDate(exam.start_date),
    endDate: formatDate(exam.end_date),
    duration: `${exam.duration} min`,
    difficulty: exam.difficulty?.toLowerCase(),
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

  const examsCount = sortedExams?.length;

  const columns = examColumns((type, examId) => setSelectedAction({ type, examId }));
  const examToDelete = instructorExams?.find((e) => e.id === selectedAction.examId);

  useEffect(() => {
    // Auto-close expired exams
    instructorExams?.forEach((e) => {
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
      <div className="flex h-full items-center justify-center p-6">
        <Empty message="No exams found, create one now">
          <Button
            onClick={() => navigate("/instructor/exam-wizard")}
            variation="primary"
            size="md"
            className="shadow-glow mt-8 transition-transform hover:scale-105"
          >
            + New Exam
          </Button>
        </Empty>
      </div>
    );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold sm:text-2xl">Exam Management</h1>
          <p className="text-text-muted mt-1 text-sm">
            {examsCount} {examsCount === 1 ? "exam" : "exams"} found, let&apos;s
            manage them
          </p>
        </div>
        <Button
          onClick={() => navigate("/instructor/exam-wizard")}
          variation="primary"
          size="md"
          className="w-full sm:w-auto"
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
          title="Filter By"
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
        <Empty message="No exams found" />
      )}

      <Modal
        isOpen={Boolean(selectedAction.type)}
        onClose={() => setSelectedAction({ type: null, examId: null })}
        title={
          hasSubmissions
            ? selectedAction.type === "delete"
              ? "Cannot Delete Exam"
              : "Cannot Edit Exam"
            : selectedAction.type === "delete"
              ? "Delete Exam"
              : "Loading..."
        }
        actions={
          hasSubmissions ? (
            <Button
              onClick={() => setSelectedAction({ type: null, examId: null })}
              variation="primary"
              size="md"
            >
              OK
            </Button>
          ) : selectedAction.type === "delete" && !isLoadingSubmissions ? (
            <>
              <Button
                onClick={() => setSelectedAction({ type: null, examId: null })}
                variation="secondary"
                size="md"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteExam(selectedAction.examId);
                  setSelectedAction({ type: null, examId: null });
                }}
                disabled={isDeleting || isLoadingSubmissions}
                variation="danger"
                size="md"
              >
                {isDeleting ? "Deleting..." : "Delete Exam"}
              </Button>
            </>
          ) : null
        }
      >
        {isLoadingSubmissions ? (
          <div className="flex items-center justify-center p-8">
            <Loader />
          </div>
        ) : hasSubmissions ? (
          <div className="flex flex-col items-center justify-center p-8 gap-4">
            <h2 className="text-xl font-bold text-red-600">Action Denied</h2>
            <p className="text-gray-600 text-center">
              This exam already has student submissions and cannot be {selectedAction.type === "delete" ? "deleted" : "edited"}.
            </p>
          </div>
        ) : selectedAction.type === "delete" ? (
          <DeleteExamModal examToDelete={examToDelete} />
        ) : null}
      </Modal>
    </div>
  );
}

export default ExamsTable;
