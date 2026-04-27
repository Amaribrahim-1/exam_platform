import useUser from "@/features/auth/hooks/useUser";
import useStudentProfile from "@/features/student/profile/hooks/useStudentProfile";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";

function CompleteProfilePage() {
  const { user, isFetchingUser } = useUser();
  const { profile, isFetchingProfile } = useStudentProfile(user?.id);
  const { updateUser, isUpdating } = useUpdateUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      grade: profile?.grade || "",
      department: profile?.department || "",
    },
  });

  useEffect(() => {
    if (profile?.grade && profile?.department) {
      navigate("/student/dashboard", { replace: true });
    }
  }, [profile, navigate]);

  function onSubmit(data) {
    updateUser({
      extraFields: { grade: data.grade, department: data.department },
      userId: user.id,
      role: user.role,
    });
  }

  const inputClass =
    "w-full bg-surface-2 border border-border rounded-[8px] px-4 py-2.5 text-text text-sm focus:outline-none focus:border-primary/50 transition-colors";
  const labelClass = "block text-text-muted text-xs font-medium mb-1.5";

  if (isFetchingUser || isFetchingProfile) return <Loader />;

  return (
    <div className='bg-bg flex min-h-screen items-center justify-center p-6'>
      <div className='w-full max-w-150'>
        <div className='mb-6'>
          <h1 className='text-text font-display text-2xl font-semibold'>
            Complete Your Profile
          </h1>
          <p className='text-text-muted mt-1 text-sm'>
            Please fill in your details before continuing
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-surface border-border flex flex-col gap-5 rounded-[12px] border p-6'
        >
          <h3 className='text-text text-base font-semibold'>
            Academic Information
          </h3>

          <div>
            <label className={labelClass}>Grade</label>
            <select
              {...register("grade", { required: "Grade is required" })}
              className={inputClass}
            >
              <option value=''>Select Grade</option>
              {["Grade 1", "Grade 2", "Grade 3", "Grade 4"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.grade && (
              <p className='text-danger mt-1 ml-2 text-xs font-medium'>
                ⚠ {errors.grade.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Department</label>
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className={inputClass}
            >
              <option value=''>Select Department</option>
              {[
                "General",
                "Computer Science",
                "Information Systems",
                "Information Technology",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className='text-danger mt-1 ml-2 text-xs font-medium'>
                ⚠ {errors.department.message}
              </p>
            )}
          </div>

          <button
            disabled={isUpdating}
            className='bg-primary hover:bg-primary/80 mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50'
          >
            <FiSave size={14} />
            {isUpdating ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
