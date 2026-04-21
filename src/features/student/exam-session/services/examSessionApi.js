import supabase from "@/services/supabase";

export async function fetchExamSession(examId) {
  const { data, error } = await supabase
    .from("exams")
    .select("*, questions(*)")
    .eq("id", examId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function submitExam(examId, userId, answers, reason = "manual") {
  // 1. جيب الإجابات الصح من الـ DB
  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("id, correct_answer_index, marks")
    .eq("exam_id", examId);

  if (questionsError) throw new Error(questionsError.message);

  // 2. قارن وحسب الدرجة
  let totalScore = 0;
  let fullMark = 0;
  const results = questions.map((q) => {
    const userAnswer = answers[q.id] ?? null;
    const isCorrect = userAnswer === q.correct_answer_index;
    if (isCorrect) totalScore += q.marks;
    fullMark += q.marks;

    return {
      question_id: q.id,
      user_answer: userAnswer,
      is_correct: isCorrect,
      marks_earned: isCorrect ? q.marks : 0,
    };
  });

  // 3. احفظ النتيجة في الـ DB
  const { data, error } = await supabase
    .from("exam_submissions")
    .insert([
      {
        exam_id: examId,
        user_id: userId,
        answers: results,
        total_score: totalScore,
        reason, // "manual" | "time_up" | "cheat"
        is_passed: totalScore >= Math.round(fullMark / 2),
        submitted_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return { score: totalScore, results };
}

export async function checkAlreadySubmitted(examId, userId) {
  const { data, error } = await supabase
    .from("exam_submissions")
    .select("id") // بس الـ id، مش محتاج باقي البيانات
    .eq("exam_id", examId)
    .eq("user_id", userId)
    .maybeSingle(); // لو مفيش rows مش بيرمي error

  if (error) throw new Error(error.message);

  return !!data; // true لو موجود، false لو لأ
}
