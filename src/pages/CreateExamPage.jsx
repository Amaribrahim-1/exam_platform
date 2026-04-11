import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProgressIndicator from "../components/ProgressIndicator";
import BasicInfo from "../features/exam-wizard/components/BasicInfo";
import ExamSummary from "../features/exam-wizard/components/ExamSummary";
import Questions from "../features/exam-wizard/components/Questions";

function CreateExamPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = Number(searchParams.get("step")) || 1;

  const next = () => setSearchParams({ step: step + 1 });

  const back = () => setSearchParams({ step: step - 1 });

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        head='  Create New Exam'
        description='  Follow the steps to build and publish your exam.'
      />

      <ProgressIndicator step_param={step} />

      {step === 1 && <BasicInfo step={step} onNext={next} />}

      {step === 2 && <Questions step={step} onNext={next} onBack={back} />}

      {step === 3 && <ExamSummary step={step} onBack={back} />}
    </div>
  );
}

export default CreateExamPage;
