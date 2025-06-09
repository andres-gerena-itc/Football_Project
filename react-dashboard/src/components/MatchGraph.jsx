import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { API_URL } from '../config';

function MatchGraph() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/graph-data/`) // Asegúrate de tener esta ruta en Django
      .then((res) => res.json())
      .then((data) => setGraphData(data))
      .catch((err) => console.error("Error cargando grafo:", err));
  }, []);

  if (!graphData) return <p>Cargando grafo...</p>;

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2>Grafo Dirigido de Partidos</h2>
      <Plot
        data={graphData.data}
        layout={graphData.layout}
        style={{ width: "90%", height: "600px" }}
        config={{ responsive: true }}
      />
    </div>
  );
}

export default MatchGraph;
