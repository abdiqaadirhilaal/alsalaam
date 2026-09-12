import ContactMessage from "../models/ContactMessage.js";
import ContactReply from "../models/ContactReply.js";
import { sendMail } from "../config/mailer.js";

export const submitMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }
  const doc = await ContactMessage.create({ name, email, phone, subject, message });
  res.status(201).json({ message: "Message sent successfully", id: doc._id });
};

export const getMessages = async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { subject: new RegExp(search, "i") },
    ];
  }
  const items = await ContactMessage.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await ContactMessage.countDocuments(filter);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const getMessage = async (req, res) => {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) return res.status(404).json({ message: "Message not found" });
  const replies = await ContactReply.find({ messageId: msg._id }).sort({ sentAt: 1 });
  res.json({ message: msg, replies });
};

export const markStatus = async (req, res) => {
  const { status } = req.body;
  const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!msg) return res.status(404).json({ message: "Message not found" });
  res.json(msg);
};

export const deleteMessage = async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ message: "Message not found" });
  await ContactReply.deleteMany({ messageId: req.params.id });
  res.json({ message: "Message deleted" });
};

export const replyToMessage = async (req, res) => {
  const { reply } = req.body;
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) return res.status(404).json({ message: "Message not found" });

  let status = "sent";
  try {
    await sendMail({
      to: msg.email,
      subject: `Re: ${msg.subject || "Your message to Alsalaam School"}`,
      html: `<p>${reply.replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (err) {
    status = "failed";
  }

  const replyDoc = await ContactReply.create({
    messageId: msg._id,
    adminId: req.admin._id,
    reply,
    status,
  });

  msg.status = "replied";
  await msg.save();

  res.status(201).json(replyDoc);
};
