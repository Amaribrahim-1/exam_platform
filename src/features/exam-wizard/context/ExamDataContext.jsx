import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExamDataContext = createContext();

function ExamDataProvider({ children }) {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("exam-questions");
    return saved ? JSON.parse(saved) : [];
  });

  const [examDetails, setExamDetails] = useState(() => {
    const saved = localStorage.getItem("exam-details");
    return saved ? JSON.parse(saved) : [];
  });

  const [questionType, setQuestionType] = useState("MCQ");

  const [editingQuestionId, setEditingQuestionId] = useState(null);

  function handleAddQuestion(questionData) {
    if (editingQuestionId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestionId ? { ...questionData, id: q.id } : q,
        ),
      );
      setEditingQuestionId(null); // لازم نصفر الـ ID بعد التعديل
    } else {
      setQuestions((prev) => [...prev, { ...questionData, id: Date.now() }]);
    }
  }

  function handleDelete(id) {
    setQuestions((prev) => prev.filter((question) => question.id !== id));

    toast.success("Question deleted successfully!");
  }

  function handleExamDetails(details) {
    setExamDetails({ ...details });
  }

  function handleEdit(id) {
    const questionToEdit = questions.find((q) => q.id === id);

    if (questionToEdit) {
      setQuestionType(questionToEdit.type);

      setEditingQuestionId(id);

      // setTimeout is used to ensure that the form is rendered before we try to scroll,
      // preventing potential issues with the element not being found
      setTimeout(() => {
        const element = document.getElementById("main-content");
        if (element) {
          element.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 10);
    }
  }

  useEffect(
    function () {
      // Temporarily using localStorage to persist questions, can be replaced with API calls later
      localStorage.setItem("exam-questions", JSON.stringify(questions));
    },
    [questions],
  );

  useEffect(
    function () {
      localStorage.setItem("exam-details", JSON.stringify(examDetails));
    },
    [examDetails],
  );

  return (
    <ExamDataContext.Provider
      value={{
        questions,
        handleAddQuestion,
        handleDelete,
        questionType,
        setQuestionType,
        examDetails,
        handleExamDetails,
        editingQuestionId,
        setEditingQuestionId,
        handleEdit,
      }}
    >
      {children}
    </ExamDataContext.Provider>
  );
}

export { ExamDataContext, ExamDataProvider };
