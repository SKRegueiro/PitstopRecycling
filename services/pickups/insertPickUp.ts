import { supabase } from "@/lib/supabase";
import { Database } from "@/database.types";

type PickUpProps = Database["public"]["Tables"]["pickups"]["Insert"];

//TODO change type
const insertPickUp = async (pickUp: any) => {
  return supabase.from("pickups").insert(pickUp).select();
};

export default insertPickUp;
