import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import PageHeader from "../../../components/PageHeader";
import ProgressIndicator from "../../../components/ProgressIndicator";
import Loader from "../../../components/Loader";

import ExamWizardProvider from "./context/ExamWizardContext";
import BasicInfoStep from "./components/BasicInfoStep";
import QuestionBuilderStep from "./components/QuestionBuilderStep";
import ReviewStep from "./components/ReviewStep";

import { fetchExam, fetchExamQuestions } from "../../../services/examApi";
import useCheckSubmissions from "@/hooks/useCheckSubmissions";
import { formatDateForInput } from "@/Utils/formatDate";

// Map DB columns → form field names
function mapDbExamToForm(exam) {
  return {
    id: exam.id,
    title: exam.title,
    subject: exam.subject,
    duration: parseInt(exam.duration),
    difficulty: exam.difficulty,
    startDate: formatDateForInput(exam.start_date),
    endDate: formatDateForInput(exam.end_date),
    grade: exam.grade,
    department: exam.department,
    status: exam.status,
    instructor_id: exam.instructor_id,
    instructor_name: exam.instructor_name,
  };
}

// Map DB question row → wizard internal format
function mapDbQuestionsToForm(questions) {
  return questions.map((q) => ({
    id: q.id,
    type: q.type,
    question: q.question,
    options: q.options,
    correctAnswerIndex: q.correct_answer_index,
    marks: q.marks,
  }));
}

function ExamWizardInner({ isEditMode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 1;

  const next = () => setSearchParams({ step: step + 1 });
  const back = () => setSearchParams({ step: step - 1 });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        head={isEditMode ? "Edit Exam" : "Create New Exam"}
        description={
          isEditMode
            ? "Update your exam details, questions, and settings."
            : "Follow the steps to build and publish your exam."
        }
      />

      <ProgressIndicator step_param={step} />

      {step === 1 && <BasicInfoStep step={step} onNext={next} />}
      {step === 2 && (
        <QuestionBuilderStep step={step} onNext={next} onBack={back} />
      )}
      {step === 3 && <ReviewStep step={step} onBack={back} />}
    </div>
  );
}

function ExamWizardPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(examId);

  const { hasSubmissions, isLoadingSubmissions } = useCheckSubmissions(isEditMode ? examId : null);

  const { data: examData, isLoading: isLoadingExam } = useQuery({
    queryKey: ["exam", examId],
    queryFn: () => fetchExam(examId),
    enabled: isEditMode,
  });

  const { data: existingQuestions, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => fetchExamQuestions(examId),
    enabled: isEditMode,
  });

  if (isEditMode && (isLoadingExam || isLoadingQuestions || isLoadingSubmissions)) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader />
      </div>
    );
  }

  if (isEditMode && hasSubmissions) {

    return (
      <div className="flex flex-col items-center justify-center p-16 gap-4">
        <h2 className="text-2xl font-bold text-red-600">Cannot Edit Exam</h2>
        <p className="text-gray-600">This exam already has student submissions and cannot be edited.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const initialExam = examData ? mapDbExamToForm(examData) : {};
  const initialQuestions = existingQuestions
    ? mapDbQuestionsToForm(existingQuestions)
    : [];

  return (
    <ExamWizardProvider initialExam={initialExam} initialQuestions={initialQuestions}>
      <ExamWizardInner isEditMode={isEditMode} />
    </ExamWizardProvider>
  );
}

export default ExamWizardPage;
