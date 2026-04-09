import MCQ from "./MCQ";
import TrueFalse from "./TrueFalse";

import { useExamData } from "../hooks/useExamData";

import { toast } from "react-toastify";
import Button from "../../../components/Button";
import QuestionsPreview from "./QuestionsPreview";

function Questions({ step, onNext, onBack }) {
  const {
    questions,
    questionType,
    setQuestionType,
    handleAddMCQ,
    handleAddTrueFalse,
    handleDelete,
    handleEdit,
    editingQuestionId,
  } = useExamData();

  function handleNext() {
    if (questions.length === 0) {
      toast.error("Please add at least one question before proceeding.");
      return;
    }
    onNext();
  }

  return (
    <div className='gap-lg flex flex-col'>
      <div className='space-y-md border-border bg-surface p-lg rounded-lg border'>
        <h3 className='text-text text-sm font-bold tracking-wide uppercase'>
          Add New Question
        </h3>
        <div className='gap-md flex items-center'>
          <button
            onClick={() => setQuestionType("MCQ")}
            disabled={editingQuestionId !== null}
            className={`px-md py-sm rounded-lg font-semibold transition-all ${
              editingQuestionId !== null
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } ${
              questionType === "MCQ"
                ? "bg-primary text-bg"
                : "border-border bg-surface-2 text-text hover:border-primary border"
            }`}
          >
            + Add MCQ
          </button>
          <button
            onClick={() => setQuestionType("TrueFalse")}
            disabled={editingQuestionId !== null}
            className={`px-md py-sm rounded-lg font-semibold transition-all ${
              editingQuestionId !== null
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer "
            } ${
              questionType === "TrueFalse"
                ? "bg-accent text-bg"
                : "border-border bg-surface-2 text-text hover:border-accent border"
            }`}
          >
            + True/False
          </button>
        </div>

        {questionType === "MCQ" && <MCQ onAdd={handleAddMCQ} />}
        {questionType === "TrueFalse" && (
          <TrueFalse onAdd={handleAddTrueFalse} />
        )}

        {/* Buttons Section */}
        <div
          className={`mt-lg flex items-center ${step > 1 ? "justify-between" : "justify-end"}`}
        >
          {step > 1 && (
            <Button
              variation='secondary'
              size='md'
              onClick={onBack}
              type='button'
              disabled={editingQuestionId !== null}
            >
              ← Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            variation='primary'
            size='md'
            type='button'
            disabled={editingQuestionId !== null}
          >
            Next (Review & Publish) →
          </Button>
        </div>
      </div>

      <QuestionsPreview
        questions={questions}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default Questions;
