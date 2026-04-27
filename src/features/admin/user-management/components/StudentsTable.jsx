import Button from "@/components/Button";
import Empty from "@/components/Empty";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import useAdminUsers from "../hooks/useAdminUsers";
import useDeleteUser from "../hooks/useDeleteUser";
import usePromoteUser from "../hooks/usePromoteUser";

function StudentsTable() {
  const { users, isUsersFetching } = useAdminUsers();
  const { promoteUser, isPromoting } = usePromoteUser();
  const { deleteUser, isDeleting } = useDeleteUser();

  const students = users?.students || [];

  if (isUsersFetching) return <Loader />;

  if (!students || students.length === 0)
    return (
      <div className='bg-surface border-border relative overflow-hidden rounded-2xl border'>
        <Empty message='No students found on the platform' />
      </div>
    );

  const studentsColumns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    {
      key: "grade",
      label: "Grade",
      render: (value) => (
        <span className='bg-surface-2 text-text-muted rounded-md px-2 py-1 text-xs font-medium'>
          {value || "—"}
        </span>
      ),
    },
    { key: "exams_count", label: "Exams Taken" },
    {
      key: "average_score",
      label: "Avg Score",
      render: (value) => `${Math.round(value || 0)}%`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, rowData) => (
        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variation='outline'
            disabled={isPromoting || isDeleting}
            onClick={() => promoteUser(rowData.id)}
            className='text-xs'
          >
            Promote to Instructor
          </Button>
          <Button
            size='sm'
            variation='danger'
            disabled={isPromoting || isDeleting}
            onClick={() => deleteUser(rowData.id)}
            className='text-xs'
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='bg-surface border-border relative overflow-hidden rounded-2xl border'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,88,0.05)_0%,transparent_70%)]' />

      <div className='relative flex items-center justify-between px-5 py-4 sm:px-6'>
        <div>
          <h3 className='font-display text-text text-sm font-semibold sm:text-base'>
            Students
          </h3>
          <p className='text-text-muted mt-0.5 text-xs'>
            Manage platform students
          </p>
        </div>
        <span className='text-text-faint border-border rounded-lg border px-2.5 py-1 font-mono text-[10px] tracking-wide'>
          {students.length} Students
        </span>
      </div>

      <div className='relative overflow-x-auto p-2'>
        <GenericTable columns={studentsColumns} data={students} />
      </div>
    </div>
  );
}

export default StudentsTable;
