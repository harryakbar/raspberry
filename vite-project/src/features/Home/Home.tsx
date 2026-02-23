import { FaBluetooth, FaChartBar, FaTh } from "react-icons/fa";
import { Link } from "react-router-dom";

const apps = [
  {
    to: "/apps",
    name: "Apps",
    description: "Manage your applications",
    icon: <FaTh className="text-4xl text-purple-500 mb-4" />,
  },
  {
    to: "/bluetooth",
    name: "Bluetooth",
    description: "Connect and manage devices",
    icon: <FaBluetooth className="text-4xl text-blue-500 mb-4" />,
  },
  {
    to: "/metrics",
    name: "Metrics",
    description: "Monitor system performance",
    icon: <FaChartBar className="text-4xl text-green-500 mb-4" />,
  },
  {
    to: "/alquran",
    name: "Al-Quran",
    description: "Read the Holy Quran",
    icon: <FaBluetooth className="text-4xl text-teal-500 mb-4" />,
  },
];

const Home = () => (
  <div className="home-container p-4 md:p-8 bg-gray-100 min-h-screen">
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">
        Raspberry Pi Dashboard
      </h1>
      <p className="text-lg text-gray-600">
        Welcome to your central control hub.
      </p>
    </header>

    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {apps.map((app) => (
        <Link
          key={app.to}
          to={app.to}
          className="transform hover:scale-105 transition-transform duration-300"
        >
          <div className="card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center h-full">
            {app.icon}
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {app.name}
            </h2>
            <p className="text-gray-500">{app.description}</p>
          </div>
        </Link>
      ))}
    </main>
  </div>
);

export default Home;
