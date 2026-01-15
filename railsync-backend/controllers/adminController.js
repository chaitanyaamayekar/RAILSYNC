import Application from "../models/Application.js";

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find().populate(
      "student",
      "name email"
    );

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const approveApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Application approved",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Application rejected",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
