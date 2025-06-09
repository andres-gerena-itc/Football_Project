import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';

function GrafoPorFasePlotly() {
  const [figData, setFigData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/graph/by-stage/plotly/")
      .then(res => res.json())
      .then(data => setFigData(data))
      .catch(err => console.error("Error cargando el grafo:", err));
  }, []);

  if (!figData) return <p>Cargando grafo...</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Grafo Dirigido por Fase (Plotly)</h2>
      <Plot
        data={figData.data}
        layout={figData.layout}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}

export default GrafoPorFasePlotly;
