import { useSearchParams } from "react-router-dom";

import PageHeader from "../../../components/PageHeader";
import ProgressIndicator from "../../../components/ProgressIndicator";

import BasicInfoStep from "./components/BasicInfoStep";
import QuestionBuilderStep from "./components/QuestionBuilderStep";
import ReviewStep from "./components/ReviewStep";

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

      {step === 1 && <BasicInfoStep step={step} onNext={next} />}

      {step === 2 && (
        <QuestionBuilderStep step={step} onNext={next} onBack={back} />
      )}

      {step === 3 && <ReviewStep step={step} onBack={back} />}
    </div>
  );
}

export default CreateExamPage;
