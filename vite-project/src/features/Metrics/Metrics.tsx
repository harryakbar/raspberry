import React from 'react';

const Metrics = () => {
  const metricsData = {
    ram: { total: '8GB', used: '2.5GB' },
    cpu: { usage: '35%' },
    gpu: { usage: '15%' },
    network: { download: '50 Mbps', upload: '10 Mbps' },
    electricity: { consumption: '5W' },
  };

  return (
    <div className="metrics-container p-4 md:p-8 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">System Metrics</h1>
        <p className="text-lg text-gray-600">Real-time performance monitoring.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">RAM Usage</h2>
          <p className="text-gray-500">{metricsData.ram.used} / {metricsData.ram.total}</p>
        </div>

        <div className="card bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">CPU Usage</h2>
          <p className="text-gray-500">{metricsData.cpu.usage}</p>
        </div>

        <div className="card bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">GPU Usage</h2>
          <p className="text-gray-500">{metricsData.gpu.usage}</p>
        </div>

        <div className="card bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Network Stats</h2>
          <p className="text-gray-500">Down: {metricsData.network.download}</p>
          <p className="text-gray-500">Up: {metricsData.network.upload}</p>
        </div>

        <div className="card bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Electricity</h2>
          <p className="text-gray-500">{metricsData.electricity.consumption}</p>
        </div>
      </main>
    </div>
  );
};

export default Metrics;