import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    schoolName: { type: String, default: "Alsalaam Primary & Secondary School" },
    logo: { type: String },
    favicon: { type: String },
    description: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      youtube: { type: String },
      whatsapp: { type: String },
    },
    heroContent: {
      title: { type: String, default: "Alsalaam Primary & Secondary School" },
      subtitle: { type: String },
      backgroundImage: { type: String },
    },
    footerContent: { type: String },
    stats: {
      yearsOfExcellence: { type: Number, default: 0 },
      teachers: { type: Number, default: 0 },
      students: { type: Number, default: 0 },
      achievements: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
