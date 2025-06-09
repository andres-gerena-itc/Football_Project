import { useEffect, useState } from "react";
import { getMainUserRole } from "../utils/auth";
import TeamSelectorKPIs from "../components/TeamSelectorKPIs";
import Header from "../components/Header";

function TeamCrud() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userRole = getMainUserRole(token);
    setRole(userRole);
  }, []);

  return (
    <div>
      <Header />

      <main style={{ padding: "6rem 2rem" }}>
        <h1>Gestión y Análisis de Equipos</h1>

        {role === "admin" && (
          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={() => console.log("Crear equipo")}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              ➕ Crear Equipo
            </button>
          </div>
        )}

        {(role === "admin" || role === "analista") && (
          <section style={{ marginTop: "3rem" }}>
            <h2>📋 Tabla de Equipos</h2>
            <p>Solo los analistas y admins pueden ver esta tabla.</p>
            {/* Aquí podrías renderizar un componente con la tabla editable de equipos */}
          </section>
        )}

        {role && (
          <section style={{ marginTop: "4rem" }}>
            <h2>📊 KPIs por Equipo</h2>
            <TeamSelectorKPIs />
          </section>
        )}

        {role === "invitado" && (
          <p style={{ marginTop: "2rem", color: "#888" }}>
            🔒 Como invitado, solo puedes visualizar indicadores generales por equipo.
          </p>
        )}
      </main>
    </div>
  );
}

export default TeamCrud;
