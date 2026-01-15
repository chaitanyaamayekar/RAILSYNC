import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recipientModel",
    required: true
  },
  recipientModel: {
    type: String,
    enum: ["Student", "Admin"],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      "application_update",
      "document_request",
      "verification",
      "system",
      "alert"
    ],
    default: "system"
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "relatedToModel"
  },
  relatedToModel: {
    type: String,
    enum: ["Application", "Document"]
  },
  isRead: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  actionUrl: String,
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  readAt: Date
});

// Indexes
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// Static method
notificationSchema.statics.createNotification = async function (data) {
  const notification = new this(data);
  await notification.save();
  return notification;
};

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
