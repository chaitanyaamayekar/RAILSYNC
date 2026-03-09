import Application from "../models/Application.js";
import Concession from "../models/Concession.js";
import { generateConcessionPDF } from "../utils/generateConcessionPDF.js";

export const getAdminDashboard = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const applications = await Application.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    const stats = {
      total: applications.length,

      
      pending: applications.filter(a => a.status === "pending").length,

      approved: applications.filter(a => a.status === "approved").length,
      rejected: applications.filter(a => a.status === "rejected").length,
    };

    res.status(200).json({
      stats,
      recentApplications: applications.slice(0, 5),
    });

  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

/**
 * GET /api/admin/applications
 */
export const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find()
      .populate("student", "name email phone college studentId year")
      .sort({ createdAt: -1 });

    res.status(200).json(apps);
  } catch (err) {
    console.error("FETCH APPLICATIONS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
/**
 * PUT /api/admin/approve/:id
 */
  export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("student");

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.status !== "pending")
      return res.status(400).json({ message: "Already processed" });

     application.status = "approved";

/* FORM VALIDITY SYSTEM */
const today = new Date();
const expiry = new Date();
expiry.setDate(today.getDate() + 3);

application.formGeneratedAt = today;
application.formExpiresAt = expiry;
application.regenerateCount = 0;

await application.save();

    /* CREATE CONCESSION RECORD */
    const existingConcession = await Concession.findOne({
  application: application._id,
});

if (existingConcession) {
  return res.status(400).json({ message: "Concession already generated" });
}
    /* CREATE CONCESSION RECORD */
const concession = await Concession.create({
  application: application._id,   // ✅ ADD THIS (VERY IMPORTANT)
  student: application.student._id,
  approvedBy: req.user._id,       // optional but good practice

  name: application.student.name,
  email: application.student.email,
  studentId: application.student.studentId,
  phone: application.student.phone,
  address: "Mumbai",

  college: application.college,
  course: application.course,
  year: application.year,

  fromStation: application.fromStation,
  toStation: application.toStation,
  travelClass: application.travelClass,
  duration: application.duration,
  concessionType: application.concessionType,

  passNumber: `RS${Date.now()}`,
  expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
});

    /* GENERATE PDF */
    const filePath = await generateConcessionPDF(concession);

    concession.pdfUrl = filePath;
    await concession.save();

    res.json({ message: "Application approved & pass generated" });

  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * PUT /api/admin/reject/:id
 */
export const rejectApplication = async (req, res) => {
  try {
    const { reason } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.status !== "pending")
      return res.status(400).json({ message: "Already processed" });

    if (!reason || reason.trim() === "") {
      return res.status(400).json({ message: "Rejection reason required" });
    }

    application.status = "rejected";
    application.rejectionReason = reason;

    await application.save();

    res.json({
      message: "Application rejected",
      application,
    });
  } catch (err) {
    console.error("REJECT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * GET SINGLE APPLICATION DETAILS
 * /api/admin/applications/:id
 */
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("student", "name email phone college studentId year");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("GET SINGLE APPLICATION ERROR:", error);
    res.status(500).json({ message: "Failed to fetch application" });
  }
};
export const getConcessionByApplication = async (req, res) => {
  try {
    const concession = await Concession.findOne({
      application: req.params.id,
    });

    if (!concession) {
      return res.status(404).json({ message: "No concession generated yet" });
    }

    res.status(200).json(concession);
  } catch (error) {
    console.error("GET CONCESSION ERROR:", error);
    res.status(500).json({ message: "Failed to fetch concession" });
  }
};


