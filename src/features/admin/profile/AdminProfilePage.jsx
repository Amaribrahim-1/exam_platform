import Profile from "@/components/Profile";
import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm";
import useAdminProfile from "./hooks/useAdminProfile";

function AdminProfilePage() {
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
        {/* Left Column — Profile info */}
        <Profile
          extraFields={[]}
          profileHook={useAdminProfile}
        />

        {/* Right Column — Change Password */}
        <div className='flex flex-col gap-6'>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default AdminProfilePage;
