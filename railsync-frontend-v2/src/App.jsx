import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Applications from "./pages/admin/Applications";
import ApplicationDetails from "./pages/admin/ApplicationDetails";

// Student
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import StudentDashboard from "./pages/student/StudentDashboard";
import ApplyConcession from "./pages/student/ApplyConcession";
import UploadDocuments from "./pages/student/UploadDocuments";
import ApplicationStatus from "./pages/student/Status";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />

      {/* AUTH */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />

      {/* STUDENT (PROTECTED) */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/apply"
        element={
          <ProtectedRoute allowedRole="student">
            <ApplyConcession />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/upload-documents/:applicationId"
        element={
          <ProtectedRoute allowedRole="student">
            <UploadDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/status/:applicationId"
        element={
          <ProtectedRoute allowedRole="student">
            <ApplicationStatus />
          </ProtectedRoute>
        }
      />

      {/* ADMIN (PROTECTED) */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/applications"
        element={
          <ProtectedRoute allowedRole="admin">
            <Applications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/applications/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <ApplicationDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
