import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

import {
  getAllApplications,
  approveApplication,
  rejectApplication,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, role("admin"));

router.get("/applications", getAllApplications);
router.put("/approve/:id", approveApplication);
router.put("/reject/:id", rejectApplication);

export default router;
