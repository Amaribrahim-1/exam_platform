import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout as logoutApi } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed!");
    },
  });

  return { logout, isLoggingOut };
}

export default useLogout;
