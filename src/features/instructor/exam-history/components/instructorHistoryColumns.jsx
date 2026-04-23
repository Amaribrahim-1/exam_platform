import { DIFFICULTY_LABELS, DIFFICULTY_STYLES } from "@/Utils/constants";
import { Link } from "react-router-dom";

export function instructorHistoryColumns() {
  return [
    { key: "studentName", label: "Student" },
    { key: "title", label: "Exam Title" },
    { key: "subject", label: "Subject" },
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
    { key: "department", label: "Department" },
    { key: "grade", label: "Grade" },
    // { key: "score", label: "Score" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`${
            value === "Passed"
              ? "text-accent bg-accent/10"
              : "text-danger bg-danger/10"
          } rounded-full px-2.5 py-1 font-medium uppercase transition-all`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "reason",
      label: "Reason",
      render: (value) => (
        <span
          className={`${
            value === "manual"
              ? "text-primary bg-primary/10"
              : value === "cheat"
                ? "text-danger bg-danger/10"
                : "text-warning bg-warning/10"
          } rounded-full px-2.5 py-1 font-medium uppercase transition-all`}
        >
          {value ?? "—"}
        </span>
      ),
    },
    // { key: "submittedAt", label: "Submitted" },
    {
      key: "actions",
      label: "Actions",
      render: (_, rowData) => (
        <Link
          to={`/instructor/exam-results/${rowData.submissionId}`}
          className='text-primary bg-primary/10 p-full rounded-full px-3 py-1.5 font-medium uppercase'
        >
          Review
        </Link>
      ),
    },
  ];
}
