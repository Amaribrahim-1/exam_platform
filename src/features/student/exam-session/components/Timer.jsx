import { useExam } from "../hooks/useExam";

function Timer() {
  const { timerSec } = useExam();
  const mm = String(Math.floor(timerSec / 60)).padStart(2, "0");
  const ss = String(timerSec % 60).padStart(2, "0");

  const timerColor =
    timerSec <= 60
      ? "text-danger"
      : timerSec <= 120
        ? "text-warning"
        : "text-text";

  return (
    <div className='border-border bg-surface p-md rounded-lg border text-center'>
      <p className='mb-sm text-text-muted font-mono text-[11px] tracking-[0.08em] uppercase'>
        Time Remaining
      </p>
      <p
        className={`font-mono text-[38px] leading-none font-medium tracking-[0.04em] ${timerColor}`}
      >
        {mm}:{ss}
      </p>
      <p className='mt-xs text-text-muted text-[11px]'>minutes : seconds</p>
    </div>
  );
}

export default Timer;
