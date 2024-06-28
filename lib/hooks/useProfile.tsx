import { Alert } from "react-native";
import getCurrentUserProfile from "@/services/auth/getCurrentUserProfile";
import { useQuery } from "@tanstack/react-query";
import useSession from "@/lib/hooks/useSession";

const useProfile = () => {
  const { session } = useSession();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getCurrentUserProfile(session),
    enabled: !!session
  });

  if (isError) {
    console.log(error);
    Alert.alert(error.message);
  }

  return { isLoading, profile: data?.data };
};

export default useProfile;
