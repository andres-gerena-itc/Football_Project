import { useEffect, useState } from 'react';

function Dashboard() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/kpis/')
      .then(response => response.json())
      .then(data => setKpis(data))
      .catch(error => console.error('Error al cargar KPIs:', error));
  }, []);

  if (!kpis) return <p>Cargando KPIs...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Champions League KPIs</h1>
      <div style={{ marginTop: '2rem' }}>
        <h2>Total Partidos: {kpis.total_matches}</h2>
        <h2>Total Goles: {kpis.total_goals}</h2>
        <h2>Promedio Goles por Partido: {kpis.avg_goals_per_match}</h2>
      </div>
    </div>
  );
}

export default Dashboard;
