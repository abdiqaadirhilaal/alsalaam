import mongoose from "mongoose";

const galleryCategories = [
  "School Life", "Students", "Teachers", "Classrooms",
  "Events", "Sports", "Graduation", "Activities", "Celebrations",
];

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
    category: { type: String, enum: galleryCategories, default: "School Life" },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export { galleryCategories };
export default mongoose.model("Gallery", gallerySchema);
