import supabase, { supabaseUrl } from "./supabase";

const profileTable = {
  student: "student_profiles",
  instructor: "instructor_profiles",
  admin: "admin_profiles",
};

export async function updateUser(fullName, avatar, extraFields, userId, role) {
  let avatarUrl = null;
  if (avatar) {
    const avatarName = `${Date.now()}-${avatar.name}`;
    avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatar);
    if (error) throw new Error(error.message);
  }

  const { data, error } = await supabase.auth.updateUser({
    data: {
      fullName,
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });

  if (error) throw new Error(error.message);

  if (extraFields && Object.keys(extraFields).length > 0) {
    const table = profileTable[role];
    const { error: profileError } = await supabase
      .from(table)
      .upsert({ id: userId, ...extraFields });

    if (profileError) throw new Error(profileError.message);
  }

  return data;
}

export async function fetchStudentProfile(userId) {
  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
export async function fetchInstructorProfile(userId) {
  const { data, error } = await supabase
    .from("instructor_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchAdminProfile(userId) {
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}


export async function updatePassword(oldPassword, newPassword) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not found");

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: oldPassword,
  });

  if (signInError) {
    throw new Error("old password is not correct!");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) throw new Error(updateError.message);
}

export async function resetPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
}

export async function forgotPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `https://exam-platform-7r4y.vercel.app/reset-password`,
  });

  if (error) throw new Error(error.message);
}
