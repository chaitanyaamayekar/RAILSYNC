// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../store/authSlice";

// import {
//   FaTrain,
//   FaUserGraduate,
//   FaArrowRight,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaFileAlt,
//   FaClock,
//   FaCheckCircle,
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
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">

//       {/* ================= NAVBAR ================= */}
//       <header className="bg-white/80 backdrop-blur border-b">
//         <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

//           <div className="flex items-center gap-3">
//             <FaTrain className="text-blue-600 text-2xl" />
//             <span className="text-xl font-bold">RailSync</span>
//           </div>

//           {user ? (
//             <div className="flex items-center gap-5">
//               <FaUserCircle className="text-2xl text-gray-600" />
//               <span>{user.name}</span>

//               <button
//                 onClick={() => navigate("/student/dashboard")}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Dashboard
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 <FaSignOutAlt />
//               </button>
//             </div>
//           ) : (
//             <div className="flex gap-6 items-center">
//               <Link
//                 to="/student/login"
//                 className="hover:text-blue-600"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/student/register"
//                 className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ================= HERO ================= */}
//       <main className="flex-1 flex items-center">
//         <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

//           {/* LEFT SIDE */}
//           <div>
//             <h1 className="text-5xl font-extrabold leading-tight">
//               Railway Concession <br />
//               <span className="text-blue-600">Made Simple</span>
//             </h1>

//             <p className="mt-6 text-gray-600">
//               RailSync helps students apply, track, and download
//               railway concession certificates digitally without
//               standing in long queues.
//             </p>

//             {!user && (
//               <div className="mt-8 flex gap-4">
//                 <Link
//                   to="/student/register"
//                   className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow"
//                 >
//                   <FaUserGraduate />
//                   Apply Now
//                   <FaArrowRight />
//                 </Link>

//                 <Link
//                   to="/student/login"
//                   className="px-6 py-3 border rounded-xl hover:bg-gray-100"
//                 >
//                   Track Status
//                 </Link>
//               </div>
//             )}

//             {/* RAILWAY TRACK */}
//             <div className="mt-10 flex items-center gap-3">
//               <div className="h-1 w-16 bg-gray-400"></div>
//               <FaTrain className="text-gray-500" />
//               <div className="h-1 w-16 bg-gray-400"></div>
//             </div>
//           </div>

//           {/* RIGHT SIDE IMAGE */}
//           <div className="flex justify-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
//               alt="train travel"
//               className="h-80 object-contain"
//             />
//           </div>
//         </div>
//       </main>

//       {/* ================= FEATURES ================= */}
//       <section className="max-w-7xl mx-auto px-8 pb-12 grid md:grid-cols-3 gap-6">

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <FaFileAlt className="text-blue-600 text-3xl mb-4" />
//           <h3 className="font-semibold text-lg mb-2">
//             Apply Online
//           </h3>
//           <p className="text-sm text-gray-600">
//             Submit your railway concession form digitally.
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <FaClock className="text-indigo-600 text-3xl mb-4" />
//           <h3 className="font-semibold text-lg mb-2">
//             Track Status
//           </h3>
//           <p className="text-sm text-gray-600">
//             Monitor application approval in real-time.
//           </p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
//           <FaCheckCircle className="text-green-600 text-3xl mb-4" />
//           <h3 className="font-semibold text-lg mb-2">
//             Download Pass
//           </h3>
//           <p className="text-sm text-gray-600">
//             Instantly download approved concession certificates.
//           </p>
//         </div>

//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="text-center text-gray-500 pb-4 text-sm">
//         © {new Date().getFullYear()} RailSync
//       </footer>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      {/* ================= NAVBAR ================= */}
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <FaTrain className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold">RailSync</span>
          </div>

          {user ? (
            <div className="flex items-center gap-5">
              <FaUserCircle className="text-2xl text-gray-600" />
              <span>{user.name}</span>

              <button
                onClick={() => navigate("/student/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex gap-6 items-center">
              <Link
                to="/student/login"
                className="hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/student/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Railway Concession <br />
              <span className="text-blue-600">Made Simple</span>
            </h1>

            <p className="mt-6 text-gray-600">
              RailSync helps students apply, track, and download
              railway concession certificates digitally without
              standing in long queues.
            </p>

            {!user && (
              <div className="mt-8 flex gap-4">
                <Link
                  to="/student/register"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow"
                >
                  <FaUserGraduate />
                  Apply Now
                  <FaArrowRight />
                </Link>

                <Link
                  to="/student/login"
                  className="px-6 py-3 border rounded-xl hover:bg-gray-100"
                >
                  Track Status
                </Link>
              </div>
            )}

            {/* RAILWAY TRACK */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-1 w-16 bg-gray-400"></div>
              <FaTrain className="text-gray-500" />
              <div className="h-1 w-16 bg-gray-400"></div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="train travel"
              className="h-80 object-contain"
            />
          </div>
        </div>
      </main>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-8 pb-12 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaFileAlt className="text-blue-600 text-3xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">
            Apply Online
          </h3>
          <p className="text-sm text-gray-600">
            Submit your railway concession form digitally.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaClock className="text-indigo-600 text-3xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">
            Track Status
          </h3>
          <p className="text-sm text-gray-600">
            Monitor application approval in real-time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaCheckCircle className="text-green-600 text-3xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">
            Download Pass
          </h3>
          <p className="text-sm text-gray-600">
            Instantly download approved concession certificates.
          </p>
        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-gray-500 pb-4 text-sm">
        © {new Date().getFullYear()} RailSync

        <div className="mt-1">
          <Link
            to="/admin/login"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Admin Login
          </Link>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

