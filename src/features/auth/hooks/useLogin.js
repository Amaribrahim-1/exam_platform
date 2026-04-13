import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as loginApi } from "../services/authApi";
import { getRoleHomePath } from "../utils/getRoleHomePath";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login successful!");
      navigate(getRoleHomePath(user?.role), { replace: true });
    },

    onError: (error) => {
      toast.error(error.message || "Credentials are not correct!");
    },
  });

  return { login, isLoggingIn };
}
export default useLogin;
