import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

import {
  FaTrain,
  FaUserGraduate,
  FaUserShield,
  FaArrowRight,
  FaUserCircle
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
    <div className="min-h-screen bg-gradient-to-br from-railway-blue/5 to-white">
      {/* TOP BAR */}
      <div className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaTrain className="text-railway-blue text-xl" />
          <span className="font-bold text-railway-blue text-lg">
            RAILSYNC
          </span>
        </div>

        {user ? (
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="font-medium text-gray-700">
              Welcome, <span className="text-railway-blue">{user.name}</span>
            </span>
            <button
  onClick={handleLogout}
  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
>
  <FaSignOutAlt />
  <span>Logout</span>
</button>

          </div>
          
        ) : (
          <div className="space-x-4">
            <Link
              to="/student/login"
              className="text-railway-blue font-medium"
            >
              Login
            </Link>
            <Link
              to="/student/register"
              className="railway-btn-primary px-4 py-2"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative container mx-auto px-4 pt-12">
        <div className="max-w-4xl mx-auto text-center pt-16">
          <h1 className="text-5xl font-bold mb-6">RAILSYNC.</h1>
          <p className="text-xl text-gray-600 mb-12">
            Apply for railway concessions online with real-time tracking.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link to="/student/login" className="railway-card group">
              <FaUserGraduate className="text-4xl text-railway-blue mb-4" />
              <h3 className="text-xl font-bold">Student Portal</h3>
              <span className="flex items-center mt-3 text-railway-blue">
                Enter <FaArrowRight className="ml-2" />
              </span>
            </Link>

            {/* <Link to="/admin/login" className="railway-card group">
              <FaUserShield className="text-4xl text-railway-green mb-4" />
              <h3 className="text-xl font-bold">Admin Portal</h3>
              <span className="flex items-center mt-3 text-railway-green">
                Enter <FaArrowRight className="ml-2" />
              </span>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
