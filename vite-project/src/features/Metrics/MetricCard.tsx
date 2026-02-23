import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="card bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500">{value}</p>
    </div>
  );
};

export default MetricCard;
