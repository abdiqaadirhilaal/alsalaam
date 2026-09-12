import Teacher from "../models/Teacher.js";

export const getTeachers = async (req, res) => {
  const isAdmin = !!req.admin;
  const filter = isAdmin ? {} : { published: true };
  const teachers = await Teacher.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  res.json(teachers);
};

export const getTeacher = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(teacher);
};

export const createTeacher = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.photo = req.file.path;
    data.photoPublicId = req.file.filename;
  }
  const teacher = await Teacher.create(data);
  res.status(201).json(teacher);
};

export const updateTeacher = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.photo = req.file.path;
    data.photoPublicId = req.file.filename;
  }
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(teacher);
};

export const deleteTeacher = async (req, res) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json({ message: "Teacher deleted" });
};
