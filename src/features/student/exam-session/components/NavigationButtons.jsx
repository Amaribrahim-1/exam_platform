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

  const question = examSession?.questions.find((q, i) => i === currentQ);

  const isFlagged = flagged[question?.id] || false;

  const { isSubmitting } = useSubmit();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isSubmitting) return <Loader />;

  return (
    <div className='border-border pt-md mt-7 flex flex-col gap-3 border-t sm:flex-row sm:items-center sm:justify-between'>
      {/* Row 1 on mobile: Prev + Next/Submit */}
      <div className='flex items-center justify-between gap-2 sm:contents'>
        <Button
          onClick={() => setCurrentQ((prev) => (prev === 0 ? prev : prev - 1))}
          disabled={currentQ === 0}
          variation='secondary'
          size='md'
        >
          ← Previous
        </Button>

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
            variation='primary'
            size='md'
          >
            Next →
          </Button>
        )}
      </div>

      {/* Flag button — full-width on mobile, inline on desktop */}
      <button
        onClick={() => handleFlag(question.id)}
        className={`gap-sm px-md py-sm border-border bg-surface-2 hover:bg-warning/10 hover:border-warning hover:text-warning text-text flex w-full cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors sm:w-auto sm:order-none order-first`}
      >
        <FlagIcon size={17} />
        {isFlagged ? "Unflag" : "Flag for Review"}
      </button>

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
