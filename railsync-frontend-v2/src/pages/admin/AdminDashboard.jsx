// export default AdminDashboard
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaTrain,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { token } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(data.stats || stats);
        setRecentApplications(data.recentApplications || []);
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error("Admin dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  const statusBadge = {
    pending: "badge-pending",
    approved: "badge-approved",
    rejected: "badge-rejected",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <FaTrain className="text-3xl text-railway-dark" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">
                Railway Concession Management
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">Railway Department</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={stats.total}
            icon={<FaFileAlt />}
            text="text-blue-600"
            bg="bg-blue-100"
          />
          <StatCard
            title="Pending Review"
            value={stats.pending}
            icon={<FaClock />}
            text="text-yellow-600"
            bg="bg-yellow-100"
          />
          <StatCard
            title="Approved"
            value={stats.approved}
            icon={<FaCheckCircle />}
            text="text-green-600"
            bg="bg-green-100"
          />
          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={<FaTimesCircle />}
            text="text-red-600"
            bg="bg-red-100"
          />
        </div>

        {/* ALERTS */}
        {alerts.length > 0 && (
          <div className="railway-card mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FaBell className="text-railway-blue" />
              <h3 className="font-bold text-lg">System Alerts</h3>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-yellow-50 border border-yellow-200"
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECENT APPLICATIONS */}
        <div className="railway-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Recent Applications</h3>
              <p className="text-gray-600">Latest submissions</p>
            </div>
            <Link to="/admin/applications" className="railway-btn-primary">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="railway-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>College</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app._id}>
                    <td className="font-mono">
                      {app._id.slice(-6).toUpperCase()}
                    </td>
                    <td>{app.student?.name || app.studentName}</td>
                    <td>{app.college}</td>
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
                      <Link
                        to={`/admin/applications/${app._id}`}
                        className="text-railway-blue font-medium hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {recentApplications.length === 0 && (
              <p className="text-center py-6 text-gray-500">
                No applications found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SAFE STAT CARD ================= */
const StatCard = ({ title, value, icon, text, bg }) => (
  <div className="railway-card">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className={`text-3xl font-bold mt-2 ${text}`}>
          {value}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default AdminDashboard;

