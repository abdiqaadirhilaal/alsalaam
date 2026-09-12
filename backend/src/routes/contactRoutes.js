import express from "express";
import {
  submitMessage, getMessages, getMessage, markStatus, deleteMessage, replyToMessage,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.post("/", submitMessage);
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessage);
router.patch("/:id/status", protect, markStatus);
router.delete("/:id", protect, deleteMessage);
router.post("/:id/reply", protect, replyToMessage);

export default router;
