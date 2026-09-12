import mongoose from "mongoose";

const videoCategories = [
  "Events", "Celebrations", "Graduation", "Student Activities",
  "Sports", "Competitions", "Education", "School Life", "Other",
];

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    thumbnailPublicId: { type: String },
    videoUrl: { type: String, required: true },
    videoType: { type: String, enum: ["youtube", "vimeo", "external", "upload"], default: "youtube" },
    category: { type: String, enum: videoCategories, default: "School Life" },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export { videoCategories };
export default mongoose.model("Video", videoSchema);
