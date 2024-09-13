import getAllClients from "@/services/clients/getAllClients";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@/constants/QueryKeys";

const useGetClients = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: QueryKeys.Clients,
    queryFn: getAllClients
  });

  return { clients: data?.data ? data.data : [], isLoading, error };
};

export default useGetClients;
