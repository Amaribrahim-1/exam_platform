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

  if (totalExams === 0) {
    return { totalExams: 0, averageScore: 0, highestScore: 0, passRate: 0 };
  }

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

export async function getStudentPerformanceOverTime(userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("total_score, full_mark, submitted_at, exams(title)")
    .eq("user_id", userId)
    .not("total_score", "is", null)
    .not("full_mark", "is", null)
    .gt("full_mark", 0)
    .order("submitted_at", { ascending: true });

  if (error) throw new Error(error.message);

  return data.map((s) => ({
    // date: new Date(s.submitted_at).toLocaleDateString("en-US", {
    //   month: "short",
    //   day: "numeric",
    // }),
    title: s.exams.title,
    score: Math.round((s.total_score / s.full_mark) * 100),
  }));
}

export async function getStudentAnswerStats(userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("answers")
    .eq("user_id", userId)
    .not("answers", "is", null);

  if (error) throw new Error(error.message);

  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  data.forEach((submission) => {
    submission.answers.forEach((answer) => {
      if (answer.chosen_option_index === null) skipped++;
      else if (answer.is_correct) correct++;
      else wrong++;
    });
  });

  return { correct, wrong, skipped };
}

export async function recentExams(userId) {
  const { data: recentExams, error } = await supabase
    .from("exam_submissions")
    .select(
      "status, total_score, full_mark, submitted_at, time_taken, reason, exams(id, title, instructor_name)",
    )
    .order("submitted_at", { ascending: false })
    .limit(5)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return recentExams;
}
