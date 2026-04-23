import QuestionCard from "./QuestionCard";

function AnswerReviewSheet({ answers }) {
  return (
    <div className='bg-bg min-h-screen py-8'>
      {/* header */}
      <div className='mb-6'>
        <h2 className='font-display text-text text-xl font-bold'>
          Answer Review
        </h2>
        <p className='text-text-muted mt-1 text-sm'>
          {answers.length} questions · Review your answers below
        </p>
      </div>

      {/* filter pills */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {[
          {
            label: "All",
            count: answers.length,
            cls: "bg-primary/10 text-primary border-primary/25",
          },
          {
            label: "Correct",
            count: answers.filter((a) => a.is_correct).length,
            cls: "bg-accent/10 text-accent border-accent/25",
          },
          {
            label: "Wrong",
            count: answers.filter(
              (a) => !a.is_correct && a.chosen_option_index !== null,
            ).length,
            cls: "bg-danger/10 text-danger border-danger/25",
          },
          {
            label: "Skipped",
            count: answers.filter((a) => a.chosen_option_index === null).length,
            cls: "bg-surface-2 text-text-muted border-border",
          },
        ].map((p) => (
          <span
            key={p.label}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${p.cls}`}
          >
            {p.label} <span className='opacity-70'>({p.count})</span>
          </span>
        ))}
      </div>

      {/* cards */}
      <div className='flex flex-col gap-4'>
        {answers.map((answer, i) => (
          <QuestionCard key={answer.question_id} answer={answer} index={i} />
        ))}
      </div>
    </div>
  );
}

export default AnswerReviewSheet;
