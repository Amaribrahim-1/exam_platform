import { fetchAdminProfile } from "@/services/userApi";
import { useQuery } from "@tanstack/react-query";

function useAdminProfile(userId) {
  const { data: profile, isPending: isFetchingProfile } = useQuery({
    queryKey: ["adminProfile", userId],
    queryFn: () => fetchAdminProfile(userId),
    retry: 1,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return { profile, isFetchingProfile };
}

export default useAdminProfile;
