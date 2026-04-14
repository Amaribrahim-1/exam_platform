import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser as updateUserApi } from "../services/userApi";

function useUpdateUser() {
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, extraFields, userId, role }) =>
      updateUserApi(fullName, avatar, extraFields, userId, role),
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
