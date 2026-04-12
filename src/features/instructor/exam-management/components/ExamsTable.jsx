import { Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "../../../../components/Button";
import GenericTable from "../../../../components/GenericTable";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";

import useDeleteExam from "../hooks/useDeleteExam";
import useExams from "../hooks/useExams";
import DeleteExamModal from "./DeleteExamModal";
import FilterExamsModal from "./FilterExamsModal";

import { formatExamDate } from "../../../../Utils/formatDate";
import { examColumns } from "./ExamColumns";

function ExamsTable() {
  const { exams, isFetching } = useExams();
  const { deleteExam, isDeleting } = useDeleteExam();
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "start_date-asc";

  const navigate = useNavigate();

  const examToDelete = exams?.find((exam) => exam.id === deletingId);

  const columns = examColumns(setDeletingId);

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

  const subjects = ["All", ...new Set(examData?.map((exam) => exam.subject))];

  const searchedExams = examData?.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredExams = searchedExams?.filter((exam) => {
    const difficultyFilter = searchParams.get("difficulty") || "all";
    const statusFilter = searchParams.get("status") || "all";
    const subjectFilter = searchParams.get("subject") || "all";

    const matchDifficulty =
      difficultyFilter === "all" ||
      exam.difficulty?.toLowerCase() === difficultyFilter;
    const matchStatus =
      statusFilter === "all" || exam.status?.toLowerCase() === statusFilter;
    const matchSubject =
      subjectFilter === "all" || exam.subject?.toLowerCase() === subjectFilter;

    return matchDifficulty && matchStatus && matchSubject;
  });

  const [type, dir] = sortBy.split("-");

  const sortedExams = filteredExams?.sort((a, b) =>
    dir === "asc"
      ? a[type].localeCompare(b[type])
      : b[type].localeCompare(a[type]),
  );

  if (isFetching || !exams) return <Loader />;

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

      {/* Actions */}
      <div className='flex items-center justify-between gap-4'>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type='search'
          className='bg-surface-2 p-md text-text text-md w-full rounded-md font-medium'
          placeholder='Search By Title'
        />

        <div>
          <select
            className='bg-surface-2 p-md text-text text-md w-full rounded-md font-medium'
            onChange={(e) => {
              console.log(e.target.value);
              e.target.value === "none"
                ? searchParams.delete("sortBy")
                : searchParams.set("sortBy", e.target.value);
              setSearchParams(searchParams);
            }}
          >
            <option value='none'>Sort By</option>
            <optgroup label='Date'>
              <option value='start_date-asc'>Ascending</option>
              <option value='start_date-desc'>Descending</option>
            </optgroup>
            <optgroup label='Duration'>
              <option value='duration-asc'>Ascending</option>
              <option value='duration-desc'>Descending</option>
            </optgroup>
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsFilterOpen(true)}
            type='button'
            title='Filter By'
            className='bg-surface-2 p-md text-text text-md flex w-fit items-center gap-2 rounded-md font-medium'
          >
            <Filter />
          </button>
        </div>
      </div>

      {/* Filters */}
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
          />
        </Modal>
      )}

      <GenericTable
        key={`${searchParams.toString()}`}
        columns={columns}
        data={sortedExams}
      />

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
        <DeleteExamModal examToDelete={examToDelete} />
      </Modal>
    </div>
  );
}

export default ExamsTable;
