import { fetchStudentProfile } from "@/services/userApi";
import { useQuery } from "@tanstack/react-query";

function useStudentProfile(userId) {
  const { data: profile, isPending: isFetchingProfile } = useQuery({
    queryKey: ["studentProfile", userId],
    queryFn: () => fetchStudentProfile(userId),
    enabled: !!userId,
    retry: 1,
  });

  return { profile, isFetchingProfile };
}

export default useStudentProfile;
