import { forgotPassword } from "@/services/userApi";
import { useState } from "react";
import { FiMail, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import Button from "@/components/Button";

function EmailVerificationPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forgotPassword(email); // غير الفانكشن دي لما تعملها
      toast.success("Check your email for the reset link!");
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
        <div>
          <h1 className='text-text font-display text-2xl font-semibold'>
            Forgot Password
          </h1>
          <p className='text-text-muted mt-1 text-sm'>
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className={labelClass}>Email Address</label>
            <div className='relative'>
              <FiMail
                size={14}
                className='text-text-muted absolute top-1/2 left-3 -translate-y-1/2'
              />
              <input
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>
          </div>

          <Button
            type='submit'
            disabled={isLoading}
            variation='primary'
            className='mt-1 flex w-full items-center justify-center gap-2 py-2.5'
          >
            <FiSend size={14} />
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
