
import React, { useState, useEffect } from 'react';
import { getBluetoothDevices, scanBluetoothDevices, BluetoothDevice } from '../../api';

const BluetoothSettings = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const fetchedDevices = await getBluetoothDevices();
      setDevices(fetchedDevices);
    };
    fetchDevices();
  }, []);

  const handleScan = async () => {
    setIsScanning(true);
    await scanBluetoothDevices();
    const fetchedDevices = await getBluetoothDevices();
    setDevices(fetchedDevices);
    setIsScanning(false);
  };

  return (
    <div className="bluetooth-settings-container p-4 md:p-8 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Bluetooth Settings</h1>
        <p className="text-lg text-gray-600">Manage your Bluetooth devices.</p>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="card bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">Available Devices</h2>
            <button
              onClick={handleScan}
              className={`btn ${isScanning ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded`}
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </div>

        <div className="card bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Paired Devices</h2>
          <ul>
            {devices.map(device => (
              <li key={device.id} className="flex justify-between items-center p-2 border-b">
                <span>{device.name}</span>
                <span className={`text-sm ${device.connected ? 'text-green-500' : 'text-gray-500'}`}>
                  {device.connected ? 'Connected' : 'Disconnected'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default BluetoothSettings;
