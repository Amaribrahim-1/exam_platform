import { toast } from "react-toastify";
import { updatePassword as updatePasswordApi } from "@/services/userApi";
import { useMutation } from "@tanstack/react-query";

function useUpdatePassword() {
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: ({ oldPassword, newPassword }) =>
        updatePasswordApi(oldPassword, newPassword),
      onSuccess: () => {
        toast.success("Password updated successfully");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Failed to update password");
      },
    },
  );

  return { updatePassword, isUpdatingPassword };
}

export default useUpdatePassword;
