import express from "express";
import { createApplication , getApplicationById,getMyApplication} from "../controllers/applicationController.js";
import {protect} from "../middleware/authMiddleware.js"
const router = express.Router();
import { uploadApplicationDocuments, handleUploadError } from "../middleware/uploadMiddleware.js";

router.post(
  "/",
  protect,
  uploadApplicationDocuments,
  handleUploadError,
  createApplication
);

router.post("/", protect, createApplication);
router.get("/my", protect, getMyApplication);   
router.get("/:id", protect, getApplicationById);

export default router;
