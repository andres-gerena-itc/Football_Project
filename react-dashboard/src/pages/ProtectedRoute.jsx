import { Navigate } from "react-router-dom";
import { getMainUserRole } from "../utils/auth";

export function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access_token");
  const role = getMainUserRole();

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/not-authorized" />;

  return children;
}
