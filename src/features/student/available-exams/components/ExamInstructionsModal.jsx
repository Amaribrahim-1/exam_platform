import Modal from "@/components/Modal";
import Button from "@/components/Button";

const RULES = [
  { icon: "🚫", text: "Do not switch tabs or leave the exam window" },
  { icon: "🔍", text: "Do not open DevTools or inspect the page" },
  { icon: "📋", text: "Do not right-click or try to copy any content" },
  { icon: "↩️", text: "Do not use the browser back or forward buttons" },
  { icon: "🖥️", text: "Do not use split-screen or resize the window" },
  { icon: "⌨️", text: "Keyboard shortcuts like F12, Ctrl+U are blocked" },
];

function ExamInstructionsModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='⚠️ Exam Rules & Anti-Cheat Policy'
      actions={
        <>
          <Button size='md' variation='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button size='md' variation='primary' onClick={onConfirm}>
            I Understand, Start Exam
          </Button>
        </>
      }
    >
      <div className='flex flex-col gap-4 text-sm'>
        <p className='text-text-muted'>
          Before you start, please read the following rules carefully:
        </p>
        <ul className='flex flex-col gap-3'>
          {RULES.map((rule, i) => (
            <li
              key={i}
              className='bg-surface-2 border-border flex items-center gap-3 rounded-lg border px-4 py-3'
            >
              <span className='text-base'>{rule.icon}</span>
              <span className='text-text'>{rule.text}</span>
            </li>
          ))}
        </ul>
        <div className='bg-danger/10 border-danger/30 rounded-lg border px-4 py-3'>
          <p className='text-danger font-medium'>
            ⚠️ After 3 strikes, your exam will be automatically submitted and
            recorded as a cheating attempt.
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default ExamInstructionsModal;
