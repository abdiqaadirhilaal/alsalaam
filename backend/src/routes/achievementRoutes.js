import express from "express";
import {
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
} from "../controllers/achievementController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", getAchievements);
router.post("/", protect, upload.single("image"), createAchievement);
router.put("/:id", protect, upload.single("image"), updateAchievement);
router.delete("/:id", protect, deleteAchievement);

export default router;
