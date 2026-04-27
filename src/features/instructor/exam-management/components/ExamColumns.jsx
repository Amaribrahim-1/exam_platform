import StatusBadge from "../components/StatusBadge";
import { Pencil, Trash2 } from "lucide-react";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_STYLES,
} from "../../../../Utils/constants";

export const examColumns = (onAction) => [
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
  { key: "grade", label: "Grade" },
  { key: "department", label: "Department" },
  {
    key: "status",
    label: "Status",
    render: (value, row) => <StatusBadge value={value} examId={row.id} />,
  },
  {
    key: "id",
    label: "Actions",
    render: (id) => (
      <>
        <button
          onClick={() => onAction("delete", id)}
          className="text-text-muted hover:text-danger hover:bg-danger/10 cursor-pointer rounded p-2 transition-all"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={() => onAction("edit", id)}
          className="text-text-muted hover:text-primary hover:bg-primary/10 cursor-pointer rounded p-2 transition-all"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
      </>
    ),
  },
];
