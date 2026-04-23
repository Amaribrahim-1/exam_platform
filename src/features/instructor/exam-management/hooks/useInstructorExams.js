import { fetchExamsPerInstructor } from "@/services/examApi";
import { useQuery } from "@tanstack/react-query";

function useInstructorExams(userId) {
  const { data: instructorExams, isPending: isFetchingInstructorExams } =
    useQuery({
      queryKey: ["instructorExams", userId],
      queryFn: () => fetchExamsPerInstructor(userId),
      enabled: Boolean(userId),
    });

  return { instructorExams, isFetchingInstructorExams };
}

export default useInstructorExams;
