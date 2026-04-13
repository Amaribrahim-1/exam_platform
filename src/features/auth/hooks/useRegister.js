import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register as registerApi } from "../services/authApi";
import { getRoleHomePath } from "../utils/getRoleHomePath";

function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: ({ email, password, fullName, avatarFile }) =>
      registerApi(email, password, fullName, avatarFile),

    onSuccess: ({ session, user }) => {
      if (session && user) {
        queryClient.setQueryData(["user"], user);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Registration successful!");
        navigate(getRoleHomePath(user.role), { replace: true });
        return;
      }

      queryClient.setQueryData(["user"], null);
      toast.success("Account created. Confirm your email, then sign in.");
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message || "Registration failed!");
    },
  });

  return { register, isRegistering };
}
export default useRegister;
