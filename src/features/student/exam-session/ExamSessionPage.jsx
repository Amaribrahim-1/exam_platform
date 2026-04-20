import Loader from "@/components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import ExamInfo from "./components/ExamInfo";
import NavigationButtons from "./components/NavigationButtons";
import QuestionCard from "./components/QuestionCard";
import Sidebar from "./components/Sidebar";
import useExamSession from "./hooks/useExamSession";
import { useEffect } from "react";
import { useExam } from "./hooks/useExam";

function ExamSessionPage() {
  const { isFetchingExamSession } = useExam();

  // const { examId } = useParams();

  // const { examSession, isFetchingExamSession } = useExamSession(examId);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       console.log("حاول يغش أو يخرج!");
  //       // navigate("/student/dashboard");
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  if (isFetchingExamSession) return <Loader />;

  return (
    <div className='bg-bg text-text mx-auto min-h-screen max-w-275 font-sans'>
      <ExamInfo />

      <div className='gap-md grid grid-cols-1 items-start sm:grid-cols-[1fr_220px]'>
        <QuestionCard />

        <Sidebar />
      </div>
      <NavigationButtons />
    </div>
  );
}

export default ExamSessionPage;

// import { useState, useEffect } from "react";
// import NavigationButtons from "./components/NavigationButtons";
// import { Timer } from "lucide-react";

// const EXAM = {
//   title: "Midterm - Data Structure",
//   subject: "Data Structure",
//   instructor_name: "Mr. Amar",
//   questions_count: 2,
//   duration: 8,
//   total_marks: 30,
//   difficulty: "easy",
//   questions: [
//     {
//       id: "c68f8701",
//       question: "Is Data Structure Easy?",
//       options: ["True", "False"],
//       marks: 10,
//       type: "TrueFalse",
//     },
//     {
//       id: "ed8a3b90",
//       question: "Choose The Stack Option To Get Mark",
//       options: ["STACK", "Stack", "Stack Option", "STACK Option"],
//       marks: 20,
//       type: "MCQ",
//     },
//   ],
// };

// const LETTERS = ["A", "B", "C", "D", "E"];

// export default function ExamSessionPage() {
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState(
//     Array(EXAM.questions.length).fill(null),
//   );
//   const [flagged, setFlagged] = useState(
//     Array(EXAM.questions.length).fill(false),
//   );
//   const [timerSec, setTimerSec] = useState(EXAM.duration * 60);

//   useEffect(() => {
//     if (timerSec <= 0) return;
//     const id = setTimeout(() => setTimerSec((s) => s - 1), 1000);
//     return () => clearTimeout(id);
//   }, [timerSec]);

//   const mm = String(Math.floor(timerSec / 60)).padStart(2, "0");
//   const ss = String(timerSec % 60).padStart(2, "0");
//   const timerColor =
//     timerSec <= 60
//       ? "text-[var(--color-danger)]"
//       : timerSec <= 120
//         ? "text-[var(--color-warning)]"
//         : "text-[var(--color-text)]";

//   const q = EXAM.questions[currentQ];
//   const answeredCount = answers.filter((a) => a !== null).length;
//   const flaggedCount = flagged.filter(Boolean).length;

//   function selectAnswer(idx) {
//     const next = [...answers];
//     next[currentQ] = idx;
//     setAnswers(next);
//   }

//   function toggleFlag() {
//     const next = [...flagged];
//     next[currentQ] = !next[currentQ];
//     setFlagged(next);
//   }

//   function dotVariant(i) {
//     if (i === currentQ) return "current";
//     if (flagged[i]) return "flagged";
//     if (answers[i] !== null) return "answered";
//     return "default";
//   }

//   const dotClasses = {
//     default:
//       "bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-[var(--color-border)]",
//     current:
//       "bg-[var(--color-primary)] text-white border-[var(--color-primary)]",
//     answered:
//       "bg-[var(--color-primary-glow)] text-[var(--color-primary)] border-[var(--color-primary)]/40",
//     flagged:
//       "bg-[var(--color-warning)]/15 text-[var(--color-warning)] border-[var(--color-warning)]/35",
//   };

//   return (
//     <div className='mx-auto min-h-screen max-w-[1100px] bg-[var(--color-bg)] p-[var(--spacing-lg)] font-sans text-[var(--color-text)]'>
//       {/* Exam Info Card */}
//       <div className='mb-[var(--spacing-lg)] flex flex-wrap items-center gap-[var(--spacing-md)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-lg)]'>
//         <div>
//           <h1 className='font-display mb-1 text-[22px] font-bold text-[var(--color-text)]'>
//             {EXAM.title}
//           </h1>
//           <p className='text-[13px] text-[var(--color-text-muted)]'>
//             {EXAM.instructor_name}&nbsp;·&nbsp;{EXAM.questions_count}{" "}
//             Questions&nbsp;·&nbsp;{EXAM.duration} min
//           </p>
//           <div className='mt-[var(--spacing-sm)] flex flex-wrap gap-[var(--spacing-sm)]'>
//             <Tag color='primary'>{EXAM.subject}</Tag>
//             <Tag color='accent'>{EXAM.total_marks} Marks</Tag>
//             <Tag color='accent'>
//               {EXAM.difficulty.charAt(0).toUpperCase() +
//                 EXAM.difficulty.slice(1)}
//             </Tag>
//           </div>
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className='grid grid-cols-[1fr_220px] items-start gap-[var(--spacing-md)]'>
//         {/* Question Panel */}
//         <div className='rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7'>
//           <p className='mb-[var(--spacing-md)] font-mono text-[11px] tracking-[0.08em] text-[var(--color-primary)] uppercase'>
//             Question {currentQ + 1} of {EXAM.questions.length}
//           </p>

//           <p className='mb-[var(--spacing-sm)] text-[17px] leading-relaxed font-medium'>
//             {q.question}
//           </p>

//           <span className='mb-[var(--spacing-md)] inline-block rounded-full border border-[var(--color-warning)]/20 bg-[var(--color-warning)]/10 px-[var(--spacing-sm)] py-[var(--spacing-xs)] font-mono text-[11px] text-[var(--color-warning)]'>
//             {q.marks} marks
//           </span>

//           <div className='flex flex-col gap-[var(--spacing-sm)]'>
//             {q.options.map((opt, i) => (
//               <button
//                 key={i}
//                 onClick={() => selectAnswer(i)}
//                 className={`flex w-full cursor-pointer items-center gap-[var(--spacing-md)] rounded-[var(--radius-md)] border px-[var(--spacing-md)] py-[var(--spacing-md)] text-left text-[15px] text-[var(--color-text)] transition-all duration-150 ${
//                   answers[currentQ] === i
//                     ? "border-[var(--color-primary)] bg-[var(--color-primary-glow)]"
//                     : "border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5"
//                 }`}
//               >
//                 <span
//                   className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[var(--radius-sm)] font-mono text-[12px] font-bold transition-all duration-150 ${
//                     answers[currentQ] === i
//                       ? "bg-[var(--color-primary)] text-white"
//                       : "bg-[var(--color-border)] text-[var(--color-text-muted)]"
//                   }`}
//                 >
//                   {LETTERS[i]}
//                 </span>
//                 <span>{opt}</span>
//               </button>
//             ))}
//           </div>

//           <NavigationButtons/>

//         {/* Sidebar */}
//         <div className='flex flex-col gap-[var(--spacing-md)]'>
//           {/* Timer */}
//         <Timer/>

//           {/* Question Map */}
//           <div className='rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-md)]'>
//             <p className='font-display mb-[var(--spacing-md)] text-[13px] font-semibold'>
//               Question Map
//             </p>

//             <div className='mb-[var(--spacing-md)] grid grid-cols-5 gap-[7px]'>
//               {EXAM.questions.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentQ(i)}
//                   className={`flex aspect-square cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border font-mono text-[12px] font-bold transition-transform hover:scale-110 ${dotClasses[dotVariant(i)]}`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>

//             <div className='flex flex-col gap-[var(--spacing-xs)] border-t border-[var(--color-border)] pt-[var(--spacing-sm)]'>
//               {[
//                 {
//                   cls: "bg-[var(--color-surface-2)] border border-[var(--color-border)]",
//                   label: "Unvisited",
//                 },
//                 {
//                   cls: "bg-[var(--color-primary)]/30 border border-[var(--color-primary)]/40",
//                   label: "Answered",
//                 },
//                 {
//                   cls: "bg-[var(--color-warning)]/30 border border-[var(--color-warning)]/35",
//                   label: "Flagged",
//                 },
//               ].map(({ cls, label }) => (
//                 <div
//                   key={label}
//                   className='flex items-center gap-[var(--spacing-sm)] text-[11px] text-[var(--color-text-muted)]'
//                 >
//                   <div className={`h-[10px] w-[10px] rounded-[3px] ${cls}`} />
//                   {label}
//                 </div>
//               ))}
//             </div>

//             <div className='mt-[var(--spacing-sm)] flex flex-col gap-[3px] text-[12px] text-[var(--color-text-muted)]'>
//               <div>
//                 Answered:{" "}
//                 <strong className='text-[var(--color-text)]'>
//                   {answeredCount}
//                 </strong>{" "}
//                 / {EXAM.questions.length}
//               </div>
//               <div>
//                 Flagged:{" "}
//                 <strong className='text-[var(--color-text)]'>
//                   {flaggedCount}
//                 </strong>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Tag({ color, children }) {
//   const variants = {
//     primary:
//       "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border-[var(--color-primary)]/30",
//     accent:
//       "bg-[var(--color-accent)]/12 text-[var(--color-accent)] border-[var(--color-accent)]/25",
//     warning:
//       "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20",
//   };
//   return (
//     <span
//       className={`rounded-full border px-[var(--spacing-sm)] py-[var(--spacing-xs)] font-mono text-[11px] font-semibold tracking-[0.03em] uppercase ${variants[color]}`}
//     >
//       {children}
//     </span>
//   );
// }

// function FlagIcon() {
//   return (
//     <svg
//       width='13'
//       height='13'
//       viewBox='0 0 14 14'
//       fill='none'
//       className='flex-shrink-0'
//     >
//       <path
//         d='M2 1v12M2 1h8l-2 3 2 3H2'
//         stroke='currentColor'
//         strokeWidth='1.5'
//         strokeLinecap='round'
//         strokeLinejoin='round'
//       />
//     </svg>
//   );
// }
