import { validationResult } from "express-validator";
import sanitize from "mongo-sanitize";
import nodemailer from "nodemailer";
import ContactMessage from "../models/ContactMessage.js";

/**
 * Build a nodemailer transporter from environment variables.
 * Falls back gracefully if SMTP vars aren't set (dev/test mode).
 */
function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null;
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * POST /api/contact
 * Items 4, 5, 6:
 *  - Honeypot check (bot drain)
 *  - express-validator result check
 *  - mongo-sanitize on inputs
 *  - nodemailer email notification
 */
export async function createContactMessage(req, res, next) {
  try {
    // Item 4: Honeypot — bots fill the hidden `website` field; humans leave it blank.
    // Return 200 to avoid teaching the bot that it was blocked.
    if (req.body.website) {
      return res.status(200).json({ message: "Message received." });
    }

    // Item 6: express-validator results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Item 6: mongo-sanitize strips any $ or . keys
    const { name, email, projectType, budget, message } = sanitize(req.body);

    const contact = await ContactMessage.create({ name, email, projectType, budget, message });

    // Item 5: email notification (fire-and-forget, don't block the response)
    const transporter = createTransporter();
    if (transporter) {
      const notifyTo = process.env.NOTIFY_TO || process.env.SMTP_USER;
      transporter
        .sendMail({
          from:    `"FlowState Contact" <${process.env.SMTP_USER}>`,
          to:      notifyTo,
          subject: `New enquiry from ${name} — ${projectType}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Type: ${projectType}`,
            `Budget: ${budget || "not specified"}`,
            "",
            message,
          ].join("\n"),
        })
        .catch((err) => console.error("Email send error:", err.message));
    }

    return res.status(201).json({ id: contact._id, message: "Message received." });
  } catch (err) {
    next(err);
  }
}

export async function listContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(200);
    return res.json(messages);
  } catch (err) {
    next(err);
  }
}
