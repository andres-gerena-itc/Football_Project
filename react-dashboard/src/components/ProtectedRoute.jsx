import { Navigate } from "react-router-dom";

export function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("user_role");

  // 🔍 Validar existencia de token
  if (!token) {
    console.warn("🔒 No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // 🔐 Validar que el rol esté entre los permitidos
  if (!role || !allowedRoles.includes(role)) {
    console.warn(`⛔️ Access denied for role: "${role}". Allowed: ${allowedRoles.join(", ")}`);
    return <Navigate to="/not-authorized" replace />;
  }

  // ✅ Acceso concedido
  return children;
}
