import supabase from "@/services/supabase";

export async function getAdminDashboardStats(adminId) {
  const { data: exams, error: examsError } = await supabase
    .from("exams")
    .select("id");
  if (examsError) throw new Error(examsError.message);
  const totalExams = exams.length;

  const { data: submissions, error: submissionsError } = await supabase
    .from("exam_submissions")
    .select("status, total_score, full_mark")
    .not("total_score", "is", null)
    .not("full_mark", "is", null)
    .gt("full_mark", 0);
  if (submissionsError) throw new Error(submissionsError.message);
  const totalSubmissions = submissions.length;

  const { data: students, error: studentsError } = await supabase
    .from("student_profiles")
    .select("id");
  if (studentsError) throw new Error(studentsError.message);
  const totalStudents = students.filter((s) => s.id !== adminId).length;

  const { data: instructors, error: instructorsError } = await supabase
    .from("instructor_profiles")
    .select("id");
  if (instructorsError) throw new Error(instructorsError.message);
  const totalInstructors = instructors.filter((i) => i.id !== adminId).length;

  const passed = submissions.filter((s) => s.status === "Passed").length;
  const failed = submissions.filter((s) => s.status === "Failed").length;

  return {
    totalExams,
    totalSubmissions,
    totalStudents,
    totalInstructors,
    submissionsBreakdown: { passed, failed },
  };
}

export async function getAdminPlatformActivity() {
  const { data: exams, error: examsError } = await supabase
    .from("exams")
    .select("id, title, start_date")
    .order("start_date", { ascending: false })
    .limit(15);
  if (examsError) throw new Error(examsError.message);

  exams.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

  const examIds = exams.map((e) => e.id);

  const { data: submissions, error: submissionsError } = await supabase
    .from("exam_submissions")
    .select("exam_id, total_score, full_mark")
    .in("exam_id", examIds)
    .not("total_score", "is", null)
    .not("full_mark", "is", null)
    .gt("full_mark", 0);

  if (submissionsError) throw new Error(submissionsError.message);
  if (submissions.length === 0) return [];

  return exams
    .filter((exam) => submissions.some((s) => s.exam_id === exam.id))
    .map((exam) => {
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

export async function getRecentActivity() {
  const { data, error } = await supabase
    .from("exam_results_view")
    .select(
      "id, title, student_name, department, grade, status, total_score, full_mark, score_percentage, reason, submitted_at, user_id, exam_id",
    )
    .order("submitted_at", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);
  return data;
}
