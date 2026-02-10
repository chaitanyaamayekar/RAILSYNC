import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  /* ================= FETCH APPLICATION ================= */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/admin/applications/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplication(data);
      } catch (err) {
        toast.error("Application not found");
        navigate("/admin/applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, token, navigate]);

  /* ================= APPROVE / REJECT ================= */
  const updateStatus = async (status) => {
  try {
    setActionLoading(true);

    const { data } = await axios.put(
      `http://localhost:5000/api/admin/${status}/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setApplication(data); // instant UI update
    toast.success(`Application ${status}`);
  } catch (err) {
    toast.error("Action failed");
  } finally {
    setActionLoading(false);
  }
};
const renderDocument = (url, label) => {
if (!url) return null;


const isImage = url.match(/\.(jpg|jpeg|png|webp)$/i);


return (
<div className="border rounded-xl p-4 shadow-sm bg-gray-50">
<p className="font-semibold mb-2">{label}</p>
{isImage ? (
<img src={url} alt={label} className="rounded-lg max-h-80 border" />
) : (
<a
href={url}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 underline"
>
Open Document
</a>
)}
</div>
);
};

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!application) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-2xl font-bold mb-6">Application Verification</h1>

        {/* STUDENT INFO */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Student Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {application.student?.name}</p>
            <p><strong>Email:</strong> {application.student?.email}</p>
            <p><strong>College:</strong> {application.college}</p>
            <p><strong>Course:</strong> {application.course}</p>
            <p><strong>Year:</strong> {application.year}</p>
          </div>
        </div>

        {/* TRAVEL INFO */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Travel Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>From:</strong> {application.fromStation}</p>
            <p><strong>To:</strong> {application.toStation}</p>
            <p><strong>Class:</strong> {application.travelClass}</p>
            <p><strong>Duration:</strong> {application.duration}</p>
            <p><strong>Concession:</strong> {application.concessionType}</p>
            <p><strong>Status:</strong> {application.status}</p>
          </div>
        </div>

        {/* ACTIONS */}
        {application.status === "pending" && (
          <div className="flex gap-4 justify-center mt-10">
            <button
              disabled={actionLoading}
              onClick={() => updateStatus("approve")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2"
            >
              <FaCheck /> Approve
            </button>

            <button
              disabled={actionLoading}
              onClick={() => updateStatus("reject")}
              className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2"
            >
              <FaTimes /> Reject
            </button>
             {application.status !== "pending" && (
  <div className="text-center mt-8">
    <button
      onClick={() => navigate("/admin/applications")}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg"
    >
      Back to Applications
    </button>
  </div>
)}

          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationDetails;

