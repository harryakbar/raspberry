import React, { useState, useEffect } from "react";
import { getSystemMetrics, SystemMetrics } from "../../api";
import MetricsChart from "./MetricsChart";
import MetricCard from "./MetricCard";

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
    <div className="metrics-container bg-gray-100 min-h-screen">
      <header className="text-center mb-4 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          System Metrics
        </h1>
        <p className="text-md md:text-lg text-gray-600">
          Real-time performance monitoring.
        </p>
      </header>

      {metrics ? (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="RAM Usage"
            value={`${metrics.ram.used} / ${metrics.ram.total}`}
          />
          <MetricCard title="CPU Usage" value={metrics.cpu.usage} />
          <MetricCard title="GPU Usage" value={metrics.gpu.usage} />
          <MetricCard
            title="Network Stats"
            value={`Down: ${metrics.network.download} / Up: ${metrics.network.upload}`}
          />
          <MetricCard
            title="Electricity"
            value={metrics.electricity.consumption}
          />
        </main>
      ) : (
        <p className="text-center">Loading metrics...</p>
      )}

      <div className="mt-8">
        <MetricsChart
          data={chartData}
          dataKey="cpu"
          title="CPU Usage Over Time"
        />
      </div>

      <div className="mt-8">
        <MetricsChart
          data={chartData}
          dataKey="ram"
          title="RAM Usage Over Time"
        />
      </div>
    </div>
  );
};

export default Metrics;
