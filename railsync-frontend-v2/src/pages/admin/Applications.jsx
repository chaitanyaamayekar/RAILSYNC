import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaCheck,
  FaTimes,
} from 'react-icons/fa'

const Applications = () => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  // Mock data
  const applications = [
    {
      id: 'RSC202400123',
      student: 'Rajesh Kumar',
      college: 'Mumbai University',
      from: 'Churchgate',
      to: 'Virar',
      submitted: '2024-01-15',
      status: 'pending',
      year: 'Third Year',
    },
    {
      id: 'RSC202400122',
      student: 'Priya Sharma',
      college: 'SNDT University',
      from: 'Andheri',
      to: 'Churchgate',
      submitted: '2024-01-14',
      status: 'approved',
      year: 'Second Year',
    },
    {
      id: 'RSC202400121',
      student: 'Amit Patel',
      college: 'MUICT',
      from: 'Bandra',
      to: 'Borivali',
      submitted: '2024-01-14',
      status: 'rejected',
      year: 'Fourth Year',
    },
    {
      id: 'RSC202400120',
      student: 'Sneha Desai',
      college: 'Wilson College',
      from: 'Dadar',
      to: 'Vasai Road',
      submitted: '2024-01-13',
      status: 'approved',
      year: 'First Year',
    },
    {
      id: 'RSC202400119',
      student: 'Rahul Verma',
      college: 'Jai Hind College',
      from: 'Goregaon',
      to: 'CST',
      submitted: '2024-01-13',
      status: 'pending',
      year: 'Third Year',
    },
    {
      id: 'RSC202400118',
      student: 'Neha Gupta',
      college: 'St. Xavier\'s College',
      from: 'Malad',
      to: 'Churchgate',
      submitted: '2024-01-12',
      status: 'pending',
      year: 'Second Year',
    },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch =
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.student.toLowerCase().includes(search.toLowerCase()) ||
      app.college.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

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

  const handleApprove = (id) => {
    alert(`Application ${id} approved`)
  }

  const handleReject = (id) => {
    alert(`Application ${id} rejected`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-railway-dark mb-2">
            Application Management
          </h1>
          <p className="text-gray-600">
            Review and manage student concession applications
          </p>
        </div>

        {/* Filters and Search */}
        <div className="railway-card mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Applications
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, name, or college..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="railway-input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <div className="flex space-x-2">
                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg transition ${
                      filter === status
                        ? 'bg-railway-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
            <button className="flex items-center space-x-2 railway-btn-secondary">
              <FaDownload />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="railway-card">
          <div className="overflow-x-auto">
            <table className="railway-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Student Details</th>
                  <th>College</th>
                  <th>Route</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="font-mono font-medium">{app.id}</td>
                    <td>
                      <div className="font-medium">{app.student}</div>
                      <div className="text-sm text-gray-600">{app.year}</div>
                    </td>
                    <td>{app.college}</td>
                    <td>
                      <div className="font-medium">{app.from} → {app.to}</div>
                    </td>
                    <td>{app.submitted}</td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/applications/${app.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <FaFilter className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No applications found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="railway-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-railway-blue mb-2">
                {applications.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </div>
          <div className="railway-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {applications.filter(a => a.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </div>
          <div className="railway-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {applications.filter(a => a.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Applications