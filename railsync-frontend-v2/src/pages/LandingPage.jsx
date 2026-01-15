import React from "react";
import { Link } from "react-router-dom";
import {
  FaTrain,
  FaUserGraduate,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-blue/5 to-white">
      <div className="relative container mx-auto px-4 pt-12">
        <div className="max-w-4xl mx-auto text-center pt-16">
          <div className="inline-flex items-center space-x-3 bg-white/80 px-6 py-3 rounded-full mb-8">
            <FaTrain className="text-railway-blue text-xl" />
            <span className="font-semibold text-railway-blue">
              Digitising Railway Concessions for Mumbai Students
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6">RAILSYNC.</h1>

          <p className="text-xl text-gray-600 mb-12">
            Apply for railway concessions online with real-time tracking.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* STUDENT */}
            <Link
              to="/student/login"
              className="railway-card group"
            >
              <div className="flex flex-col items-center">
                <FaUserGraduate className="text-4xl text-railway-blue mb-4" />
                <h3 className="text-xl font-bold">Student Portal</h3>
                <span className="flex items-center mt-3 text-railway-blue">
                  Login as Student <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>

            {/* ADMIN */}
            <Link
              to="/admin/login"
              className="railway-card group"
            >
              <div className="flex flex-col items-center">
                <FaUserShield className="text-4xl text-railway-green mb-4" />
                <h3 className="text-xl font-bold">Admin Portal</h3>
                <span className="flex items-center mt-3 text-railway-green">
                  Login as Admin <FaArrowRight className="ml-2" />
                </span>
              </div>
            </Link>
          </div>

          <p className="mt-6 text-gray-600">
            New student?{" "}
            <Link to="/student/register" className="text-railway-blue underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
