// 

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { logout } from "../../store/authSlice";

// import {
//   Train,
//   Clock,
//   FileText,
//   CheckCircle,
//   Download,
//   GraduationCap,
//   Mail,
//   Phone,
//   AlertCircle,
//   Calendar,
// } from "lucide-react";

// import { motion } from "framer-motion";

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.07 },
//   }),
// };

// const StudentDashboard = () => {
//   const { user, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [concession, setConcession] = useState(null);
//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [regenerating, setRegenerating] = useState(false);

//   /* ================= FETCH DATA ================= */

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const appRes = await axios.get(
//           "http://localhost:5000/api/applications/my",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setApplication(appRes.data);

//         try {
//           const passRes = await axios.get(
//             "http://localhost:5000/api/concession/my",
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           setConcession(passRes.data);
//         } catch {
//           setConcession(null);
//         }
//       } catch {
//         setApplication(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/student/login");
//   };

//   const hasApplication = !!application;

//   /* ================= PROGRESS ================= */

//   const steps = ["submitted", "under_review", "approved"];

//   const statusMap = {
//     pending: "submitted",
//     submitted: "submitted",
//     under_review: "under_review",
//     approved: "approved",
//   };

//   const rawStatus = application?.status?.toLowerCase()?.trim();
//   const normalizedStatus = statusMap[rawStatus] || "submitted";

//   const completedSteps =
//     steps.indexOf(normalizedStatus) >= 0
//       ? steps.indexOf(normalizedStatus) + 1
//       : 0;

//   const progress = (completedSteps / steps.length) * 100;

//   /* ================= FORM VALIDITY ================= */

//   const formGeneratedDate = concession?.createdAt
//     ? new Date(concession.createdAt)
//     : null;

//   const formExpiryDate = formGeneratedDate
//     ? new Date(formGeneratedDate.getTime() + 3 * 24 * 60 * 60 * 1000)
//     : null;

//   const isExpired = formExpiryDate && new Date() > formExpiryDate;

//   const daysRemaining = formExpiryDate
//     ? Math.max(
//         0,
//         Math.ceil((formExpiryDate - new Date()) / (1000 * 60 * 60 * 24))
//       )
//     : null;

//   /* ================= DOWNLOAD ================= */

//   const handleDownload = async () => {
//     if (!concession?._id) return;

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/concession/download/${concession._id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `Railway_Concession_${concession.passNumber}.pdf`;

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       window.URL.revokeObjectURL(url);
//     } catch {
//       alert("Download failed");
//     }
//   };

//   /* ================= REGENERATE ================= */

//   const handleRegenerate = async () => {
//     if (!application?._id) return;

//     try {
//       setRegenerating(true);

//       await axios.post(
//         `http://localhost:5000/api/applications/${application._id}/regenerate`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("New concession form generated");

//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Regeneration failed");
//     } finally {
//       setRegenerating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen bg-slate-50 overflow-hidden flex flex-col">

//       {/* HEADER */}

//       <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white sticky top-0 z-20">
//         <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <Train className="h-6 w-6" />
//             <h1 className="font-bold text-lg">RailSync</h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-medium">{user?.name}</p>
//               <p className="text-xs text-white/70 capitalize">
//                 {application?.status || "No Application"}
//               </p>
//             </div>

//             <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-semibold">
//               {user?.name?.charAt(0)}
//             </div>

//             <button
//               onClick={handleLogout}
//               className="text-xs bg-red-500 px-3 py-1.5 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

      
//       <main className="flex-1 max-w-7xl mx-auto px-6 py-4 space-y-4 overflow-hidden">
//         {/* WELCOME BANNER */}

//         <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-sm p-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold">
//               Welcome back, {user?.name}
//             </h2>
//             <p className="text-sm text-blue-100 mt-1">
//               Track your railway concession application and download your pass.
//             </p>
//           </div>

//           <Train className="h-10 w-10 opacity-80 hidden sm:block" />
//         </div>

//         {!hasApplication && (
//           <div className="bg-white rounded-xl shadow-sm p-8 text-center">
//             <FileText className="h-10 w-10 text-blue-600 mx-auto mb-4" />

//             <h2 className="text-lg font-semibold text-gray-800 mb-2">
//               No Application Found
//             </h2>

//             <p className="text-sm text-gray-500 mb-6">
//               You haven’t applied for railway concession yet.
//             </p>

//             <button
//               onClick={() => navigate("/student/apply")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//             >
//               Apply for Concession
//             </button>
//           </div>
//         )}

//         {hasApplication && (
//           <>
//             {/* STATS */}

//             <motion.div
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//               initial="hidden"
//               animate="visible"
//             >
//               {[
//                 { icon: Clock, label: "Status", value: application?.status },

//                 {
//                   icon: Calendar,
//                   label: "Submitted",
//                   value: new Date(
//                     application?.createdAt
//                   ).toLocaleDateString(),
//                 },

//                 {
//                   icon: Train,
//                   label: "Route",
//                   value: `${application?.fromStation} → ${application?.toStation}`,
//                 },

//                 {
//                   icon: FileText,
//                   label: "Documents",
//                   value: Object.keys(application?.documents || {}).length,
//                 },
//               ].map((stat, i) => (
//                 <motion.div
//                   key={i}
//                   variants={fadeUp}
//                   custom={i}
//                   className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
//                 >
//                   <div className="flex items-center gap-3">
//                     <stat.icon className="h-5 w-5 text-blue-600" />

//                     <div>
//                       <p className="text-xs text-gray-500">{stat.label}</p>

//                       <p className="text-sm font-semibold capitalize">
//                         {stat.value}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CONTENT */}

//              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[55vh]">

//               {/* LEFT */}

//                <div className="lg:col-span-2 space-y-4 ">

//                 {/* PROGRESS */}

//                 <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">

//                   <h3 className="font-semibold mb-4 flex items-center gap-2">
//                     <Clock className="h-4 w-4 text-blue-600" />
//                     Application Progress
//                   </h3>

//                   <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
//                     <div
//                       className="bg-blue-600 h-2 rounded-full"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>

//                   <div className="space-y-4">
//                     {steps.map((step, index) => {
//                       const done = index < completedSteps;

//                       return (
//                         <div
//                           key={index}
//                           className="flex items-center gap-3"
//                         >
//                           <div
//                             className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
//                               done
//                                 ? "bg-green-500 text-white"
//                                 : "bg-gray-200 text-gray-600"
//                             }`}
//                           >
//                             {done ? (
//                               <CheckCircle className="h-4 w-4" />
//                             ) : (
//                               index + 1
//                             )}
//                           </div>

//                           <p className="text-sm capitalize">
//                             {step.replace("_", " ")}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">

//                   <h3 className="font-semibold mb-3 flex items-center gap-2">
//                     <Download className="h-4 w-4 text-blue-600" />
//                     Concession Form
//                   </h3>

//                   {concession ? (
//                     <div className="space-y-3">

//                       {application?.regenerationCount !== undefined && (
//                         <div className="text-xs bg-blue-50 border border-blue-200 text-blue-700 p-2 rounded-md">
//                           Regenerations used: {application.regenerationCount} / 2
//                         </div>
//                       )}

//                       {formExpiryDate && (
//                         <div
//                           className={`text-xs p-3 rounded-lg ${
//                             isExpired
//                               ? "bg-red-50 border border-red-200 text-red-700"
//                               : "bg-green-50 border border-green-200 text-green-700"
//                           }`}
//                         >
//                           {isExpired
//                             ? "Form expired. Generate a new one before visiting the railway counter."
//                             : `Valid for ${daysRemaining} day(s). Submit at railway counter.`}
//                         </div>
//                       )}

//                       <button
//                         onClick={handleDownload}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
//                       >
//                         Download Concession Form
//                       </button>

//                       <p className="text-[11px] text-gray-400 text-center">
//                         Generated on{" "}
//                         {formGeneratedDate?.toLocaleDateString()}
//                       </p>

//                       {isExpired && (
//                         <button
//                           onClick={handleRegenerate}
//                           disabled={regenerating}
//                           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
//                         >
//                           {regenerating
//                             ? "Generating..."
//                             : "Regenerate Form"}
//                         </button>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs p-3 rounded-lg">
//                       <AlertCircle className="h-4 w-4" />
//                       Available after approval
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* RIGHT */}

//               <div className="space-y-4">

//                 {/* PROFILE */}

//                 {/* PROFILE CARD */}
// <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//   {/* TOP HEADER */}
//   <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 text-center">
//     <div className="h-16 w-16 bg-white/20 rounded-xl mx-auto flex items-center justify-center text-lg font-bold">
//       {user?.name?.charAt(0)}
//     </div>

//     <p className="mt-2 font-semibold">{user?.name}</p>

//     <p className="text-xs opacity-80">
//       Student ID : {application?.student?.studentId || "N/A"}
//     </p>
//   </div>

//   {/* PROFILE DETAILS */}
//   <div className="p-6 space-y-3 text-sm">
//     <div className="flex justify-between text-sm border-b pb-1">
//   <span className="text-gray-500">College</span>
//   <span className="font-medium text-gray-800">
//     {application?.student?.college || "N/A"}
//   </span>
// </div>

//     <div className="flex items-center gap-2">
//       <GraduationCap className="h-4 w-4 text-gray-500" />
//       <span>
//         {application?.course} — Year {application?.year}
//       </span>
//     </div>

    
//     <div className="flex items-center gap-2">
//       <Mail className="h-4 w-4 text-gray-500" />
//       <span>{user?.email}</span>
//     </div>

//     <div className="flex items-center gap-2">
//       <Phone className="h-4 w-4 text-gray-500" />
//       <span>{user?.phone}</span>
//     </div>

//     <div className="flex items-start gap-2">
//       <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
//       <span className="leading-snug">
//        {application?.student?.address || "Address not available"}
//       </span>
//     </div>

    
//     <div className="flex items-center gap-2">
//       <FileText className="h-4 w-4 text-gray-500" />
//       <span className="capitalize">
//         Pass Type : {application?.duration}
//       </span>
//     </div>

    

//   </div>
// </div>
//   <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm shadow-sm">

//   <div className="font-semibold text-yellow-800 mb-1">
//     Need Help?
//   </div>

//   <p className="text-gray-600 mb-3">
//     If you are facing any issue with your concession application,
//     please contact the college admin office or send a request below.
//   </p>

//   <div className="flex gap-2">

//     <button
//       onClick={() => navigate("/student/support")}
//       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs"
//     >
//       Send Request
//     </button>

//     <span className="text-gray-500 text-xs self-center">
//       Admin Office: Room 204
//     </span>

//   </div>

// </div>

                

                
//               </div>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../store/authSlice";

import {
  FaTrain,
  FaDownload,
  FaRedo,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUniversity,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const StudentDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [concession, setConcession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appRes = await axios.get(
          "http://localhost:5000/api/applications/my",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setApplication(appRes.data);

        try {
          const passRes = await axios.get(
            "http://localhost:5000/api/concession/my",
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setConcession(passRes.data);
        } catch {
          setConcession(null);
        }
      } catch (err) {
        console.log(err);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    dispatch(logout());
    navigate("/student/login");
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = async () => {
    if (!concession?._id) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/concession/download/${concession._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Railway_Concession_${concession.passNumber}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Download failed");
    }
  };

  /* ================= REGENERATE ================= */

  const regenerateForm = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/applications/${application._id}/regenerate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("New concession form generated");

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Regeneration failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-64 bg-white shadow-lg flex flex-col">

        <div className="p-6 text-xl font-bold text-blue-600">
          RailSync
        </div>

        <div className="flex flex-col gap-3 px-6">

          <button
            onClick={() => navigate("/student/dashboard")}
            className="text-left p-3 rounded-lg hover:bg-gray-100"
          >
            Dashboard
          </button>

          <button
  onClick={() => {
    if (!application) {
  navigate("/student/apply");
  return;
}

if (application.status === "rejected") {
  navigate("/student/apply"); // allow re-apply
  return;
}

if (concession) {
  const created = new Date(concession.createdAt);
  const expiry = new Date(created.getTime() + 3 * 24 * 60 * 60 * 1000);
  if (new Date() > expiry) {
    navigate("/student/apply");
  } else {
    setStatusMessage(
      `You already have an active concession pass. You can apply again after ${expiry.toLocaleDateString()}.`
    );
  }
} else if (application.status === "pending") {
  setStatusMessage("Your application is currently under review.");
}
  }}
  className="text-left p-3 rounded-lg hover:bg-gray-100"
>
  My Application
</button>

          <button
            onClick={handleLogout}
            className="text-left p-3 rounded-lg hover:bg-gray-100 text-red-500"
          >
            Logout
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}

        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

          <h1 className="text-xl font-semibold">
            Welcome, {user?.name}
          </h1>

          <div className="text-gray-500 text-sm">
            Student Dashboard
          </div>

        </div>

        {statusMessage && (
        <div className="mx-6 mt-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex justify-between items-center">

        <span className="text-sm">{statusMessage}</span>

        <button
          onClick={() => setStatusMessage(null)}
          className="text-blue-600 text-sm font-semibold"
         >
         Close
        </button>

        </div>
       )}

        {/* CONTENT */}

        <div className="p-6 grid grid-rows-[auto_1fr_auto] gap-6 h-full">

          {/* STATS */}

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <FaTrain className="text-blue-500 text-xl"/>
              <div>
                <div className="text-sm text-gray-500">Applications</div>
                <div className="font-bold text-lg">
                  {application ? "1" : "0"}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <FaCheckCircle className="text-green-500 text-xl"/>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-bold capitalize">
                  {application?.status || "N/A"}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
              <FaClock className="text-orange-500 text-xl"/>
              <div>
                <div className="text-sm text-gray-500">Submitted</div>
                <div className="font-bold">
                  {application?.createdAt
                    ? new Date(application.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>

          </div>

          {/* CENTER CARD */}

          <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center text-center p-6">

            <FaTrain className="text-4xl text-blue-500 mb-4"/>

            <h2 className="text-xl font-bold mb-2">
              Railway Concession Pass
            </h2>

            <p className="text-gray-500 mb-6">
              Download your concession form and submit it at the railway counter.
            </p>

            {concession && application?.status === "approved" && (
  <>
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
    >
      <FaDownload />
      Download Concession Form
    </button>

    {/* Regenerate button shown only if allowed */}
    {application.regenerateCount < 1 &&
     new Date() - new Date(application.formGeneratedAt) >= 3*24*60*60*1000 && (
      <button
        onClick={regenerateForm}
        className="mt-4 text-blue-600 flex items-center gap-2"
      >
        <FaRedo />
        Regenerate Form
      </button>
    )}

    {application.regenerateCount >= 1 && (
      <p className="mt-4 text-gray-500 text-sm">
        You have already regenerated your form.
      </p>
    )}
  </>
)}

            {application?.status === "pending" && (
              <p className="text-orange-500 font-medium">
                Your application is under review.
              </p>
            )}

            {application?.status === "rejected" && (
             <div className="text-red-500 font-medium space-y-2">
              <p>Your application was rejected. Please apply again.</p>
             {application?.rejectionReason && (
              <p className="text-red-400 text-sm">
             Reason: {application.rejectionReason}
              </p>
             )}
             </div>
            )}

            {!application && (
              <button
                onClick={() => navigate("/student/apply")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Apply for Concession
              </button>
            )}

          </div>

          {/* BOTTOM SECTION */}

          <div className="grid grid-cols-2 gap-6">

            {/* PROFILE */}

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="font-bold mb-4">Student Profile</h3>

              <div className="space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <FaUser />
                  {user?.name}
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope />
                  {user?.email}
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone />
                  {user?.phone || "N/A"}
                </div>

                <div className="flex items-center gap-3">
                  <FaUniversity />
                  {application?.college || "N/A"}
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt />
                  {application?.student?.address || "N/A"}
                </div>

                <div>
                  Course: {application?.course || "N/A"}
                </div>

                <div>
                  Year: {application?.year || "N/A"}
                </div>

              </div>

            </div>

            {/* HELP */}

            <div className="bg-white rounded-xl shadow p-6">

              <h3 className="font-bold mb-4">
                Need Help?
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                If you face any issue with your concession form,
                please contact the admin office.
              </p>

              <div className="text-sm text-gray-700">

                📞 Admin Office: 022-12345678

                <br />

                📧 Email: admin@railsync.com

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;