import { BookOpen } from "lucide-react";
import { useParams } from "react-router-dom";

import { formatDate } from "../../../../Utils/formatDate";
import { useExamData } from "../hooks/useExamData";
import usePublishExam from "../hooks/usePublishExam";
import useUpdateExam from "../hooks/useUpdateExam";
import useUser from "@/features/auth/hooks/useUser";

import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import QuestionPreviewCard from "./QuestionPreviewCard";

function ReviewStep({ step, onBack }) {
  const { examId } = useParams();
  const isEditMode = Boolean(examId);

  const { examDetails, questions, isEditMode: contextEditMode } = useExamData();
  const { user } = useUser();

  // Create hooks
  const { publishExamDetails, isPending: isPublishing, isError: isPublishError } =
    usePublishExam();

  // Edit hooks
  const { updateExamDetails, isPending: isUpdating } = useUpdateExam(examId);

  const isPending = isPublishing || isUpdating;

  const stats = [
    { label: "Start Time", value: formatDate(examDetails?.startDate) },
    { label: "End Time", value: formatDate(examDetails?.endDate) },
    { label: "Duration", value: `${examDetails?.duration} mins` },
    { label: "Questions", value: questions.length },
  ];

  function buildQuestionsPayload() {
    return questions.map((q) => ({
      question: q.question,
      options: q.options,
      correct_answer_index: q.correctAnswerIndex,
      type: q.type,
      marks: q.marks,
    }));
  }

  function handleSave() {
    const questionsPayload = buildQuestionsPayload();

    if (isEditMode) {
      const examPayload = {
        title: examDetails.title,
        subject: examDetails.subject,
        start_date: examDetails.startDate,
        end_date: examDetails.endDate,
        duration: examDetails.duration,
        difficulty: examDetails.difficulty,
        questions_count: questions.length,
        total_marks: questions.reduce((acc, q) => acc + q.marks, 0),
        grade: examDetails.grade,
        department: examDetails.department,
      };

      updateExamDetails({
        examDetails: examPayload,
        examQuestions: questionsPayload,
      });
    } else {
      const examPayload = {
        instructor_id: user.id,
        instructor_name: user.fullName,
        title: examDetails.title,
        subject: examDetails.subject,
        start_date: examDetails.startDate,
        end_date: examDetails.endDate,
        duration: examDetails.duration,
        difficulty: examDetails.difficulty,
        questions_count: questions.length,
        total_marks: questions.reduce((acc, q) => acc + q.marks, 0),
        status: "active",
        grade: examDetails.grade,
        department: examDetails.department,
      };

      publishExamDetails({
        examDetails: examPayload,
        examQuestions: questionsPayload,
      });
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isPublishError) {
    return (
      <div className="text-center text-red-500">
        <p>Failed to publish exam. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="gap-lg flex flex-col">
      {/* Header */}
      <div className="bg-surface-2 border-border p-lg rounded-lg border">
        <div className="gap-md flex items-center">
          <div className="bg-primary-glow p-lg flex items-center justify-center rounded-lg">
            <BookOpen className="text-primary" size={32} />
          </div>
          <div>
            <h2 className="text-text text-2xl font-bold">
              {examDetails?.title || "Exam"}
            </h2>
            <p className="text-text-muted text-sm">
              📚 {examDetails?.subject || "Subject"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-surface-2 border-border p-lg rounded-lg border">
        <div className="gap-md grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="border-border bg-surface p-md rounded-lg border"
            >
              <p className="text-text-muted mb-sm text-xs font-semibold uppercase">
                {stat.label}
              </p>
              <p className="text-text text-lg font-bold sm:text-xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Questions Preview */}
      <QuestionPreviewCard questions={questions} />

      {/* Buttons */}
      <div
        className={`mt-lg flex flex-wrap items-center gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}
      >
        {step > 1 && (
          <Button variation="secondary" size="md" onClick={onBack} type="button">
            ← Edit Questions
          </Button>
        )}
        <Button
          onClick={handleSave}
          variation="primary"
          size="md"
          type="button"
          disabled={isPending}
        >
          {isEditMode ? "✓ Save Changes" : "✓ Confirm & Publish"}
        </Button>
      </div>
    </div>
  );
}

export default ReviewStep;
