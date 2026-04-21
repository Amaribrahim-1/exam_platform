import useUser from "@/features/auth/hooks/useUser";
import { formatExamDate } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiBook,
  FiCalendar,
  FiClock,
  FiHelpCircle,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useCheckSubmitted from "../hooks/useCheckSubmitted";

const difficultyConfig = {
  easy: { color: "bg-accent/20 text-accent", label: "Easy" },
  medium: { color: "bg-warning/20 text-warning", label: "Medium" },
  hard: { color: "bg-danger/20 text-danger", label: "Hard" },
};
const statusConfig = {
  active: { color: "bg-accent/20 text-accent", label: "Active" },
  upcoming: { color: "bg-warning/20 text-warning", label: "Upcoming" },
  submitted: { color: "bg-danger/20 text-danger", label: "Submitted" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

function getExamStatus(exam, isSubmitted = false) {
  const now = new Date();
  const start = new Date(exam.start_date);
  const end = new Date(exam.end_date);

  if (isSubmitted) return "submitted";
  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "missed";
}

function ExamCard({ exam, index }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const { alreadySubmitted } = useCheckSubmitted({
    examId: exam.id,
    userId: user.id,
  });

  const status = getExamStatus(exam, alreadySubmitted);

  const difficulty =
    difficultyConfig[exam.difficulty] || difficultyConfig.medium;

  const handleClick = () => {
    if (alreadySubmitted) {
      // navigate to exam result
      navigate(`/student/exam-result/${exam.id}`);
      return;
    }
    navigate(`/student/exam-session/${exam.id}`);
  };

  if (exam.status !== "active" || status === "missed") {
    return null;
  }

  return (
    <motion.div
      custom={index}
      initial='hidden'
      animate='visible'
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className='bg-surface border-border hover:border-primary/50 group relative flex flex-col gap-4 overflow-hidden rounded-[12px] border p-5 transition-all duration-200 hover:shadow-[0_0_32px_rgba(108,142,245,0.12)]'
    >
      {/* Glow */}
      <div
        className='pointer-events-none absolute inset-0 opacity-100'
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(108,142,245,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className='flex items-start justify-between'>
        <motion.div
          whileHover={{
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.4 },
          }}
          className='bg-surface-2 rounded-[8px] p-2.5 text-xl'
        >
          {<FiBook />}
        </motion.div>
        <div className='flex gap-2'>
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.07 + 0.2 }}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficulty.color}`}
          >
            {difficulty.label}
          </motion.span>
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.07 + 0.2 }}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig[status].color}`}
          >
            {statusConfig[status].label}
          </motion.span>
        </div>
      </div>

      <h3 className='text-text group-hover:text-primary text-base leading-snug font-semibold transition-colors duration-200'>
        {exam.title}
      </h3>

      {/* Subject & Instructor */}
      <div className='flex items-center gap-3'>
        <span className='text-text-muted flex items-center gap-1.5 text-xs'>
          <FiBook size={11} />
          {exam.subject}
        </span>
        <span className='text-border'>•</span>
        <span className='text-text-muted flex items-center gap-1.5 text-xs'>
          <FiUser size={11} />
          {exam.instructor_name}
        </span>
      </div>

      {/* Dates */}
      <div className='bg-surface-2 flex flex-col gap-1.5 rounded-[8px] px-3 py-2.5'>
        <div className='flex items-center justify-between text-xs'>
          <span className='text-text-muted flex items-center gap-1.5'>
            <FiCalendar size={11} />
            Starts
          </span>
          <span className='text-text font-medium'>
            {formatExamDate(exam.start_date)}
          </span>
        </div>
        <div className='bg-border h-px w-full' />
        <div className='flex items-center justify-between text-xs'>
          <span className='text-text-muted flex items-center gap-1.5'>
            <FiCalendar size={11} />
            Ends
          </span>
          <span className='text-text font-medium'>
            {formatExamDate(exam.end_date)}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className='text-text-muted flex items-center justify-between text-sm'>
        <span className='flex items-center gap-1.5'>
          <FiClock size={13} />
          {exam.duration} min
        </span>
        <span className='flex items-center gap-1.5'>
          <FiHelpCircle size={13} />
          {exam.questions_count} questions
        </span>
        <span className='flex items-center gap-1.5'>
          <FiAward size={13} />
          {exam.total_marks} marks
        </span>
      </div>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className='bg-primary/10 hover:bg-primary text-primary border-primary/30 hover:border-primary mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border py-2.5 text-sm font-medium transition-all duration-200 hover:text-white'
      >
        {alreadySubmitted ? "View Result" : "Start Exam"}
        <FiArrowRight
          size={14}
          className='transition-transform duration-200 group-hover:translate-x-1'
        />
      </motion.button>
    </motion.div>
  );
}

export default ExamCard;
