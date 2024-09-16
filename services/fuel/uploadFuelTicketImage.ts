import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

const uploadFuelTicketImage = async (userId: string, picture: string) => {
  const fileName = userId + " " + new Date().toISOString();

  return await supabase.storage.from("public_fuel").upload(fileName, decode(picture), {
    contentType: "image/png",
    upsert: false
  });
};

export default uploadFuelTicketImage;
