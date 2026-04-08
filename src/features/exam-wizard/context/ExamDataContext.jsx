import { createContext, useEffect, useState } from "react";

const ExamDataContext = createContext();

function ExamDataProvider({ children }) {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("exam-questions");
    return saved ? JSON.parse(saved) : [];
  });
  const [questionType, setQuestionType] = useState("MCQ");
  // [{ type: "MCQ", id: 1 , question: "Question 1" , options: ["Option 1", "Option 2", "Option 3", "Option 4"]}, { type: "TrueFalse", id: 2 }]
  function handleAddMCQ(question) {
    setQuestions((prev) => [...prev, question]);
  }
  function handleAddTrueFalse(question) {
    setQuestions((prev) => [...prev, question]);
  }

  function handleDelete(id) {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  }

  useEffect(
    function () {
      // Temporarily using localStorage to persist questions, can be replaced with API calls later
      localStorage.setItem("exam-questions", JSON.stringify(questions));
    },
    [questions],
  );

  return (
    <ExamDataContext.Provider
      value={{
        questions,
        handleAddMCQ,
        handleAddTrueFalse,
        handleDelete,
        questionType,
        setQuestionType,
      }}
    >
      {children}
    </ExamDataContext.Provider>
  );
}

export { ExamDataContext, ExamDataProvider };
