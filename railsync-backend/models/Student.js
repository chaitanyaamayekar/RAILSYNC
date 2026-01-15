const mongoose = require('mongoose');
const User = require('./User');

const studentSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  
  // Academic Information
  college: {
    type: String,
    required: [true, 'College name is required']
  },
  university: {
    type: String,
    required: [true, 'University name is required']
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true
  },
  course: {
    type: String,
    required: [true, 'Course name is required']
  },
  year: {
    type: String,
    enum: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    required: true
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  
  // Address Information
  address: {
    street: String,
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
    }
  },
  
  // Verification Status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  isCollegeVerified: {
    type: Boolean,
    default: false
  },
  
  // Application Stats
  totalApplications: {
    type: Number,
    default: 0
  },
  approvedApplications: {
    type: Number,
    default: 0
  },
  
  // Profile Picture
  profilePicture: {
    url: String,
    publicId: String
  }
});

// Index for faster queries
studentSchema.index({ studentId: 1 });
studentSchema.index({ college: 1 });
studentSchema.index({ 'address.city': 1 });

// Virtual for full address
studentSchema.virtual('fullAddress').get(function() {
  return `${this.address.street || ''}, ${this.address.city}, ${this.address.state} - ${this.address.pincode}`.trim();
});

const Student = User.discriminator('student', studentSchema);

module.exports = Student;