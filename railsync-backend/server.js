import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

import { initCloudinary } from "./config/cloudinary.js";


const app = express();

/* ================= INIT ================= */
initCloudinary();
await connectDB();


/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("RailSync Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/documents", documentRoutes);


/* ================= START ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚆 RailSync Backend running on port ${PORT}`);
});
