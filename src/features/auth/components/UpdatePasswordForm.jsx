import useUpdatePassword from "@/features/auth/hooks/useUpdatePassword";

import useUser from "@/features/auth/hooks/useUser";
import { forgotPassword } from "@/services/userApi";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import Button from "@/components/Button";

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { user } = useUser();

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  function togglePassword(field) {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const { updatePassword, isUpdatingPassword } = useUpdatePassword();

  function onSubmit(data) {
    updatePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  }

  async function handleForgotPassword() {
    try {
      await forgotPassword(user.email);
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error(err.message);
    }
  }
  const inputClass =
    "w-full bg-surface-2 border border-border rounded-[8px] px-4 py-2.5 text-text text-sm placeholder:text-text-faint focus:outline-none focus:border-primary/50 transition-colors";

  const labelClass = "block text-text-muted text-xs font-medium mb-1.5";

  if (isUpdatingPassword) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-surface border-border flex flex-col gap-4 rounded-[12px] border p-5'
    >
      <h3 className='text-text text-base font-semibold'>Change Password</h3>
      <div className='flex flex-col gap-3'>
        <div>
          <div className='mb-1.5 flex items-center justify-between'>
            <label className={labelClass}>Current Password</label>
            <button
              type='button'
              onClick={handleForgotPassword}
              className='text-primary text-xs hover:underline'
            >
              Forgot password?
            </button>
          </div>
          <div className='relative'>
            <FiLock
              size={14}
              className='text-text-muted absolute top-1/2 left-3 -translate-y-1/2'
            />
            <input
              type={showPasswords.old ? "text" : "password"}
              placeholder='Enter current password'
              {...register("oldPassword", {
                required: "Password is required",
              })}
              className={`${inputClass} pl-9`}
            />
            <span
              onClick={() => togglePassword("old")}
              className='text-text-muted absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
            >
              {showPasswords.old ? (
                <Eye style={{ width: 16, height: 16 }} />
              ) : (
                <EyeOff style={{ width: 16, height: 16 }} />
              )}
            </span>
          </div>
          {errors.oldPassword && (
            <p className='text-danger mt-1 ml-1 flex items-center gap-1 text-xs font-medium'>
              <span>⚠</span> {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div>
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`${inputClass} pl-9`}
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
            <p className='text-danger mt-1 ml-1 flex items-center gap-1 text-xs font-medium'>
              <span>⚠</span> {errors.newPassword.message}
            </p>
          )}
        </div>
        <div>
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
                required: "Password is required",
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              })}
              className={`${inputClass} pl-9`}
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
            <p className='text-danger mt-1 ml-1 flex items-center gap-1 text-xs font-medium'>
              <span>⚠</span> {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type='submit'
          variation='primary'
          className='w-full py-2.5'
        >
          Update Password
        </Button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
