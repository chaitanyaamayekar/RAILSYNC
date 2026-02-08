// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children, allowedRole }) => {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   if (allowedRole && role !== allowedRole) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { token, role } = useSelector((state) => state.auth);

  // not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // role mismatch (admin trying student route or vice-versa)
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
