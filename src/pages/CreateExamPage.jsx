import PageHeader from "../components/PageHeader";
import ProgressIndicator from "../components/ProgressIndicator";
import BasicInfo from "../features/exam-wizard/components/BasicInfo";
import Questions from "../features/exam-wizard/components/Questions";

import { useWizard } from "../features/exam-wizard/hooks/useWizard";

function CreateExamPage() {
  const { step_param } = useWizard();

  return (
    <div className='flex flex-col gap-8'>
      <PageHeader
        head='  Create New Exam'
        description='  Follow the steps to build and publish your exam.'
      />

      <ProgressIndicator />

      {step_param === 1 && <BasicInfo />}

      {step_param === 2 && <Questions />}
    </div>
  );
}

export default CreateExamPage;
