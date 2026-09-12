import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email?.toLowerCase() });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = genToken(admin._id);
  res.json({
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
};

export const getProfile = async (req, res) => {
  res.json(req.admin);
};

export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await Admin.findById(req.admin._id);
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  if (name) admin.name = name;
  if (email) admin.email = email.toLowerCase();
  if (password) admin.password = await bcrypt.hash(password, 10);

  await admin.save();
  res.json({ id: admin._id, name: admin.name, email: admin.email, role: admin.role });
};
