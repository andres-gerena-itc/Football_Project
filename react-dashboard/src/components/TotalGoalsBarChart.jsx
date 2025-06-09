import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function TotalGoalsBarChart() {
  const [data, setData] = useState(null);
  const [layout, setLayout] = useState(null);
  const [config, setConfig] = useState({ responsive: true });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/goals/total-bar/')
      .then(res => res.json())
      .then(fig => {
        setData(fig.data);
        setLayout(fig.layout);
        if (fig.config) setConfig(fig.config);
      })
      .catch(err => {
        console.error("Error fetching chart:", err);
      });
  }, []);

  if (!data || !layout) return <p>Cargando gráfico...</p>;

  return (
    <div>
      <h2>Goles Totales por Equipo</h2>
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default TotalGoalsBarChart;
