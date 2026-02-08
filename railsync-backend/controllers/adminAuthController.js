// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin  = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await User.findOne({ email, role: "admin" });
//     if (!admin)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       role: "admin",
//       admin: {
//         id: admin._id,
//         name: admin.name,
//         email: admin.email,
//       },
//     });
//   } catch (error) {
//     console.error("ADMIN LOGIN ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: "admin",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
