import supabase from "./supabase";

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

export async function fetchExams() {
  const { data, error } = await supabase.from("exams").select("*");

  if (error) {
    console.error("Error fetching exams:", error);
    return [];
  }

  return data;
}

export async function fetchExam(examId) {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("id", examId)
    .single();

  console.log(data);

  if (error) {
    console.error("Error fetching exams:", error);
    return null;
  }

  return data;
}

export async function fetchExamQuestions(examId) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("exam_id", examId);

  if (error) {
    console.error("Error fetching questions:", error);
    return [];
  }

  return data;
}

export async function deleteExam(examId) {
  const { error: questionsError } = await supabase
    .from("questions")
    .delete()
    .eq("exam_id", examId);

  if (questionsError) {
    console.error("Error deleting questions:", questionsError);
  }

  const { error } = await supabase.from("exams").delete().eq("id", examId);

  if (error) {
    console.error("Error deleting exam:", error);
  }
}

export async function updateExamStatus(examId, newStatus) {
  const { data, error } = await supabase
    .from("exams")
    .update({ status: newStatus })
    .eq("id", examId)
    .select()
    .single();

  if (error) {
    console.error("Error updating exam status:", error);
    return null;
  }

  return data;
}

// Fake Exams to test
export async function seedExams(count = 5) {
  const subjects = [
    "Data Structures",
    "Operating Systems",
    "Algorithms",
    "Database",
    "React JS",
  ];
  const difficulties = ["easy", "medium", "hard"];
  const statuses = ["active", "draft", "completed"];

  const dummyExams = Array.from({ length: count }).map((_, i) => {
    // توليد تاريخ عشوائي يبدأ من دلوقتي ولمدة 10 أيام قدام
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10));

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2); // الامتحان مدته ساعتين دايماً في التست

    return {
      title: `${subjects[Math.floor(Math.random() * subjects.length)]} Quiz #${i + 1}`,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      duration: Math.floor(Math.random() * 60) + 30, // بين 30 و 90 دقيقة
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      instructor_id: "d3608b52-2c2d-4b00-b898-2241f9329279", // الـ ID اللي إنت شغال بيه
    };
  });

  const { data, error } = await supabase
    .from("exams")
    .insert(dummyExams)
    .select();

  if (error) {
    console.error("Error seeding exams:", error);
    return null;
  }

  console.log(`Successfully seeded ${data.length} exams!`);
  return data;
}
