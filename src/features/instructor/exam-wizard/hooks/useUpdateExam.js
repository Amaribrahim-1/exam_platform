import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  updateExam as updateExamApi,
  updateExamQuestions,
} from "../../../../services/examApi";
import { useExamData } from "./useExamData";

function useUpdateExam(examId) {
  const navigate = useNavigate();
  const { clearExamData } = useExamData();
  const queryClient = useQueryClient();

  const { mutate: updateExamDetails, isPending } = useMutation({
    mutationFn: async ({ examDetails, examQuestions }) => {
      await updateExamApi(examId, examDetails);
      await updateExamQuestions(examId, examQuestions);
    },
    onSuccess: () => {
      toast.success("Exam updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["instructorExams"] });
      queryClient.invalidateQueries({ queryKey: ["exam", examId] });
      queryClient.invalidateQueries({ queryKey: ["questions", examId] });
      queryClient.invalidateQueries({ queryKey: ["studentExams"] });
      clearExamData();
      navigate("/instructor/exams-management");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update exam. Please try again.");
    },
  });

  return { updateExamDetails, isPending };
}

export default useUpdateExam;
