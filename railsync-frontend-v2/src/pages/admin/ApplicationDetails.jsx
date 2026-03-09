// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
// import { FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

// const ApplicationDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);

//   const [application, setApplication] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [concession, setConcession] = useState(null);
//   const [loadingConcession, setLoadingConcession] = useState(true);

//   /* ================= FETCH APPLICATION ================= */
//   useEffect(() => {
//     const fetchApplication = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5000/api/admin/applications/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setApplication(data);
//         const docsRes = await axios.get(
//   `http://localhost:5000/api/documents/application/${id}`,
//   { headers: { Authorization: `Bearer ${token}` } }
// );
// // 
// try {
//   const res = await axios.get(
//     `http://localhost:5000/api/admin/concession/${id}`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   setConcession(res.data);
// } catch (err) {
//   setConcession(null);
// } finally {
//   setLoadingConcession(false);
// }


// setDocuments(docsRes.data);

//       } catch (err) {
//         toast.error("Application not found");
//         navigate("/admin/applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplication();
//   }, [id, token, navigate]);

//   /* ================= APPROVE / REJECT ================= */
//   const updateStatus = async (status) => {
//   try {
//     setActionLoading(true);

//     const { data } = await axios.put(
//       `http://localhost:5000/api/admin/${status}/${id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setApplication(data); // instant UI update
//     toast.success(`Application ${status}`);
//   } catch (err) {
//     toast.error("Action failed");
//   } finally {
//     setActionLoading(false);
//   }
// };

// const renderDocument = (type, label) => {
//   const doc = documents.find((d) => d.documentType === type);

//   if (!doc) return <p className="text-gray-400">Not uploaded</p>;

//   const isImage = doc.mimeType?.startsWith("image");

//   return (
//     <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
//       <p className="font-semibold mb-2">{label}</p>

//       {isImage ? (
//         <img
//           src={doc.fileUrl}
//           alt={label}
//           className="rounded-lg border shadow-md max-h-72 object-contain w-full bg-white"
//         />
//       ) : (
//         <a
//           href={doc.fileUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           View Document
//         </a>
//       )}
//     </div>
//   );
// };


//   if (loading) return <div className="p-10 text-center">Loading...</div>;
//   if (!application) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
//         >
//           <FaArrowLeft /> Back
//         </button>

//         <h1 className="text-2xl font-bold mb-6">Application Verification</h1>

//         {/* STUDENT INFO */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold mb-3">Student Details</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <p><strong>Name:</strong> {application.student?.name}</p>
//             <p><strong>Email:</strong> {application.student?.email}</p>
//             <p><strong>College:</strong> {application.college}</p>
//             <p><strong>Course:</strong> {application.course}</p>
//             <p><strong>Year:</strong> {application.year}</p>
//             <p><strong>Student ID:</strong> {application.student?.studentId}</p>
//             <p><strong>Phone:</strong> {application.student?.phone}</p>
//             <p><strong>Applied On:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
//             <p><strong>Application ID:</strong> {application._id}</p>
//             <p><strong>Address:</strong> {application.student?.address}</p>
            
//           </div>
//         </div>

//         {/* TRAVEL INFO */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold mb-3">Travel Details</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <p><strong>From:</strong> {application.fromStation}</p>
//             <p><strong>To:</strong> {application.toStation}</p>
//             <p><strong>Class:</strong> {application.travelClass}</p>
//             <p><strong>Duration:</strong> {application.duration}</p>
//             <p><strong>Concession:</strong> {application.concessionType}</p>
//             <p><strong>Status:</strong> {application.status}</p>
//           </div>
//         </div>
//         {/* DOCUMENTS */}
// <div className="mb-10">
//   <h2 className="text-lg font-semibold mb-4">Uploaded Documents</h2>

//   <div className="grid md:grid-cols-2 gap-6">

//    {renderDocument("id_card", "ID Card")}
// {renderDocument("address_proof", "Address Proof")}
// {renderDocument("previous_pass", "Previous Pass")}

//   </div>
// </div>


//         {/* ACTIONS */}
//         {application.status === "pending" && (
//           <div className="flex gap-4 justify-center mt-10">
//             <button
//               disabled={actionLoading}
//               onClick={() => updateStatus("approve")}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2"
//             >
//               <FaCheck /> Approve
//             </button>

//             <button
//               disabled={actionLoading}
//               onClick={() => updateStatus("reject")}
//               className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2"
//             >
//               <FaTimes /> Reject
//             </button>
//              {application.status !== "pending" && (
//   <div className="text-center mt-8">
//     <button
//       onClick={() => navigate("/admin/applications")}
//       className="px-5 py-2 bg-blue-600 text-white rounded-lg"
//     >
//       Back to Applications
//     </button>
//   </div>
// )}

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ApplicationDetails;

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
  const [documents, setDocuments] = useState([]);
  const [concession, setConcession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);

        // 1️⃣ Application
        const appRes = await axios.get(
          `http://localhost:5000/api/admin/applications/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setApplication(appRes.data);

        // 2️⃣ Documents
        const docsRes = await axios.get(
          `http://localhost:5000/api/documents/application/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDocuments(docsRes.data);

        // 3️⃣ Concession (only if approved)
        if (appRes.data.status === "approved") {
          try {
            const consRes = await axios.get(
              `http://localhost:5000/api/admin/concession/${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setConcession(consRes.data);
          } catch {
            setConcession(null);
          }
        }
      } catch (err) {
        toast.error("Application not found");
        navigate("/admin/applications");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchApplication();
  }, [id, token, navigate]);

  /* ================= APPROVE / REJECT ================= */
  const updateStatus = async (status) => {
  try {
    setActionLoading(true);

    const body =
      status === "reject"
        ? { reason: rejectReason }
        : {};

    const { data } = await axios.put(
      `http://localhost:5000/api/admin/${status}/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setApplication(data);

    toast.success(`Application ${status}ed`);

    setShowRejectModal(false);
    setRejectReason("");

  } catch (err) {
    toast.error("Action failed");
  } finally {
    setActionLoading(false);
  }
};

  /* ================= DOCUMENT RENDER ================= */
  const renderDocument = (type, label) => {
    const doc = documents.find((d) => d.documentType === type);

    if (!doc) return <p className="text-gray-400">Not uploaded</p>;

    const isImage = doc.mimeType?.startsWith("image");

    return (
      <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
        <p className="font-semibold mb-2">{label}</p>

        {isImage ? (
          <img
            src={doc.fileUrl}
            alt={label}
            className="rounded-lg border shadow-md max-h-72 object-contain w-full bg-white"
          />
        ) : (
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            View Document
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
            <p><strong>Student ID:</strong> {application.student?.studentId}</p>
            <p><strong>Phone:</strong> {application.student?.phone}</p>
            <p><strong>Applied On:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
            <p><strong>Application ID:</strong> {application._id}</p>
            <p><strong>Address:</strong> {application.student?.address}</p>
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

        {/* DOCUMENTS */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Uploaded Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderDocument("id_card", "ID Card")}
            {renderDocument("address_proof", "Address Proof")}
            {renderDocument("previous_pass", "Previous Pass")}
          </div>
        </div>
        {/* GENERATED CONCESSION FORM */}
{concession && (
  <div className="mb-10 border-2 border-green-500 rounded-xl p-6 bg-green-50">
    <h2 className="text-xl font-bold text-green-700 mb-4">
      Generated Railway Concession Form
    </h2>

    <div className="grid grid-cols-2 gap-4 text-sm">
      <p><b>Name:</b> {concession.name}</p>
      <p><b>Student ID:</b> {concession.studentId}</p>
      <p><b>College:</b> {concession.college}</p>
      <p><b>Course:</b> {concession.course}</p>
      <p><b>Year:</b> {concession.year}</p>
      <p><b>Phone:</b> {concession.phone}</p>
      <p><b>From:</b> {concession.fromStation}</p>
      <p><b>To:</b> {concession.toStation}</p>
      <p><b>Class:</b> {concession.travelClass}</p>
      <p><b>Duration:</b> {concession.duration}</p>
      <p><b>Type:</b> {concession.concessionType}</p>
      <p className="col-span-2"><b>Address:</b> {concession.address}</p>
    </div>
  </div>
)}


        {/* ACTION BUTTONS */}
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
  onClick={() => setShowRejectModal(true)}
  className="px-6 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2"
>
  <FaTimes /> Reject
</button>
          {showRejectModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-[400px] p-6">

      <h2 className="text-xl font-bold mb-4 text-red-600">
        Reject Application
      </h2>

      <p className="text-sm text-gray-600 mb-3">
        Please enter reason for rejection
      </p>

      <textarea
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        rows="4"
        className="w-full border rounded-lg p-3 mb-4"
        placeholder="Example: ID card not visible or documents missing"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowRejectModal(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Cancel
        </button>

        <button
          disabled={!rejectReason || actionLoading}
          onClick={() => updateStatus("reject")}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Reject Application
        </button>

      </div>

    </div>
  </div>
)}

          </div>
        )}

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
    </div>
  );
};

export default ApplicationDetails;
