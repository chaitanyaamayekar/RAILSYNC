import Application from "../models/Application.js";

export const applyConcession = async (req, res, next) => {
  try {
    const application = await Application.create({
      student: req.user.id,
      documents: req.body.documents,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Application submitted",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyConcession = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      student: req.user.id,
    });

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
