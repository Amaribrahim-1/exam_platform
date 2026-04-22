import { BookOpen } from "lucide-react";
import { formatDate } from "../../../../Utils/formatDate";
import { useExamData } from "../hooks/useExamData";

import usePublishExam from "../hooks/usePublishExam";

import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import QuestionPreviewCard from "./QuestionPreviewCard";
import useUser from "@/features/auth/hooks/useUser";

function ReviewStep({ step, onBack }) {
  const { examDetails, questions } = useExamData();
  const { publishExamDetails, isPending, isError } = usePublishExam();
  const { user } = useUser();
  console.log(user.fullName);

  const stats = [
    {
      label: "Start Time",
      value: formatDate(examDetails?.startDate),
    },
    {
      label: "End Time",
      value: formatDate(examDetails?.endDate),
    },
    {
      label: "Duration",
      value: `${examDetails.duration} mins`,
    },
    {
      label: "Questions",
      value: questions.length,
    },
  ];

  function handlePublish() {
    const examDetailsToPublish = {
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
    };

    const questionsToPublish = questions.map((q) => ({
      question: q.question,
      options: q.options,
      correct_answer_index: q.correctAnswerIndex,
      type: q.type,
      marks: q.marks,
    }));

    publishExamDetails({
      examDetails: examDetailsToPublish,
      examQuestions: questionsToPublish,
    });
  }

  if (isPending) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500'>
        <p>Failed to publish exam. Please try again.</p>
      </div>
    );
  }

  return (
    <div className='gap-lg flex flex-col'>
      {/* Header */}
      <div className='bg-surface-2 border-border p-lg rounded-lg border'>
        <div className='gap-md flex items-center'>
          <div className='bg-primary-glow p-lg flex items-center justify-center rounded-lg'>
            <BookOpen className='text-primary' size={32} />
          </div>
          <div>
            <h2 className='text-text text-2xl font-bold'>
              {examDetails?.title || "Exam"}
            </h2>
            <p className='text-text-muted text-sm'>
              📚 {examDetails?.subject || "Subject"}
            </p>
          </div>
        </div>
      </div>

      {/* Header Stats */}
      <div className='bg-surface-2 border-border p-lg rounded-lg border'>
        <div className='gap-md grid grid-cols-4'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className='border-border bg-surface p-md rounded-lg border'
            >
              <p className='text-text-muted mb-sm text-xs font-semibold uppercase'>
                {stat.label}
              </p>
              <p className='text-text text-xl font-bold'>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Questions Preview Section */}
      <QuestionPreviewCard questions={questions} />

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
          >
            ← Edit Questions
          </Button>
        )}
        <Button
          onClick={handlePublish}
          variation='primary'
          size='md'
          type='button'
        >
          ✓ Confirm & Publish
        </Button>
      </div>
    </div>
  );
}

export default ReviewStep;
