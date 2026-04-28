import Profile from "@/components/Profile";
import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm";
import useStudentProfile from "@/features/student/profile/hooks/useStudentProfile";
import AcademicStats from "../available-exams/components/AcademicStats";

function StudentProfilePage() {
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

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Left Column */}
        <Profile
          extraFields={[
            {
              name: "grade",
              label: "Grade",
              options: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
            },
            {
              name: "department",
              label: "Department",
              options: [
                "General",
                "Computer Science",
                "Information Systems",
                "Information Technology",
              ],
            },
          ]}
          profileHook={useStudentProfile}
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

export default StudentProfilePage;
