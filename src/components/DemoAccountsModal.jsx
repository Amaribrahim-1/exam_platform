import { useState, useEffect } from "react";
import { X, Copy, Check, ShieldCheck, GraduationCap } from "lucide-react";

export default function DemoAccountsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedInstructor, setCopiedInstructor] = useState(false);
  const [copiedAdmin, setCopiedAdmin] = useState(false);

  useEffect(() => {
    // Show modal if it hasn't been closed in this session
    const hasSeen = sessionStorage.getItem("demo_modal_seen");
    if (!hasSeen) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("demo_modal_seen", "true");
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "instructor") {
      setCopiedInstructor(true);
      setTimeout(() => setCopiedInstructor(false), 2000);
    } else {
      setCopiedAdmin(true);
      setTimeout(() => setCopiedAdmin(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='animate-in fade-in fixed inset-0 z-9999 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-300'>
      <div
        className='bg-surface border-border animate-in zoom-in-95 relative w-full max-w-150 overflow-hidden rounded-2xl border shadow-md duration-300'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='bg-surface-2 border-border flex items-center gap-3 border-b px-6 py-5'>
          <div className='bg-primary/10 rounded-lg p-2'>
            <GraduationCap className='text-primary' size={24} />
          </div>
          <div>
            <h2 className='text-text text-xl font-bold'>Student Section</h2>
            <p className='text-text-muted mt-0.5 text-sm'>
              You are currently viewing the platform as a student.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className='text-text-muted hover:text-text hover:bg-surface-2 absolute top-5 right-5 rounded-full p-1.5 transition-colors'
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className='p-6'>
          <p className='text-text-muted mb-5 leading-relaxed'>
            If you want to explore the platform's other roles and capabilities,
            you can use the following demo accounts:
          </p>

          <div className='space-y-4'>
            {/* Instructor Account */}
            <div className='border-border bg-surface-2 group hover:border-primary/50 relative rounded-xl border p-4 transition-colors'>
              <div className='mb-3 flex items-center gap-2'>
                <span className='bg-accent/10 text-accent rounded px-2.5 py-1 text-xs font-semibold tracking-wide uppercase'>
                  Instructor
                </span>
              </div>
              <div className='flex flex-col gap-1.5'>
                <div className='text-text flex items-center gap-2 font-mono text-sm font-medium'>
                  <span className='text-text-muted w-20'>Email:</span>
                  instructor-viewer@gmail.com
                </div>
                <div className='text-text flex items-center gap-2 font-mono text-sm font-medium'>
                  <span className='text-text-muted w-20'>Password:</span>
                  123456
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard("instructor-viewer@gmail.com", "instructor")
                }
                className='text-text-muted hover:text-accent bg-surface border-border absolute top-4 right-4 flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors'
                title='Copy Email'
              >
                {copiedInstructor ? (
                  <>
                    <Check size={14} className='text-success' /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </button>
            </div>

            {/* Admin Account */}
            <div className='border-border bg-surface-2 group hover:border-primary/50 relative rounded-xl border p-4 transition-colors'>
              <div className='mb-3 flex items-center gap-2'>
                <span className='bg-danger/10 text-danger flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold tracking-wide uppercase'>
                  <ShieldCheck size={14} /> Admin
                </span>
              </div>
              <div className='flex flex-col gap-1.5'>
                <div className='text-text flex items-center gap-2 font-mono text-sm font-medium'>
                  <span className='text-text-muted w-20'>Email:</span>
                  admin-viewer@gmail.com
                </div>
                <div className='text-text flex items-center gap-2 font-mono text-sm font-medium'>
                  <span className='text-text-muted w-20'>Password:</span>
                  123456
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard("admin-viewer@gmail.com", "admin")
                }
                className='text-text-muted hover:text-danger bg-surface border-border absolute top-4 right-4 flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors'
                title='Copy Email'
              >
                {copiedAdmin ? (
                  <>
                    <Check size={14} className='text-success' /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              onClick={handleClose}
              className='bg-primary hover:bg-primary/90 text-surface rounded-lg px-6 py-2.5 text-sm font-bold transition-colors'
            >
              Continue as Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
