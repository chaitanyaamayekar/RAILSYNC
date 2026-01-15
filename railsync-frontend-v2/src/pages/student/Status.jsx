import React from 'react'
import { FaCheckCircle, FaClock, FaTimesCircle, FaFileAlt } from 'react-icons/fa'

const Status = () => {
  const timelineSteps = [
    {
      id: 1,
      title: 'Application Submitted',
      description: 'Your application has been successfully submitted',
      date: 'Jan 15, 2024 - 10:30 AM',
      status: 'completed',
      icon: FaFileAlt,
    },
    {
      id: 2,
      title: 'Document Verification',
      description: 'Documents are being verified by college authorities',
      date: 'Jan 16, 2024 - 11:45 AM',
      status: 'completed',
      icon: FaCheckCircle,
    },
    {
      id: 3,
      title: 'Railway Department Review',
      description: 'Application under review by railway department',
      date: 'In progress',
      status: 'current',
      icon: FaClock,
    },
    {
      id: 4,
      title: 'Approval & Pass Generation',
      description: 'Concession pass will be generated upon approval',
      date: 'Pending',
      status: 'pending',
      icon: FaClock,
    },
  ]

  const applicationDetails = {
    id: 'RSC202400123',
    submitted: 'January 15, 2024',
    from: 'Churchgate',
    to: 'Virar',
    class: 'Second Class',
    college: 'University of Mumbai',
    year: 'Third Year',
    estimatedCompletion: 'January 22, 2024',
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'current': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="railway-card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-railway-dark mb-2">
                Application Status
              </h1>
              <p className="text-gray-600">
                Track your railway concession application progress
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-block px-4 py-2 bg-railway-blue/10 rounded-lg">
                <div className="text-sm text-gray-600">Application ID</div>
                <div className="font-mono font-bold text-lg text-railway-blue">
                  {applicationDetails.id}
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className={`px-4 py-2 rounded-full ${getStatusColor('current')} font-medium`}>
                Under Review
              </div>
              <div className="text-sm text-gray-600">
                Estimated completion: {applicationDetails.estimatedCompletion}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-railway-blue h-2 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="railway-card">
          <h2 className="text-xl font-bold mb-6">Application Timeline</h2>
          <div className="space-y-8">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="flex">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                      <Icon className="text-lg" />
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div className={`h-16 w-0.5 mt-2 ${
                        step.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <span className="text-sm text-gray-500">{step.date}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    {step.status === 'completed' && (
                      <div className="inline-flex items-center text-green-600 text-sm">
                        <FaCheckCircle className="mr-1" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Application Details */}
        <div className="railway-card mt-6">
          <h2 className="text-xl font-bold mb-6">Application Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Travel Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{applicationDetails.from} → {applicationDetails.to}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-medium">{applicationDetails.class}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="font-medium">{applicationDetails.submitted}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Academic Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">College:</span>
                  <span className="font-medium">{applicationDetails.college}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{applicationDetails.year}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Application ID:</span>
                  <span className="font-medium font-mono">{applicationDetails.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="railway-card mt-6 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">Need Help?</h3>
          <p className="text-blue-700 mb-4">
            If your application is taking longer than expected or you have questions about the status:
          </p>
          <div className="space-y-2 text-sm text-blue-700">
            <div>• Contact College Administration: concession@yourcollege.edu</div>
            <div>• Railway Department Helpline: 1800-123-4567</div>
            <div>• Email Support: support@railsync.in</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Status