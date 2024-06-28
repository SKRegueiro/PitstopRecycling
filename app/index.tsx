import { View } from "react-native";
import Auth from "@/components/Auth";
import Home from "@/components/Home";
import useSession from "@/lib/hooks/useSession";
import { LoaderScreen } from "react-native-ui-lib";
import Colors from "@/constants/Colors";

export default function Index() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoaderScreen message={"Loading ..."} color={Colors.light.background} />;
  }

  if (session && session.user)
    return (
      <View>
        <Home />
      </View>
    );

  if (!session && !isLoading)
    return (
      <View>
        <Auth />
      </View>
    );
}
