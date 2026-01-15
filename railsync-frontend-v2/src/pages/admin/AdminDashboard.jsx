import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaTrain,
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaBell,
} from 'react-icons/fa'

const AdminDashboard = () => {
  // Mock data
  const stats = {
    total: 1567,
    pending: 89,
    approved: 1320,
    rejected: 158,
  }

  const recentApplications = [
    {
      id: 'RSC202400123',
      student: 'Rajesh Kumar',
      college: 'Mumbai University',
      submitted: '2024-01-15',
      status: 'pending',
    },
    {
      id: 'RSC202400122',
      student: 'Priya Sharma',
      college: 'SNDT University',
      submitted: '2024-01-14',
      status: 'approved',
    },
    {
      id: 'RSC202400121',
      student: 'Amit Patel',
      college: 'MUICT',
      submitted: '2024-01-14',
      status: 'rejected',
    },
    {
      id: 'RSC202400120',
      student: 'Sneha Desai',
      college: 'Wilson College',
      submitted: '2024-01-13',
      status: 'approved',
    },
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: '5 applications pending for more than 3 days',
    },
    {
      id: 2,
      type: 'info',
      message: 'Weekly report generated successfully',
    },
  ]

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'badge-pending',
      approved: 'badge-approved',
      rejected: 'badge-rejected',
    }
    return (
      <span className={`railway-badge ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <FaTrain className="text-3xl text-railway-dark" />
              <div>
                <h1 className="text-2xl font-bold text-railway-dark">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">Railway Concession Management System</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Logged in as</div>
              <div className="font-medium">Railway Department</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="railway-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-railway-dark mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaFileAlt className="text-2xl text-railway-blue" />
              </div>
            </div>
          </div>

          <div className="railway-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="railway-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="railway-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaTimesCircle className="text-2xl text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="railway-card mb-8">
          <div className="flex items-center mb-4">
            <FaBell className="text-xl text-railway-blue mr-3" />
            <h3 className="text-xl font-bold">System Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="railway-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Recent Applications</h3>
              <p className="text-gray-600">Applications requiring attention</p>
            </div>
            <Link
              to="/admin/applications"
              className="railway-btn-primary"
            >
              View All Applications
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="railway-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Student Name</th>
                  <th>College</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="font-mono font-medium">{app.id}</td>
                    <td className="font-medium">{app.student}</td>
                    <td>{app.college}</td>
                    <td>{app.submitted}</td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td>
                      <Link
                        to={`/admin/applications/${app.id}`}
                        className="text-railway-blue hover:underline font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="railway-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FaFileAlt className="text-xl text-railway-blue" />
              </div>
              <h4 className="font-bold">Review Applications</h4>
            </div>
            <p className="text-gray-600 mb-4">
              Process pending applications requiring verification
            </p>
            <Link
              to="/admin/applications?status=pending"
              className="text-railway-blue font-medium hover:underline"
            >
              Start Review →
            </Link>
          </div>

          <div className="railway-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <FaChartLine className="text-xl text-green-600" />
              </div>
              <h4 className="font-bold">Generate Reports</h4>
            </div>
            <p className="text-gray-600 mb-4">
              Download monthly reports and analytics
            </p>
            <a href="#" className="text-green-600 font-medium hover:underline">
              Export Data →
            </a>
          </div>

          <div className="railway-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <FaUsers className="text-xl text-purple-600" />
              </div>
              <h4 className="font-bold">Manage Users</h4>
            </div>
            <p className="text-gray-600 mb-4">
              Manage college authorities and admin users
            </p>
            <a href="#" className="text-purple-600 font-medium hover:underline">
              User Management →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard