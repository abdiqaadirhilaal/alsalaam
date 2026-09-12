import express from "express";
import {
  getNewsList, getNewsBySlug, createNews, updateNews, deleteNews,
} from "../controllers/newsController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", getNewsList);
router.get("/:slug", getNewsBySlug);
router.post("/", protect, upload.single("coverImage"), createNews);
router.put("/:id", protect, upload.single("coverImage"), updateNews);
router.delete("/:id", protect, deleteNews);

export default router;
