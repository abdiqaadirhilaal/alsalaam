import News from "../models/News.js";

export const getNewsList = async (req, res) => {
  const isAdmin = !!req.admin;
  const { category, page = 1, limit = 9 } = req.query;
  const filter = isAdmin ? {} : { published: true };
  if (category && category !== "all") filter.category = category;

  const items = await News.find(filter)
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await News.countDocuments(filter);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};

export const getNewsBySlug = async (req, res) => {
  const news = await News.findOne({ slug: req.params.slug });
  if (!news) return res.status(404).json({ message: "News not found" });
  res.json(news);
};

export const createNews = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.coverImage = req.file.path;
    data.coverImagePublicId = req.file.filename;
  }
  const news = await News.create(data);
  res.status(201).json(news);
};

export const updateNews = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.coverImage = req.file.path;
    data.coverImagePublicId = req.file.filename;
  }
  const news = await News.findByIdAndUpdate(req.params.id, data, { new: true });
  if (!news) return res.status(404).json({ message: "News not found" });
  res.json(news);
};

export const deleteNews = async (req, res) => {
  const news = await News.findByIdAndDelete(req.params.id);
  if (!news) return res.status(404).json({ message: "News not found" });
  res.json({ message: "News deleted" });
};
