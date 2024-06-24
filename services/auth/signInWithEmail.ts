import { supabase } from "@/lib/supabase";

async function signInWithEmail(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  return { error, data };
}

export default signInWithEmail;
