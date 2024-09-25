import React, { createContext, useContext, useState } from "react";
import { Slot } from "expo-router";
import Tyre from "@/types/Tyre";
import Client from "@/types/Client";
import useSendInvoice from "@/lib/hooks/useSendInvoice";

type PickUpContextType = {
  tyres: Tyre[];
  setTyres: React.Dispatch<React.SetStateAction<Tyre[]>>;
  client: Client | undefined;
  setClient: React.Dispatch<React.SetStateAction<Client | undefined>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (signature: string) => Promise<void>;
  loading: boolean;
};

const PickUpContext = createContext<PickUpContextType | undefined>(undefined);

const PickUpLayout = () => {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [client, setClient] = useState<Client | undefined>();
  const [currentPage, setCurrentPage] = useState(0);
  const { loading, sendInvoice } = useSendInvoice();

  const onSubmit = async (signature: string) => {
    await sendInvoice({ client, tyres, signature });
  };

  const contextValue = {
    tyres,
    setTyres,
    client,
    setClient,
    currentPage,
    setCurrentPage,
    onSubmit,
    loading
  };

  return (
    <PickUpContext.Provider value={contextValue}>
      <Slot />
    </PickUpContext.Provider>
  );
};

export const usePickUpContext = () => {
  const context = useContext(PickUpContext);
  if (!context) {
    throw new Error("usePickUpContext must be used within a PickUpProvider");
  }
  return context;
};

export default PickUpLayout;
