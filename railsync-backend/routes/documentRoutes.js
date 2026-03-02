// import express from "express";
// import { uploadDocuments } from "../controllers/documentController.js";
// import {protect} from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// router.post(
//   "/upload/:applicationId",
//   protect,
//   upload.fields([
//     { name: "idProof", maxCount: 1 },
//     { name: "addressProof", maxCount: 1 },
//     { name: "pass", maxCount: 1 },
//   ]),
//   uploadDocuments
// );

// export default router;
//last night added
import express from "express";
import {
  uploadDocuments,
  getDocumentsByApplication,
  getDocumentsByStudent,
  getPendingDocuments,
  getDocument,
  deleteDocument,
  updateDocumentVerification,
} from "../controllers/documentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminProtect } from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ================= USER ================= */

// upload documents
router.post(
  "/upload/:applicationId",
  protect,
  upload.fields([
    { name: "idCard", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "previousPass", maxCount: 1 },
  ]),
  uploadDocuments
);

/* ================= ADMIN ================= */

// ⭐ THIS IS THE IMPORTANT ONE (fixes your error)
router.get("/application/:applicationId", adminProtect, getDocumentsByApplication);

// optional admin tools
router.get("/student/:studentId", adminProtect, getDocumentsByStudent);
router.get("/pending", adminProtect, getPendingDocuments);
router.get("/:id", adminProtect, getDocument);
router.delete("/:id", adminProtect, deleteDocument);
router.put("/verify/:id", adminProtect, updateDocumentVerification);

export default router;
