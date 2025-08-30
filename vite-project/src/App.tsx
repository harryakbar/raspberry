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
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold mb-4">Raspberry Pi</h1>
          <nav>
            <ul>
              <li className="mb-2">
                <Link to="/" className="block p-2 rounded hover:bg-gray-700">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/apps" className="block p-2 rounded hover:bg-gray-700">Apps</Link>
              </li>
              <li className="mb-2">
                <Link to="/bluetooth" className="block p-2 rounded hover:bg-gray-700">Bluetooth</Link>
              </li>
              <li className="mb-2">
                <Link to="/metrics" className="block p-2 rounded hover:bg-gray-700">Metrics</Link>
              </li>
              <li className="mb-2">
                <Link to="/alquran" className="block p-2 rounded hover:bg-gray-700">Al-Quran</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bluetooth" element={<BluetoothSettings />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/alquran" element={<AlQuranApp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;