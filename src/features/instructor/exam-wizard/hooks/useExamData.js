import { useContext } from "react";
import { ExamWizardContext } from "../context/ExamWizardContext";

export function useExamData() {
  const context = useContext(ExamWizardContext);
  if (context === undefined) {
    throw new Error("useExam must be used within a ExamDataProvider");
  }
  return context;
}
