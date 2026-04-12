import { Trash2 } from "lucide-react";

function DeleteExamModal({ examToDelete }) {
  return (
    <div className='space-y-4'>
      {/* الأيقونة + رسالة التحذير الأولى */}
      <div className='flex items-center gap-4'>
        <div className='bg-danger/20 h-fit shrink-0 rounded-lg p-3'>
          <Trash2 className='text-danger' size={28} />
        </div>
        <p className='text-text-muted pt-1 text-sm'>
          This action cannot be undone.
        </p>
      </div>

      {/* السؤال الأساسي */}
      <p className='text-base leading-relaxed'>
        Are you sure you want to delete{" "}
        <span className='text-text font-bold'>{examToDelete?.title}</span>?
      </p>

      {/* رسالة التحذير النهائية */}
      <p className='text-text-muted text-sm leading-relaxed'>
        All associated data including student results will be permanently
        removed.
      </p>
    </div>
  );
}

export default DeleteExamModal;
