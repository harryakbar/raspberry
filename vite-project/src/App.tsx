import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/Home/Home";
import BluetoothSettings from "./features/Bluetooth/BluetoothSettings";
import Metrics from "./features/Metrics/Metrics";
import Apps from "./features/Apps/Apps";
import AlQuranApp from "./features/AlQuran/AlQuranApp";
import Header from "./features/common/Header";

function App() {
  return (
    <Router>
      <div className="flex flex-col w-screen bg-gray-100 p-0 m-0">
        <Header />
        <main>
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
