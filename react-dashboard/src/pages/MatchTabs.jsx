import { useEffect, useState } from "react";
import GrafoPorFase from "../components/GrafoPorFase";



function MatchTabs() {
  const [matches, setMatches] = useState([]);
  const [selectedStage, setSelectedStage] = useState("GROUP_STAGE");

  useEffect(() => {
    fetch("http://localhost:8000/api/matches/")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Error al cargar partidos:", err));
  }, []);

  const stages = [
    "GROUP_STAGE",
    "LAST_16",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "FINAL",
  ];

  const filteredMatches = matches.filter((match) => match.stage === selectedStage);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Partidos por Fase</h2>

      <div style={{ margin: "1rem 0", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => setSelectedStage(stage)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: selectedStage === stage ? "#007BFF" : "#ddd",
              color: selectedStage === stage ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {stage.replace("_", " ")}
          </button>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Fecha</th>
            <th style={cellStyle}>Equipo Local</th>
            <th style={cellStyle}>Goles Local</th>
            <th style={cellStyle}>Goles Visitante</th>
            <th style={cellStyle}>Equipo Visitante</th>
          </tr>
        </thead>
        <tbody>
          {filteredMatches.map((match) => (
            <tr key={match.id}>
              <td style={cellStyle}>{new Date(match.date).toLocaleString()}</td>
              <td style={cellStyle}>{match.home_team_name || match.home_team}</td>
              <td style={cellStyle}>{match.home_score}</td>
              <td style={cellStyle}>{match.away_score}</td>
              <td style={cellStyle}>{match.away_team_name || match.away_team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "0.5rem",
  textAlign: "center",
};

export default MatchTabs;