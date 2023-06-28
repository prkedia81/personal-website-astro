import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

interface ContactForm {
  name: string;
  email: string;
  phone_number: string;
  company: string;
  message: string;
  type: "ContactForm";
}

interface NewsletterForm {
  email: string;
  type: "NewsletterForm";
}

export default async function addRowToSheet(
  data: ContactForm | NewsletterForm,
  sheetName: "contact-me" | "newsletter"
) {
  const serviceAccountAuth = new JWT({
    email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: import.meta.env.GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    import.meta.env.GOOGLE_SHEET_ID,
    serviceAccountAuth
  );

  await doc.loadInfo();
  let sheet, addRow;
  if (sheetName === "contact-me" && data.type === "ContactForm") {
    sheet = doc.sheetsByIndex[0];
    addRow = await sheet.addRow({
      Date: new Date().toLocaleString(),
      Name: data.name,
      "Email Address": data.email,
      "Phone Number": data.phone_number,
      Company: data.company,
      Text: data.message,
    });
  } else {
    // Newsletter
    sheet = doc.sheetsByIndex[1];
    addRow = await sheet.addRow({
      "Email ID": data.email,
      Timestamp: new Date().toLocaleString(),
    });
  }
  console.log(addRow);
}
