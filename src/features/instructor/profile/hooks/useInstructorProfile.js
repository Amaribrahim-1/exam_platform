import { fetchInstructorProfile } from "@/services/userApi";
import { useQuery } from "@tanstack/react-query";

function useInstructorProfile(userId) {
  const { data: profile, isPending: isFetchingProfile } = useQuery({
    queryKey: ["studentProfile", userId],
    queryFn: () => fetchInstructorProfile(userId),
    enabled: !!userId,
  });

  return { profile, isFetchingProfile };
}

export default useInstructorProfile;
