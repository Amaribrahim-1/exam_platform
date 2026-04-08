import { BookOpen } from "lucide-react";
import Button from "../../../components/Button";
import { formatExamDate } from "../../../Utils/formatDate";
import { useExamData } from "../hooks/useExamData";
import QuestionsPreview from "./QuestionsPreview";

function ExamSummary({ step, onBack }) {
  const { examDetails, questions } = useExamData();

  // Stats for the top section
  const stats = [
    {
      label: "Start Time",
      value: formatExamDate(examDetails?.startDate),
    },
    {
      label: "End Time",
      value: formatExamDate(examDetails?.endDate),
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

  console.log(examDetails);
  // console.log(examDetails.startTime);

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
      <QuestionsPreview questions={questions} />

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
        <Button variation='primary' size='md' type='button'>
          ✓ Confirm & Publish
        </Button>
      </div>
    </div>
  );
}

export default ExamSummary;
