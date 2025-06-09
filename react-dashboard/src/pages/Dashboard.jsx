import Header from "../components/Header";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import regresionImage from '../assets/regresion.png';
import MatchTabs from "./MatchTabs";
import MatchGraph from "../components/MatchGraph";
import TotalGoalsBarChart from '../components/TotalGoalsBarChart';
import { API_URL } from '../config';

function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/kpis/`)
      .then(response => response.json())
      .then(data => setKpis(data));

    fetch(`${API_URL}/api/matches/`)
      .then(response => response.json())
      .then(data => setMatches(data));
  }, []);

  if (!kpis) return <p style={{ paddingTop: '6rem' }}>Cargando KPIs...</p>;

  return (
    <div>
      <Header />

      <main style={{ padding: '6rem 2rem 2rem' }}>
        <h1>Champions League KPIs</h1>
        <div style={{ marginTop: '2rem' }}>
          <h2>Total Partidos: {kpis.total_matches}</h2>
          <h2>Total Goles: {kpis.total_goals}</h2>
          <h2>Promedio Goles por Partido: {kpis.avg_goals_per_match}</h2>
        </div>

        {/* 📈 Gráfico de goles por equipo con scroll horizontal y espaciado correcto */}
        <section style={{ marginTop: '4rem', marginBottom: '6rem' }}>
          <h2>⚽ Goles Totales por Equipo</h2>
          <p>Esta gráfica muestra cuántos goles anotó cada equipo en toda la competencia, sumando los goles de local y visitante.</p>
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            overflowX: 'auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#fff',
            minHeight: '500px'
          }}>
            <div style={{ minWidth: '1000px' }}>
              <TotalGoalsBarChart />
            </div>
          </div>
        </section>

        {/* 🔍 Sección de regresión */}
        <section style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginTop: '5rem',
          gap: '2rem'
        }}>
          <div style={{ flex: 1 }}>
            <h2>📊 Modelo Predictivo: Regresión Lineal de Goles Totales</h2>
            <p>
              Esta regresión lineal analiza la relación entre los goles reales anotados
              y los goles predichos por el modelo. Aunque el <strong>coeficiente de determinación (R²)</strong> es
              actualmente negativo (-0.21), lo cual indica un bajo poder predictivo, el
              modelo representa un primer paso hacia una aproximación cuantitativa del
              rendimiento ofensivo.
            </p>
            <ul>
              <li><strong>Error cuadrático medio (MSE):</strong> 3.79</li>
              <li><strong>R²:</strong> -0.21</li>
            </ul>
          </div>

          <div style={{ flex: 1 }}>
            <img src={regresionImage} alt="Gráfico de regresión" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        </section>

        {/* 📊 Gráfico adicional del grafo o evolución de partidos */}
        <MatchGraph />
      </main>
    </div>
  );
}

export default Dashboard;
