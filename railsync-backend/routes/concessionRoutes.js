// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { getMyConcession } from "../controllers/concessionController.js";

// const router = express.Router();

// /* student dashboard */
// router.get("/my", protect, getMyConcession);

// export default router;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Concession from "../models/Concession.js";

const router = express.Router();

/* GET MY CONCESSION */
router.get("/my", protect, async (req, res) => {
  const pass = await Concession.findOne({ student: req.user._id });

  if (!pass) return res.status(404).json({ message: "No pass yet" });

  res.json(pass);
});

/* DOWNLOAD PDF */
router.get("/download/:id", protect, async (req, res) => {
  const pass = await Concession.findById(req.params.id);

  if (!pass || !pass.pdfUrl)
    return res.status(404).json({ message: "PDF not generated" });

  res.download(pass.pdfUrl);
});

export default router;
