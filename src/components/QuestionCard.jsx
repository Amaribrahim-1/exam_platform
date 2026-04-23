import OptionItem from "./OptionItem";

function QuestionCard({ answer, index }) {
  const {
    question_text,
    options,
    chosen_option_index,
    correct_option_index,
    is_correct,
    marks,
    marks_earned,
  } = answer;

  const isSkipped = chosen_option_index === null;

  const statusBadge = is_correct
    ? { label: "Correct", cls: "bg-accent/15 text-accent border-accent/30" }
    : isSkipped
      ? {
          label: "Skipped",
          cls: "bg-text-muted/15 text-text-muted border-border",
        }
      : { label: "Wrong", cls: "bg-danger/15 text-danger border-danger/30" };

  const getOptionState = (i) => {
    if (i === correct_option_index && i === chosen_option_index)
      return "correct";
    if (i === chosen_option_index && !is_correct) return "wrong";
    if (i === correct_option_index && !is_correct) return "missed";
    return "neutral";
  };

  const labels = ["A", "B", "C", "D"];

  return (
    <div className='bg-surface border-border overflow-hidden rounded-2xl border'>
      {/* top accent line */}
      <div
        className={`h-0.5 w-full ${
          is_correct ? "bg-accent" : isSkipped ? "bg-border" : "bg-danger"
        }`}
      />

      <div className='flex flex-col gap-4 p-5'>
        {/* header */}
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-start gap-3'>
            {/* question number */}
            <span className='bg-surface-2 text-text-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold'>
              {index + 1}
            </span>
            <p className='text-text pt-0.5 text-sm leading-snug font-semibold'>
              {question_text}
            </p>
          </div>

          {/* marks + status */}
          <div className='flex shrink-0 flex-col items-end gap-1.5'>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusBadge.cls}`}
            >
              {statusBadge.label}
            </span>
            <span className='text-text-muted text-xs'>
              <span
                className={`font-bold ${
                  is_correct ? "text-accent" : "text-danger"
                }`}
              >
                {marks_earned}
              </span>
              /{marks} pts
            </span>
          </div>
        </div>

        {/* options */}
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {options.map((opt, i) => (
            <OptionItem
              key={i}
              label={labels[i]}
              text={opt}
              state={getOptionState(i)}
            />
          ))}
        </div>

        {/* skipped note */}
        {isSkipped && (
          <p className='text-text-muted border-border bg-surface-2/40 rounded-lg border py-2 text-center text-xs'>
            You skipped this question — correct answer was{" "}
            <span className='text-accent font-semibold'>
              {labels[correct_option_index]}. {options[correct_option_index]}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
