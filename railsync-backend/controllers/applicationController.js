import Application from "../models/Application.js";

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

    // 🔥 KEY CHECK
    const existingApplication = await Application.findOne({
      student: req.user._id,
      status: "pending"
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already have a pending application"
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
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      student: req.user._id
    }).populate("student", "name email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

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

