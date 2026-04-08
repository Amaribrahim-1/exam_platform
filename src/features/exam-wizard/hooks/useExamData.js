import { useContext } from "react";
import { ExamDataContext } from "../context/ExamDataContext";

export function useExamData() {
  const context = useContext(ExamDataContext);
  if (context === undefined) {
    throw new Error("useExam must be used within a ExamDataProvider");
  }
  return context;
}
