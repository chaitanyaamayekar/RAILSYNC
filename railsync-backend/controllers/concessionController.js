import Concession from "../models/Concession.js";

/* =========================================
   GET STUDENT CONCESSION
   student dashboard
========================================= */
export const getMyConcession = async (req, res) => {
  try {
    const concession = await Concession.findOne({
      student: req.user._id,
    }).sort({ createdAt: -1 });

    if (!concession)
      return res.status(404).json({ message: "No concession generated yet" });

    res.status(200).json(concession);
  } catch (error) {
    console.error("GET CONCESSION ERROR:", error);
    res.status(500).json({ message: "Failed to fetch concession" });
  }
};
// controllers/concessionController.js
export const regenerateConcession = async (req, res) => {
  try {
    const application = await Application.findOne({ student: req.user._id });

    if (!application) return res.status(404).json({ message: "No application found" });

    // Only approved applications can regenerate
    if (application.status !== "approved") {
      return res.status(400).json({ message: "Only approved applications can regenerate form" });
    }

    // Max 1 regeneration
    if (application.regenerateCount >= 1) {
      return res.status(400).json({ message: "You can regenerate only once" });
    }

    // Check 3-day wait
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (application.formGeneratedAt && Date.now() - new Date(application.formGeneratedAt).getTime() < threeDays) {
      const nextEligible = new Date(new Date(application.formGeneratedAt).getTime() + threeDays);
      return res.status(400).json({ message: `You can regenerate only after ${nextEligible.toLocaleDateString()}` });
    }

    // Fetch the concession to regenerate
    const concession = await Concession.findOne({ application: application._id });
    if (!concession) return res.status(404).json({ message: "Concession not found" });

    // Regenerate PDF
    await generateConcessionPDF(concession);

    // Update regenerate count & timestamp
    application.regenerateCount = (application.regenerateCount || 0) + 1;
    application.formGeneratedAt = new Date();
    await application.save();

    res.json({ message: "Concession regenerated successfully", concession });
  } catch (err) {
    console.error("REGENERATE ERROR:", err);
    res.status(500).json({ message: "Regeneration failed" });
  }
};