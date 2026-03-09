// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess } from "../../store/authSlice";
// import { FaTrain, FaEnvelope, FaLock } from "react-icons/fa";

// const StudentLogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(""); 

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError(""); // clear error while typing
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(""); // reset old errors
//     dispatch(loginStart());

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       // ❗ CHECK IF LOGIN FAILED
//       if (!res.ok) {
//         if (data.message === "User not found") {
//           setError("Account does not exist. Please register for a new account.");
//         } else if (data.message === "Invalid credentials") {
//           setError("Incorrect email or password.");
//         } else {
//           setError(data.message || "Login failed");
//         }
//         return;
//       }

//       dispatch(loginSuccess(data));
//       navigate("/student/dashboard", { replace: true });

//     } catch (err) {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-railway-blue/10 to-white flex items-center justify-center p-4">
//       <div className="relative w-full max-w-md">
//         <div className="railway-card shadow-2xl animate-slide-in">
          
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-blue/10 rounded-full mb-4">
//               <FaTrain className="text-3xl text-railway-blue" />
//             </div>
//             <h2 className="text-3xl font-bold text-railway-dark mb-2">
//               Student Login
//             </h2>
//             <p className="text-gray-600">
//               Access your concession portal
//             </p>
//           </div>

//           {/* ✅ ERROR MESSAGE */}
//           {error && (
//             <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm border border-red-300">
//               {error}
//               {error.includes("register") && (
//                 <div className="mt-2">
//                   <Link
//                     to="/student/register"
//                     className="text-railway-blue font-medium hover:underline"
//                   >
//                     Click here to Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="railway-input pl-10"
//                   placeholder="student@example.com"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="railway-input pl-10"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full railway-btn-primary py-3 text-lg"
//             >
//               {loading ? "Logging in..." : "Login to Dashboard"}
//             </button>
//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//             <p className="text-gray-600">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/student/register"
//                 className="text-railway-blue font-medium hover:underline"
//               >
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="text-center mt-6">
//           <Link
//             to="/"
//             className="inline-flex items-center text-gray-600 hover:text-railway-blue transition"
//           >
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../../store/authSlice";
import {
  FaTrain,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight
} from "react-icons/fa";

const StudentLogin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    dispatch(loginStart());

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "User not found") {
          setError("Account does not exist. Please register.");
        } else if (data.message === "Invalid credentials") {
          setError("Incorrect email or password.");
        } else {
          setError(data.message || "Login failed");
        }
        return;
      }

      dispatch(loginSuccess(data));
      navigate("/student/dashboard", { replace: true });

    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden">

      {/* Decorative Blur Circles */}
      <div className="absolute w-96 h-96 bg-blue-400/30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg mb-4">
            <FaTrain className="text-2xl" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            RailSync
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Student Railway Concession Portal
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-300 text-red-700 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div className="relative">

            <FaEnvelope className="absolute left-4 top-3.5 text-gray-400 text-sm" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="relative">

            <FaLock className="absolute left-4 top-3.5 text-gray-400 text-sm" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium shadow-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
            {!loading && <FaArrowRight />}
          </button>

        </form>

        {/* REGISTER */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/student/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>

        {/* BACK */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-500 text-sm hover:text-blue-600"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default StudentLogin;