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
    await transporter.sendMail({
      from: `VOV Hair Salon <${contactSender}>`,
      to: contactRecipient,
      replyTo: email,
      subject: `VOV Hair Salon contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    try {
      await transporter.sendMail({
        from: `VOV Hair Salon <${contactSender}>`,
        to: email,
        replyTo: contactRecipient,
        subject: "VOV Hair Salon inquiry received",
        text:
          `Hi ${name},\n\n` +
          "We received your message and will contact you soon.\n\n" +
          `Your message:\n${message}\n\n` +
          "VOV Hair Salon",
      });
    } catch (confirmationError) {
      console.error("Failed to send confirmation email:", confirmationError);
    }

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
}
