import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  createMailTransport,
  getContactEmailRecipient,
  getContactEmailSender,
} from "./src/lib/emailConfig.js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = createMailTransport();
const contactRecipient = getContactEmailRecipient();
const contactSender = getContactEmailSender();

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Please fill in name, email, and message.",
    });
  }

  if (!transporter || !contactRecipient || !contactSender) {
    return res.status(500).json({
      error: "Email service is not fully configured on the server.",
    });
  }

  try {
    await Promise.all([
      transporter.sendMail({
        from: `VOV hair salon <${contactSender}>`,
        to: contactRecipient,
        replyTo: email,
        subject: `VOV hair salon contact form: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
      transporter.sendMail({
        from: `VOV hair salon <${contactSender}>`,
        to: email,
        replyTo: contactRecipient,
        subject: "VOV Hair Salon 已收到您的訊息",
        text: `${name} 您好：\n\n我們已收到您的訊息，會盡快與您聯繫。\n\n您留下的訊息：\n${message}\n\nVOV Hair Salon`,
      }),
    ]);

    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to send email. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
