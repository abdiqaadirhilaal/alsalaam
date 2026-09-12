import mongoose from "mongoose";

const admissionApplicationSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    parentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    grade: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ["pending", "reviewed", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("AdmissionApplication", admissionApplicationSchema);
