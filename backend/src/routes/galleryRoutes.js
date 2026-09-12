import express from "express";
import {
  getGalleryItems, createGalleryItem, createGalleryBulk, updateGalleryItem, deleteGalleryItem,
} from "../controllers/galleryController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", getGalleryItems);
router.post("/", protect, upload.single("image"), createGalleryItem);
router.post("/bulk", protect, upload.array("images", 20), createGalleryBulk);
router.put("/:id", protect, upload.single("image"), updateGalleryItem);
router.delete("/:id", protect, deleteGalleryItem);

export default router;
