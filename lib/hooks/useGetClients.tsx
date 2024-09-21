import getAllClients from "@/services/clients/getAllClients";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@/constants/QueryKeys";
import Client from "@/types/Client";

type Response = {
  clients: Client[];
  isLoading: boolean;
  error: Error | null;
};

const useGetClients = (): Response => {
  const { data, error, isLoading } = useQuery<Client[]>({
    queryKey: QueryKeys.Clients,
    queryFn: getAllClients
  });

  return { clients: data || [], isLoading, error };
};

export default useGetClients;
