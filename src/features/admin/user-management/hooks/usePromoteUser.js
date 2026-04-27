import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { promoteToInstructor as promoteToInstructorApi } from "../services/adminUsersApi";

export default function usePromoteUser() {
  const queryClient = useQueryClient();

  const { mutate: promoteUser, isPending: isPromoting } = useMutation({
    mutationFn: promoteToInstructorApi,
    onSuccess: () => {
      toast.success("User promoted to instructor successfully");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { promoteUser, isPromoting };
}
