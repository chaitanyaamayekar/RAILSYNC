import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    documentType: {
      type: String,
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
