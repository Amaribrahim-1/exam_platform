import { formatTime } from "@/Utils/formatTime";
import { getMessage } from "@/Utils/getMessage";
import CircularProgress from "./CircularProgress";
import Stat from "./Stat";

function getReasonConfig(reason) {
  switch (reason) {
    case "cheat":
      return {
        label: "Cheating Detected",
        color: "bg-danger/15 text-danger border-danger/30",
      };
    case "time_up":
      return {
        label: "Time's Up",
        color: "bg-warning/15 text-warning border-warning/30",
      };
    case "manual":
    default:
      return {
        label: "Submitted",
        color: "bg-primary/15 text-primary border-primary/30",
      };
  }
}

function ResultSummaryCard({ examResults }) {
  const { total_score, full_mark, status, time_taken, answers, reason } =
    examResults;

  const correct = answers.filter((a) => a.is_correct).length;
  const wrong = answers.filter(
    (a) => !a.is_correct && a.chosen_option_index !== null,
  ).length;
  const skipped = answers.filter((a) => a.chosen_option_index === null).length;
  const percentage = Math.round((total_score / full_mark) * 100);

  const msg = getMessage(percentage);

  const reasonConfig = getReasonConfig(reason);

  return (
    <div className='bg-surface border-border overflow-hidden rounded-2xl border shadow-md'>
      {/* top glow line */}
      <div className='via-primary h-px w-full bg-linear-to-r from-transparent to-transparent opacity-60' />

      <div className='flex flex-col items-center gap-6 px-8 py-10'>
        {/* badges */}
        <div className='flex items-center gap-3'>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              status === "Passed"
                ? "bg-accent/15 text-accent border-accent/30"
                : "bg-danger/15 text-danger border-danger/30"
            }`}
          >
            {status === "Passed" ? "✓ Passed" : "✗ Failed"}
          </span>
          <span className='bg-primary/10 text-primary border-primary/25 rounded-full border px-3 py-1 text-xs font-semibold'>
            {total_score} / {full_mark} marks
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${reasonConfig.color}`}
          >
            {reasonConfig.label}
          </span>
        </div>

        {/* ring */}
        <CircularProgress percentage={percentage} />

        {/* message */}
        <div className='flex flex-col items-center gap-1 text-center'>
          <p className='font-display text-text text-xl font-bold'>
            {msg.emoji} {msg.text}
          </p>
          <p className='text-text-muted text-sm'>{msg.sub}</p>
        </div>

        {/* divider */}
        <div className='bg-border h-px w-full' />

        {/* stats */}
        <div className='divide-border flex w-full items-center justify-center divide-x'>
          <Stat value={correct} label='Correct' colorClass='text-accent' />
          <Stat value={wrong} label='Wrong' colorClass='text-danger' />
          <Stat value={skipped} label='Skipped' colorClass='text-text-muted' />
          <Stat
            value={formatTime(time_taken)}
            label='Time Taken'
            colorClass='text-warning'
            isString
          />
        </div>
      </div>
    </div>
  );
}

export default ResultSummaryCard;
