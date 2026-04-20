import supabase from "@/services/supabase";

export async function fetchExamSession(examId) {
  const { data, error } = await supabase
    .from("exams")
    .select("*, questions(*)")
    .eq("id", examId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
