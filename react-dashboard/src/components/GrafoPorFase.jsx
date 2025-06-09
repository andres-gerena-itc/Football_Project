import { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from 'react-force-graph';


function GrafoPorFase() {
  const [data, setData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  useEffect(() => {
    fetch("http://localhost:8000/api/graph/by-stage/")
      .then((res) => res.json())
      .then((graphData) => setData(graphData));
  }, []);

  return (
    <div style={{ height: "600px", marginTop: "2rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Grafo de Partidos por Fase (Dirigido)</h2>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        nodeAutoColorBy="id"
        linkLabel={(link) => `Fase: ${link.stage}`}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
}

export default GrafoPorFase;
