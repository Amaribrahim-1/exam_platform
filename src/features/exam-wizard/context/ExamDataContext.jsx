import { createContext, useEffect, useState } from "react";

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
  // [{ type: "MCQ", id: 1 , question: "Question 1" , options: ["Option 1", "Option 2", "Option 3", "Option 4"]}, { type: "TrueFalse", id: 2 }]
  // function handleAddMCQ(question, updatedQuestion = null) {
  //   if (editingQuestionId) {
  //     setQuestions((prev) =>
  //       prev.map((q) =>
  //         q.id === editingQuestionId ? { ...q, ...updatedQuestion } : q,
  //       ),
  //     );
  //     setEditingQuestionId(null);
  //   } else {
  //     setQuestions((prev) => [...prev, question]);
  //   }
  // }

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
  // function handleAddMCQ(questionData) {
  //   if (editingQuestionId) {
  //     setQuestions((prev) =>
  //       prev.map((q) =>
  //         q.id === editingQuestionId ? { ...questionData, id: q.id } : q,
  //       ),
  //     );
  //     setEditingQuestionId(null); // لازم نصفر الـ ID بعد التعديل
  //   } else {
  //     setQuestions((prev) => [...prev, { ...questionData, id: Date.now() }]);
  //   }
  // }

  // function handleAddTrueFalse(question) {
  //   if (editingQuestionId) {
  //     setQuestions((prev) =>
  //       prev.map((q) =>
  //         q.id === editingQuestionId ? { ...question, id: q.id } : q,
  //       ),
  //     );
  //     setEditingQuestionId(null); // لازم نصفر الـ ID بعد التعديل
  //   } else {
  //     setQuestions((prev) => [...prev, { ...question, id: Date.now() }]);
  //   }
  // }

  function handleDelete(id) {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  }

  function handleExamDetails(details) {
    setExamDetails({ ...details });
  }

  function handleEdit(id) {
    // 1. دور على السؤال اللي ضغطنا عليه عشان نعرف نوعه
    const questionToEdit = questions.find((q) => q.id === id);

    if (questionToEdit) {
      setQuestionType(questionToEdit.type);

      setEditingQuestionId(id);

      const element = document.getElementById("main-content");
      element?.scrollTo({ top: 0, behavior: "smooth" });
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
        handleEdit,
      }}
    >
      {children}
    </ExamDataContext.Provider>
  );
}

export { ExamDataContext, ExamDataProvider };
