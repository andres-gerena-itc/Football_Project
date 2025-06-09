import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TeamCrud from "./pages/TeamCrud";
import MatchCrud from "./pages/MatchCrud";
import Login from "./pages/Login";
import MatchTabs from "./pages/MatchTabs";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Página de inicio de sesión */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard accesible para todos los roles */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["admin", "analista", "invitado"]}>
          <Dashboard />
        </ProtectedRoute>
      }/>

      {/* Gestión de Equipos: solo Admin y Analista */}
      <Route path="/teams" element={
        <ProtectedRoute allowedRoles={["admin", "analista"]}>
          <TeamCrud />
        </ProtectedRoute>
      }/>

      {/* Gestión de Partidos: solo Admin y Analista */}
      <Route path="/matches" element={
        <ProtectedRoute allowedRoles={["admin", "analista"]}>
          <MatchCrud />
        </ProtectedRoute>
      }/>

      {/* Nueva ruta con pestañas para partidos por fase */}
      <Route path="/match-tabs" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <MatchTabs />
        </ProtectedRoute>
      }/>

      {/* Ruta por defecto si el usuario no tiene permiso */}
      <Route path="/not-authorized" element={<h1>403 - No autorizado</h1>} />
    </Routes>
  );
}

export default App;
