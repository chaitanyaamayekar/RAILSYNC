// export default ApplicationDetail
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaDownload,
  FaUserGraduate,
  FaUniversity,
  FaTrain,
  FaFilePdf,
  FaFileImage,
  FaCalendarAlt
} from 'react-icons/fa'
import toast from 'react-hot-toast'

const ApplicationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  /* ================= FETCH APPLICATION ================= */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/applications/${id}`,
          { withCredentials: true }
        )
        setApplication(data)
      } catch (err) {
        toast.error('Failed to load application')
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [id])

  /* ================= ACTIONS ================= */
  const handleApprove = async () => {
    try {
      setActionLoading(true)
      await axios.put(
        `http://localhost:5000/api/applications/${id}/approve`,
        {},
        { withCredentials: true }
      )
      toast.success('Application approved')
      navigate('/admin/applications')
    } catch {
      toast.error('Approval failed')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async () => {
    try {
      setActionLoading(true)
      await axios.put(
        `http://localhost:5000/api/applications/${id}/reject`,
        {},
        { withCredentials: true }
      )
      toast.success('Application rejected')
      navigate('/admin/applications')
    } catch {
      toast.error('Rejection failed')
    } finally {
      setActionLoading(false)
    }
  }

  /* ================= HELPERS ================= */
  const statusColor = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }

  if (loading) {
    return <div className="p-10 text-center">Loading application...</div>
  }

  if (!application) {
    return <div className="p-10 text-center text-red-500">Application not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/admin/applications')}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor[application.status]}`}
          >
            {application.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student */}
          <div className="railway-card">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <FaUserGraduate className="mr-2" /> Student Information
            </h2>

            <p><b>Name:</b> {application.student?.name}</p>
            <p><b>Email:</b> {application.student?.email}</p>
            <p><b>Phone:</b> {application.student?.phone}</p>
          </div>

          {/* Academic */}
          <div className="railway-card">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <FaUniversity className="mr-2" /> Academic Info
            </h2>

            <p><b>College:</b> {application.college}</p>
            <p><b>Course:</b> {application.course}</p>
            <p><b>Year:</b> {application.year}</p>
          </div>

          {/* Travel */}
          <div className="railway-card">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <FaTrain className="mr-2" /> Travel Info
            </h2>

            <p><b>From:</b> {application.fromStation}</p>
            <p><b>To:</b> {application.toStation}</p>
            <p><b>Class:</b> {application.travelClass}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="railway-card">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="w-full bg-green-600 text-white py-2 rounded mb-3"
            >
              <FaCheckCircle className="inline mr-2" />
              Approve
            </button>

            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="w-full bg-red-600 text-white py-2 rounded"
            >
              <FaTimesCircle className="inline mr-2" />
              Reject
            </button>
          </div>

          {/* Documents */}
          <div className="railway-card">
            <h2 className="font-bold mb-4">Documents</h2>

            {application.documents?.map((doc) => (
              <div key={doc._id} className="flex justify-between mb-2">
                <span>{doc.name}</span>
                {doc.type === 'pdf' ? <FaFilePdf /> : <FaFileImage />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetail
