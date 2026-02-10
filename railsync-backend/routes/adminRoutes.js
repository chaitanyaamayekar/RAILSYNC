import express from "express";
import { adminLogin } from "../controllers/adminAuthController.js";
import { getAdminDashboard,getAllApplications, approveApplication, rejectApplication ,getApplicationById} 
from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/applications", protect, getAllApplications);
router.put("/approve/:id", protect, approveApplication);
router.put("/reject/:id", protect, rejectApplication);
router.get("/dashboard", protect, getAdminDashboard);
router.get("/applications/:id", protect, getApplicationById);

export default router;
