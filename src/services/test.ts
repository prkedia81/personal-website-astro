// import nodemailer from "nodemailer";

export default async function testFunction(
  senderName: string,
  fromMail: string,
  toMail: string,
  sub: string,
  textBody: string
) {
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
    from: `${senderName} <prannaykedia4@gmail.com>`, // sender address
    replyTo: fromMail, // Sender's Email
    to: toMail, // list of receivers
    subject: sub, // Subject line
    text: textBody, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}
