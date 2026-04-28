import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions = null,
  pad = true,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className='fixed inset-0 z-999 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={`bg-surface border-border animate-fade-scale relative flex w-full max-w-[90vw] flex-col overflow-hidden rounded-lg border shadow-2xl sm:max-w-lg`}
        style={{ maxHeight: '90dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='border-border bg-surface-2 flex shrink-0 items-center justify-between border-b px-6 py-4'>
          <h2 className='text-text text-lg font-bold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-text-muted hover:text-danger cursor-pointer p-1 transition-colors'
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className={`text-text overflow-y-auto ${pad && "px-6 py-6"}`}>{children}</div>

        {/* Footer */}
        {actions && (
          <div className='border-border bg-surface-2 flex shrink-0 items-center justify-end gap-3 border-t px-6 py-4'>
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  // السطر ده هو اللي هينقله لآخر الصفحة برا أي جداول أو Sidebars
  return createPortal(modalContent, document.body);
};

export default Modal;
