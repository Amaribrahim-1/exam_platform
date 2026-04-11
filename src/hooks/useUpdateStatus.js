import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateExamStatus } from "../services/examApi";

function useUpdateStatus() {
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({ examId, status }) => updateExamStatus(examId, status),
    onSuccess: () => {
      toast.success("Exam status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update exam status");
    },
  });

  return { updateStatus, isUpdating };
}

export default useUpdateStatus;
