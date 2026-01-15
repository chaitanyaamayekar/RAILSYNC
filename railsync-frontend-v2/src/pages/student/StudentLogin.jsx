import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../../store/authSlice";
import { FaTrain, FaEnvelope, FaLock } from "react-icons/fa";

const StudentLogin = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());

    // 🔁 MOCK API (replace later)
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: 1,
            name: "Student User",
            email: formData.email,
          },
          token: "student-demo-token",
          role: "student",
        })
      );

      navigate("/student/dashboard", { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-blue/10 to-white flex items-center justify-center p-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="train-animation opacity-10"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="railway-card shadow-2xl animate-slide-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-railway-blue/10 rounded-full mb-4">
              <FaTrain className="text-3xl text-railway-blue" />
            </div>
            <h2 className="text-3xl font-bold text-railway-dark mb-2">
              Student Login
            </h2>
            <p className="text-gray-600">
              Access your concession portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="railway-input pl-10"
                  placeholder="student@example.com"
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

            {/* Actions */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-railway-blue rounded border-gray-300 mr-2"
                />
                Remember me
              </label>

              <span className="text-sm text-railway-blue cursor-not-allowed opacity-60">
                Forgot password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full railway-btn-primary py-3 text-lg"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/student/register"
                className="text-railway-blue font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-railway-blue transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
