import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import { FlagIcon } from "lucide-react";
import { useState } from "react";
import { useExam } from "../hooks/useExam";
import useSubmit from "../hooks/useSubmit";
import ConfirmSubmitModal from "./ConfirmSubmitModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isSubmitting) return <Loader />;

  return (
    <div className='border-border gap-sm pt-md mt-7 flex items-center justify-between border-t'>
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
        className={`gap-sm px-xs py-sm border-border sm:px-md sm:py-sm bg-surface-2 hover:bg-warning/10 hover:border-warning hover:text-warning text-text sm:text-md flex cursor-pointer items-center rounded-md border text-sm font-medium transition-colors`}
      >
        <FlagIcon size={17} />
        {isFlagged ? "Unflag" : "Flag for Review"}
      </button>
      {currentQ === totalQuestions - 1 ? (
        <Button
          onClick={() => setIsModalOpen(true)}
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
          disabled={currentQ === totalQuestions - 1}
          variation='primary' // danger
          size='md'
        >
          Next →
        </Button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        children={<ConfirmSubmitModal />}
        actions={
          <>
            <Button
              onClick={() => setIsModalOpen(false)}
              variation='secondry'
              size='md'
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit("manual")}
              variation='primary'
              size='md'
            >
              Submit
            </Button>
          </>
        }
      />
    </div>
  );
}

export default NavigationButtons;
