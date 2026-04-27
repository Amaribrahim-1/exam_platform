import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import { formatDate } from "@/Utils/formatDate";
import useRecentActivity from "../hooks/useRecentActivity";
import Empty from "@/components/Empty";

function RecentActivityTable() {
  const { recentActivity, isRecentActivityFetching } = useRecentActivity();

  if (isRecentActivityFetching) return <Loader />;

  if (recentActivity?.length === 0 || !recentActivity)
    return (
      <div className='bg-surface border-border relative overflow-hidden rounded-2xl border'>
        <Empty message='No recent activity available across the platform' />
      </div>
    );

  const recentActivityColumns = [
    { key: "title", label: "Exam Title" },
    { key: "student", label: "Student" },
    { key: "score", label: "Score" },
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
    { key: "submittedAt", label: "Submitted At" },
  ];

  const recentActivityData = recentActivity?.map((activity) => ({
    title: activity.title,
    student: activity.student_name,
    score: `${Math.round(activity.score_percentage)}%`,
    status: activity.status,
    reason: activity.reason,
    submittedAt: formatDate(activity.submitted_at),
    submissionId: activity.id,
  }));

  return (
    <div className='bg-surface border-border relative overflow-hidden rounded-2xl border'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,88,0.05)_0%,transparent_70%)]' />

      <div className='relative flex items-center justify-between px-5 py-4 sm:px-6'>
        <div>
          <h3 className='font-display text-text text-sm font-semibold sm:text-base'>
            Recent Platform Activity
          </h3>
          <p className='text-text-muted mt-0.5 text-xs'>
            Latest submissions across all exams
          </p>
        </div>
        <span className='text-text-faint border-border rounded-lg border px-2.5 py-1 font-mono text-[10px] tracking-wide'>
          {recentActivityData?.length ?? 0} recent activities
        </span>
      </div>

      <div className='relative overflow-x-auto p-3'>
        <GenericTable columns={recentActivityColumns} data={recentActivityData} />
      </div>
    </div>
  );
}

export default RecentActivityTable;
