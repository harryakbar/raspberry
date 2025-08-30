import { Link } from "react-router-dom";

const Apps = () => (
  <div className="apps-container p-4 md:p-8 bg-gray-100 min-h-screen">
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Applications</h1>
      <p className="text-lg text-gray-600">Manage your applications.</p>
    </header>

    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/alquran" className="transform hover:scale-105 transition-transform duration-300">
        <div className="card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Al-Quran</h2>
          <p className="text-gray-500">Read the Holy Quran</p>
        </div>
      </Link>
    </main>
  </div>
);

export default Apps;