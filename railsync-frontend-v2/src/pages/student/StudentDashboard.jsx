import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../services/api";
import {
  FaTrain,
  FaFileAlt,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplication, setHasApplication] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await API.get("/application/my");
        setApplication(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setHasApplication(false);
        } else {
          console.error("Dashboard error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

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
                <p className="text-gray-600">
                  Welcome back, {user?.name}
                </p>
              </div>
            </div>

            {hasApplication && application && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Application ID</div>
                <div className="font-mono font-bold text-railway-blue">
                  {application._id}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* No application yet */}
        {!hasApplication && (
          <div className="railway-card text-center">
            <h2 className="text-xl font-bold mb-4">
              You haven’t applied yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start your railway concession application now.
            </p>
            <Link
              to="/student/apply"
              className="railway-btn-primary inline-block"
            >
              Apply for Concession
            </Link>
          </div>
        )}

        {/* Application exists */}
        {hasApplication && application && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="railway-card">
                <div className="flex items-center">
                  <FaFileAlt className="text-2xl text-railway-blue mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-xl font-bold">
                      {application.status === "approved"
                        ? "Approved"
                        : application.status === "rejected"
                        ? "Rejected"
                        : "Under Review"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="railway-card">
                <div className="flex items-center">
                  <FaUserGraduate className="text-2xl text-green-600 mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Student</p>
                    <p className="text-lg font-semibold">
                      {user?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="railway-card">
                <div className="flex items-center">
                  <FaClock className="text-2xl text-purple-600 mr-4" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted On</p>
                    <p className="text-lg font-semibold">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="railway-card">
                <h3 className="text-xl font-bold mb-4">
                  Application Status
                </h3>
                <p className="text-gray-600 mb-6">
                  Track your application progress
                </p>
                <Link
                  to={`/student/status/${application._id}`}
                  className="railway-btn-secondary w-full text-center"
                >
                  View Status
                </Link>
              </div>

              <div className="railway-card">
                <h3 className="text-xl font-bold mb-4">
                  Documents
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload and manage your documents
                </p>
                <Link
                  to={`/student/upload-documents/${application._id}`}
                  className="railway-btn-primary w-full text-center"
                >
                  Manage Documents
                </Link>

                {/* Re-upload CTA if rejected */}
                {application.status === "rejected" && (
                  <p className="text-sm text-red-600 mt-4 text-center">
                    Your application was rejected. Please re-upload
                    corrected documents.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
