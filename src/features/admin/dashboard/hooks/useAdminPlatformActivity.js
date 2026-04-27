import { useQuery } from "@tanstack/react-query";
import { getAdminPlatformActivity } from "../services/adminDashboardApi";

export default function useAdminPlatformActivity() {
  const {
    data: platformActivity,
    isFetching: isPlatformActivityFetching,
  } = useQuery({
    queryKey: ["adminPlatformActivity"],
    queryFn: getAdminPlatformActivity,
    retry: 2,
  });

  return { platformActivity, isPlatformActivityFetching };
}
