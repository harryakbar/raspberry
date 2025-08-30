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
  id: number;
  name: string;
  ayahs: number;
}

export interface Ayat {
  surah: string;
  ayah: number;
  text: string;
}

export const getSurahs = async (): Promise<Surah[]> => {
  // Replace with your actual API call, e.g., fetch('/api/quran/surahs')
  console.log("Fetching surah list...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Al-Fatihah", ayahs: 7 },
        { id: 2, name: "Al-Baqarah", ayahs: 286 },
        { id: 3, name: "Ali 'Imran", ayahs: 200 },
        { id: 4, name: "An-Nisa'", ayahs: 176 },
        { id: 5, name: "Al-Ma'idah", ayahs: 120 },
      ]);
    }, 500);
  });
};

export const getAyat = async (
  surahId: number,
  ayahNumber: number
): Promise<Ayat> => {
  // Replace with your actual API call, e.g., fetch(`/api/quran/surahs/${surahId}/ayat/${ayahNumber}`)
  console.log(`Fetching Ayat ${ayahNumber} of Surah ${surahId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        surah: "Al-Fatihah",
        ayah: ayahNumber,
        text: `This is a sample text for ayah ${ayahNumber}. In the name of Allah, the Most Gracious, the Most Merciful.`,
      });
    }, 200);
  });
};
