import React from "react";
import { useExam } from "../hooks/useExam";

function QuestionMap() {
  const { examSession, userAnswers, flagged, currentQ, setCurrentQ } =
    useExam();

  const dotClasses = {
    flagged: "bg-warning/30 border-warning/35 text-warning",
    answered: "bg-primary/30 border-primary/40 text-primary",
    unvisited: "bg-surface-2 border-border text-text-muted",
  };

  const dotVariant = (questionId) => {
    if (typeof userAnswers[questionId] === "number") return "answered";
    if (flagged[questionId]) return "flagged";
    return "unvisited";
  };

  return (
    <div className='border-border bg-surface p-md rounded-lg border shadow-md'>
      <p className='font-display mb-md text-text text-[13px] font-semibold'>
        Question Map
      </p>

      <div className='mb-md grid grid-cols-5 gap-1.75'>
        {examSession.questions.map((question, i) => (
          <button
            onClick={() => {
              setCurrentQ(i);
            }}
            type='button'
            key={i}
            className={`flex aspect-square cursor-pointer items-center justify-center rounded-sm border font-mono text-[12px] font-bold transition-transform hover:scale-110 ${currentQ === i && "border-primary text-primary"} ${
              dotClasses[dotVariant(question.id) || "unvisited"]
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className='gap-xs border-border pt-sm flex flex-col border-t'>
        {[
          {
            cls: "bg-surface-2 border border-border",
            label: "Unvisited",
          },
          {
            cls: "bg-primary/30 border border-primary/40",
            label: "Answered",
          },
          {
            cls: "bg-warning/30 border border-warning/35",
            label: "Flagged",
          },
        ].map(({ cls, label }) => (
          <div
            key={label}
            className='gap-sm text-text-muted flex items-center text-[11px]'
          >
            <div className={`h-2.5 w-2.5 rounded-[3px] ${cls}`} />
            {label}
          </div>
        ))}
      </div>

      <div className='mt-sm text-text-muted flex flex-col gap-0.75 text-[12px]'>
        <div>
          Answered:{" "}
          <strong className='text-text'>
            {Object.values(userAnswers).filter((val) => val !== null).length}
          </strong>{" "}
          / {examSession.questions.length}
        </div>
        <div>
          Flagged:{" "}
          <strong className='text-text'>
            {Object.values(flagged).filter((val) => val !== false).length}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default QuestionMap;
