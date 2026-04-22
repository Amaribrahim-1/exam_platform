import Loader from "@/components/Loader";
import { useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ExamHeader from "./components/ExamHeader";
import NavigationButtons from "./components/NavigationButtons";
import QuestionCard from "./components/QuestionCard";
import Sidebar from "./components/Sidebar";
import { useAntiCheat } from "./hooks/useAntiCheat";
import { useExam } from "./hooks/useExam";

const VIOLATION_MESSAGES = {
  tab_switch: "Switching tabs is not allowed during the exam",
  window_blur: "You must stay focused on the exam window",
  devtools_open: "Developer tools are not allowed during the exam",
  devtools_shortcut: "This keyboard shortcut is not allowed during the exam",
  view_source: "Viewing page source is not allowed",
  right_click: "Right-clicking is not allowed during the exam",
  split_screen: "Split screen is not allowed during the exam",
  tab_switch_shortcut: "Tab navigation shortcuts are not allowed",
  navigation_away: "You cannot leave the exam page",
  copy_attempt: "Copying is not allowed during the exam",
};

function ExamSessionPage() {
  const { examId } = useParams();

  const { handleSubmit, isFetchingExamSession } = useExam();

  const location = useLocation();

  const isExamSession = examId && !location.pathname.includes("/result");

  const handleViolation = useCallback((type, count) => {
    const message = VIOLATION_MESSAGES[type] ?? "Violation detected";
    toast.warning(`${message} (Warning ${count} of 3)`);
  }, []);

  const handleAutoSubmit = useCallback(() => {
    toast.error("Exam auto-submitted due to repeated violations");

    handleSubmit("cheat");
  }, [handleSubmit]);

  useAntiCheat({
    examId: isExamSession ? examId : null,
    onViolation: handleViolation,
    maxViolations: 3,
    onAutoSubmit: handleAutoSubmit,
  });

  if (isFetchingExamSession) return <Loader />;

  return (
    <div className='bg-bg text-text mx-auto min-h-screen max-w-275 font-sans'>
      <ExamHeader />
      <div className='gap-md grid grid-cols-1 items-start sm:grid-cols-[1fr_220px]'>
        <QuestionCard />
        <Sidebar />
      </div>
      <NavigationButtons />
    </div>
  );
}

export default ExamSessionPage;
