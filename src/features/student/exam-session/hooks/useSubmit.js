import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitExam as submitExamApi } from "../services/examSessionApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useSubmit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: submitExam, isPending: isSubmitting } = useMutation({
    mutationFn: ({ examId, userId, answers, timeTaken, reason }) =>
      submitExamApi(examId, userId, answers, timeTaken, reason), // ← استقبلهم من mutate
    onSuccess: (_, { examId }) => {
      toast.success("Exam submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["checkSubmitted"] });
      queryClient.invalidateQueries({ queryKey: ["exams-history"] });
      navigate(`/student/exam-result/${examId}`);
    },
    onError: (error) => {
      toast.error("Failed to submit exam");
      console.log(error);
    },
  });

  return { submitExam, isSubmitting };
}
export default useSubmit;
