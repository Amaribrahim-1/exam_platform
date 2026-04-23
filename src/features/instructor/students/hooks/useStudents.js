import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "../services/studentsApi";

function useStudents() {
  const { data: students, isPending: isFetchingStudents } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  return { students, isFetchingStudents };
}

export default useStudents;
