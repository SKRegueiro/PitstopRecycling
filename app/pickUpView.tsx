import { useState } from "react";
import useProfile from "@/lib/hooks/useProfile";
import ClientSelection from "@/components/ClientSelection";
import InputTyres from "@/components/InputTyres";
import SingPickUp from "@/components/SingPickUp";
import useGetClients from "@/lib/hooks/useGetClients";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import { ToastError, ToastSuccess } from "@/lib/utils/Toasts";
import { router } from "expo-router";
import insertPickUp from "@/services/pickups/insertPickUp";
import Routes from "@/constants/Routes";
import sendEmail from "@/services/pickups/sendEmail";

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

  //TODO: Create bill. Send email. store pick up.
  const onSubmit = async (signature: any) => {
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

      //todo: add error handling
      const { data, error } = await insertPickUp(updates);
      const selectedClient = clients.find((client) => client.id === selectedClientId);

      //todo: extract out
      await sendEmail({
        pickUpId: data[0].id,
        tyres: tyres,
        clientId: selectedClientId!,
        clients: {
          ...selectedClient
        },
        signature: signature
      });

      if (error) ToastError(error.message);

      await refetch();

      ToastSuccess("Pick up successfully created ✅");

      router.navigate(Routes.Home);
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
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
        onOK={(value) => onSubmit(value)}
        isLoading={loading}
      />
    );
  }
}
