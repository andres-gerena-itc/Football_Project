import React, { useEffect, useState } from 'react';

function TeamSelectorKPIs() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/teams/kpis/')
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setSelectedTeam(data[0]?.equipo || null);
        setKpi(data[0] || null);
      });
  }, []);

  const handleChange = (e) => {
    const team = e.target.value;
    setSelectedTeam(team);
    const found = teams.find(t => t.equipo === team);
    setKpi(found);
  };

  if (!teams.length || !kpi) return <p>Cargando equipos...</p>;

  return (
    <section style={{ marginTop: '5rem' }}>
      <h2>📌 Análisis por Equipo</h2>
      <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
        Selecciona un equipo:
      </label>
      <select value={selectedTeam} onChange={handleChange} style={{ padding: '0.5rem', fontSize: '1rem' }}>
        {teams.map(team => (
          <option key={team.equipo} value={team.equipo}>{team.equipo}</option>
        ))}
      </select>

      <div style={{
        marginTop: '2rem',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <KpiCard label="Partidos Jugados" value={kpi.partidos} />
        <KpiCard label="Goles a Favor" value={kpi.goles_a_favor} />
        <KpiCard label="Goles en Contra" value={kpi.goles_en_contra} />
        <KpiCard label="Diferencia de Goles" value={kpi.diferencia} />
      </div>
    </section>
  );
}

function KpiCard({ label, value }) {
  return (
    <div style={{
      background: '#f4f4f4',
      padding: '1rem 2rem',
      borderRadius: '8px',
      minWidth: '180px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: 0 }}>{label}</h3>
      <p style={{ fontSize: '1.5rem', margin: 0 }}>{value}</p>
    </div>
  );
}

export default TeamSelectorKPIs;
