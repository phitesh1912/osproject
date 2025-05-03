import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-root">
      <h1 className="home-title">IPC Synchronization Project</h1>
      <div className="algo-toggle" style={{ marginTop: 60 }}>
        <button onClick={() => navigate("/testandsetsimulation")}>TestAndSet Simulation</button>
        <button onClick={() => navigate("/swapsimulation")}>Swap Simulation</button>
      </div>
    </div>
  );
}
