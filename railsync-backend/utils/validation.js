const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  
  body('fullName')
    .notEmpty()
    .trim()
    .withMessage('Full name is required'),
  
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  
  body('college')
    .notEmpty()
    .withMessage('College name is required'),
  
  body('course')
    .notEmpty()
    .withMessage('Course name is required')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateApplication = [
  body('travelDetails.fromStation')
    .isIn([
      'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road',
      'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Dadar',
      'Matunga', 'Bandra', 'Khar Road', 'Santacruz', 'Vile Parle',
      'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali',
      'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon',
      'Vasai Road', 'Nalla Sopara', 'Virar'
    ])
    .withMessage('Please select a valid from station'),
  
  body('travelDetails.toStation')
    .isIn([
      'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road',
      'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Dadar',
      'Matunga', 'Bandra', 'Khar Road', 'Santacruz', 'Vile Parle',
      'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali',
      'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon',
      'Vasai Road', 'Nalla Sopara', 'Virar'
    ])
    .withMessage('Please select a valid to station'),
  
  body('travelDetails.travelClass')
    .isIn(['first', 'second'])
    .withMessage('Please select a valid travel class'),
  
  body('academicDetails.college')
    .notEmpty()
    .withMessage('College name is required'),
  
  body('academicDetails.course')
    .notEmpty()
    .withMessage('Course name is required'),
  
  body('academicDetails.year')
    .isIn(['First', 'Second', 'Third', 'Fourth', 'Fifth'])
    .withMessage('Please select a valid year')
];

const validateStatusUpdate = [
  body('status')
    .isIn([
      'submitted',
      'under_review',
      'documents_verified',
      'college_verified',
      'railway_verified',
      'approved',
      'rejected',
      'cancelled'
    ])
    .withMessage('Please provide a valid status'),
  
  body('rejectionReason')
    .if(body('status').equals('rejected'))
    .notEmpty()
    .withMessage('Rejection reason is required for rejected applications')
];

const validateDocumentUpload = [
  body('documentType')
    .isIn(['id_proof', 'address_proof', 'bonafide_certificate', 'photo', 'other'])
    .withMessage('Please provide a valid document type')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateApplication,
  validateStatusUpdate,
  validateDocumentUpload,
  handleValidationErrors
};