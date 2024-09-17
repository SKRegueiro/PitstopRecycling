import { useState } from "react";
import storeSignature from "@/services/pickups/storeSignature";

type Props = {
  base64?: string;
  signerName?: string;
};

const useStoreSignature = () => {
  const [loading, setLoading] = useState(false);

  const uploadSignature = async ({ base64, signerName }: Props) => {
    setLoading(true);
    try {
      if (base64 && signerName) {
        const result = await storeSignature(signerName, base64);
        console.log(result);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return { uploadSignature, loading };
};

export default useStoreSignature;
