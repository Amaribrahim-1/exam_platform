import supabase, { supabaseUrl } from "../../../services/supabase";

export function mapAuthUser(user) {
  if (!user) return null;

  return {
    ...user,
    role: user.user_metadata?.role ?? "student",
    fullName:
      user.user_metadata?.fullName ??
      user.user_metadata?.full_name ??
      "No Name",
    avatar: user.user_metadata?.avatar ?? null,
  };
}

export async function register(email, password, fullName, avatarFile) {
  let avatarUrl = null;

  if (avatarFile) {
    const avatarName = `${Date.now()}-${avatarFile.name}`;
    avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;

    const { error: avatarError } = await supabase.storage
      .from("avatars")
      .upload(avatarName, avatarFile);

    if (avatarError)
      throw new Error(avatarError.message || "Avatar upload failed!");
  }

  const { data: credentials, error: registerError } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, avatar: avatarUrl, role: "student" },
      },
    });

  if (registerError)
    throw new Error(registerError.message || "registration failed!");

  return {
    ...credentials,
    user: mapAuthUser(credentials.user),
  };
}
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message || "Credentials are not correct!");

  return {
    ...data,
    user: mapAuthUser(data.user),
  };
}

export async function handleGoogleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/home",
    },
  });

  if (error) throw new Error(error.message);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message || "logout failed!");
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) return null;

  return mapAuthUser(data.user);
}
