import getAllClients from "@/services/clients/getAllClients";
import { useQuery } from "@tanstack/react-query";

const useGetClients = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients
  });

  return { clients: data?.data ? data.data : [], isLoading, error };
};

export default useGetClients;
