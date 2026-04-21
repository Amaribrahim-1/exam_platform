import { FlagIcon, X } from "lucide-react";
import { useExam } from "../hooks/useExam";
import Tag from "./Tag";

function QuestionCard() {
  const {
    examSession,
    userAnswers,
    handleSelect,
    currentQ,
    totalQuestions,
    flagged,
  } = useExam();
  const question = examSession?.questions.at(currentQ);
  const isFlagged = flagged[question.id];

  const LETTERS = ["A", "B", "C", "D"];

  return (
    <div className='border-border bg-surface rounded-lg border p-7 shadow-md'>
      {/* Question Header */}

      <div className='flex items-center justify-between'>
        <p className='mb-md text-primary font-mono text-[12px] font-bold tracking-[0.08em] uppercase'>
          Question {currentQ + 1} of {totalQuestions}
        </p>
        {isFlagged && (
          <span
            className={`gap-sm mb-md px-md py-xs border-warning text-warning flex items-center rounded-md border bg-transparent text-[13px] font-medium transition-colors`}
          >
            <FlagIcon size={15} /> Flagged
          </span>
        )}
      </div>

      {/* Question Text */}
      <p className='mb-sm text-text text-[17px] leading-relaxed font-medium'>
        {question?.question}
      </p>

      {/* Marks Badge */}
      <span className='mb-md border-warning/20 bg-warning/10 px-sm py-xs text-warning inline-block rounded-full border font-mono text-[11px]'>
        10 marks
      </span>

      {/* Options List */}
      <div className='gap-sm flex flex-col'>
        {question?.options.map((opt, i) => {
          const active = userAnswers[question.id] === i;

          return (
            <button
              onClick={() => handleSelect(question.id, i)}
              key={i}
              className={`gap-md p-md group flex w-full cursor-pointer items-center rounded-md border text-left text-[15px] transition-all duration-150 ${
                active
                  ? "border-primary bg-primary-glow text-text"
                  : "border-border bg-surface-2 hover:border-primary/50 text-text-muted"
              }`}
            >
              {/* Letter Box */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm font-mono text-[12px] font-bold transition-all duration-150 ${
                  active
                    ? "bg-primary text-white"
                    : "bg-border text-text-muted group-hover:bg-primary/20 group-hover:text-primary"
                }`}
              >
                {LETTERS[i]}
              </span>

              {/* Option Text */}
              <div className='flex w-full items-center justify-between'>
                <span
                  className={`${active ? "text-text" : "group-hover:text-text"}`}
                >
                  {opt}
                </span>

                {active && (
                  <span
                    role='button'
                    title='Remove Answer'
                    className='hover:bg-primary/10 cursor-pointer rounded-full p-1 transition-colors'
                    onClick={(e) => {
                      e.stopPropagation(); //
                      handleSelect(question.id, null);
                    }}
                  >
                    <X size={17} className='text-primary' />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
