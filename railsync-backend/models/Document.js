// import mongoose from "mongoose";

// const documentSchema = new mongoose.Schema(
//   {
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },

//     documentType: {
//       type: String,
//       required: true
//     },

//     fileUrl: {
//       type: String,
//       required: true
//     },

//     verified: {
//       type: Boolean,
//       default: false
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Document", documentSchema);
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    application: {                     // ⭐ ADD THIS
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true
    },

    documentType: {
      type: String,
      enum: ["id_card", "address_proof", "previous_pass"],
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    publicId: String,                  // ⭐ ADD THIS
    mimeType: String,                  // ⭐ ADD THIS

    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
