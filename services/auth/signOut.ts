import { supabase } from "@/lib/supabase";

const signOut = async () => {
  return await supabase.auth.signOut();
};

export default signOut;
