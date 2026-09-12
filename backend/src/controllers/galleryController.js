import Gallery from "../models/Gallery.js";

export const getGalleryItems = async (req, res) => {
  const isAdmin = !!req.admin;
  const { category, page = 1, limit = 20 } = req.query;
  const filter = isAdmin ? {} : { published: true };
  if (category && category !== "all") filter.category = category;

  const items = await Gallery.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await Gallery.countDocuments(filter);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const createGalleryItem = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.imageUrl = req.file.path;
    data.imagePublicId = req.file.filename;
  }
  const item = await Gallery.create(data);
  res.status(201).json(item);
};

export const createGalleryBulk = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }
  const { category, date } = req.body;
  const items = await Gallery.insertMany(
    req.files.map((f) => ({
      title: f.originalname,
      imageUrl: f.path,
      imagePublicId: f.filename,
      category: category || "School Life",
      date: date || Date.now(),
    }))
  );
  res.status(201).json(items);
};

export const updateGalleryItem = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.imageUrl = req.file.path;
    data.imagePublicId = req.file.filename;
  }
  const item = await Gallery.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

export const deleteGalleryItem = async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
};
