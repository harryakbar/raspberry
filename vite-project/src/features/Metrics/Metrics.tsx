import React, { useState, useEffect } from 'react';
import { getSystemMetrics, SystemMetrics } from '../../api';
import MetricsChart from './MetricsChart';

const Metrics = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const fetchedMetrics = await getSystemMetrics();
      setMetrics(fetchedMetrics);
      const newChartData = [
        ...chartData,
        {
          name: new Date().toLocaleTimeString(),
          cpu: parseFloat(fetchedMetrics.cpu.usage),
          ram: parseFloat(fetchedMetrics.ram.used),
        },
      ];
      if (newChartData.length > 10) {
        newChartData.shift();
      }
      setChartData(newChartData);
    };

    const interval = setInterval(fetchMetrics, 2000); // Refresh every 2 seconds

    return () => clearInterval(interval);
  }, [chartData]);

  return (
    <div className="metrics-container p-4 md:p-8 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">System Metrics</h1>
        <p className="text-lg text-gray-600">Real-time performance monitoring.</p>
      </header>

      {metrics ? (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">RAM Usage</h2>
            <p className="text-gray-500">{metrics.ram.used} / {metrics.ram.total}</p>
          </div>

          <div className="card bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">CPU Usage</h2>
            <p className="text-gray-500">{metrics.cpu.usage}</p>
          </div>

          <div className="card bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">GPU Usage</h2>
            <p className="text-gray-500">{metrics.gpu.usage}</p>
          </div>

          <div className="card bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Network Stats</h2>
            <p className="text-gray-500">Down: {metrics.network.download}</p>
            <p className="text-gray-500">Up: {metrics.network.upload}</p>
          </div>

          <div className="card bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Electricity</h2>
            <p className="text-gray-500">{metrics.electricity.consumption}</p>
          </div>
        </main>
      ) : (
        <p className="text-center">Loading metrics...</p>
      )}

      <div className="mt-8">
        <MetricsChart data={chartData} dataKey="cpu" title="CPU Usage Over Time" />
      </div>

      <div className="mt-8">
        <MetricsChart data={chartData} dataKey="ram" title="RAM Usage Over Time" />
      </div>
    </div>
  );
};

export default Metrics;