import { useExam } from "../hooks/useExam";
import Tag from "./Tag";

function ExamInfo() {
  const { examSession } = useExam();
  return (
    <div className='mb-lg gap-md border-border bg-surface p-lg flex flex-wrap items-center rounded-lg border'>
      <div>
        <h1 className='font-display text-text mb-1 text-[22px] font-bold'>
          {examSession.title}
        </h1>
        <p className='text-text-muted text-[13px]'>
          {examSession.instructor_name}&nbsp;·&nbsp;
          {examSession.questions_count} Questions&nbsp;·&nbsp;
          {examSession.duration} min
        </p>
        <div className='mt-sm gap-sm flex flex-wrap'>
          <Tag color='primary'>{examSession.subject}</Tag>
          <Tag color='warning'>{examSession.total_marks} Marks</Tag>
          <Tag color='accent'>
            {examSession.difficulty.charAt(0).toUpperCase() +
              examSession.difficulty.slice(1)}
          </Tag>
        </div>
      </div>
    </div>
  );
}

export default ExamInfo;
