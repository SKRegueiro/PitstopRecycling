import { Alert } from "react-native";
import getCurrentUserProfile from "@/services/auth/getCurrentUserProfile";
import { useQuery } from "@tanstack/react-query";
import useSession from "@/lib/hooks/useSession";
import QueryKeys from "@/constants/QueryKeys";

type Props = {
  isLoading: boolean;
  profile: {
    created_at: string;
    email: string;
    id: number;
    name: string;
    type: "Driver" | "Admin" | "Customer";
  };
};

const useProfile = (): Props => {
  const { session, isLoading: isSessionLoading } = useSession();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: QueryKeys.Profile,
    queryFn: () => getCurrentUserProfile(session),
    enabled: !!session
  });

  if (isError) {
    console.log(error);
    Alert.alert(error.message);
  }

  //TODO: fix this
  return { isLoading: isSessionLoading || isLoading, profile: data?.data };
};

export default useProfile;
