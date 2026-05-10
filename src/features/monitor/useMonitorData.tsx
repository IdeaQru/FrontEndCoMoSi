import { useEffect, useState, useRef, useCallback } from 'react';
import { socket } from '../../app/lib/socket';
import { getSensorCurrent } from '../../app/lib/api';

export interface HistoryPoint {
  timestamp: number;
  input: number;
  output: number;
}

export function useMonitorData() {
  const [counterInput, setCounterInput] = useState(0);
  const [counterOutput, setCounterOutput] = useState(0);
  const [rpmInput, setRpmInput] = useState(0);      // D200 - RPM Motor Conveyor
  const [rpmOutput, setRpmOutput] = useState(0);     // D201 - RPM Motor Rotator
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  // State untuk Uptime Frontend
  const [systemUptime, setSystemUptime] = useState(0);
  
  // Ref untuk menyimpan waktu mulai koneksi
  const connectionStartTimeRef = useRef<number | null>(null);

  const [history, setHistory] = useState<HistoryPoint[]>([]);

  // Helper untuk fetch data manual (initial load / reconnect recovery)
  const fetchCurrentState = useCallback(() => {
    getSensorCurrent().then(data => {
      console.log("Fetching latest state via API...", data);
      setCounterInput(data.counterInput ?? 0);
      setCounterOutput(data.counterOutput ?? 0);
      
      // Update history point saat fetch manual agar grafik tidak putus
      setHistory(prev => {
        const newPoint = {
           timestamp: Date.now(),
           input: data.counterInput ?? 0,
           output: data.counterOutput ?? 0
        };
        // Hindari duplikat point di detik yang sama
        if (prev.length > 0 && (Date.now() - prev[prev.length - 1].timestamp < 100)) {
            return prev;
        }
        const newHistory = [...prev, newPoint];
        if (newHistory.length > 100) newHistory.shift();
        return newHistory;
      });
      
    }).catch(err => console.error("Failed to fetch current state:", err));
  }, []);

  useEffect(() => {
    // 1. Load data awal saat component mount
    fetchCurrentState();

    function onSensorUpdate(payload: any) {
      console.log("Socket Update Received:", payload);
      const input = payload.counterInput ?? payload.input ?? 0;
      const output = payload.counterOutput ?? payload.output ?? 0;
      const rpmIn = payload.rpmInput ?? 0;
      const rpmOut = payload.rpmOutput ?? 0;

      setCounterInput(input);
      setCounterOutput(output);
      setRpmInput(rpmIn);
      setRpmOutput(rpmOut);
      
      setHistory(prev => {
        const newPoint = { timestamp: Date.now(), input, output };
        const newHistory = [...prev, newPoint];
        if (newHistory.length > 1000) newHistory.shift(); 
        return newHistory;
      });
    }

    function onConnect() {
      console.log("Socket Connected / Reconnected");
      setIsConnected(true);
      
      // Reset Uptime Timer jika belum jalan
      if (!connectionStartTimeRef.current) {
        connectionStartTimeRef.current = Date.now();
      }
      
      // A. Subscribe ke room socket
      socket.emit('subscribe-sensor-updates');

      // B. CRITICAL FIX: Fetch ulang data via API saat reconnect!
      // Ini memastikan jika kita ketinggalan broadcast saat disconnected, kita tarik data terbaru.
      fetchCurrentState(); 
    }

    function onDisconnect() {
      console.log("Socket Disconnected");
      setIsConnected(false);
      connectionStartTimeRef.current = null;
      setSystemUptime(0);
    }

    // Attach listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sensor:update', onSensorUpdate);

    // Cek jika socket sudah connect duluan sebelum effect jalan
    if (socket.connected) {
       onConnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('sensor:update', onSensorUpdate);
    };
  }, [fetchCurrentState]); // Dependency ke fetchCurrentState

  // 2. Timer Uptime Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isConnected) {
      interval = setInterval(() => {
        if (connectionStartTimeRef.current) {
          const now = Date.now();
          const diffInSeconds = Math.floor((now - connectionStartTimeRef.current) / 1000);
          setSystemUptime(diffInSeconds);
        }
      }, 1000);
    } else {
      setSystemUptime(0);
    }

    return () => clearInterval(interval);
  }, [isConnected]);

  return {
    counterInput,
    counterOutput,
    rpmInput,
    rpmOutput,
    systemUptime,
    isConnected,
    history
  };
}
