import nodemailer from "nodemailer";

async function sendMail(toMail, sub, textBody) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Prannay Kedia" <prannaykedia4@gmail.com>', // sender address
    to: toMail, // list of receivers
    subject: sub, // Subject line
    text: textBody, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

export default function handler(req, res) {
  fetch(
    "https://www.google.com/ping?sitemap=https://prannaykedia.com/sitemap-index.xml"
  )
    .then((response) => response.json())
    .then(async (data) => {
      await sendMail(
        "prannaykedia1@gmail.com",
        "Sitemap Submitted for Prannay Kedia",
        "Sitemap updation request submitted to Google at : " + Date.now()
      ).catch(console.error);
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200).end("Hello Cron!");
}
