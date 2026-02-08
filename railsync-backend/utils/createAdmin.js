import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("❌ Admin ENV variables missing");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin", // 🚨 THIS LINE IS NON-NEGOTIABLE
    });

    console.log("✅ Admin created successfully");
  } catch (err) {
    console.error("❌ Admin creation failed:", err.message);
  }
};

export default createAdmin;
