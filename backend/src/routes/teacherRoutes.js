import express from "express";
import {
  getTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher,
} from "../controllers/teacherController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/", protect, upload.single("photo"), createTeacher);
router.put("/:id", protect, upload.single("photo"), updateTeacher);
router.delete("/:id", protect, deleteTeacher);

export default router;
