import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "../services/adminDashboardApi";

export default function useAdminStats() {
  const { data: adminStats, isFetching: isAdminStatsFetching } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminDashboardStats,
    retry: 2,
  });

  return { adminStats, isAdminStatsFetching };
}
