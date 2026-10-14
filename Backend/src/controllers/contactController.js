const Contact = require("../models/Contact");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitContactMessage(req, res) {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim().toLowerCase();
  const trimmedMessage = String(message).trim();

  if (trimmedName.length < 2 || trimmedName.length > 100) {
    return res.status(400).json({ message: "Name must be between 2 and 100 characters." });
  }

  if (!emailPattern.test(trimmedEmail) || trimmedEmail.length > 254) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
    return res.status(400).json({ message: "Message must be between 10 and 2000 characters." });
  }

  try {
    const contactMessage = await Contact.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    return res.status(201).json({
      message: "Your message has been sent successfully.",
      contactMessage,
    });
  } catch (error) {
    if (error?.name === "ValidationError") {
      return res.status(400).json({ message: "Submitted contact details are invalid." });
    }

    return res.status(500).json({ message: "Could not save your message. Please try again later." });
  }
}

module.exports = { submitContactMessage };
