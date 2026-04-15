import useLogout from "@/features/auth/hooks/useLogout";
import { resetPassword } from "@/services/userApi";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useLogout();

  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });

  function togglePassword(field) {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      await resetPassword(data.newPassword);
      toast.success("Password updated successfully try login now!");
      logout();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "w-full bg-surface-2 border border-border rounded-[8px] px-4 py-2.5 text-text text-sm placeholder:text-text-faint focus:outline-none focus:border-primary/50 transition-colors pl-9";

  const labelClass = "block text-text-muted text-xs font-medium mb-1.5";

  return (
    <div className='bg-bg flex min-h-screen items-center justify-center px-4'>
      <div
        style={{ maxWidth: "35rem" }}
        className='bg-surface border-border flex w-full flex-col gap-6 rounded-[12px] border p-8'
      >
        {/* Header */}
        <div>
          <h1 className='text-text font-display text-2xl font-semibold'>
            Reset Password
          </h1>
          <p className='text-text-muted mt-1 text-sm'>
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          {/* New Password */}
          <div className='relative'>
            <label className={labelClass}>New Password</label>
            <div className='relative'>
              <FiLock
                size={14}
                className='text-text-muted absolute top-1/2 left-3 -translate-y-1/2'
              />
              <input
                type={showPasswords.new ? "text" : "password"}
                placeholder='Min 6 characters'
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className={inputClass}
              />
              <span
                onClick={() => togglePassword("new")}
                className='text-text-muted absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
              >
                {showPasswords.new ? (
                  <Eye style={{ width: 16, height: 16 }} />
                ) : (
                  <EyeOff style={{ width: 16, height: 16 }} />
                )}
              </span>
            </div>
            {errors.newPassword && (
              <p className='text-danger mt-1 ml-2 flex items-center gap-1 text-xs font-medium'>
                <span>⚠</span> {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <label className={labelClass}>Confirm New Password</label>
            <div className='relative'>
              <FiLock
                size={14}
                className='text-text-muted absolute top-1/2 left-3 -translate-y-1/2'
              />
              <input
                type={showPasswords.confirm ? "text" : "password"}
                placeholder='Repeat new password'
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) =>
                    val === getValues("newPassword") ||
                    "Passwords do not match",
                })}
                className={inputClass}
              />
              <span
                onClick={() => togglePassword("confirm")}
                className='text-text-muted absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
              >
                {showPasswords.confirm ? (
                  <Eye style={{ width: 16, height: 16 }} />
                ) : (
                  <EyeOff style={{ width: 16, height: 16 }} />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className='text-danger mt-1 ml-2 flex items-center gap-1 text-xs font-medium'>
                <span>⚠</span> {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='bg-primary hover:bg-primary/80 mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50'
          >
            <FiSave size={14} />
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
