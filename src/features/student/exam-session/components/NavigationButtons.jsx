import Button from "@/components/Button";
import { FlagIcon } from "lucide-react";
import { useExam } from "../hooks/useExam";
import useSubmit from "../hooks/useSubmit";
import Loader from "@/components/Loader";
import useUser from "@/features/auth/hooks/useUser";

function NavigationButtons() {
  const {
    examSession,
    currentQ,
    setCurrentQ,
    totalQuestions,
    flagged,
    handleFlag,

    handleSubmit,
  } = useExam();

  const question = examSession?.questions.at(currentQ);
  const isFlagged = flagged[question.id];

  const { isSubmitting } = useSubmit();

  if (isSubmitting) return <Loader />;

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
        className={`gap-sm px-md py-sm bg-surface-2 hover:bg-warning/10 hover:border-warning hover:text-warning text-text text-md flex cursor-pointer items-center rounded-md font-medium transition-colors`}
      >
        <FlagIcon size={17} />
        {isFlagged ? "Unflag" : "Flag for Review"}
      </button>
      {currentQ === totalQuestions - 1 ? (
        <Button
          onClick={() => handleSubmit("manual")}
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
