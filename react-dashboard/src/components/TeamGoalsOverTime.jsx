import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function TeamGoalsOverTime({ team }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!team) return;

    fetch(`http://localhost:8000/api/teams/goals-over-time/?team=${encodeURIComponent(team)}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error al cargar goles por partido:", err));
  }, [team]);

  if (!data.length) return <p></p>;

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3>📈 Evolución de Goles por Partido</h3>
      <Plot
        data={[
          {
            x: data.map(d => d.fecha),
            y: data.map(d => d.goles),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
            text: data.map(d => `vs ${d.rival}<br>Resultado: ${d.resultado}`),
            hoverinfo: 'text+y'
          }
        ]}
        layout={{
          title: `Goles de ${team} por partido`,
          xaxis: { title: 'Fecha' },
          yaxis: { title: 'Goles anotados', rangemode: 'tozero' },
          margin: { t: 50, l: 50, r: 20, b: 50 }
        }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}

export default TeamGoalsOverTime;
