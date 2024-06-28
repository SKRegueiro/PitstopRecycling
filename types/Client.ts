// type Client = {
//   id: number;
//   business_name: string;
//   active: boolean;
//   email: string;
//   abn: string;
//   address: string;
//   created_at: string;
//   signer_names: string[] | null;
// };

import { Database } from "@/database.types";

type Client = Database["public"]["Tables"]["clients"]["Row"];

export default Client;
