import supabase from "@/services/supabase";

export async function fetchExamHistoryPerInstructor(userId) {
  const { data, error } = await supabase
    .from("exam_results_view")
    .select(
      "id, title, subject, difficulty, student_name, department, grade, status, total_score, full_mark, score_percentage, reason, submitted_at, user_id, exam_id",
    )
    .eq("instructor_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
