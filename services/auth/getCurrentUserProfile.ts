import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

const getCurrentUserProfile = async (session: Session | null) => {
  if (!session?.user || !session?.user?.email) return;

  const { data, error, status } = await supabase
    .from("employees")
    .select("*")
    .eq("email", session?.user?.email)
    .single();

  return { data, error, status };
};

export default getCurrentUserProfile;
