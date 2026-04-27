import { useQuery } from "@tanstack/react-query";
import { getRecentActivity } from "../services/adminDashboardApi";

export default function useRecentActivity() {
  const { data: recentActivity, isFetching: isRecentActivityFetching } = useQuery({
    queryKey: ["adminRecentActivity"],
    queryFn: getRecentActivity,
    retry: 2,
  });

  return { recentActivity, isRecentActivityFetching };
}
