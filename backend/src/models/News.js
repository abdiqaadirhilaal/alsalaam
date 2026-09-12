import mongoose from "mongoose";
import slugify from "slugify";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    coverImage: { type: String },
    coverImagePublicId: { type: String },
    excerpt: { type: String },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

newsSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now().toString(36);
  }
  next();
});

export default mongoose.model("News", newsSchema);
