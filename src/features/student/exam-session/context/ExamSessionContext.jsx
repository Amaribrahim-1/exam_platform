import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useExamSession from "../hooks/useExamSession";

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

  const totalQuestions = examSession?.questions.length || 0;

  const [timerSec, setTimerSec] = useState(() => {
    const savedTime = localStorage.getItem("timer");
    return savedTime ? Number(savedTime) : examSession?.duration * 60 || 0;
  });

  useEffect(() => {
    if (!localStorage.getItem(`timer`) && examSession?.duration) {
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
    if (timerSec <= 0) {
      // handleAutoSubmit();
      return;
    }
    const id = setInterval(() => setTimerSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [timerSec]);

  /*
   // بنقرأ الداتا الكبيرة مرة واحدة
  const savedData = JSON.parse(localStorage.getItem(`exam_data_${examId}`)) || {};

  const [userAnswers, setUserAnswers] = useState(savedData.userAnswers || {});
  const [currentQ, setCurrentQ] = useState(savedData.currentQ || 0);
  const [flagged, setFlagged] = useState(savedData.flagged || {});

  useEffect(() => {
  const examData = {
    userAnswers,
    currentQ,
    flagged
  };
  
  localStorage.setItem(`exam_data_${examId}`, JSON.stringify(examData));
  }, [userAnswers, currentQ, flagged, examId]);
  */

  const handleSelect = (questionId, answerIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleFlag = (questionId) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId], // بيقلب الحالة (true -> false والعكس)
    }));
  };

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem("currentQ", currentQ);
  }, [currentQ]);

  useEffect(() => {
    localStorage.setItem("flagged", JSON.stringify(flagged));
  }, [flagged]);

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
      }}
    >
      {children}
    </ExamSessionContext.Provider>
  );
}

export { ExamSessionProvider as default, ExamSessionContext };
