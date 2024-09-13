import { supabase } from "@/lib/supabase";

const getSites = async () => {
  const { data, error } = await supabase.from("sites").select("*");

  return { data, error };
};

export default getSites;
