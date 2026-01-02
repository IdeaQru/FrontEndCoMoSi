// src/features/monitor/useMonitorData.tsx

import { useEffect, useState } from 'react';
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
  
  // 1. Pastikan state systemUptime ada
  const [systemUptime, setSystemUptime] = useState(0); 
  
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  // History Data untuk grafik
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    // Initial fetch
    getSensorCurrent().then(data => {
      setCounterInput(data.counterInput ?? 0);
      setCounterOutput(data.counterOutput ?? 0);
      setSystemUptime(systemUptime ?? 0); // Set initial uptime
      
      // Init history point pertama
      setHistory([{
        timestamp: Date.now(),
        input: data.counterInput ?? 0,
        output: data.counterOutput ?? 0
      }]);
    }).catch(console.error);

    function onSensorUpdate(payload: any) {
      const input = payload.counterInput ?? payload.input ?? 0;
      const output = payload.counterOutput ?? payload.output ?? 0;
      
      setCounterInput(input);
      setCounterOutput(output);

      // 2. Update uptime jika ada di payload
      if (payload.uptime !== undefined) {
        setSystemUptime(payload.uptime);
      }
      
      // Tambahkan point baru ke history
      setHistory(prev => {
        const newPoint = { timestamp: Date.now(), input, output };
        const newHistory = [...prev, newPoint];
        if (newHistory.length > 1000) newHistory.shift(); 
        return newHistory;
      });

      if (typeof payload.plcConnected === 'boolean') setIsConnected(payload.plcConnected);
    }

    function onConnect() {
      setIsConnected(true);
      socket.emit('subscribe-sensor-updates');
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sensor:update', onSensorUpdate);

    if (socket.connected) onConnect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('sensor:update', onSensorUpdate);
    };
  }, []);

  // 3. PENTING: Jangan lupa return systemUptime di sini
  return { 
    counterInput, 
    counterOutput, 
    systemUptime, // <-- Tambahkan ini
    isConnected, 
    history 
  };
}
