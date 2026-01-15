const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  // Admin Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  employeeId: {
    type: String,
    required: [true, 'Employee ID is required'],
    unique: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['railway', 'college', 'verification', 'superadmin']
  },
  designation: {
    type: String,
    required: [true, 'Designation is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  
  // Permissions
  permissions: {
    canViewApplications: {
      type: Boolean,
      default: true
    },
    canVerifyDocuments: {
      type: Boolean,
      default: false
    },
    canApproveApplications: {
      type: Boolean,
      default: false
    },
    canManageUsers: {
      type: Boolean,
      default: false
    },
    canGenerateReports: {
      type: Boolean,
      default: false
    }
  },
  
  // Admin Statistics
  totalReviews: {
    type: Number,
    default: 0
  },
  approvedCount: {
    type: Number,
    default: 0
  },
  rejectedCount: {
    type: Number,
    default: 0
  },
  
  // Profile
  profilePicture: {
    url: String,
    publicId: String
  },
  
  // Last active
  lastActive: {
    type: Date,
    default: Date.now
  }
});

// Virtual for full name
adminSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Indexes
adminSchema.index({ employeeId: 1 });
adminSchema.index({ department: 1 });

// Update lastActive on save
adminSchema.pre('save', function(next) {
  this.lastActive = Date.now();
  next();
});

const Admin = User.discriminator('admin', adminSchema);

module.exports = Admin;