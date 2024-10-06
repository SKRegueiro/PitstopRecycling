// @ts-ignore
import { createClient } from "jsr:@supabase/supabase-js@2";
// @ts-ignore
import { PDFDocument } from "https://cdn.pika.dev/pdf-lib@^1.7.0";

// @ts-ignore
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
// @ts-ignore
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
// @ts-ignore
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const PITSTOP_DATA = {
  name: "PITSTOP PTY LTD",
  street: "8 Macindoe Ct",
  address: "Spotswood Victoria 3015, Australia",
  phone: "+61481281498",
  owner: "PERCY LEON"
};

type InvoiceData = {
  date: string;
  invoiceNumber: string;
  customerName: string;
  customerAddress: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
};

type Body = {
  pickUpId: number;
  tyres: { id: number; type: string; quantity: number }[];
  clientId: number;
  created_at: string;
  invoice_sent: boolean;
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
  signature: ArrayBuffer;
};

//TODO: Store the invoice
const handler = async (request: Request): Promise<Response> => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: request.headers.get("Authorization") } }
  });
  const authHeader = request.headers.get("Authorization")!;
  const token = authHeader.replace("Bearer ", "");
  const { data } = await supabase.auth.getUser(token);
  const user = data.user;

  if (user?.aud !== "authenticated") {
    console.log("unauthorized");
    return new Response("You need to be authenticated", { status: 401 });
  }
  const pickUp: Body = await request.json();

  try {
    const invoiceNumber = generateInvoiceNumber(pickUp.pickUpId);
    const amount = pickUp.tyres.map((tyre) => tyre.quantity * 50).reduce((total, price) => total + price, 0);
    const date = new Date(pickUp.created_at);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const readableDate = new Intl.DateTimeFormat("en-GB", options).format(date);

    const invoiceData = {
      date: readableDate,
      invoiceNumber,
      customerName: pickUp.clients.business_name,
      customerAddress: pickUp.clients.address,
      items: pickUp.tyres.map((tyrePickedUp) => ({
        name: tyrePickedUp.type,
        quantity: tyrePickedUp.quantity,
        price: 50
      })),
      total: amount
    };

    const invoice = await createPdf(invoiceData, pickUp.signature);
    console.log("invoice made");

    const email = await sendEmail({
      invoicePdf: invoice,
      email: pickUp.clients.email,
      invoiceNumber,
      date: readableDate,
      amount: amount.toString()
    });

    if (email.status === 200) {
      console.log("email sent");
      const { error } = await supabase.from("pickups").update({ invoice_sent: true }).eq("id", pickUp.pickUpId);

      if (error) {
        console.error("Error updating pickup:", error);
        return new Response("Invoice sent, but failed to update the database.", { status: 500 });
      }

      console.log("Records updated");
      return new Response("Invoice sent successfully!", { status: 200 });
    } else {
      return new Response("The email couldn't be sent", { status: 500 });
    }
  } catch (e) {
    console.log("error", e);

    if (!pickUp || !pickUp.clients || !pickUp.tyres) {
      return new Response("Missing required fields.", { status: 422 });
    }

    return new Response("An error occurred.", { status: 500 });
  }
};

const generateInvoiceNumber = (idNumber: number) => {
  const totalDigits = 6;
  const idStr = idNumber.toString();
  const zerosNeeded = Math.max(0, totalDigits - idStr.length);
  return `#INV${"0".repeat(zerosNeeded)}${idStr}`;
};

const sendEmail = async ({
  invoicePdf,
  email,
  invoiceNumber,
  date,
  amount
}: {
  invoicePdf: any;
  email: string;
  invoiceNumber: string;
  date: string;
  amount: string;
}) => {
  return await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Here is your receipt",
      attachments: [{ content: invoicePdf, filename: "invoice.pdf", contentType: "application/pdf" }],
      html: `<body style="font-family: Arial, sans-serif; line-height: 1.6;"> <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;"> <h2 style="color: #4CAF50;">Invoice from PitstopRecycling</h2> <p><strong>Thank you for your service!</strong></p> <p>This is to confirm that we have received your request for waste collection.</p> <table style="width: 100%; border-collapse: collapse; margin-top: 20px;"> <tr><th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Invoice Number</th> <td style="border: 1px solid #ccc; padding: 10px;">${invoiceNumber}</td> </tr> <tr> <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Date</th> <td style="border: 1px solid #ccc; padding: 10px;">${date}</td> </tr> <tr> <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Amount Due</th> <td style="border: 1px solid #ccc; padding: 10px;">${"$" + amount}</td> </tr> </table> <p>Please find attached the detailed invoice for your reference.</p> <p>If you have any questions or concerns regarding this invoice, feel free to reply to this email.</p> <p>Thank you once again for choosing PitstopRecycling.</p> <p>Best regards,</p> <p>The PitstopRecycling Team</p> </div> </body>`
    })
  });
};

async function createPdf(invoiceData: InvoiceData, signatureArrayBuffer: ArrayBuffer) {
  try {
    const logoImage =
      "https://static.wixstatic.com/media/39744d_782ccb240cc9442f959924ddc0169f58~mv2.jpeg/v1/crop/x_0,y_5,w_320,h_218/fill/w_156,h_112,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/PitStopLogoFinal.jpeg";
    const logoBytes = await fetch(logoImage).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();

    // Embed the company logo
    const pngImage = await pdfDoc.embedJpg(logoBytes);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const margin = 50;

    // Add the logo at the top
    const logoWidth = 150;
    const logoHeight = (pngImage.height * logoWidth) / pngImage.width;
    page.drawImage(pngImage, {
      x: margin,
      y: height - logoHeight - 20,
      width: logoWidth,
      height: logoHeight
    });

    // Invoice header and PitstopRecycling details
    page.drawText("PitstopRecycling Invoice", {
      x: margin,
      y: height - logoHeight - 60,
      size: 20
    });
    page.drawText(`Date: ${invoiceData.date}`, {
      x: width - 200,
      y: height - logoHeight - 60,
      size: 12
    });
    page.drawText(`Invoice Number: ${invoiceData.invoiceNumber}`, {
      x: width - 200,
      y: height - logoHeight - 80,
      size: 12
    });
    page.drawText(PITSTOP_DATA.name, {
      x: margin,
      y: height - logoHeight - 90,
      size: 12
    });
    page.drawText(PITSTOP_DATA.street, {
      x: margin,
      y: height - logoHeight - 105,
      size: 12
    });
    page.drawText(PITSTOP_DATA.address, {
      x: margin,
      y: height - logoHeight - 120,
      size: 12
    });
    page.drawText(PITSTOP_DATA.phone, {
      x: margin,
      y: height - logoHeight - 135,
      size: 12
    });

    // Add customer details
    page.drawText(`Customer: ${invoiceData.customerName}`, {
      x: margin,
      y: height - logoHeight - 165,
      size: 12
    });
    page.drawText(`Address: ${invoiceData.customerAddress}`, {
      x: margin,
      y: height - logoHeight - 180,
      size: 12
    });

    // Table for items picked up
    let tableTop = height - logoHeight - 200;
    const tableColumnWidths = [250, 100, 100];

    page.drawText("Item", { x: margin, y: tableTop, size: 12 });
    page.drawText("Quantity", { x: margin + tableColumnWidths[0], y: tableTop, size: 12 });
    page.drawText("Price", {
      x: margin + tableColumnWidths[0] + tableColumnWidths[1],
      y: tableTop,
      size: 12
    });

    // Render each item as a row in the table
    tableTop -= 20;
    invoiceData.items.forEach((item) => {
      page.drawText(item.name, { x: margin, y: tableTop, size: 12 });
      page.drawText(String(item.quantity), { x: margin + tableColumnWidths[0], y: tableTop, size: 12 });
      page.drawText(`$${item.price.toFixed(2)}`, {
        x: margin + tableColumnWidths[0] + tableColumnWidths[1],
        y: tableTop,
        size: 12
      });
      tableTop -= 20;
    });

    // Add total price
    page.drawText("Total:", {
      x: margin + tableColumnWidths[0] + tableColumnWidths[1] - 10,
      y: tableTop - 10,
      size: 12
    });
    page.drawText(`$${invoiceData.total.toFixed(2)}`, {
      x: margin + tableColumnWidths[0] + tableColumnWidths[1] + 30,
      y: tableTop - 10,
      size: 12
    });

    // Embed the signature image
    const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer);

    // Add signature at the bottom
    const signatureWidth = 150;
    const signatureHeight = (signatureImage.height * signatureWidth) / signatureImage.width;
    const signatureY = 50; // Adjust this value based on how much space is available at the bottom

    page.drawText("Signature:", {
      x: margin,
      y: signatureY + signatureHeight + 20,
      size: 12
    });

    page.drawImage(signatureImage, {
      x: margin,
      y: signatureY,
      width: signatureWidth,
      height: signatureHeight
    });

    // Set PDF metadata
    pdfDoc.setTitle("PitstopRecycling Invoice");
    pdfDoc.setAuthor("PitstopRecycling");
    pdfDoc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");
    pdfDoc.setCreationDate(new Date());

    // Save and return the PDF in base64 format
    const pdfBytes = await pdfDoc.save();
    return btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
  } catch (e) {
    console.log("Error creating PDF:", e);
    throw e;
  }
}

// @ts-ignore
Deno.serve(handler);
