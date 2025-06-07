import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (!allowedRoles.includes(role)) return <Navigate to="/not-authorized" />;

  return children;
}
