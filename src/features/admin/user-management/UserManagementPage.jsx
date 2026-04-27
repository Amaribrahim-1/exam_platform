import InstructorsTable from "./components/InstructorsTable";
import StudentsTable from "./components/StudentsTable";

function UserManagementPage() {
  return (
    <div className='flex flex-col gap-6 sm:p-6'>
      {/* Header */}
      <div className='animate-fade-up'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='font-display text-text text-2xl font-semibold tracking-tight'>
              User Management
            </h1>
            <p className='text-text-muted mt-1 text-sm'>
              View, promote, and manage platform users
            </p>
          </div>
        </div>
      </div>

      <div className='animate-fade-up flex flex-col gap-6' style={{ animationDelay: "0.1s" }}>
        <InstructorsTable />
        <StudentsTable />
      </div>
    </div>
  );
}

export default UserManagementPage;
