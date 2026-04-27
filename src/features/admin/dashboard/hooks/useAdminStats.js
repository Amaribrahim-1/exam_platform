import { useQuery } from "@tanstack/react-query";
import useUser from "@/features/auth/hooks/useUser";
import { getAdminDashboardStats } from "../services/adminDashboardApi";

export default function useAdminStats() {
  const { user } = useUser();

  const { data: adminStats, isFetching: isAdminStatsFetching } = useQuery({
    queryKey: ["adminStats", user?.id],
    queryFn: () => getAdminDashboardStats(user?.id),
    enabled: Boolean(user?.id),
    retry: 2,
  });

  return { adminStats, isAdminStatsFetching };
}
