import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleGoogleLogin } from "../services/authApi";
import { toast } from "react-toastify";
import { getRoleHomePath } from "../utils/getRoleHomePath";
import { useNavigate } from "react-router-dom";

function useLoginWithGoogle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginWithGoogle, isPending: isLoggingInWithGoogle } =
    useMutation({
      mutationFn: () => handleGoogleLogin(),
      onSuccess: ({ user }) => {
        queryClient.setQueryData(["user"], user);
        navigate(getRoleHomePath(user?.role), { replace: true });
      },
      onError: (error) => {
        toast.error(error.message || "Credentials are not correct!");
      },
    });

  return { loginWithGoogle, isLoggingInWithGoogle };
}

export default useLoginWithGoogle;
