import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authApi";

function useUser() {
  const { data: user, isPending: isFetchingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isFetchingUser };
}

export default useUser;
