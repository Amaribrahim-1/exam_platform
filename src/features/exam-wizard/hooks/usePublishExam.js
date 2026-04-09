import { useMutation } from "@tanstack/react-query";
import { publishExam as publishExamApi } from "../services/examApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function usePublishExam() {
  const navigate = useNavigate();

  const {
    mutate: publishExamDetails,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ examDetails, examQuestions }) =>
      publishExamApi(examDetails, examQuestions),
    onSuccess: () => {
      toast.success("Exam published successfully!");
      navigate("/instructor/exams-management");
      localStorage.removeItem("exam-details");
      localStorage.removeItem("exam-questions");
    },
    onError: () => {
      toast.error("Failed to publish exam. Please try again.");
    },
  });

  return { publishExamDetails, isPending, isError };
}

export default usePublishExam;
