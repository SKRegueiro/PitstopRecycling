import useProfile from "@/lib/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import getInTransitPickUpByUser from "@/services/pickups/getInTransitPickUpByUser";
import sumTyresByType from "@/lib/utils/sumTyresByType";
import QueryKeys from "@/constants/QueryKeys";

const useInTransitPickUps = () => {
  const { profile, isLoading } = useProfile();

  const result = useQuery({
    queryKey: QueryKeys.InTransitPickUps,
    queryFn: () => {
      if (profile?.id) return getInTransitPickUpByUser(profile?.id);

      return null;
    }
  });

  return {
    haveInTransitPickUps: !!result.data?.data?.length,
    pickUps: result.data?.data,
    tyresByType: result?.data?.data ? sumTyresByType(result?.data?.data?.map((item) => item.tyres)) : [],
    ...result,
    isLoading: isLoading || result.isLoading
  };
};

export default useInTransitPickUps;
