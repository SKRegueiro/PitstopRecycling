import { supabase } from "@/lib/supabase";
import Client from "@/types/Client";

const getAllClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default getAllClients;
