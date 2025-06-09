import { useEffect, useState } from "react";
import { getMainUserRole } from "../utils/auth";
import TeamSelectorKPIs from "../components/TeamSelectorKPIs";
import Header from "../components/Header";

function TeamCrud() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.warn("No access_token found in localStorage");
      setRole("invitado");
      setLoading(false);
      return;
    }

    const userRole = getMainUserRole(token);
    console.log("Rol detectado:", userRole);
    setRole(userRole || "invitado");
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <main style={{ padding: "6rem 2rem" }}>
          <p>Cargando perfil de usuario...</p>
        </main>
      </div>
    );
  }

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

        <section style={{ marginTop: "4rem" }}>
          <h2>📊 KPIs por Equipo</h2>
          <TeamSelectorKPIs />
        </section>

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
