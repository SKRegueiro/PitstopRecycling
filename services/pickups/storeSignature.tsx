import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

const uploadFuelTicketImage = async (signerName: string, picture: string) => {
  const fileName = signerName + " " + new Date().toISOString();

  return await supabase.storage.from("signatures").upload(fileName, decode(picture), {
    contentType: "image/png",
    upsert: false
  });
};

export default uploadFuelTicketImage;
