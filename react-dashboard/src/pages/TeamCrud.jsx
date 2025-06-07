import { useEffect, useState } from "react";
import { getMainUserRole } from "../utils/auth";

function TeamCrud() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userRole = getMainUserRole(token);
    setRole(userRole);
  }, []);

  return (
    <div>
      <h1>Gestión de Equipos</h1>

      {role === "admin" && (
        <button onClick={() => console.log("Crear equipo")}>
          ➕ Crear Equipo
        </button>
      )}

      {role !== "invitado" && (
        <div>
          <p>Solo los analistas y admins pueden ver esta tabla.</p>
          {/* Aquí tabla de equipos o edición */}
        </div>
      )}

      {role === "invitado" && (
        <p>🔒 Acceso solo para visualizar KPIs</p>
      )}
    </div>
  );
}

export default TeamCrud;
