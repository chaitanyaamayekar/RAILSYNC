import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("admin123", 10);

await Admin.create({
  name: "Railway Admin",
  email: "admin@railsync.com",
  password: hashedPassword,
});

console.log("✅ Admin created");
process.exit();
