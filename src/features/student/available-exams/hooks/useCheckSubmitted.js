import { useQuery } from "@tanstack/react-query";
import { checkAlreadySubmitted } from "../../exam-session/services/examSessionApi";

function useCheckSubmitted({ examId, userId }) {
  const { data: alreadySubmitted, isPending: isCheckingSubmitted } = useQuery({
    queryKey: ["checkSubmitted", examId, userId],
    queryFn: () => checkAlreadySubmitted(examId, userId),
  });

  return { alreadySubmitted, isCheckingSubmitted };
}

export default useCheckSubmitted;
