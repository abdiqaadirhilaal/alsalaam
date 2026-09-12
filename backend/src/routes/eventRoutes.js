import express from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", getEvents);
router.post("/", protect, upload.single("image"), createEvent);
router.put("/:id", protect, upload.single("image"), updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
