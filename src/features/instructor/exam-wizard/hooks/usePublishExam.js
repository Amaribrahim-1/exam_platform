import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { publishExam as publishExamApi } from "../../../../services/examApi";
import { useExamData } from "../hooks/useExamData";

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
      navigate("/instructor/exams-management");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      clearExamData();
    },
    onError: (error) => {
      toast.error("Failed to publish exam. Please try again.");
      console.log(error);
      navigate("/instructor/exams-management");
    },
  });

  return { publishExamDetails, isPending, isError };
}

export default usePublishExam;
