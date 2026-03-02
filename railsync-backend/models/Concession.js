import mongoose from "mongoose";

const concessionSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true, // 1 application = 1 concession
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    // STUDENT DETAILS (AUTO FILLED)
    name: String,
    email: String,
    phone: String,
    studentId: String,
    address: String,

    // ACADEMIC DETAILS
    college: String,
    course: String,
    year: String,

    // JOURNEY DETAILS
    fromStation: String,
    toStation: String,
    travelClass: String,
    duration: String,
    concessionType: String,

    // ADMIN EDITABLE
    remarks: String,
    passNumber: String,
    pdfUrl: String,
    expiryDate: Date,


    // STATUS OF GENERATED FORM
    status: {
      type: String,
      enum: ["generated", "finalized"],
      default: "generated",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Concession", concessionSchema);
