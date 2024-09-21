import insertNewClient from "@/services/clients/insertNewClient";
import selectClientsColumnBy from "@/services/clients/selectClientsColumnBy";
import Client from "@/types/Client";
import { ToastError } from "@/lib/utils/Toasts";

export type NewClientProps = {
  business_name: string;
  email: string;
  abn: string;
  address: string;
};

const useSaveNewClient = () => {
  const saveNewClient = async (newClient: NewClientProps) => {
    const { error } = await insertNewClient(newClient);

    if (error) {
      ToastError("There was an error! Please try again later");
      return { newClient: undefined, error };
    }

    const { data } = await selectClientsColumnBy({
      by: "business_name",
      value: newClient.business_name,
      column: "*"
    });

    return { newClient: data ? (data[0] as Client) : undefined, error };
  };

  return { saveNewClient };
};

export default useSaveNewClient;
