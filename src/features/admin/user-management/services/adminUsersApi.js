import supabase from "@/services/supabase";

export async function fetchAdminUsers(adminId) {
  // Fetch students
  const { data: students, error: studentsError } = await supabase
    .from("students_view")
    .select("*");
  if (studentsError) throw new Error(studentsError.message);

  // Fetch instructors (requires the new view)
  const { data: instructors, error: instructorsError } = await supabase
    .from("instructors_view")
    .select("*");
  // If the view doesn't exist yet, it might throw an error. We handle it gracefully for now.
  const validInstructors = instructorsError ? [] : instructors;

  // Filter out the admin from the students list (since admin might still be in student_profiles)
  const filteredStudents = students.filter((s) => s.id !== adminId);
  const filteredInstructors = validInstructors.filter((i) => i.id !== adminId);

  return {
    students: filteredStudents,
    instructors: filteredInstructors,
  };
}

export async function promoteToInstructor(userId) {
  const { error } = await supabase.rpc("promote_user_to_instructor", {
    target_user_id: userId,
  });

  if (error) throw new Error(error.message);
}

export async function deleteUser(userId) {
  const { error } = await supabase.rpc("delete_auth_user", {
    target_user_id: userId,
  });

  if (error) throw new Error(error.message);
}

