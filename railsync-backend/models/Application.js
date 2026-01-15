import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    concessionType: {
      type: String,
      required: true
    },
    fromStation: {
      type: String,
      required: true
    },
    toStation: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      enum: ["monthly", "quarterly"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    documents: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
