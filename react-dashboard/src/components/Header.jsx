import { useNavigate } from "react-router-dom";
import "./Header.css"; // si quieres agregar estilos opcionales

function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("user_role");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>Champions Dashboard</h1>

      <nav>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        {(role === "admin" || role === "analista") && (
          <button onClick={() => navigate("/teams")}>Equipos</button>
        )}

        {(role === "admin" || role === "analista") && (
          <button onClick={() => navigate("/matches")}>Partidos</button>
        )}
      </nav>

      <div className="user-info">
        <span>👤 Rol: <strong>{role}</strong></span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
}

export default Header;
