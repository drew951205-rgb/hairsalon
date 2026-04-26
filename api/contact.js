import {
  createMailTransport,
  getContactEmailRecipient,
  getContactEmailSender,
} from "../src/lib/emailConfig.js";

const transporter = createMailTransport();
const contactRecipient = getContactEmailRecipient();
const contactSender = getContactEmailSender();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Please fill in name, email, and message." });
  }

  if (!transporter || !contactRecipient || !contactSender) {
    return res
      .status(500)
      .json({ error: "Email service is not fully configured on the server." });
  }

  try {
    await Promise.all([
      transporter.sendMail({
        from: `VOV Hair Salon <${contactSender}>`,
        to: contactRecipient,
        replyTo: email,
        subject: `VOV Hair Salon contact form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
      transporter.sendMail({
        from: `VOV Hair Salon <${contactSender}>`,
        to: email,
        replyTo: contactRecipient,
        subject: "VOV Hair Salon 已收到您的訊息",
        text: `${name} 您好：\n\n我們已收到您的訊息，會盡快與您聯繫。\n\n您留下的訊息：\n${message}\n\nVOV Hair Salon`,
      }),
    ]);

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
}
