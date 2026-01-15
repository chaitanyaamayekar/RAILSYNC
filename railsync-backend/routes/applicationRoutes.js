import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  uploadDocument,
  getDocument,
  deleteDocument,
  getDocumentsByApplication,
  getDocumentsByStudent,
  updateDocumentVerification,
  getPendingDocuments
} from "../controllers/documentController.js";

import {
  uploadSingle,
  handleUploadError
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Document upload (requires authentication)
router.post(
  "/upload",
  protect,
  uploadSingle("document"),
  handleUploadError,
  uploadDocument
);

// Document management
router.get("/:id", protect, getDocument);
router.delete("/:id", protect, deleteDocument);
router.get("/application/:applicationId", protect, getDocumentsByApplication);
router.get("/student/:studentId", protect, getDocumentsByStudent);

// Admin verification routes
router.put("/:id/verify", protect, updateDocumentVerification);
router.get("/pending", protect, getPendingDocuments);

export default router;
