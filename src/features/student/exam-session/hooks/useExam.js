import { useContext } from "react";
import { ExamSessionContext } from "../context/ExamSessionContext";

export function useExam() {
  const context = useContext(ExamSessionContext);
  if (!context) {
    throw new Error("useExam must be used within a ExamSessionProvider");
  }
  return context;
}
