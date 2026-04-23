import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateExamStatus } from "../../../../services/examApi";

function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({ examId, status }) => updateExamStatus(examId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: () => {
      toast.error("Failed to update exam status");
    },
  });

  return { updateStatus, isUpdating };
}

export default useUpdateStatus;
