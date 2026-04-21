import { createContext, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useExamSession from "../hooks/useExamSession";
import { toast } from "react-toastify";
import useUser from "@/features/auth/hooks/useUser";
import useSubmit from "../hooks/useSubmit";

const ExamSessionContext = createContext();

function ExamSessionProvider({ children }) {
  const { examId } = useParams();

  const { examSession, isFetchingExamSession } = useExamSession(examId);

  const [currentQ, setCurrentQ] = useState(
    () => Number(localStorage.getItem("currentQ")) || 0,
  );

  const [userAnswers, setUserAnswers] = useState(
    () => JSON.parse(localStorage.getItem("userAnswers")) || {},
  );

  const [flagged, setFlagged] = useState(
    () => JSON.parse(localStorage.getItem("flagged")) || {},
  );

  const { user } = useUser();
  const { submitExam } = useSubmit();

  const totalQuestions = examSession?.questions.length || 0;

  const [timerSec, setTimerSec] = useState(() => {
    const savedTime = localStorage.getItem("timer");
    return savedTime ? Number(savedTime) : null;
  });

  const handleSelect = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleFlag = (questionId) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmit = useCallback(
    (reason) => {
      submitExam({
        examId: examSession.id,
        userId: user.id,
        answers: userAnswers,
        reason,
      });

      localStorage.removeItem("userAnswers");
      localStorage.removeItem("currentQ");
      localStorage.removeItem("flagged");
      localStorage.removeItem("timer");
    },
    [submitExam, userAnswers, user, examSession],
  );

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem("currentQ", currentQ);
  }, [currentQ]);

  useEffect(() => {
    localStorage.setItem("flagged", JSON.stringify(flagged));
  }, [flagged]);

  useEffect(() => {
    if (!localStorage.getItem("timer") && examSession?.duration) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimerSec(examSession.duration * 60);
    }
  }, [examSession, examId]);
  useEffect(() => {
    if (timerSec > 0) {
      localStorage.setItem("timer", timerSec.toString());
    }
  }, [timerSec]);

  useEffect(() => {
    if (timerSec === null) return;
    if (timerSec <= 0) {
      toast.error("Time's up!");
      handleSubmit("time_up");
      return;
    }
    const id = setInterval(() => setTimerSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [timerSec, handleSubmit]);

  return (
    <ExamSessionContext.Provider
      value={{
        userAnswers,
        handleSelect,
        currentQ,
        setCurrentQ,
        examSession,
        isFetchingExamSession,
        totalQuestions,
        flagged,
        handleFlag,
        timerSec,
        setTimerSec,
        handleSubmit,
      }}
    >
      {children}
    </ExamSessionContext.Provider>
  );
}

export { ExamSessionProvider as default, ExamSessionContext };
