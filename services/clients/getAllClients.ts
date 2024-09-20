import { supabase } from "@/lib/supabase";

const getAllClients = () => {
  return supabase.from("clients").select("*");
};

export default getAllClients;
