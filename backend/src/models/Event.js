import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String },
    image: { type: String },
    imagePublicId: { type: String },
    status: { type: String, enum: ["upcoming", "past", "cancelled"], default: "upcoming" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
