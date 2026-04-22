import supabase from "./supabase";

export async function fetchExamResult(examId, userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("*, exams(title, instructor_name)")
    .eq("exam_id", examId)
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchExamResults(userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("*, exams(title, id, instructor_name, subject, difficulty)")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}
