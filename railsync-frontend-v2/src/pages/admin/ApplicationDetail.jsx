import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaDownload,
  FaUserGraduate,
  FaUniversity,
  FaMapMarkerAlt,
  FaTrain,
  FaFilePdf,
  FaFileImage,
  FaCalendarAlt,
  FaIdCard
} from 'react-icons/fa'
import toast from 'react-hot-toast'

const ApplicationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [actionLoading, setActionLoading] = useState(false)

  // Mock data - in real app, this would come from API
  const application = {
    id: id || 'RSC202400123',
    student: {
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@mumbaiuniversity.edu',
      phone: '9876543210',
      studentId: 'MU202300456',
      address: 'B-204, Sunshine Apartments, Andheri West, Mumbai - 400053'
    },
    college: {
      name: 'University of Mumbai',
      department: 'Computer Science',
      year: 'Third Year',
      course: 'B.Tech Computer Science',
      bonafideId: 'BONAF2024-00123'
    },
    travel: {
      from: 'Churchgate',
      to: 'Virar',
      class: 'Second Class',
      period: '1 Year',
      route: 'Western Line'
    },
    documents: {
      idProof: { name: 'student_id.pdf', type: 'pdf', uploaded: '2024-01-15' },
      addressProof: { name: 'aadhar_card.jpg', type: 'image', uploaded: '2024-01-15' },
      bonafide: { name: 'bonafide_certificate.pdf', type: 'pdf', uploaded: '2024-01-15' },
      photo: { name: 'passport_photo.jpg', type: 'image', uploaded: '2024-01-15' }
    },
    timeline: [
      { date: '2024-01-15', status: 'Submitted', description: 'Application submitted by student' },
      { date: '2024-01-16', status: 'College Verified', description: 'Verified by college authorities' },
      { date: '2024-01-17', status: 'Under Review', description: 'Under railway department review' }
    ],
    currentStatus: 'under_review',
    submittedDate: '2024-01-15',
    estimatedCompletion: '2024-01-22'
  }

  const handleApprove = () => {
    setActionLoading(true)
    setTimeout(() => {
      toast.success(`Application ${id} approved successfully!`)
      setActionLoading(false)
      // Navigate back to applications list
      navigate('/admin/applications')
    }, 1000)
  }

  const handleReject = () => {
    setActionLoading(true)
    setTimeout(() => {
      toast.error(`Application ${id} rejected!`)
      setActionLoading(false)
      navigate('/admin/applications')
    }, 1000)
  }

  const handleRequestMoreInfo = () => {
    toast('Request for more information sent to student', {
      icon: '📧',
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'under_review': return 'bg-yellow-100 text-yellow-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved'
      case 'rejected': return 'Rejected'
      case 'under_review': return 'Under Review'
      case 'submitted': return 'Submitted'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <button
                onClick={() => navigate('/admin/applications')}
                className="flex items-center text-gray-600 hover:text-railway-blue mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-railway-dark">
                  Application Details
                </h1>
                <div className="flex items-center mt-1">
                  <span className="font-mono font-bold text-railway-blue text-lg">
                    {application.id}
                  </span>
                  <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.currentStatus)}`}>
                    {getStatusText(application.currentStatus)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Submitted: {application.submittedDate}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Student & Application Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Information Card */}
            <div className="railway-card">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaUserGraduate className="mr-3 text-railway-blue" />
                Student Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Personal Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{application.student.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{application.student.email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{application.student.phone}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-medium font-mono">{application.student.studentId}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Address</h3>
                  <p className="text-gray-800">{application.student.address}</p>
                </div>
              </div>
            </div>

            {/* Academic Information Card */}
            <div className="railway-card">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaUniversity className="mr-3 text-railway-blue" />
                Academic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">College:</span>
                    <span className="font-medium">{application.college.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Department:</span>
                    <span className="font-medium">{application.college.department}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{application.college.course}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{application.college.year}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Bonafide ID:</span>
                    <span className="font-medium font-mono">{application.college.bonafideId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Information Card */}
            <div className="railway-card">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaTrain className="mr-3 text-railway-blue" />
                Travel Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">From Station:</span>
                    <span className="font-medium">{application.travel.from}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">To Station:</span>
                    <span className="font-medium">{application.travel.to}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium">{application.travel.class}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Validity Period:</span>
                    <span className="font-medium">{application.travel.period}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{application.travel.route}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">~ 60 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Documents */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="railway-card">
              <h2 className="text-xl font-bold mb-6">Application Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={handleApprove}
                  disabled={actionLoading || application.currentStatus === 'approved'}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheckCircle />
                  <span>Approve Application</span>
                </button>
                
                <button
                  onClick={handleReject}
                  disabled={actionLoading || application.currentStatus === 'rejected'}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaTimesCircle />
                  <span>Reject Application</span>
                </button>
                
                <button
                  onClick={handleRequestMoreInfo}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center space-x-2 railway-btn-secondary py-3"
                >
                  <FaEye />
                  <span>Request More Info</span>
                </button>

                {/* Status History */}
                <div className="pt-4 border-t">
                  <h3 className="font-bold mb-3">Status History</h3>
                  <div className="space-y-3">
                    {application.timeline.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-railway-blue rounded-full mt-2 mr-3"></div>
                        <div>
                          <div className="font-medium">{item.status}</div>
                          <div className="text-sm text-gray-500">{item.date}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Card */}
            <div className="railway-card">
              <h2 className="text-xl font-bold mb-6">Uploaded Documents</h2>
              <div className="space-y-4">
                {Object.entries(application.documents).map(([key, doc]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {doc.type === 'pdf' ? (
                          <FaFilePdf className="text-red-500 mr-2" />
                        ) : (
                          <FaFileImage className="text-blue-500 mr-2" />
                        )}
                        <div>
                          <div className="font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-500">{doc.name}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Uploaded: {doc.uploaded}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Notes */}
            <div className="railway-card bg-yellow-50 border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-3">Verification Checklist</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <input type="checkbox" id="check1" className="mr-2" />
                  <label htmlFor="check1">Student ID matches college records</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="check2" className="mr-2" />
                  <label htmlFor="check2">Bonafide certificate is valid</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="check3" className="mr-2" />
                  <label htmlFor="check3">Address proof is verified</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="check4" className="mr-2" />
                  <label htmlFor="check4">Travel route is valid for concession</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Card (Full Width) */}
        <div className="railway-card mt-8">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaCalendarAlt className="mr-3 text-railway-blue" />
            Application Timeline
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              {[
                { date: 'Jan 15', status: 'Application Submitted', desc: 'Student submitted the concession application' },
                { date: 'Jan 16', status: 'College Verification', desc: 'Verified by college administration' },
                { date: 'Jan 17', status: 'Document Review', desc: 'Documents under railway department review' },
                { date: 'Jan 18', status: 'Verification Pending', desc: 'Awaiting final approval' },
                { date: 'Est: Jan 22', status: 'Expected Completion', desc: 'Application processing completion' }
              ].map((item, index) => (
                <div key={index} className="flex items-start relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 mr-6 ${
                    index < 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {index < 2 ? (
                      <FaCheckCircle className="text-xl" />
                    ) : index === 4 ? (
                      <FaCalendarAlt className="text-xl" />
                    ) : (
                      <FaIdCard className="text-xl" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{item.status}</h3>
                      <span className="text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetail