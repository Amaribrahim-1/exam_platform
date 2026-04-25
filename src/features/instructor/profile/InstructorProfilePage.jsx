import Profile from "@/components/Profile";
import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm";
import useInstructorProfile from "./hooks/useInstructorProfile";
import AcademicStats from "@/features/student/available-exams/components/AcademicStats";

function InstructorProfilePage() {
  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div>
        <h1 className='text-text font-display text-2xl font-semibold'>
          My Profile
        </h1>
        <p className='text-text-muted mt-1 text-sm'>
          Manage your personal information and preferences
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Left Column */}
        <Profile
          extraFields={[
            {
              name: "department",
              label: "Department",
              options: [
                "Computer Science",
                "Information Systems",
                "Information Technology",
              ],
            },
          ]}
          profileHook={useInstructorProfile}
        />

        {/* Right Column */}
        <div className='flex flex-col gap-6'>
          {/* Change Password */}
          <UpdatePasswordForm />

          {/* Academic Stats */}
          {/* <AcademicStats /> */}
        </div>
      </div>
    </div>
  );
}

export default InstructorProfilePage;
