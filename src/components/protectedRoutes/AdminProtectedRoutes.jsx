import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext"; // Use your context file

export default function ProtectedRoute({ children }) {
  const { admin } = useContext(AdminContext);

  // Check if admin is authenticated
  const isAuthenticated = admin && admin.adminToken && admin.tokenExpiration;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Allow access if authenticated
  return children;
}
