import express from "express";
import { getVideos, createVideo, updateVideo, deleteVideo } from "../controllers/videoController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", getVideos);
router.post("/", protect, upload.single("thumbnail"), createVideo);
router.put("/:id", protect, upload.single("thumbnail"), updateVideo);
router.delete("/:id", protect, deleteVideo);

export default router;
