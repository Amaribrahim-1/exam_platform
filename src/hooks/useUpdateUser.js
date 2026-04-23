import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser as updateUserApi } from "../services/userApi";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, extraFields, userId, role }) =>
      updateUserApi(fullName, avatar, extraFields, userId, role),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
