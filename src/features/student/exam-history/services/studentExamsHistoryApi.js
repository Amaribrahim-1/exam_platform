import supabase from "@/services/supabase";

export async function fetchExamsHistory(userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("*, exams(title, id, instructor_name, subject, difficulty)")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}
