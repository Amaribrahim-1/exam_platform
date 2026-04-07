import { useSearchParams } from "react-router-dom";
import BasicInfo from "../features/exam-wizard/components/BasicInfo";
import ProgressIndicator from "../components/ProgressIndicator";
import PageHeader from "../components/PageHeader";

function CreateExamPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step_param = Number(searchParams.get("step")) || 1;

  function handleStepChange() {
    searchParams.set("step", step_param + 1);
    setSearchParams(searchParams);
  }

  function handleBackStep() {
    searchParams.set("step", step_param - 1);
    setSearchParams(searchParams);
  }

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        head='  Create New Exam'
        description='  Follow the steps to build and publish your exam.'
      />

      <ProgressIndicator step_param={step_param} />

      <BasicInfo
        onChangeStep={handleStepChange}
        onBackStep={handleBackStep}
        step={step_param}
      />
    </div>
  );
}

export default CreateExamPage;
