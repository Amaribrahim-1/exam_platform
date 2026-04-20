import { useExam } from "../hooks/useExam";
import QuestionMap from "./QuestionMap";
import Timer from "./Timer";

function Sidebar() {
  const { examSession } = useExam();
  return (
    <div className='gap-md flex flex-col'>
      <Timer />
      <QuestionMap examSession={examSession} />
    </div>
  );
}

export default Sidebar;
