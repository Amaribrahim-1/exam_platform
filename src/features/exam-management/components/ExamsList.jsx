import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import DeleteModalDetails from "../../../components/DeleteModalDetails";
import GenericTable from "../../../components/GenericTable";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import useExams from "../../../hooks/useExams";
import { formatExamDate } from "../../../Utils/formatDate";
import { DIFFICULTY_LABELS, DIFFICULTY_STYLES } from "../constants";
import useDeleteExam from "../hooks/useDeleteExam";
import StatusSelect from "./StatusSelect";

export default function ExamsList() {
  const { exams, isFetching } = useExams();
  const { deleteExam, isDeleting } = useDeleteExam();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const examToDelete = exams?.find((exam) => exam.id === deletingId);

  const examColumns = [
    { key: "title", label: "Exam title" },
    { key: "subject", label: "Subject" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    {
      key: "difficulty",
      label: "Difficulty",
      render: (value) => (
        <span
          className={`${DIFFICULTY_STYLES[value]} rounded-full px-4 py-1 font-medium uppercase transition-all`}
        >
          {DIFFICULTY_LABELS[value]}
        </span>
      ),
    },
    { key: "duration", label: "Duration" },
    {
      key: "status",
      label: "Status",
      render: (value, row) => <StatusSelect value={value} examId={row.id} />,
    },

    {
      key: "id",
      label: "Actions",
      render: (id) => (
        <button
          onClick={() => setDeletingId(id)}
          className='text-text-muted hover:text-danger hover:bg-danger/10 cursor-pointer rounded p-2 transition-all'
          title='Delete'
        >
          <Trash2 size={18} />
        </button>
      ),
    },
  ];

  if (isFetching) return <Loader />;

  const examData = exams?.map((exam) => ({
    ...exam,
    id: exam.id,
    title: exam.title,
    subject: exam.subject,
    startDate: formatExamDate(exam["start_date"]),
    endDate: formatExamDate(exam["end_date"]),
    difficulty: exam.difficulty,
    duration: `${exam.duration} min`,
    status: exam.status,
  }));

  return (
    <div className='space-y-10'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold'> Exam Management </h1>
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
      <GenericTable columns={examColumns} data={examData} />
      {/* Modal الحذف */}
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
        <DeleteModalDetails examToDelete={examToDelete} />
      </Modal>
    </div>
  );
}
