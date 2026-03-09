import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true 
    },

    fromStation: {
      type: String,
      required: true
    },

    toStation: {
      type: String,
      required: true
    },

    travelClass: {
      type: String,
      enum: ["first", "second"],
      required: true
    },

    college: {
      type: String,
      required: true
    },

    year: {
      type: String,
      required: true
    },

    course: {
      type: String,
      required: true
    },

    concessionType: {
      type: String,
      enum: ["Monthly", "Quarterly"],
      default: "Monthly"
    },

    duration: {
      type: String,
      enum: ["monthly", "quarterly"],
      required: true
    },

   status: {
     type: String,
     enum: ["pending", "approved", "rejected"],
     default: "pending",
 },
   concessionFormUrl: {
     type: String,
},
    rejectionReason: {
     type: String,
     default: "",
},
    formGeneratedAt: {
     type: Date,
},

    formExpiresAt: {
     type: Date,
},

    regenerateCount: {
     type: Number,
    default: 0,
},
    documents: {
      id_proof: {
        url: String,
        publicId: String,
        verified: { type: Boolean, default: false },
      },
      address_proof: {
        url: String,
        publicId: String,
        verified: { type: Boolean, default: false },
      },
      previous_pass: {
        url: String,
        publicId: String,
        verified: { type: Boolean, default: false },
      },
    }

  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
