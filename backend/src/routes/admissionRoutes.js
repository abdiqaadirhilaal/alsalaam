import express from "express";
import {
  submitApplication, getApplications, updateApplicationStatus, deleteApplication,
} from "../controllers/admissionController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.post("/", submitApplication);
router.get("/", protect, getApplications);
router.patch("/:id/status", protect, updateApplicationStatus);
router.delete("/:id", protect, deleteApplication);

export default router;
