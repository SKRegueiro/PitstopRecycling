import { supabase } from "@/lib/supabase";

type DropPickUpsProps = {
  pickUpIds: number[];
  siteId: number;
};

const dropPickUps = async ({ pickUpIds, siteId }: DropPickUpsProps) => {
  const { data, error } = await supabase
    .from("pickups")
    .update({ status: "dropped", site: siteId })
    .in("id", pickUpIds);

  return { data, error };
};

export default dropPickUps;
