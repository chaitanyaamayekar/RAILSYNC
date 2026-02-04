// import mongoose from "mongoose";

// const documentSchema = new mongoose.Schema(
//   {
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//       required: true
//     },
//     application: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Application"
//     },
//     documentType: {
//       type: String,
//       enum: [
//         "id_proof",
//         "address_proof",
//         "bonafide_certificate",
//         "photo",
//         "other"
//       ],
//       required: true
//     },
//     fileName: {
//       type: String,
//       required: true
//     },
//     originalName: {
//       type: String,
//       required: true
//     },
//     fileUrl: {
//       type: String,
//       required: true
//     },
//     publicId: {
//       type: String,
//       required: true
//     },
//     mimeType: {
//       type: String,
//       required: true
//     },
//     size: {
//       type: Number,
//       required: true
//     },
//     verificationStatus: {
//       type: String,
//       enum: ["pending", "verified", "rejected"],
//       default: "pending"
//     },
//     verifiedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin"
//     },
//     verifiedAt: Date,
//     rejectionReason: String,
//     metadata: {
//       type: Map,
//       of: mongoose.Schema.Types.Mixed
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// // Indexes (good for performance – exam bonus)
// documentSchema.index({ student: 1 });
// documentSchema.index({ application: 1 });
// documentSchema.index({ documentType: 1 });
// documentSchema.index({ verificationStatus: 1 });

// const Document = mongoose.model("Document", documentSchema);

// export default Document;

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
