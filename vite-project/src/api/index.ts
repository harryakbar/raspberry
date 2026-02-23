// A central file for API definitions and hooks

// =============================================================================
// Bluetooth API
// =============================================================================

export interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
}

export const getBluetoothDevices = async (): Promise<BluetoothDevice[]> => {
  // Replace with your actual API call, e.g., fetch('/api/bluetooth/devices')
  console.log("Fetching Bluetooth devices...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "JBL Flip 5", connected: true },
        { id: "2", name: "Sony WH-1000XM4", connected: false },
        { id: "3", name: "AirPods Pro", connected: false },
      ]);
    }, 1000);
  });
};

export const scanBluetoothDevices = async (): Promise<void> => {
  // Replace with your actual API call, e.g., post('/api/bluetooth/scan')
  console.log("Scanning for new Bluetooth devices...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Scan complete.");
      resolve();
    }, 2000);
  });
};

// =============================================================================
// System Metrics API
// =============================================================================

export interface SystemMetrics {
  ram: { total: string; used: string };
  cpu: { usage: string };
  gpu: { usage: string };
  network: { download: string; upload: string };
  electricity: { consumption: string };
}

export const getSystemMetrics = async (): Promise<SystemMetrics> => {
  // Replace with your actual API call, e.g., fetch('/api/metrics')
  console.log("Fetching system metrics...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ram: { total: "8GB", used: `${(Math.random() * 4 + 2).toFixed(1)}GB` },
        cpu: { usage: `${Math.floor(Math.random() * 50 + 10)}%` },
        gpu: { usage: `${Math.floor(Math.random() * 20 + 5)}%` },
        network: {
          download: `${(Math.random() * 100).toFixed(1)} Mbps`,
          upload: `${(Math.random() * 20).toFixed(1)} Mbps`,
        },
        electricity: { consumption: "5W" },
      });
    }, 1000);
  });
};

// =============================================================================
// Al-Quran API
// =============================================================================

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayat {
  code: number;
  status: string;
  data: {
    number: number;
    text: string;
    surah: {
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
      revelationType: string;
    };
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
      format: string;
      type: string;
    };
  };
}

export const getSurahs = async (): Promise<Surah[]> => {
  console.log("Fetching surah list...");
  const response = await fetch("http://api.alquran.cloud/v1/surah");
  const data = await response.json();
  return data.data;
};

export const getAyat = async (
  surahId: number,
  ayahNumber: number
): Promise<Ayat> => {
  console.log(`Fetching Ayat ${ayahNumber} of Surah ${surahId}...`);
  const response = await fetch(
    `http://api.alquran.cloud/v1/ayah/${surahId}:${ayahNumber}`
  );
  const data = await response.json();
  return data;
};
