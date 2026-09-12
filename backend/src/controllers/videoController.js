import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  const isAdmin = !!req.admin;
  const { category, page = 1, limit = 20 } = req.query;
  const filter = isAdmin ? {} : { published: true };
  if (category && category !== "all") filter.category = category;

  const items = await Video.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Video.countDocuments(filter);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const createVideo = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.thumbnail = req.file.path;
    data.thumbnailPublicId = req.file.filename;
  }
  const video = await Video.create(data);
  res.status(201).json(video);
};

export const updateVideo = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.thumbnail = req.file.path;
    data.thumbnailPublicId = req.file.filename;
  }
  const video = await Video.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json(video);
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json({ message: "Video deleted" });
};
