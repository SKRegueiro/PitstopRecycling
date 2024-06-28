import { supabase } from "@/lib/supabase";

type NewClientProps = {
  business_name: string;
  email: string;
  abn: string;
  address: string;
};

const insertNewClient = ({ business_name, email, abn, address }: NewClientProps) => {
  return supabase.from("clients").insert({
    business_name: business_name,
    email: email,
    abn: abn,
    address: address
  });
};

export default insertNewClient;
