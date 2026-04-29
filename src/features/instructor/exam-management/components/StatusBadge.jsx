import { useEffect, useRef, useState } from "react";
import useUpdateStatus from "../hooks/useUpdateStatus";
import { STATUS_LABELS, STATUS_STYLES } from "../../../../Utils/constants";
import { toast } from "react-toastify";

function StatusBadge({ value, examId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const ref = useRef(null);
  const { updateStatus } = useUpdateStatus();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  function handleSelect(key) {
    setSelected(key);
    setIsOpen(false);

    updateStatus(
      { examId, status: key },
      {
        onSuccess: () => {
          toast.success("Exam status updated successfully");
        },
      },
    );
  }

  return (
    <div ref={ref} className='relative w-32'>
      {/* الزرار اللي بيفتح */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`text-md flex h-7.5 w-fit items-center justify-between gap-2 rounded-full px-7 py-1 font-medium uppercase transition-all ${STATUS_STYLES[selected]}`}
      >
        {STATUS_LABELS[selected]}
        <span className='text-[10px]'>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* القائمة */}
      {isOpen && (
        <div className='border-border bg-surface p- overflow absolute top-full left-0 z-999 w-full rounded-lg border shadow-lg'>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              type='button'
              onClick={() => handleSelect(key)}
              className={`text-md w-full px-3 py-2 text-left font-medium transition-colors hover:opacity-80 ${STATUS_STYLES[key]} ${selected === key ? "opacity-100" : "opacity-60"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusBadge;
