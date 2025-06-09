import { jwtDecode } from "jwt-decode";

/**
 * Extrae el rol principal del token JWT.
 * Prioriza 'admin', luego 'analista', y luego cualquier otro grupo.
 * Si no hay grupo, devuelve 'invitado'.
 * 
 * @param {string} token - Token JWT de autenticación
 * @returns {string} - Rol detectado
 */
export function getUserRoleFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    const groups = decoded?.groups || [];

    if (groups.includes("admin")) return "admin";
    if (groups.includes("analista")) return "analista";

    return groups[0] || "invitado";
  } catch (err) {
    console.error("Error al decodificar el token JWT:", err);
    return "invitado";
  }
}

/**
 * Extrae el rol del token almacenado en localStorage.
 * 
 * @returns {string} - Rol del usuario logueado
 */
export function getMainUserRole() {
  const token = localStorage.getItem("access_token");
  if (!token) return "invitado";

  return getUserRoleFromToken(token);
}
