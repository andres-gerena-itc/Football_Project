import jwtDecode from "jwt-decode";

export function getUserRoleFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded?.groups?.[0] || null;
  } catch (err) {
    return null;
  }
}
