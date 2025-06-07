import { jwtDecode } from "jwt-decode";

// Devuelve el primer grupo del token proporcionado
export function getUserRoleFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded?.groups?.[0] || null;
  } catch (err) {
    return null;
  }
}

// Devuelve el grupo del token almacenado en localStorage
export function getMainUserRole() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  return getUserRoleFromToken(token);
}
