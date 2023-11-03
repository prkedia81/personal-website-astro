import type { APIRoute } from "astro";
import addRowToSheet from "../../services/spreadsheet";
import sendMail from "../../services/emailer";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email") as string;

  // Send Email
  await sendMail(
    "",
    "prannaykedia1@gmail.com",
    "prannaykedia1@gmail.com",
    "New Subscriber to your Newsletter!",
    `${email} subscribed to your newsletter at ${new Date().toDateString()}`
  );

  // Add data to sheet
  await addRowToSheet({ email, type: "NewsletterForm" }, "newsletter");

  console.log("Newsletter: ", email);

  return new Response(
    JSON.stringify({
      message: "Subscribed to Newsletter!",
    }),
    {
      status: 200,
    }
  );
};
