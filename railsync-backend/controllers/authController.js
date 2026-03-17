import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
/* ================= REGISTER ================= */
export const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      college,
      studentId,
      year,
      address
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔑 Generate token
    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name: fullName,
      email,
      phone,
      password: hashedPassword,
      college,
      studentId,
      year,
      address,
      role: "student",

      // ✅ IMPORTANT
      isVerified: false,
      verificationToken: token,
      verificationTokenExpiry: Date.now() + 1000 * 60 * 60,
    });

    try {
      const verifyURL = `${process.env.CLIENT_URL}/verify-email/${token}`;

      await sendEmail({
        to: email,
        subject: "Verify your RailSync account",
        html: `
          <h2>Welcome to RailSync 🚆</h2>
          <p>Click below to verify your email:</p>
          <a href="${verifyURL}">${verifyURL}</a>
        `,
      });
      console.log("Verification email sent to:", email);
    } catch (emailError) {
      console.error("EMAIL ERROR:", emailError);

      // ❗ rollback user if email fails
      await User.findByIdAndDelete(user._id);

      return res.status(500).json({
        message: "Email could not be sent. Please try again.",
      });
    }

    res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
// export const registerStudent = async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       phone, 
//       password,
//       college,
//       studentId,
//       year,
//       address
//     } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const token = crypto.randomBytes(32).toString("hex");

//     const user = await User.create({
//       name: fullName,
//       email,
//       phone,
//       password: hashedPassword,
//       college,
//       studentId,
//       year,
//       address,
//       role: "student",
//       isVerified:
//       verificationToken : token,
//       verificationTokenExpiry: Date.now() + 1000 * 60 * 60, // 1 hour
//     });
//     // Verification link
//     const verifyURL = `${process.env.CLIENT_URL}/verify-email/${token}`;

//     await sendEmail({
//       to: email,
//       subject: "Verify your RailSync account",
//       html: `
//         <h2>Welcome to RailSync 🚆</h2>
//         <p>Click below to verify your email:</p>
//         <a href="${verifyURL}">${verifyURL}</a>
//       `,
//     });

//     res.status(201).json({
//       message: "Registration successful. Please check your email to verify your account.",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
      
//       }
//     });
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // USER NOT REGISTERED
    if (!user.isVerified) {
      return res.status(404).json({
        success: false,
        message: "Account not verified. Please verify your email first."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // WRONG PASSWORD
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // SUCCESS LOGIN
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
    token,
    role: user.role,
    user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    college: user.college,
    year: user.year,
    studentId: user.studentId,
    address: user.address,
  },
}); 
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ success:false, message:"Server error" });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Email verified successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};