import Achievement from "../models/Achievement.js";

export const getAchievements = async (req, res) => {
  const isAdmin = !!req.admin;
  const filter = isAdmin ? {} : { published: true };
  const items = await Achievement.find(filter).sort({ date: -1 });
  res.json(items);
};

export const createAchievement = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = req.file.path;
    data.imagePublicId = req.file.filename;
  }
  const item = await Achievement.create(data);
  res.status(201).json(item);
};

export const updateAchievement = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = req.file.path;
    data.imagePublicId = req.file.filename;
  }
  const item = await Achievement.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!item) return res.status(404).json({ message: "Achievement not found" });
  res.json(item);
};

export const deleteAchievement = async (req, res) => {
  const item = await Achievement.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Achievement not found" });
  res.json({ message: "Achievement deleted" });
};
