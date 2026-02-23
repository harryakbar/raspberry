
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MetricsChartProps {
  data: any[];
  dataKey: string;
  title: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ data, dataKey, title }) => (
  <div className="card bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default MetricsChart;
