type Props = {
  pickUpId: number;
  tyres: { id: number; type: string; quantity: number }[];
  clientId: number;
  clients: {
    id: number;
    abn: string;
    email: string;
    active: boolean;
    address: string;
    created_at: string;
    signer_names: string[];
    business_name: string;
  };
  signature: string;
  accessToken?: string;
};

const sendEmail = (body: Props) => {
  //TODO: extract URL into env
  return fetch("https://yheytbqqhcmmeyhkbhim.supabase.co/functions/v1/resend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.accessToken}`
    },
    body: JSON.stringify({
      created_at: new Date().toISOString(),
      invoice_sent: false,
      ...body
    })
  });
};

export default sendEmail;
