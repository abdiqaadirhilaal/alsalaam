import Announcement from "../models/Announcement.js";

export const getAnnouncements = async (req, res) => {
  const isAdmin = !!req.admin;
  const filter = isAdmin ? {} : { published: true };
  const items = await Announcement.find(filter).sort({ publishedAt: -1 });
  res.json(items);
};

export const createAnnouncement = async (req, res) => {
  const item = await Announcement.create(req.body);
  res.status(201).json(item);
};

export const updateAnnouncement = async (req, res) => {
  const item = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: "Announcement not found" });
  res.json(item);
};

export const deleteAnnouncement = async (req, res) => {
  const item = await Announcement.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Announcement not found" });
  res.json({ message: "Announcement deleted" });
};
