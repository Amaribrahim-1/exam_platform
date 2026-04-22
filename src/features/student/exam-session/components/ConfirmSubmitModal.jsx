import { ClipboardCheck } from "lucide-react";

function ConfirmSubmitModal({ examTitle }) {
  return (
    <div className='space-y-4'>
      {/* الأيقونة + رسالة التحذير الأولى */}
      <div className='flex items-center gap-4'>
        <div className='bg-danger/20 h-fit shrink-0 rounded-lg p-3'>
          <ClipboardCheck className='text-danger' size={28} />
        </div>
        <p className='text-text-muted pt-1 text-sm'>
          This action cannot be undone.
        </p>
      </div>

      {/* السؤال الأساسي */}
      <p className='text-base leading-relaxed'>
        Are you sure you want to submit{" "}
        <span className='text-text font-bold'>{examTitle}</span>?
      </p>

      {/* رسالة التحذير النهائية */}
      <p className='text-text-muted text-sm leading-relaxed'>
        Once submitted, your answers will be locked and sent for grading
        immediately.
      </p>
    </div>
  );
}

export default ConfirmSubmitModal;
