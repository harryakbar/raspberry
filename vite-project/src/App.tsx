import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./features/Home/Home";
import BluetoothSettings from "./features/Bluetooth/BluetoothSettings";
import Metrics from "./features/Metrics/Metrics";
import Apps from "./features/Apps/Apps";
import AlQuranApp from "./features/AlQuran/AlQuranApp";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/bluetooth">Bluetooth</Link>
        <Link to="/metrics">Metrics</Link>
        <Link to="/apps">Apps</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bluetooth" element={<BluetoothSettings />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/quran" element={<AlQuranApp />} />
      </Routes>
    </Router>
  );
}

export default App;
