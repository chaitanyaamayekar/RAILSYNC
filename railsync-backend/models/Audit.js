import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  action: String,

  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConcessionApplication"
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("AuditLog", auditLogSchema);
