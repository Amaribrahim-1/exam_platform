import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout as logoutApi } from "../services/authApi";

function useLogout() {
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("Logout successful!");
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed!");
    },
  });

  return { logout, isLoggingOut };
}

export default useLogout;
