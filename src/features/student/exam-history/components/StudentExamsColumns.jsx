import { DIFFICULTY_LABELS, DIFFICULTY_STYLES } from "@/Utils/constants";
import { Link } from "react-router-dom";

export function studentExamsColumns() {
  return [
    { key: "title", label: "Exam title" },
    { key: "instructorName", label: "Instructor" },
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
    { key: "score", label: "Score" },
    { key: "submittedAt", label: "Submitted At" },
    {
      key: "isPassed",
      label: "Status",
      render: (value) => (
        <span
          className={`${
            value === "Passed" ? "text-accent" : "text-danger"
          } bg-accent/10 rounded-full px-2.5 py-1 font-medium uppercase transition-all`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value, rowData) => (
        <Link
          to={`/student/exam-result/${rowData.id}`}
          className='text-primary bg-primary/10 p-full rounded-full px-3 py-1.5 font-medium uppercase'
        >
          Review
        </Link>
      ),
    },
  ];
}
