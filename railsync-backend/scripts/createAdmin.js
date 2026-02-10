import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.log("❌ ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
  process.exit();
}

// prevent duplicate admin
const existingAdmin = await Admin.findOne({ email });

if (existingAdmin) {
  console.log("⚠️ Admin already exists");
  process.exit();
}

await Admin.create({
  name: "Railway Admin",
  email,
  password, // DO NOT HASH — schema hashes automatically
});

console.log("✅ Admin created successfully from .env");
process.exit();

