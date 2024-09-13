import { useQuery } from "@tanstack/react-query";
import getSites from "@/services/sites/getSites";
import QueryKeys from "@/constants/QueryKeys";

const useSites = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: QueryKeys.Sites,
    queryFn: () => getSites()
  });

  return { sites: data?.data ? data.data : [], isLoading, error };
};

export default useSites;
