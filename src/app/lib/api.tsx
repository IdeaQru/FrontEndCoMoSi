export type SensorCurrent = {
  counterInput: number;
  counterOutput: number;
  uptime?: number;
  statusInput?: boolean | number;
  statusOutput?: boolean | number;
  timestamp?: string;
  plcConnected?: boolean;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export async function getSensorCurrent(): Promise<SensorCurrent> {
  const res = await fetch(`${API_BASE}/sensors/current`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  // Jika backend Anda membungkus response { success, data }, sesuaikan mapping di sini:
  return json.data ?? json;
}
