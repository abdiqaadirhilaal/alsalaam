import AdmissionApplication from "../models/AdmissionApplication.js";

export const submitApplication = async (req, res) => {
  const { studentName, parentName, phone, email, grade, message } = req.body;
  if (!studentName || !parentName || !phone || !grade) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const app = await AdmissionApplication.create({ studentName, parentName, phone, email, grade, message });
  res.status(201).json({ message: "Application submitted successfully", id: app._id });
};

export const getApplications = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  const items = await AdmissionApplication.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await AdmissionApplication.countDocuments(filter);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const app = await AdmissionApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!app) return res.status(404).json({ message: "Application not found" });
  res.json(app);
};

export const deleteApplication = async (req, res) => {
  const app = await AdmissionApplication.findByIdAndDelete(req.params.id);
  if (!app) return res.status(404).json({ message: "Application not found" });
  res.json({ message: "Application deleted" });
};
