import uploadFuelTicketImage from "@/services/fuel/uploadFuelTicketImage";
import insertFuel from "@/services/fuel/insertFuel";
import { useState } from "react";

type Props = {
  amount: string;
  date: Date;
  base64?: string;
  userId?: string;
};

const useUploadFuel = () => {
  const [loading, setLoading] = useState(false);

  const uploadFuel = async ({ amount, date, base64, userId }: Props) => {
    setLoading(true);
    if (base64 && userId) {
      const { data } = await uploadFuelTicketImage(userId, base64);
      await insertFuel({
        createdAt: date.toISOString(),
        employeeId: userId,
        receiptImageId: data?.id,
        cost: amount
      });
    }
    setLoading(false);
  };

  return { uploadFuel, loading };
};

export default useUploadFuel;
