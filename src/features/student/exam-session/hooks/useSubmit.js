import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitExam as submitExamApi } from "../services/examSessionApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function useSubmit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: submitExam, isPending: isSubmitting } = useMutation({
    mutationFn: ({ examId, userId, answers, reason }) =>
      submitExamApi(examId, userId, answers, reason),
    onSuccess: (data) => {
      toast.success("Exam submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["checkSubmitted"] });
      // to result/id
      console.log(data);
      navigate("/student/dashboard");
    },
    onError: () => {
      toast.error("Failed to submit exam");
    },
  });

  return { submitExam, isSubmitting };
}

export default useSubmit;
