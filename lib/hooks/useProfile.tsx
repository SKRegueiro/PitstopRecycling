import getCurrentUserProfile from "@/services/auth/getCurrentUserProfile";
import { useQuery } from "@tanstack/react-query";
import useSession from "@/lib/hooks/useSession";
import QueryKeys from "@/constants/QueryKeys";
import { ToastError } from "@/lib/utils/Toasts";

type Props = {
  isLoading: boolean;
  profile?: {
    created_at: string;
    email: string | null;
    id: number;
    name: string | null;
    type: string | null;
  } | null;
};

const useProfile = (): Props => {
  const { session, isLoading: isSessionLoading } = useSession();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: QueryKeys.Profile,
    queryFn: () => getCurrentUserProfile(session),
    enabled: !!session
  });

  if (isError) {
    ToastError(error.message);
  }

  return {
    isLoading: isSessionLoading || isLoading,
    profile: session && data?.data ? data?.data : undefined
  };
};

export default useProfile;
