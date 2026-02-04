import express from "express";
import { uploadDocuments } from "../controllers/documentController.js";
import {protect} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload/:applicationId",
  protect,
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "bonafideCertificate", maxCount: 1 },
  ]),
  uploadDocuments
);

export default router;
