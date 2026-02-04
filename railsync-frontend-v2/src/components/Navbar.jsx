import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { FaTrain, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, role, token } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <FaTrain className="text-3xl text-railway-blue" />
            <div>
              <h1 className="text-xl font-bold text-railway-blue">
                RAILSYNC
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Mumbai Suburban Railways
              </p>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-railway-blue"
                >
                  About
                </Link>

                <Link
                  to="/how-it-works"
                  className="text-gray-600 hover:text-railway-blue"
                >
                  How It Works
                </Link>

                <Link
                  to="/role"
                  className="railway-btn-primary"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Student Links */}
                {role === "student" && (
                  <>
                    <Link to="/student/dashboard">Dashboard</Link>
                    <Link to="/student/status">Status</Link>
                  </>
                )}

                {/* Admin Links */}
                {role === "admin" && (
                  <>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/applications">Applications</Link>
                  </>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-2 ml-4">
                  <FaUser className="text-gray-500" />
                  <span className="font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
