import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaUserGraduate, FaEnvelope, FaLock, FaIdCard, FaUniversity, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

const StudentRegister = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    college: Yup.string().required('College is required'),
    studentId: Yup.string().required('Student ID is required'),
    year: Yup.string().required('Year of study is required'),
    address: Yup.string().required('Address is required'),
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      college: '',
      studentId: '',
      year: '',
      address: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        toast.success('Registration successful! Please login.')
        navigate('/student/login')
        setLoading(false)
      }, 1500)
    },
  })

  const colleges = [
    'University of Mumbai',
    'SNDT Women\'s University',
    'Mumbai University Institute of Chemical Technology',
    'St. Xavier\'s College',
    'Jai Hind College',
    'Wilson College',
    'KJ Somaiya College of Engineering',
    'Veermata Jijabai Technological Institute',
    'Indian Institute of Technology Bombay',
    'Other'
  ]

  const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year']

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-blue/5 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md mb-6">
            <FaUniversity className="text-railway-blue text-xl" />
            <span className="font-semibold text-railway-blue">Student Registration</span>
          </div>
          <h1 className="text-4xl font-bold text-railway-dark mb-4">
            Create Your Student Account
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Register to apply for railway concession passes. Fill in your details to get started.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="railway-stepper mb-8">
          <div className="railway-stepper-step step-active">
            <div className="stepper-number">1</div>
            <div className="ml-3 hidden sm:block">
              <div className="font-medium">Registration</div>
            </div>
          </div>
          <div className="stepper-line"></div>
          <div className="railway-stepper-step step-inactive">
            <div className="stepper-number">2</div>
            <div className="ml-3 hidden sm:block">
              <div className="font-medium">Email Verification</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="railway-card">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Personal Details Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaUserGraduate className="mr-3 text-railway-blue" />
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUserGraduate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="railway-input pl-10"
                      placeholder="John Doe"
                    />
                  </div>
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="railway-input pl-10"
                      placeholder="student@college.edu"
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="railway-input pl-10"
                      placeholder="9876543210"
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID *
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="studentId"
                      value={formik.values.studentId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="railway-input pl-10"
                      placeholder="MU20230001"
                    />
                  </div>
                  {formik.touched.studentId && formik.errors.studentId && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.studentId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Details Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaUniversity className="mr-3 text-railway-blue" />
                Academic Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/University *
                  </label>
                  <select
                    name="college"
                    value={formik.values.college}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="railway-input"
                  >
                    <option value="">Select your college</option>
                    {colleges.map((college) => (
                      <option key={college} value={college}>
                        {college}
                      </option>
                    ))}
                  </select>
                  {formik.touched.college && formik.errors.college && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.college}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Study *
                  </label>
                  <select
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="railway-input"
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {formik.touched.year && formik.errors.year && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.year}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-3 text-railway-blue" />
                Address Details
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residential Address *
                </label>
                <textarea
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="railway-input min-h-[100px]"
                  placeholder="Enter your complete residential address"
                  rows="3"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                )}
              </div>
            </div>

            {/* Password Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Security</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="railway-input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="railway-input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="h-4 w-4 text-railway-blue rounded focus:ring-railway-blue border-gray-300 mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-railway-blue hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-railway-blue hover:underline">
                  Privacy Policy
                </a>
                . I confirm that all information provided is accurate.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full railway-btn-primary py-3 text-lg"
              >
                {loading ? 'Creating Account...' : 'Create Student Account'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/student/login"
                className="text-railway-blue font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Information Box */}
        <div className="railway-card mt-6 bg-blue-50 border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">Registration Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use your official college email address</li>
            <li>• Keep your Student ID ready for verification</li>
            <li>• You'll receive a verification email after registration</li>
            <li>• Railway concession applications can be submitted after email verification</li>
          </ul>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-railway-blue transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentRegister