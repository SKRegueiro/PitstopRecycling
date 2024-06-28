import { supabase } from "@/lib/supabase";

const getAllClients = async () => {
  const result = await supabase.from("clients").select("*");

  return { data: result.data, error: result.error };
};

export default getAllClients;
