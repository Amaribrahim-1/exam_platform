import Button from "@/components/Button";
import Empty from "@/components/Empty";
import GenericTable from "@/components/GenericTable";
import Loader from "@/components/Loader";
import useAdminUsers from "../hooks/useAdminUsers";
import useDeleteUser from "../hooks/useDeleteUser";

function InstructorsTable() {
  const { users, isUsersFetching } = useAdminUsers();
  const { deleteUser, isDeleting } = useDeleteUser();

  const instructors = users?.instructors || [];

  if (isUsersFetching) return <Loader />;

  if (!instructors || instructors.length === 0)
    return (
      <div className='bg-surface border-border relative overflow-hidden rounded-2xl border'>
        <Empty message='No instructors found on the platform' />
      </div>
    );

  const instructorsColumns = [
    { key: "full_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    { key: "exams_created", label: "Exams Created" },
    {
      key: "actions",
      label: "Actions",
      render: (_, rowData) => (
        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variation='danger'
            disabled={isDeleting}
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
    <div className='bg-surface border-border relative overflow-hidden rounded-2xl border mt-6'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(74,124,255,0.05)_0%,transparent_70%)]' />

      <div className='relative flex items-center justify-between px-5 py-4 sm:px-6'>
        <div>
          <h3 className='font-display text-text text-sm font-semibold sm:text-base'>
            Instructors
          </h3>
          <p className='text-text-muted mt-0.5 text-xs'>
            Manage platform instructors
          </p>
        </div>
        <span className='text-text-faint border-border rounded-lg border px-2.5 py-1 font-mono text-[10px] tracking-wide'>
          {instructors.length} Instructors
        </span>
      </div>

      <div className='relative overflow-x-auto p-3'>
        <GenericTable columns={instructorsColumns} data={instructors} />
      </div>
    </div>
  );
}

export default InstructorsTable;
