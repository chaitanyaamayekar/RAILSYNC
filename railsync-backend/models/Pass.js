import mongoose from "mongoose";

const passSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConcessionApplication",
      required: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    passNumber: {
      type: String,
      unique: true,
      required: true
    },

    qrCode: String,
    issuedAt: Date,
    validTill: Date
  },
  { timestamps: true }
);

export default mongoose.model("Pass", passSchema);
