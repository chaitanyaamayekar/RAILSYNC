import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ===== ADMIN LOGIN =====
      if (decoded.role === "admin") {
        const admin = await Admin.findById(decoded.id).select("-password");

        if (!admin) {
          return res.status(401).json({ message: "Admin not found" });
        }

        req.user = admin;
        req.user.role = "admin";
        return next();
      }

      // ===== STUDENT LOGIN =====
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      req.user.role = "student";

      next();

    } catch (error) {
      console.error("AUTH ERROR:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};
