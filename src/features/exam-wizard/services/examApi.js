import supabase from "../../../services/supabase";

export async function publishExam(examDetails, examQuestions) {
  const { data: examsInfo, error: detailsError } = await supabase
    .from("exams")
    .insert([examDetails])
    .select();

  if (detailsError) {
    console.error("Error fetching exams:", detailsError);
    return [];
  }

  const examId = examsInfo[0].id;
  const finalQuestions = examQuestions.map((q) => ({
    ...q,
    exam_id: examId,
  }));

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .insert(finalQuestions)
    .select();

  if (questionsError) {
    console.error("Error fetching questions:", questionsError);
    return [];
  }

  return { examId, questions };
}
