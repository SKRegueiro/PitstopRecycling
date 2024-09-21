import { useState } from "react";
import useProfile from "@/lib/hooks/useProfile";
import useInTransitPickUps from "@/lib/hooks/useInTransitPickUps";
import insertPickUp from "@/services/pickups/insertPickUp";
import { ToastError, ToastSuccess } from "@/lib/utils/Toasts";
import sendEmail from "@/services/pickups/sendEmail";
import { router } from "expo-router";
import Routes from "@/constants/Routes";
import Tyre from "@/types/Tyre";

type Props = {
  //TODO: improve type
  client: any;
  tyres: Tyre[];
  signature: ArrayBuffer;
};

const useSendInvoice = () => {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(false);
  const { refetch } = useInTransitPickUps();

  const sendInvoice = async ({ client, tyres, signature }: Props) => {
    try {
      setLoading(true);
      const updates = {
        employeeId: profile?.id,
        clientId: client.id,
        tyres
      };

      const { data, error } = await insertPickUp(updates);
      if (error) return ToastError(`Pick up creation failed: ${error.message}`);

      const emailResult = await sendEmail({
        pickUpId: data[0].id,
        tyres: tyres,
        clientId: client.id,
        clients: { ...client },
        signature
      });

      if (emailResult.status === 200) {
        ToastSuccess("Pick up successfully created ✅");
        router.navigate(Routes.Home);
      } else if (emailResult.status === 500) {
        return ToastError("Email failed to send. Please try again.");
      } else if (emailResult.status === 422) {
        return ToastError("Missing required fields. Please check the data and try again.");
      } else {
        return ToastError("An unexpected error occurred while sending the email.");
      }
      await refetch();
      router.navigate(Routes.Home);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        ToastError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendInvoice };
};

export default useSendInvoice;
