import mongoose from "mongoose";

const contactReplySchema = new mongoose.Schema(
  {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "ContactMessage", required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    reply: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["sent", "failed"], default: "sent" },
  },
  { timestamps: true }
);

export default mongoose.model("ContactReply", contactReplySchema);
