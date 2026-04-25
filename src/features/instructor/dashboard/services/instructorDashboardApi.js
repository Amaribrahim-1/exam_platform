import supabase from "@/services/supabase";

export async function getInstructorDashboardStats(userId) {
  const { data: exams, error: examsError } = await supabase
    .from("exams")
    .select("id")
    .eq("instructor_id", userId);

  if (examsError) throw new Error(examsError.message);

  const totalExams = exams.length;

  const examIds = exams && exams.map((e) => e.id);

  const { data: submissions, error: submissionsError } = await supabase
    .from("exam_submissions")
    .select("exam_id, status, total_score, full_mark, user_id")
    .in("exam_id", examIds)
    .not("total_score", "is", null)
    .not("full_mark", "is", null)
    .gt("full_mark", 0);

  if (submissionsError) throw new Error(submissionsError.message);

  const totalSubmissions = submissions.length;

  const averageScore =
    totalSubmissions > 0
      ? Math.round(
          submissions.reduce(
            (acc, s) => acc + (s.total_score / s.full_mark) * 100,
            0,
          ) / totalSubmissions,
        )
      : 0;

  const { data: studentProfiles, error: studentProfilesError } = await supabase
    .from("student_profiles")
    .select("id");

  if (studentProfilesError) throw new Error(studentProfilesError.message);

  const totalStudents = studentProfiles.length;

  const passed = submissions.filter((s) => s.status === "Passed").length;
  const failed = submissions.filter((s) => s.status === "Failed").length;

  return {
    totalExams,
    totalSubmissions,
    averageScore,
    totalStudents,
    submissionsBreakdown: { passed, failed },
  };
}

export async function getInstructorExamsPerformance(userId) {
  const { data: exams, error: examsError } = await supabase
    .from("exams")
    .select("id, title, start_date")
    .eq("instructor_id", userId)
    .order("start_date", { ascending: true });
  if (examsError) throw new Error(examsError.message);

  const examIds = exams.map((e) => e.id);

  const { data: submissions, error: submissionsError } = await supabase
    .from("exam_submissions")
    .select("exam_id, total_score, full_mark")
    .in("exam_id", examIds)
    .not("total_score", "is", null)
    .not("full_mark", "is", null)
    .gt("full_mark", 0);

  if (submissionsError) throw new Error(submissionsError.message);

  return exams.map((exam) => {
    const examSubmissions = submissions.filter((s) => s.exam_id === exam.id);

    const average =
      examSubmissions.length > 0
        ? Math.round(
            examSubmissions.reduce(
              (acc, s) => acc + (s.total_score / s.full_mark) * 100,
              0,
            ) / examSubmissions.length,
          )
        : 0;

    return {
      date: new Date(exam.start_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      title: exam.title,
      average,
    };
  });
}

// export async function recentExams(userId) {
//   const { data: exams, error: examsError } = await supabase
//     .from("exams")
//     .select("id")
//     .eq("instructor_id", userId);

//   if (examsError) throw new Error(examsError.message);

//   const examIds = exams.map((e) => e.id);

//   const { data: submissions, error: submissionsError } = await supabase
//     .from("exam_submissions")
//     .select(
//       "status, total_score, full_mark, submitted_at, time_taken, reason, exams(id, title, instructor_name)",
//     )
//     .in("exam_id", examIds)
//     .order("submitted_at", { ascending: false })
//     .limit(5);

//   if (submissionsError) throw new Error(submissionsError.message);

//   return submissions;
// }

export async function recentExams(userId) {
  const { data, error } = await supabase
    .from("exam_results_view")
    .select(
      "id, title, student_name, department, grade, status, total_score, full_mark, score_percentage, reason, submitted_at, user_id, exam_id",
    )
    .eq("instructor_id", userId)
    .order("submitted_at", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);
  return data;
}
