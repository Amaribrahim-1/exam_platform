import { toast } from "react-toastify";
import { useExamData } from "../hooks/useExamData";

import Button from "../../../../components/Button";

import MCQForm from "./MCQForm";
import QuestionPreviewCard from "./QuestionPreviewCard";
import TrueFalseForm from "./TrueFalseForm";

function QuestionBuilderStep({ step, onNext, onBack }) {
  const {
    questions,
    questionType,
    setQuestionType,
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
    <div className="gap-lg flex flex-col">
      <div className="space-y-md border-border bg-surface p-lg rounded-lg border">
        <h3 className="text-text text-sm font-bold tracking-wide uppercase">
          Add New Question
        </h3>
        <div className="flex flex-wrap items-center gap-3">
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

        {questionType === "MCQ" && <MCQForm />}
        {questionType === "TrueFalse" && <TrueFalseForm />}

        {/* Buttons Section */}
        <div
          className={`mt-lg flex flex-wrap items-center gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}
        >
          {step > 1 && (
            <Button
              variation="secondary"
              size="md"
              onClick={onBack}
              type="button"
              disabled={editingQuestionId !== null}
            >
              ← Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            variation="primary"
            size="md"
            type="button"
            disabled={editingQuestionId !== null}
          >
            Next (Review & Publish) →
          </Button>
        </div>
      </div>

      <QuestionPreviewCard
        questions={questions}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default QuestionBuilderStep;
