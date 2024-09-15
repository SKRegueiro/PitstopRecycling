import { supabase } from "@/lib/supabase";

type FuelProps = {
  cost: string;
  createdAt: string;
  employeeId?: string;
  receiptImageId?: string;
};

const insertFuel = (fuel: FuelProps) => {
  return supabase.from("fuel").insert({
    cost: fuel.cost,
    created_at: fuel.createdAt,
    employeeId: fuel.employeeId,
    receiptImageId: fuel.receiptImageId
  });
};

export default insertFuel;
