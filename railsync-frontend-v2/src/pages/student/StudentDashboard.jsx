import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FaTrain,
  FaFileAlt,
  FaClock,
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaUserGraduate,
  FaQrcode,
} from 'react-icons/fa'

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth)

  // Mock data
  const applicationStatus = {
    status: 'under_review',
    id: 'RSC202400123',
    submitted: '2024-01-15',
    college: 'Mumbai University',
    from: 'Churchgate',
    to: 'Virar',
  }

  const notifications = [
    { id: 1, message: 'Application submitted successfully', time: '2 hours ago', read: false },
    { id: 2, message: 'Documents under verification', time: '1 day ago', read: true },
    { id: 3, message: 'College verification pending', time: '2 days ago', read: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaTrain className="text-3xl text-railway-blue" />
              <div>
                <h1 className="text-2xl font-bold text-railway-dark">
                  Student Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Application ID</div>
              <div className="font-mono font-bold text-railway-blue">
                {applicationStatus.id}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="railway-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FaFileAlt className="text-2xl text-railway-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <p className="text-xl font-bold text-railway-dark">
                  {applicationStatus.status === 'approved' ? 'Approved' : 
                   applicationStatus.status === 'rejected' ? 'Rejected' : 'Under Review'}
                </p>
              </div>
            </div>
          </div>

          <div className="railway-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <FaUserGraduate className="text-2xl text-railway-green" />
              </div>
              <div>
                <p className="text-sm text-gray-600">College</p>
                <p className="text-lg font-semibold text-gray-800">
                  {applicationStatus.college}
                </p>
              </div>
            </div>
          </div>

          <div className="railway-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <FaQrcode className="text-2xl text-railway-yellow" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="text-lg font-semibold text-gray-800">
                  {applicationStatus.from} → {applicationStatus.to}
                </p>
              </div>
            </div>
          </div>

          <div className="railway-card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <FaBell className="text-2xl text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-xl font-bold text-gray-800">
                  {notifications.filter(n => !n.read).length} New
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Apply Card */}
          <div className="railway-card hover:shadow-xl transition-all">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-railway-blue/10 rounded-xl flex items-center justify-center mr-4">
                <FaFileAlt className="text-3xl text-railway-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Apply for Concession</h3>
                <p className="text-gray-600 mb-4">
                  Start a new railway concession application
                </p>
              </div>
            </div>
            <Link
              to="/student/apply"
              className="railway-btn-primary w-full text-center"
            >
              Start Application
            </Link>
          </div>

          {/* Status Card */}
          <div className="railway-card hover:shadow-xl transition-all">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <FaClock className="text-3xl text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Application Status</h3>
                <p className="text-gray-600 mb-4">
                  Track your current application progress
                </p>
              </div>
            </div>
            <Link
              to="/student/status"
              className="railway-btn-secondary w-full text-center"
            >
              View Status
            </Link>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="railway-card">
          <div className="flex items-center mb-6">
            <FaBell className="text-2xl text-railway-blue mr-3" />
            <h3 className="text-xl font-bold">Recent Notifications</h3>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    {!notification.read ? (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3"></div>
                    )}
                    <div>
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  {!notification.read && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      New
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/student/notifications"
              className="text-railway-blue hover:underline font-medium"
            >
              View all notifications →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard