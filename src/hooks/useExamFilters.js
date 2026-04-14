import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function useExamFilters(exams, extraFilters = []) {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "start_date-asc";

  const searchedExams = exams?.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredExams = searchedExams?.filter((exam) => {
    const difficultyFilter = searchParams.get("difficulty") || "all";
    const subjectFilter = searchParams.get("subject") || "all";

    const matchDifficulty =
      difficultyFilter === "all" ||
      exam.difficulty?.toLowerCase() === difficultyFilter;
    const matchSubject =
      subjectFilter === "all" || exam.subject?.toLowerCase() === subjectFilter;

    const matchExtra = extraFilters.every(({ key }) => {
      const val = searchParams.get(key) || "all";
      return val === "all" || exam[key]?.toLowerCase() === val;
    });

    return matchDifficulty && matchSubject && matchExtra;
  });

  const [type, dir] = sortBy.split("-");
  const sortedExams = filteredExams?.sort((a, b) => {
    if (type === "duration") {
      const aVal = parseInt(a.duration);
      const bVal = parseInt(b.duration);
      return dir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return dir === "asc"
      ? a[type].localeCompare(b[type])
      : b[type].localeCompare(a[type]);
  });

  return {
    search,
    setSearch,
    isFilterOpen,
    setIsFilterOpen,
    searchParams,
    setSearchParams,
    sortedExams,
  };
}

export default useExamFilters;
