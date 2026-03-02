import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminProtect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return res.status(401).json({ message: "Not authorized as admin" });
      }

      req.admin = admin;
      next();
    } else {
      return res.status(401).json({ message: "No admin token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Admin token failed" });
  }
};
