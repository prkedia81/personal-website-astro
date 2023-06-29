import type { APIRoute } from "astro";
import addRowToSheet from "../../services/spreadsheet";
import sendMail from "../../services/emailer";

export const post: APIRoute = async ({ request }) => {
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

// if (Astro.request.method === "POST") {
//     try {
//       sentMail = true;
//       const data = await Astro.request.formData();
//       const email = data.get("email") as string;

//       // Send Email
//       await sendMail(
//         "",
//         "prannaykedia1@gmail.com",
//         "prannaykedia1@gmail.com",
//         "New Subscriber to your Newsletter!",
//         `${email} subscribed to your newsletter at ${new Date().toDateString()}`
//       );

//       // Add data to sheet
//       await addRowToSheet({ email, type: "NewsletterForm" }, "newsletter");

//       console.log("Newsletter: ", email);
//     } catch (error) {
//       sentMail = false;
//       if (error instanceof Error) {
//         console.error(error.message);
//       }
//     }
//   }
