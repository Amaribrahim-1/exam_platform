import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteExam as deleteExamApi } from "../../../../services/examApi";

function useDeleteExam() {
  const queryClient = useQueryClient();

  const { mutate: deleteExam, isPending: isDeleting } = useMutation({
    mutationFn: deleteExamApi,

    onSuccess: () => {
      toast.success("Exam deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },

    onError: () => {
      toast.error("Failed to delete exam");
    },
  });

  return { deleteExam, isDeleting };
}

export default useDeleteExam;
