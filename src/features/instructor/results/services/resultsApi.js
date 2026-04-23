import supabase from "@/services/supabase";

export async function fetchExamResults(submissionId, userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("*, exams!inner(*)")
    .eq("id", submissionId)
    .eq("exams.instructor_id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
