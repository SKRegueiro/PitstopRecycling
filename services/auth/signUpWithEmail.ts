import { supabase } from "@/lib/supabase";

async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  return { data, error };
}

export default signUpWithEmail;
