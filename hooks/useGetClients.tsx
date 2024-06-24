import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const useGetClients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("clients").select("*");
      console.log(data, error);
      if (error) throw error;
      setClients(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return { clients, loading };
};

export default useGetClients;
