import { fetchInstructorProfile } from "@/services/userApi";
import { useQuery } from "@tanstack/react-query";

function useInstructorProfile(userId) {
  const { data: profile, isPending: isFetchingProfile } = useQuery({
    queryKey: ["instructorProfile", userId],
    queryFn: () => fetchInstructorProfile(userId),
    retry: 1,
    enabled: !!userId,

    // cacheTime: 5 Minutes,
    staleTime: 1000 * 60 * 5,
  });

  return { profile, isFetchingProfile };
}

export default useInstructorProfile;
