import express from "express";
import {
  registerStudent,
  loginStudent,
  verifyEmail
  
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/verify-email/:token", verifyEmail);

export default router;
