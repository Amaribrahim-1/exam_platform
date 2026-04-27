import StatusBadge from "../components/StatusBadge";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/Button";
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
        <Button
          onClick={() => onAction("delete", id)}
          variation="ghost"
          size="icon"
          className="hover:text-danger hover:bg-danger/10 text-text-muted"
          title="Delete"
        >
          <Trash2 size={18} />
        </Button>
        <Button
          onClick={() => onAction("edit", id)}
          variation="ghost"
          size="icon"
          className="hover:text-primary hover:bg-primary/10 text-text-muted"
          title="Edit"
        >
          <Pencil size={18} />
        </Button>
      </>
    ),
  },
];
