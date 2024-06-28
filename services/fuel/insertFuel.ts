import { supabase } from "@/lib/supabase";

type FuelProps = {
  price: string;
  createdAt: string;
  employeeId?: string;
  carId?: string;
};

const insertFuel = (fuel: FuelProps) => {
  return supabase.from("fuel").insert({
    price: fuel.price,
    created_at: fuel.createdAt,
    employeeId: fuel.employeeId,
    carId: fuel.carId
  });
};

export default insertFuel;
