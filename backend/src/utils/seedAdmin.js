// Run with: node src/utils/seedAdmin.js
// Creates the first admin account.
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

dotenv.config();

const run = async () => {
  await connectDB();
  const email = process.env.SEED_ADMIN_EMAIL || "admin@alsalaamschool.edu";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }
  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ name: "Site Administrator", email, password: hashed, role: "superadmin" });
  console.log("Admin created:", email, "password:", password);
  await mongoose.disconnect();
  process.exit(0);
};

run();
