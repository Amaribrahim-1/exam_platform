import Button from "@/components/Button";
import { FlagIcon } from "lucide-react";
import { useExam } from "../hooks/useExam";

function NavigationButtons() {
  const {
    examSession,
    currentQ,
    setCurrentQ,
    totalQuestions,
    flagged,
    handleFlag,
  } = useExam();

  const question = examSession?.questions.at(currentQ);

  const isFlagged = flagged[question.id];

  return (
    <div className='border-border pt-md mt-7 flex items-center justify-between border-t'>
      <Button
        onClick={() => setCurrentQ((prev) => (prev === 0 ? prev : prev - 1))}
        disabled={currentQ === 0}
        variation='secondary'
        size='md'
      >
        ← Previous
      </Button>
      <button
        onClick={() => handleFlag(question.id)}
        className={`gap-sm px-md py-xs hover:border-warning hover:text-warning flex cursor-pointer items-center rounded-md border bg-transparent text-[13px] font-medium transition-colors`}
      >
        <FlagIcon size={17} />
        {isFlagged ? "Unflag" : "Flag for Review"}
      </button>
      {currentQ === totalQuestions - 1 ? (
        <Button
          onClick={() => console.log("Exam Submited ")}
          variation='primary'
          size='md'
        >
          Submit
        </Button>
      ) : (
        <Button
          onClick={() =>
            setCurrentQ((prev) =>
              prev === totalQuestions - 1 ? prev : prev + 1,
            )
          }
          disabled={currentQ === 1}
          variation='primary' // danger
          size='md'
        >
          Next →
        </Button>
      )}
    </div>
  );
}

export default NavigationButtons;
