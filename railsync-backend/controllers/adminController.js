import Application from "../models/Application.js";

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
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).populate("student", "name email phone college studentId year");

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json(application); // ⚠️ RETURN DIRECT OBJECT (NOT WRAPPED)
  } catch (error) {
    console.error("APPROVE ERROR:", error);
    res.status(500).json({ message: "Approval failed" });
  }
};

/**
 * PUT /api/admin/reject/:id
 */
export const rejectApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).populate("student", "name email phone college studentId year");

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res.status(200).json(application); // ⚠️ SAME HERE
  } catch (error) {
    console.error("REJECT ERROR:", error);
    res.status(500).json({ message: "Rejection failed" });
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

