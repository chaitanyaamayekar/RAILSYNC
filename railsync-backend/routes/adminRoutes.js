import express from "express";
import { adminLogin } from "../controllers/adminAuthController.js";
import { getAdminDashboard,getAllApplications, approveApplication, rejectApplication } 
from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/applications", protect, getAllApplications);
router.put("/approve/:id", protect, approveApplication);
router.put("/reject/:id", protect, rejectApplication);
router.get("/dashboard", protect, getAdminDashboard);

export default router;
