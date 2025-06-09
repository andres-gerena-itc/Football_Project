import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("user_role");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        Champions Dashboard
      </div>

      <nav className="nav-links">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        {role === "admin" && (
          <button onClick={() => navigate("/teams")}>Equipos</button>
        )}

        {(role === "admin" || role === "analista") && (
          <button onClick={() => navigate("/match-tabs")}>Partidos</button>
        )}
      </nav>

      <div className="user-actions">
        <span className="role-badge">👤 Rol: <strong>{role}</strong></span>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
