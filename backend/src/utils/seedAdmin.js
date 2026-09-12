// Run with: node src/utils/seedAdmin.js
// Creates the first admin account.
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

dotenv.config();

export const ensureAdmin = async () => {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@alsalaamschool.edu";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists:", email);
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ name: "Site Administrator", email, password: hashed, role: "superadmin" });
    console.log("Admin created:", email, "password:", password);
  } catch (err) {
    console.error("ensureAdmin error:", err.message);
  }
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  (async () => {
    await connectDB();
    await ensureAdmin();
    await mongoose.disconnect();
    process.exit(0);
  })();
}