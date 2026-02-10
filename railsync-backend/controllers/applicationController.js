import Application from "../models/Application.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

/* =====================================================
   CREATE APPLICATION (STEP 1 — FORM ONLY)
===================================================== */
export const createApplication = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const {
      fromStation,
      toStation,
      travelClass,
      college,
      year,
      course,
      concessionType,
      duration,
    } = req.body;

    if (!fromStation || !toStation || !travelClass || !college || !year || !course) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // only block if already pending
    const existing = await Application.findOne({
      student: req.user._id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have a pending application",
      });
    }

    const application = await Application.create({
      student: req.user._id,
      fromStation,
      toStation,
      travelClass,
      college,
      year,
      course,
      concessionType,
      duration,
      status: "pending", // 🔥 immediate review
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   UPLOAD DOCUMENTS (STEP 2 — CLOUDINARY UPLOAD)
===================================================== */
export const uploadDocuments = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.student.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    if (!req.files?.pass || !req.files?.idCard || !req.files?.photo)
      return res.status(400).json({ message: "All documents required" });

    const passUpload = await uploadToCloudinary(req.files.pass[0].buffer, "railway_concession");
    const idUpload = await uploadToCloudinary(req.files.idCard[0].buffer, "railway_concession");
    const photoUpload = await uploadToCloudinary(req.files.photo[0].buffer, "railway_concession");

    application.documents = {
      previousPass: passUpload.secure_url,
      idCard: idUpload.secure_url,
      photo: photoUpload.secure_url,
    };

    // ❌ REMOVE status change
    // application.status = "documents_uploaded";

    await application.save();

    res.json({ message: "Documents uploaded successfully", application });
  } catch (error) {
    console.error("UPLOAD DOCUMENT ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};


/* =====================================================
   STUDENT — GET OWN APPLICATION
===================================================== */
export const getMyApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      student: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    res.json(application);
  } catch (error) {
    console.error("GET MY APPLICATION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   ADMIN — GET APPLICATION BY ID
===================================================== */
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("student", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    console.error("GET APPLICATION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* =========================================
   APPROVE APPLICATION
========================================= */
export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.status !== "pending")
     return res.status(400).json({ message: "Already processed" });

    application.status = "approved";
    await application.save();

    res.json(application);
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================================
   REJECT APPLICATION
========================================= */
export const rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.status !== "pending")
      return res.status(400).json({ message: "Already processed" });

    application.status = "rejected";
    await application.save();

    res.json(application);
  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
