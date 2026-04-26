import { createContext, useState } from "react";
import { toast } from "react-toastify";

const ExamWizardContext = createContext();

function ExamWizardProvider({ children, initialExam = {}, initialQuestions = [] }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [examDetails, setExamDetails] = useState(initialExam);
  const [questionType, setQuestionType] = useState("MCQ");
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const isEditMode = Boolean(initialExam?.id);

  function handleAddQuestion(questionData) {
    if (editingQuestionId) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestionId ? { ...questionData, id: q.id } : q,
        ),
      );
      setEditingQuestionId(null);
    } else {
      setQuestions((prev) => [...prev, { ...questionData, id: Date.now() }]);
    }
  }

  function handleDelete(id) {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
    toast.success("Question deleted successfully!");
  }

  function handleExamDetails(details) {
    setExamDetails(details);
  }

  function clearExamData() {
    setQuestions([]);
    setExamDetails({});
  }

  function handleEdit(id) {
    const questionToEdit = questions.find((q) => q.id === id);

    if (questionToEdit) {
      setQuestionType(questionToEdit.type);
      setEditingQuestionId(id);

      setTimeout(() => {
        const element = document.getElementById("main-content");
        if (element) {
          element.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 10);
    }
  }

  return (
    <ExamWizardContext.Provider
      value={{
        isEditMode,
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
        clearExamData,
      }}
    >
      {children}
    </ExamWizardContext.Provider>
  );
}

export { ExamWizardContext, ExamWizardProvider as default };
