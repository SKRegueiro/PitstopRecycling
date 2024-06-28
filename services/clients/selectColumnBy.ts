import { supabase } from "@/lib/supabase";
import Client from "@/types/Client";

type Props = {
  by: keyof Client;
  value: string;
  column: keyof Client | undefined;
};

const selectClientsColumnBy = async ({ column, by, value }: Props) => {
  const { data, error } = await supabase
    .from("clients")
    .select(column || "*")
    .eq(by, value);

  return { data, error };
};

export default selectClientsColumnBy;
