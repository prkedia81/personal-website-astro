import type { APIRoute } from "astro";
import addRowToSheet from "../../services/spreadsheet";
import sendMail from "../../services/emailer";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  console.log("HERE");

  try {
    const firstName = data.get("first_name") as string;
    const lastName = data.get("last_name") as string;
    const email = data.get("email") as string;
    const company = data.get("company") as string;
    const phoneNumber = data.get("phone_number") as string;
    const message = data.get("message") as string;

    // Send Email
    const name = firstName + " " + lastName;
    const toMail = "prannaykedia1@gmail.com";
    const fromEmail = email || "prannaykedia4@gmail.com";
    await sendMail(
      name,
      fromEmail,
      toMail,
      name + " reached out to you through your website",
      message
    );

    // Add data to sheet
    await addRowToSheet(
      {
        name,
        email,
        company,
        phone_number: phoneNumber,
        message,
        type: "ContactForm",
      },
      "contact-me"
    );

    console.log(name, email, message);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return new Response(
    JSON.stringify({
      message: "Contact us message sent!",
    }),
    {
      status: 200,
    }
  );
};
