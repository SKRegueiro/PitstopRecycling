import { Alert } from "react-native";
import { useState } from "react";
import useProfile from "@/lib/hooks/useProfile";
import ClientSelection from "@/components/ClientSelection";
import InputTyres from "@/components/InputTyres";
import SingPickUp from "@/components/SingPickUp";
import { router } from "expo-router";
import insertPickUp from "@/services/pickups/insertPickUp";

export type TyresType = {
  id: string;
  quantity: string;
  type: string;
};

const TYRE_PAGE = 0;
const CLIENT_PAGE = 1;
const SIGNATURE_PAGE = 2;

export default function PickUpScreen() {
  const [tyres, setTyres] = useState<TyresType[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { profile } = useProfile();

  //TODO: store signature. Create bill. Send email. store pick up.
  const onSubmit = async () => {
    try {
      setLoading(true);
      const updates = {
        employeeId: profile?.id,
        clientId: selectedClientId,
        tyres: tyres.map((item) => ({
          [item.type]: Number(item.quantity)
        }))
      };

      const { error } = await insertPickUp(updates);

      if (error) Alert.alert(error.message);
      //TODO: change for a toast
      Alert.alert("Pick up successfully created");

      router.navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Alert.alert(error.message);
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

  if (currentPage === SIGNATURE_PAGE) {
    return <SingPickUp text={"hey"} onOK={(value) => onSubmit()} />;
  }
}
