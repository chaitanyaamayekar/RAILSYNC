import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaFileAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import API from '../../services/api.js'

const Status = () => {
  const { applicationId } = useParams()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await API.get(`/applications/${applicationId}`)
        setApplication(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [applicationId])

  if (loading) {
    return <div className="text-center py-20">Loading status...</div>
  }

  if (!application) {
    return <div className="text-center py-20">Application not found</div>
  }

  const timelineSteps = [
    {
      id: 1,
      title: 'Application Submitted',
      description: 'Your application has been successfully submitted',
      date: application.submittedAt,
      status: 'completed',
      icon: FaFileAlt,
    },
    {
      id: 2,
      title: 'Document Verification',
      description: 'Documents verified by college',
      status: application.timeline?.verified ? 'completed' : 'pending',
      icon: FaCheckCircle,
    },
    // {
    //   id: 3,
    //   title: 'Railway Department Review',
    //   description: 'Under railway review',
    //   status: application.timeline?.railwayReview ? 'current' : 'pending',
    //   icon: FaClock,
    // },
    {
      id: 4,
      title: 'Approval & Concession Generation',
      description: 'Concession will be generated',
      status: application.timeline?.approved ? 'completed' : 'pending',
      icon: FaClock,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'current':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }
console.log(application);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="railway-card mb-6">
          <h1 className="text-2xl font-bold mb-2">Application Status</h1>
          <p className="text-gray-600">Track your railway concession application</p>

          <div className="mt-4 text-2xl font-bold">
           
            {application.student?.name}
          </div>
        </div>

        <div className="railway-card">
          <h2 className="text-xl font-bold mb-6">Application Timeline</h2>

          {timelineSteps.map(step => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex mb-6">
                <div className={`w-10 h-10 mr-4 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                  <Icon />
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="railway-card mt-6">
          <h2 className="text-xl font-bold mb-4">Application Details</h2>

          <p><b>From:</b> {application.fromStation}</p>
          <p><b>To:</b> {application.toStation}</p>
          <p><b>Status:</b> {application.status}</p>
        </div>

      </div>
    </div>
  )
}

export default Status
