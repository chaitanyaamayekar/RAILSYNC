import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../../store/authSlice";
import { FaTrain, FaShieldAlt, FaEnvelope, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());

    // 🔁 MOCK API (replace later)
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: 1,
            name: "Admin User",
            email: formData.email,
          },
          token: "admin-demo-token",
          role: "admin",
        })
      );

      navigate("/admin/dashboard", { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-dark to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-railway-dark p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <FaShieldAlt className="text-3xl text-white" />
            </div>
            <div className="flex items-center justify-center mb-2">
              <FaTrain className="text-white mr-2" />
              <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
            </div>
            <p className="text-gray-300">Railway Department Access</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Official Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="railway-input pl-10"
                    placeholder="admin@railsync.in"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="railway-input pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Session */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="secure"
                  className="h-4 w-4 text-railway-dark rounded border-gray-300"
                />
                <label htmlFor="secure" className="ml-2 text-sm text-gray-600">
                  Secure session (auto logout)
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-railway-dark text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Access Dashboard"}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <FaShieldAlt className="text-red-500 mr-2 mt-0.5" />
                <p className="text-sm text-red-700">
                  <strong>Security Notice:</strong> Restricted to authorized
                  railway department personnel only.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
