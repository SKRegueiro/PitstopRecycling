import { Alert } from "react-native";
import { useState } from "react";
import useProfile from "@/lib/hooks/useProfile";
import ClientSelection from "@/components/ClientSelection";
import InputTyres from "@/components/InputTyres";
import SingPickUp from "@/components/SingPickUp";
import { router } from "expo-router";
import insertPickUp from "@/services/pickups/insertPickUp";
import { LoaderScreen } from "react-native-ui-lib";
import Colors from "@/constants/Colors";
import Toast from "react-native-toast-message";
import useGetClients from "@/lib/hooks/useGetClients";
import Routes from "@/constants/Routes";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";

export type TyresType = {
  id: number;
  quantity: number;
  type: string;
};

const TYRE_PAGE = 0;
const CLIENT_PAGE = 1;
const SIGNATURE_PAGE = 2;

export default function PickUpView() {
  const [tyres, setTyres] = useState<TyresType[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { profile } = useProfile();
  const { clients } = useGetClients();
  const { refetch } = useInTransitPickUps();

  //TODO: store signature. Create bill. Send email. store pick up.
  const onSubmit = async () => {
    try {
      setLoading(true);

      const updates = {
        employeeId: profile?.id,
        clientId: selectedClientId,
        tyres: tyres.map((item) => ({
          type: item.type,
          quantity: item.quantity
        }))
      };

      const { error } = await insertPickUp(updates);

      if (error) Alert.alert(error.message);

      await refetch();

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Pick up successfully created ✅"
      });

      router.navigate(Routes.Home);
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (currentPage === TYRE_PAGE) {
    return (
      <InputTyres
        tyres={tyres}
        onTyresChange={(value) => setTyres(value)}
        goNext={() => setCurrentPage(currentPage + 1)}
      />
    );
  }

  if (currentPage === CLIENT_PAGE) {
    return (
      <ClientSelection
        goBack={() => setCurrentPage(currentPage - 1)}
        goNext={() => setCurrentPage(currentPage + 1)}
        selectedClient={selectedClientId}
        onSelectClient={setSelectedClientId}
      />
    );
  }

  if (currentPage === SIGNATURE_PAGE && selectedClientId) {
    return (
      <SingPickUp
        selectedClient={clients?.find((client) => (client.id = selectedClientId))}
        tyres={tyres}
        //todo: upload signature
        onOK={(value) => onSubmit()}
      />
    );
  }

  if (loading) {
    return <LoaderScreen message={"Message goes here"} color={Colors.light.background} />;
  }
}
