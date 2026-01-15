import express from "express";
import { protect } from "../middleware/authMiddleware.js";


import {
  applyConcession,
  getMyConcession,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/apply", protect, applyConcession);
router.get("/my-concession", protect, getMyConcession);

export default router;
