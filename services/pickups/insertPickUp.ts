import { supabase } from "@/lib/supabase";
import { Database } from "@/database.types";

type PickUpProps = Database["public"]["Tables"]["pickups"]["Insert"];

const insertPickUp = async (data: any) => {
  const { error } = await supabase.from("pickups").insert(data);

  return { error };
};

export default insertPickUp;
