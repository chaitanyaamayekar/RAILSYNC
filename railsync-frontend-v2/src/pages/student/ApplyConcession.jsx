import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaTrain, FaUniversity, FaMapMarkerAlt, FaUpload } from 'react-icons/fa'
import toast from 'react-hot-toast'

const ApplyConcession = () => {
  const [step, setStep] = useState(1)

  const validationSchema = Yup.object({
    // Step 1
    fromStation: Yup.string().required('Required'),
    toStation: Yup.string().required('Required'),
    travelClass: Yup.string().required('Required'),
    
    // Step 2
    college: Yup.string().required('Required'),
    year: Yup.string().required('Required'),
    course: Yup.string().required('Required'),
    
    // Step 3
    idProof: Yup.mixed().required('ID Proof is required'),
    addressProof: Yup.mixed().required('Address Proof is required'),
    bonafideCertificate: Yup.mixed().required('Bonafide Certificate is required'),
  })

  const formik = useFormik({
    initialValues: {
      fromStation: '',
      toStation: '',
      travelClass: 'second',
      college: '',
      year: '',
      course: '',
      idProof: null,
      addressProof: null,
      bonafideCertificate: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      toast.success('Application submitted successfully!')
    },
  })

  const stations = [
    'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road',
    'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Dadar',
    'Matunga', 'Bandra', 'Khar Road', 'Santacruz', 'Vile Parle',
    'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali',
    'Borivali', 'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon',
    'Vasai Road', 'Nalla Sopara', 'Virar'
  ]

  const handleFileUpload = (field, file) => {
    formik.setFieldValue(field, file)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-blue/10 rounded-full mb-4">
            <FaTrain className="text-3xl text-railway-blue" />
          </div>
          <h1 className="text-3xl font-bold text-railway-dark mb-2">
            Apply for Railway Concession
          </h1>
          <p className="text-gray-600">
            Complete the form below to apply for your student concession pass
          </p>
        </div>

        {/* Stepper */}
        <div className="railway-stepper">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`railway-stepper-step ${
                  step === stepNumber
                    ? 'step-active'
                    : step > stepNumber
                    ? 'step-completed'
                    : 'step-inactive'
                }`}
              >
                <div className="stepper-number">{stepNumber}</div>
                <div className="ml-3 hidden sm:block">
                  <div className="font-medium">
                    {stepNumber === 1 && 'Travel Details'}
                    {stepNumber === 2 && 'Academic Details'}
                    {stepNumber === 3 && 'Documents'}
                  </div>
                </div>
              </div>
              {stepNumber < 3 && <div className="stepper-line"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <div className="railway-card">
          <form onSubmit={formik.handleSubmit}>
            {/* Step 1: Travel Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-railway-blue" />
                  Travel Route Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Station *
                    </label>
                    <select
                      name="fromStation"
                      value={formik.values.fromStation}
                      onChange={formik.handleChange}
                      className="railway-input"
                    >
                      <option value="">Select station</option>
                      {stations.map((station) => (
                        <option key={station} value={station}>
                          {station}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Station *
                    </label>
                    <select
                      name="toStation"
                      value={formik.values.toStation}
                      onChange={formik.handleChange}
                      className="railway-input"
                    >
                      <option value="">Select station</option>
                      {stations.map((station) => (
                        <option key={station} value={station}>
                          {station}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Class *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['First', 'Second'].map((cls) => (
                      <label
                        key={cls}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formik.values.travelClass === cls.toLowerCase()
                            ? 'border-railway-blue bg-railway-blue/5'
                            : 'border-gray-300 hover:border-railway-blue'
                        }`}
                      >
                        <input
                          type="radio"
                          name="travelClass"
                          value={cls.toLowerCase()}
                          checked={formik.values.travelClass === cls.toLowerCase()}
                          onChange={formik.handleChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                              formik.values.travelClass === cls.toLowerCase()
                                ? 'border-railway-blue'
                                : 'border-gray-400'
                            }`}
                          >
                            {formik.values.travelClass === cls.toLowerCase() && (
                              <div className="w-2 h-2 rounded-full bg-railway-blue"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{cls} Class</div>
                            <div className="text-sm text-gray-500">
                              {cls === 'First' ? 'Premium travel' : 'Regular travel'}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FaUniversity className="mr-3 text-railway-blue" />
                  Academic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/University *
                  </label>
                  <select
                    name="college"
                    value={formik.values.college}
                    onChange={formik.handleChange}
                    className="railway-input"
                  >
                    <option value="">Select college</option>
                    <option value="mumbai_university">University of Mumbai</option>
                    <option value="sndt">SNDT Women's University</option>
                    <option value="muict">MUICT</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year of Study *
                    </label>
                    <select
                      name="year"
                      value={formik.values.year}
                      onChange={formik.handleChange}
                      className="railway-input"
                    >
                      <option value="">Select year</option>
                      <option value="first">First Year</option>
                      <option value="second">Second Year</option>
                      <option value="third">Third Year</option>
                      <option value="fourth">Fourth Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course/Program *
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formik.values.course}
                      onChange={formik.handleChange}
                      className="railway-input"
                      placeholder="e.g., B.Tech Computer Science"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FaUpload className="mr-3 text-railway-blue" />
                  Document Upload
                </h3>

                <p className="text-gray-600 mb-6">
                  Upload clear scanned copies of the following documents (PDF/JPEG/PNG)
                </p>

                {[
                  {
                    id: 'idProof',
                    label: 'Student ID Proof',
                    desc: 'College ID Card / Aadhar Card',
                    required: true,
                  },
                  {
                    id: 'addressProof',
                    label: 'Address Proof',
                    desc: 'Aadhar Card / Electricity Bill',
                    required: true,
                  },
                  {
                    id: 'bonafideCertificate',
                    label: 'Bonafide Certificate',
                    desc: 'Issued by college authorities',
                    required: true,
                  },
                ].map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium flex items-center">
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                        <div className="text-sm text-gray-500">{doc.desc}</div>
                      </div>
                      <div className="text-sm">
                        {formik.values[doc.id] ? (
                          <span className="text-green-600 font-medium">
                            ✓ Uploaded
                          </span>
                        ) : (
                          <span className="text-red-600">Required</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        id={doc.id}
                        onChange={(e) =>
                          handleFileUpload(doc.id, e.target.files[0])
                        }
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor={doc.id}
                        className="railway-btn-secondary cursor-pointer"
                      >
                        Choose File
                      </label>
                      {formik.values[doc.id] && (
                        <div className="text-sm text-gray-600">
                          Selected: {formik.values[doc.id].name}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="railway-btn-secondary"
                  >
                    ← Previous
                  </button>
                )}
              </div>
              <div>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="railway-btn-primary"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="railway-btn-primary"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="railway-card mt-6 bg-blue-50 border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2">Important Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Application processing takes 3-5 working days</li>
            <li>• Ensure all documents are clear and valid</li>
            <li>• Keep your application ID for future reference</li>
            <li>• You'll receive notifications at each stage</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ApplyConcession