import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { API_URL } from '../config';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ El token se decodifica, pero los grupos vienen fuera
        const decoded = jwtDecode(data.access);
        console.log("✅ Token decodificado:", decoded);

        const groups = data.groups || [];
        console.log("✅ Groups en token:", groups);

        // Guardar token y rol en localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("user_role", groups[0] || "");

        console.log("✅ Rol guardado:", groups[0] || "");

        // Redirigir
        navigate("/dashboard");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      console.error("❌ Error al conectar:", err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
