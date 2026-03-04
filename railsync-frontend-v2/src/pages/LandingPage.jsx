// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../store/authSlice";
// import { FaSignOutAlt } from "react-icons/fa";

// import {
//   FaTrain,
//   FaUserGraduate,
//   FaUserShield,
//   FaArrowRight,
//   FaUserCircle
// } from "react-icons/fa";

// const LandingPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/", { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-railway-blue/5 to-white">
//       {/* TOP BAR */}
//       <div className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <FaTrain className="text-railway-blue text-xl" />
//           <span className="font-bold text-railway-blue text-lg">
//             RAILSYNC
//           </span>
//         </div>

//         {user ? (
//           <div className="flex items-center space-x-3">
//             <FaUserCircle className="text-2xl text-gray-600" />
//             <span className="font-medium text-gray-700">
//               Welcome, <span className="text-railway-blue">{user.name}</span>
//             </span>
//             <button
//   onClick={handleLogout}
//   className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
// >
//   <FaSignOutAlt />
//   <span>Logout</span>
// </button>

//           </div>
          
//         ) : (
//           <div className="space-x-4">
//             <Link
//               to="/student/login"
//               className="text-railway-blue font-medium"
//             >
//               Login
//             </Link>
//             <Link
//               to="/student/register"
//               className="railway-btn-primary px-4 py-2"
//             >
//               Register
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="relative container mx-auto px-4 pt-12">
//         <div className="max-w-4xl mx-auto text-center pt-16">
//           <h1 className="text-5xl font-bold mb-6">RAILSYNC.</h1>
//           <p className="text-xl text-gray-600 mb-12">
//             Apply for railway concessions online with real-time tracking.
//           </p>

//           <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//             <Link to="/student/login" className="railway-card group">
//               <FaUserGraduate className="text-4xl text-railway-blue mb-4" />
//               <h3 className="text-xl font-bold">Student Portal</h3>
//               <span className="flex items-center mt-3 text-railway-blue">
//                 Enter <FaArrowRight className="ml-2" />
//               </span>
//             </Link>

//             <Link to="/admin/login" className="railway-card group">
//               <FaUserShield className="text-4xl text-railway-green mb-4" />
//               <h3 className="text-xl font-bold">Admin Portal</h3>
//               <span className="flex items-center mt-3 text-railway-green">
//                 Enter <FaArrowRight className="ml-2" />
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

import {
  FaTrain,
  FaUserGraduate,
  FaArrowRight,
  FaUserCircle,
  FaSignOutAlt,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800">

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <FaTrain className="text-blue-600 text-xl" />
            <span className="text-xl font-bold tracking-wide">
              RAILSYNC
            </span>
          </div>

          {user ? (
            <div className="flex items-center gap-5">
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="font-medium">{user.name}</span>

              <button
                onClick={() => navigate("/student/dashboard")}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex gap-6 items-center">
              <Link
                to="/student/login"
                className="font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/student/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:scale-105 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-20 px-6 text-center max-w-6xl mx-auto">

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Smarter Railway <br /> Concession System
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Designed for students traveling daily on Mumbai local trains.
          Apply, track, and download your concession digitally.
        </p>

        {!user && (
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <Link
              to="/student/register"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition flex items-center gap-3"
            >
              <FaUserGraduate />
              Start Application
              <FaArrowRight />
            </Link>

            <Link
              to="/student/login"
              className="px-8 py-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            >
              Track Status
            </Link>
          </div>
        )}

        {/* Train Divider Line */}
        <div className="mt-20 border-t-4 border-dashed border-gray-300 w-3/4 mx-auto"></div>
      </section>

      {/* ================= STUDENT SECTION ================= */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Built for Daily Student Commuters
            </h2>
            <p className="text-gray-600 mb-6">
              Thousands of students commute daily across Mumbai using
              local trains. RailSync simplifies the concession process —
              no long queues, no paperwork, and faster approvals.
            </p>

            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                College verified applications
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                Digital concession certificate
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                Real-time approval tracking
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="Student"
              className="h-72 object-contain"
            />
          </div>

        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

          <div className="hover:-translate-y-2 transition duration-300">
            <FaFileAlt className="text-blue-600 text-4xl mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Submit Application
            </h3>
            <p className="text-gray-600 text-sm">
              Fill out the online concession form and submit instantly.
            </p>
          </div>

          <div className="hover:-translate-y-2 transition duration-300">
            <FaClock className="text-indigo-600 text-4xl mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Under Review
            </h3>
            <p className="text-gray-600 text-sm">
              Admin verifies your details and processes your request.
            </p>
          </div>

          <div className="hover:-translate-y-2 transition duration-300">
            <FaCheckCircle className="text-green-600 text-4xl mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Download Certificate
            </h3>
            <p className="text-gray-600 text-sm">
              Access and download your approved concession certificate.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8">
        <p className="text-white font-semibold mb-2">RAILSYNC</p>
        <p>Railway Concession Management System</p>
        <p className="text-sm mt-3">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </footer>

      {/* Admin login hidden but route still works at /admin/login */}
    </div>
  );
};

export default LandingPage;