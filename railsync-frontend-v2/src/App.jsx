import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Applications from "./pages/admin/Applications";
import ApplicationDetail from "./pages/admin/ApplicationDetail";

// Student
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegister from "./pages/student/StudentRegister";
import StudentDashboard from "./pages/student/StudentDashboard";
import ApplyConcession from "./pages/student/ApplyConcession";
import Status from "./pages/student/Status";
import Notifications from "./pages/student/Notifications";
import UploadDocuments from "./pages/student/UploadDocuments";
import ProtectedRoute from "./routes/ProtectedRoute";
import ApplicationStatus from "./pages/student/Status";

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/apply" element={<ApplyConcession />} />
        <Route
  path="/student/upload-documents/:applicationId"
  element={<UploadDocuments />}
/>

<Route path="/student/upload-documents/:applicationId" element={<UploadDocuments />} />
<Route path="/student/status/:applicationId" element={<ApplicationStatus />} />

        {/* ADMIN */}
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
              <ApplicationDetail />
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        {/* <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/student/apply"
          element={
            <ProtectedRoute allowedRole="student">
              <ApplyConcession />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/student/status"
          element={
            <ProtectedRoute allowedRole="student">
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRole="student">
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
