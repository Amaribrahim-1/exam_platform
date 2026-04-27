import supabase from "./supabase";

export async function publishExam(examDetails, examQuestions) {
  const { data: examsInfo, error: detailsError } = await supabase
    .from("exams")
    .insert([examDetails])
    .select();

  if (detailsError) throw new Error(detailsError.message);

  const examId = examsInfo[0].id;
  const finalQuestions = examQuestions.map((q) => ({
    ...q,
    exam_id: examId,
  }));

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .insert(finalQuestions)
    .select();

  if (questionsError) throw new Error(questionsError.message);

  return { examId, questions };
}

export async function fetchExams() {
  const { data: user } = await supabase.auth.getUser();
  const userId = user.user.id;

  const { data: profile, error: profileError } = await supabase
    .from("student_profiles")
    .select("grade, department")
    .eq("id", userId)
    .single();

  if (profileError) throw new Error(profileError.message);

  const { data: exams, error } = await supabase
    .from("exams")
    .select("*")
    .eq("status", "active")
    .eq("grade", profile?.grade)
    .or(
      `department.eq.${profile?.department.toLowerCase()},department.eq.General`,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  console.log(exams);

  return exams;
}

export async function fetchExamsPerInstructor(instructorId) {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("instructor_id", instructorId);

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchExam(examId) {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("id", examId)
    .single();

  data;

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchExamQuestions(editingExamId) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("exam_id", editingExamId);

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteExam(examId) {
  const { count, error: checkError } = await supabase
    .from("exam_submissions")
    .select("*", { count: "exact", head: true })
    .eq("exam_id", examId);

  if (checkError) throw new Error(checkError.message);

  if (count > 0)
    throw new Error(
      "This exam has submissions. Change its status to Draft or Ended instead.",
    );

  const { error: questionsError } = await supabase
    .from("questions")
    .delete()
    .eq("exam_id", examId);

  if (questionsError) throw new Error(questionsError.message);

  const { error } = await supabase.from("exams").delete().eq("id", examId);

  if (error) throw new Error(error.message);
}

export async function updateExamStatus(examId, newStatus) {
  const { data, error } = await supabase
    .from("exams")
    .update({ status: newStatus })
    .eq("id", examId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateExam(examId, examDetails) {
  const { data, error } = await supabase
    .from("exams")
    .update(examDetails)
    .eq("id", examId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateExamQuestions(examId, questions) {
  // Delete existing questions first, then re-insert updated ones
  const { error: deleteError } = await supabase
    .from("questions")
    .delete()
    .eq("exam_id", examId);

  if (deleteError) throw new Error(deleteError.message);

  const questionsWithExamId = questions.map((q) => ({ ...q, exam_id: examId }));

  const { data, error: insertError } = await supabase
    .from("questions")
    .insert(questionsWithExamId)
    .select();

  if (insertError) throw new Error(insertError.message);

  return data;
}
