import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../store/authSlice";
import {
  Train,
  Clock,
  FileText,
  CheckCircle,
  Download,
  GraduationCap,
  Mail,
  Phone,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 },
  }),
};

const StudentDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [concession, setConcession] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH APPLICATION ================= */
  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch application
      const appRes = await axios.get(
        "http://localhost:5000/api/applications/my",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplication(appRes.data);
      console.log("APPLICATION DATA:", appRes.data);
      console.log("DOCUMENTS:", appRes.data.documents);
      //console.log(key, doc);

      // Fetch concession (only if approved)
      try {
        const passRes = await axios.get(
          "http://localhost:5000/api/concession/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConcession(passRes.data);
      } catch {
        setConcession(null);
      }

    } catch {
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/student/login");
  };

  const hasApplication = !!application;

  /* ================= PROGRESS TRACKER ================= */
  const steps = ["submitted", "under_review", "approved"];
  const statusMap = {
    pending: "submitted",
    submitted: "submitted",
    under_review: "under_review",
    approved: "approved",
  };

  const rawStatus = application?.status?.toLowerCase()?.trim();
  const normalizedStatus = statusMap[rawStatus] || "submitted";

  const completedSteps =
    steps.indexOf(normalizedStatus) >= 0
      ? steps.indexOf(normalizedStatus) + 1
      : 0;

  const progress = (completedSteps / steps.length) * 100;
  //const isApproved = normalizedStatus === "approved";
  
  
  /* ================= DOWNLOAD HANDLER ================= */
  const handleDownload = async () => {
  if (!concession?._id) return;

  try {
    const response = await fetch(
      `http://localhost:5000/api/concession/download/${concession._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Railway_Concession_${concession.passNumber}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Download error:", err);
    alert("Failed to download pass");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Train className="h-6 w-6" />
            <h1 className="font-bold text-lg">RailSync</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-white/70 capitalize">
                {application?.status || "No Application"}
              </p>
            </div>

            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)}
            </div>

            <button
              onClick={handleLogout}
              className="text-xs bg-red-500 px-3 py-1.5 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ================= FIRST TIME APPLY ================= */}
        {!hasApplication && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FileText className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No Application Found
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              You haven’t applied for railway concession yet.
            </p>

            <button
              onClick={() => navigate("/student/apply")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Apply for Concession
            </button>
          </div>
        )}

        {/* ================= DASHBOARD CONTENT ================= */}
        {hasApplication && (
          <>
            {/* QUICK STATS */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {[
                { icon: Clock, label: "Status", value: application?.status },
                {
                  icon: Calendar,
                  label: "Submitted",
                  value: application?.createdAt
                    ? new Date(application.createdAt).toLocaleDateString()
                    : "-",
                },
                {
                  icon: Train,
                  label: "Route",
                  value: `${application?.fromStation} → ${application?.toStation}`,
                },
                {
                  icon: FileText,
                  label: "Documents",
                  value: "3", 
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white p-4 rounded-xl shadow-sm"
                >
                  
                  <div className="flex items-center gap-3">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-sm font-semibold text-gray-800 truncate capitalize">
                        {stat.value || "-"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-6">
                {/* PROGRESS TRACKER */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Application Progress
                  </h3>

                  <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="space-y-4">
                    {steps.map((step, index) => {
                      const done = index < completedSteps;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              done
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {done ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          <p className="text-sm capitalize">{step.replace("_", " ")}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                 {/* ================= DOCUMENTS CARD ================= */}
<div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="font-semibold mb-4 flex items-center gap-2">
    <FileText className="h-4 w-4 text-blue-600" />
    Uploaded Documents
  </h3>

  {application?.documents ? (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 mt-3 w-full">
  <h3 className="text-base font-semibold text-gray-800 mb-3">
    Documents Uploaded
  </h3>

  <div className="space-y-2">
    <div className="flex items-center justify-between bg-green-50 px-4 py-2 rounded-md">
      <span className="text-sm font-medium text-gray-700">
        Previous Pass
      </span>
      <span className="text-green-600 text-sm font-semibold">
        ✔ Uploaded
      </span>
    </div>

    <div className="flex items-center justify-between bg-green-50 px-4 py-2 rounded-md">
      <span className="text-sm font-medium text-gray-700">
        ID Card
      </span>
      <span className="text-green-600 text-sm font-semibold">
        ✔ Uploaded
      </span>
    </div>

    <div className="flex items-center justify-between bg-green-50 px-4 py-2 rounded-md">
      <span className="text-sm font-medium text-gray-700">
        Address Proof
      </span>
      <span className="text-green-600 text-sm font-semibold">
        ✔ Uploaded
      </span>
    </div>
  </div>
</div>
  
) : (
  <div className="text-sm text-gray-500">
    No documents uploaded.
  </div>
)}
</div>

              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-6">
                {/* PROFILE CARD */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 text-center">
                    <div className="h-16 w-16 bg-white/20 rounded-xl mx-auto flex items-center justify-center text-lg font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                    <p className="mt-2 font-semibold">{user?.name}</p>
                  </div>

                  <div className="p-6 space-y-3 text-sm">
                    <div className="flex gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span>
                        {application?.course} - Year : {application?.year}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{user?.email}</span>
                    </div>

                    <div className="flex gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{user?.phone}</span>
                    </div>
                  </div>
                </div>
                {/* MINI STATUS CARD */}
<div className="bg-white rounded-xl shadow-sm p-3 text-xs space-y-2">
  <div className="flex justify-between">
    <span className="text-gray-500">App ID</span>
    <span className="font-medium text-gray-800">
      {application?._id?.slice(-6).toUpperCase()}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-gray-500">Last Update</span>
    <span className="font-medium text-gray-800">
      {application?.updatedAt
        ? new Date(application.updatedAt).toLocaleDateString()
        : "-"}
    </span>
  </div>

  {/* Small Divider */}
  <div className="border-t border-gray-100 pt-2 text-gray-500 leading-relaxed">
    Need help? Contact your college admin office.
  </div>
</div>

                {/* DOWNLOAD CARD */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="h-4 w-4 text-blue-600" />
                    Concession Pass
                 </h3>
                  {concession ? (
                   <button
                   onClick={handleDownload}
                   className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                   >
                    Download Official Railway Concession Pass
                   </button>
                  ) : (
                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                   Available after approval
                  </div>
                   )}
                 </div>
              </div>
              
              
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;