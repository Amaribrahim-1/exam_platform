import supabase from "./supabase";

export async function fetchExamResults(examId, userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("*, exams(title, instructor_name)")
    .eq("exam_id", examId)
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
