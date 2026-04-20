import useExams from "@/hooks/useExams";
import ExamCard from "./components/ExamCard";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import FilterExamsModal from "@/features/instructor/exam-management/components/FilterExamsModal";
import ExamActions from "@/components/ExamActions";
import useExamFilters from "@/hooks/useExamFilters";
import Empty from "@/components/Empty";

function AvailableExamsPage() {
  const { exams, isFetching } = useExams();

  const {
    search,
    setSearch,
    isFilterOpen,
    setIsFilterOpen,
    searchParams,
    setSearchParams,
    sortedExams,
  } = useExamFilters(exams, [{ key: "instructor_name" }]);

  const subjects = ["All", ...new Set(exams?.map((e) => e.subject))];
  const instructor_names = [
    "All",
    ...new Set(exams?.map((e) => e.instructor_name)),
  ];

  const tabs = [
    { id: "difficulty", label: "Difficulty" },
    { id: "subject", label: "Subject" },
    { id: "instructor_name", label: "Instructor" },
  ];

  const lists = {
    difficulty: ["All", "Easy", "Medium", "Hard"],
    subject: subjects,
    instructor_name: instructor_names,
  };

  if (isFetching) return <Loader />;

  if (sortedExams.length === 0) return <Empty title='No Available Exams' />;

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-text font-display text-2xl font-semibold'>
          Available Exams
        </h1>
        <p className='text-text-muted mt-1 text-sm'>
          {exams.filter((e) => e.status === "active").length} exams available
          for you
        </p>
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

      {sortedExams.length === 0 ? (
        <Empty title='No Available Exams' />
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {sortedExams.map((exam, index) => (
            <ExamCard key={exam.id} exam={exam} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableExamsPage;
