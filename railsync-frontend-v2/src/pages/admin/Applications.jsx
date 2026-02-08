// export default Applications
import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa"
import toast from "react-hot-toast"

const Applications = () => {
  const { token } = useSelector((state) => state.auth)

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [actionLoading, setActionLoading] = useState(null)

  /* ================= FETCH APPLICATIONS (REAL DB) ================= */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setApplications(data)
      } catch (error) {
        toast.error("Failed to load applications")
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchApplications()
  }, [token])

  /* ================= FILTER + SEARCH ================= */
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesFilter =
        filter === "all" ||
        app.status?.toLowerCase() === filter.toLowerCase()

      const matchesSearch =
        String(app._id || "").toLowerCase().includes(search.toLowerCase()) ||
        app.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
        app.college?.toLowerCase().includes(search.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [applications, filter, search])

  /* ================= APPROVE / REJECT ================= */
  const updateStatus = async (id, status) => {
    try {
      setActionLoading(id)

      const url =
        status === "approved"
          ? `http://localhost:5000/api/admin/approve/${id}`
          : `http://localhost:5000/api/admin/reject/${id}`

      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? {
                ...app,
                status: status === "approved" ? "Approved" : "Rejected",
              }
            : app
        )
      )

      toast.success(`Application ${status}`)
    } catch (error) {
      toast.error("Action failed")
    } finally {
      setActionLoading(null)
    }
  }

  /* ================= STATUS BADGE ================= */
  const statusBadge = {
    Pending: "badge-pending",
    Approved: "badge-approved",
    Rejected: "badge-rejected",
  }

  if (loading) {
    return <div className="p-10 text-center">Loading applications...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-railway-dark">
            Application Management
          </h1>
          <p className="text-gray-600">
            Review and manage student concession applications
          </p>
        </div>

        {/* FILTERS */}
        <div className="railway-card mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by ID, student or college"
                  className="railway-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Filter by Status
              </label>
              <div className="flex space-x-2">
                {["all", "pending", "approved", "rejected"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-4 py-2 rounded-lg ${
                      filter === s
                        ? "bg-railway-blue text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Showing {filteredApplications.length} of {applications.length}
            </span>
            <button className="railway-btn-secondary flex items-center gap-2">
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="railway-card">
          <div className="overflow-x-auto">
            <table className="railway-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>College</th>
                  <th>Route</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app._id}>
                    <td className="font-mono">{app._id}</td>

                    <td>
                      <div className="font-medium">{app.student?.name}</div>
                      <div className="text-sm text-gray-500">{app.year}</div>
                    </td>

                    <td>{app.college}</td>

                    <td>
                      {app.fromStation} → {app.toStation}
                    </td>

                    <td>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`railway-badge ${statusBadge[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/applications/${app._id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded"
                        >
                          <FaEye />
                        </Link>

                        {app.status === "Pending" && (
                          <>
                            <button
                              disabled={actionLoading === app._id}
                              onClick={() => updateStatus(app._id, "approved")}
                              className="p-2 bg-green-100 text-green-600 rounded"
                            >
                              <FaCheck />
                            </button>
                            <button
                              disabled={actionLoading === app._id}
                              onClick={() => updateStatus(app._id, "rejected")}
                              className="p-2 bg-red-100 text-red-600 rounded"
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

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <FaFilter className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No applications found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Applications
