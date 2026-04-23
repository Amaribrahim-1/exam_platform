import supabase from "@/services/supabase";

export async function fetchStudents() {
  const { data, error } = await supabase.from("students_view").select("*");
  if (error) throw new Error(error.message);

  return data;
}
