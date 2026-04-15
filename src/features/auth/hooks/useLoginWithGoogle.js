import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleGoogleLogin } from "../services/authApi";

function useLoginWithGoogle() {
  const { mutate: loginWithGoogle, isPending: isLoggingInWithGoogle } =
    useMutation({
      mutationFn: () => handleGoogleLogin(),
      onError: (err) => {
        if (err.message !== "User focused other window") {
          toast.error(err.message);
        }
      },
    });

  return { loginWithGoogle, isLoggingInWithGoogle };
}

export default useLoginWithGoogle;
