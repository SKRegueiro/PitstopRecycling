import { useState } from "react";
import ClientSelection from "@/components/ClientSelection";
import InputTyres from "@/components/InputTyres";
import SingPickUp from "@/components/SingPickUp";
import useSendInvoice from "@/lib/hooks/useSendInvoice";
import Tyre from "@/types/Tyre";
import Client from "@/types/Client";

const TYRE_PAGE = 0;
const CLIENT_PAGE = 1;
const SIGNATURE_PAGE = 2;

const PickUpView = () => {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [client, setClient] = useState<Client | undefined>();
  const [currentPage, setCurrentPage] = useState(TYRE_PAGE);
  const { loading, sendInvoice } = useSendInvoice();

  //TODO: improve type
  const onSubmit = async (signature: any) => {
    await sendInvoice({ client, tyres, signature });
  };
  const goNext = () => setCurrentPage(currentPage + 1);
  const goBack = () => setCurrentPage(currentPage - 1);

  if (currentPage === TYRE_PAGE) {
    return <InputTyres tyres={tyres} onTyresChange={setTyres} goNext={goNext} />;
  }

  if (currentPage === CLIENT_PAGE) {
    return <ClientSelection onBack={goBack} onNext={goNext} selectedClientId={client?.id} onSelectClient={setClient} />;
  }

  if (currentPage === SIGNATURE_PAGE && client) {
    return <SingPickUp client={client} tyres={tyres} onOK={onSubmit} isLoading={loading} />;
  }
};

export default PickUpView;
