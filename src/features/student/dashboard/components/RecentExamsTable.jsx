// import { formatDate } from "@/Utils/formatDate";
// import useRecentExams from "../hooks/useRecentExams";
// import Loader from "@/components/Loader";
// import GenericTable from "@/components/GenericTable";

// function RecentExamsTable() {
//   const { recentExams, isRecentExamsFetching } = useRecentExams();

//   if (isRecentExamsFetching) {
//     return <Loader />;
//   }

//   const recentExamsColumns = [
//     { key: "title", label: "Exam title" },
//     { key: "instructor", label: "Instructor" },
//     { key: "score", label: "Score" },
//     {
//       key: "status",
//       label: "Status",
//       render: (value) => (
//         <span
//           className={`${
//             value === "Passed"
//               ? "text-accent bg-accent/10"
//               : "text-danger bg-danger/10"
//           } rounded-full px-2.5 py-1 font-medium uppercase transition-all`}
//         >
//           {value}
//         </span>
//       ),
//     },
//     { key: "submittedAt", label: "Submitted At" },
//   ];

//   const recentExamsData = recentExams?.map((exam) => ({
//     title: exam.exams.title,
//     instructor: exam.exams.instructor_name,
//     submittedAt: formatDate(exam.submitted_at),
//     status: exam.status,
//     score: `${Math.round((exam.total_score / exam.full_mark) * 100)} %`,
//   }));

//   return <GenericTable columns={recentExamsColumns} data={recentExamsData} />;
// }

// export default RecentExamsTable;
import { formatDate } from "@/Utils/formatDate";
import useRecentExams from "../hooks/useRecentExams";
import Loader from "@/components/Loader";
import GenericTable from "@/components/GenericTable";
import { Link } from "react-router-dom";
import { DIFFICULTY_LABELS, DIFFICULTY_STYLES } from "@/Utils/constants";
import { formatTime } from "@/Utils/formatTime";

function RecentExamsTable() {
  const { recentExams, isRecentExamsFetching } = useRecentExams();

  if (isRecentExamsFetching) {
    return <Loader />;
  }

  const recentExamsColumns = [
    { key: "title", label: "Exam Title" },
    { key: "instructor", label: "Instructor" },
    { key: "score", label: "Score" },
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
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase transition-all ${
            value === "Passed"
              ? "text-accent bg-accent/10"
              : "text-danger bg-danger/10"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "timeTaken", label: "Time" },
    { key: "submittedAt", label: "Submitted At" },
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

  const recentExamsData = recentExams?.map((exam) => ({
    title: exam.exams.title,
    instructor: exam.exams.instructor_name,
    reason: exam.reason,
    submittedAt: formatDate(exam.submitted_at),
    timeTaken: formatTime(exam.time_taken),
    status: exam.status,
    score: `${Math.round((exam.total_score / exam.full_mark) * 100)}%`,
    id: exam.exams.id,
  }));

  return (
    <div className='bg-surface border-border relative overflow-hidden rounded-2xl border'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(108,142,245,0.05)_0%,transparent_70%)]' />

      <div className='relative flex items-center justify-between px-5 py-4 sm:px-6'>
        <div>
          <h3 className='font-display text-text text-sm font-semibold sm:text-base'>
            Recent Exams
          </h3>
          <p className='text-text-muted mt-0.5 text-xs'>
            Your latest submissions
          </p>
        </div>
        <span className='text-text-faint border-border rounded-lg border px-2.5 py-1 font-mono text-[10px] tracking-wide'>
          {recentExamsData?.length ?? 0} exams
        </span>
      </div>

      {/* Table */}
      <div className='relative overflow-x-auto p-3'>
        <GenericTable columns={recentExamsColumns} data={recentExamsData} />
      </div>
    </div>
  );
}

export default RecentExamsTable;
