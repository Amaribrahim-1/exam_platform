import { useQuery } from "@tanstack/react-query";
import useUser from "@/features/auth/hooks/useUser";
import { fetchAdminUsers } from "../services/adminUsersApi";

export default function useAdminUsers() {
  const { user } = useUser();

  const { data: users, isFetching: isUsersFetching } = useQuery({
    queryKey: ["adminUsers", user?.id],
    queryFn: () => fetchAdminUsers(user?.id),
    enabled: Boolean(user?.id),
    retry: 2,
  });

  return { users, isUsersFetching };
}
