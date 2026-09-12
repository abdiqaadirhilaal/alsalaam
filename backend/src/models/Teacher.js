import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    subject: { type: String },
    qualification: { type: String },
    biography: { type: String },
    photo: { type: String },
    photoPublicId: { type: String },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
