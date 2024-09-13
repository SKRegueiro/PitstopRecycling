import { supabase } from "@/lib/supabase";

//TODO: we may be able to create a generic getPickUp that can be configured by props
const getInTransitPickUpByUser = async (id: number) => {
  const { data, error } = await supabase.from("pickups").select("*").eq("employeeId", id).eq("status", "in_transit");

  return { data, error };
};

export default getInTransitPickUpByUser;
