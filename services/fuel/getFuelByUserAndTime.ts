import { supabase } from "@/lib/supabase";
import getWeekStartAndEndDates from "@/lib/utils/getWeekStartAndEndDates";

const getFuelByUserAndTime = async (userId: string) => {
  const { startOfWeek, endOfWeek } = getWeekStartAndEndDates();

  const { data, error } = await supabase
    .from("fuel")
    .select("*")
    .eq("employeeId", userId)
    .gte("created_at", startOfWeek.toISOString())
    .lte("created_at", endOfWeek.toISOString());

  return { data, error };
};

export default getFuelByUserAndTime;
