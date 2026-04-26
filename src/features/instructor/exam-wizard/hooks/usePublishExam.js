import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { publishExam as publishExamApi } from "../../../../services/examApi";
import { useExamData } from "./useExamData";

function usePublishExam() {
  const navigate = useNavigate();
  const { clearExamData } = useExamData();
  const queryClient = useQueryClient();

  const {
    mutate: publishExamDetails,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ examDetails, examQuestions }) =>
      publishExamApi(examDetails, examQuestions),
    onSuccess: () => {
      toast.success("Exam published successfully!");
      queryClient.invalidateQueries({ queryKey: ["instructorExams"] });
      queryClient.invalidateQueries({ queryKey: ["studentExams"] });
      clearExamData();
      navigate("/instructor/exams-management");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to publish exam. Please try again.");
    },
  });

  return { publishExamDetails, isPending, isError };
}

export default usePublishExam;
