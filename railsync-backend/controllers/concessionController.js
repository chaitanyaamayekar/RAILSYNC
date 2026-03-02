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
