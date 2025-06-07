import Dashboard from './Dashboard';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TeamCrud from "./pages/TeamCrud";
import MatchCrud from "./pages/MatchCrud";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;

<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute allowedRoles={["admin", "analista", "invitado"]}>
      <Dashboard />
    </ProtectedRoute>
  }/>

  <Route path="/teams" element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <TeamCrud />
    </ProtectedRoute>
  }/>

  <Route path="/matches" element={
    <ProtectedRoute allowedRoles={["admin", "analista"]}>
      <MatchCrud />
    </ProtectedRoute>
  }/>

  <Route path="/not-authorized" element={<h1>403 - No autorizado</h1>} />
</Routes>
