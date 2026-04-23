import nodemailer from "nodemailer";

export function hasGmailConfig(env = process.env) {
  return Boolean(env.GMAIL_USER && env.GMAIL_PASS);
}

export function hasSmtpConfig(env = process.env) {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
}

export function createMailTransport(env = process.env) {
  if (hasGmailConfig(env)) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_PASS,
      },
    });
  }

  if (hasSmtpConfig(env)) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: env.SMTP_SECURE === "true",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return null;
}

export function getContactEmailSender(env = process.env) {
  return env.GMAIL_USER || env.SMTP_USER || null;
}

export function getContactEmailRecipient(env = process.env) {
  return env.CONTACT_EMAIL_RECIPIENT || null;
}
