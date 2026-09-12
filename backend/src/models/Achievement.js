import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, default: "Academic" },
    image: { type: String },
    imagePublicId: { type: String },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);
