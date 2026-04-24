import supabase from "@/services/supabase";

export async function getStudentDashboardStats(userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("total_score, full_mark, status, reason")
    .eq("user_id", userId)
    .not("total_score", "is", null)
    .not("full_mark", "is", null)
    .gt("full_mark", 0);

  if (error) throw new Error(error.message);

  const totalExams = data.length;

  const highestScore = Math.round(
    Math.max(...data.map((s) => (s.total_score / s.full_mark) * 100)),
  );

  const averageScore = Math.round(
    data.reduce((acc, s) => acc + (s.total_score / s.full_mark) * 100, 0) /
      totalExams,
  );

  const passRate = Math.round(
    (data.filter((s) => s.status === "Passed").length / totalExams) * 100,
  );

  return {
    totalExams,
    averageScore,
    highestScore,
    passRate,
  };
}
