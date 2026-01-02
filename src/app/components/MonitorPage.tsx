import React, { useState, useEffect } from 'react';
import { 
  Wifi,
  Database,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PSCard } from './photosensor/PSCard';

// Pastikan interface ini sesuai dengan data yang dikirim dari container
interface MonitorPageProps {
  counterInput: number;
  counterOutput: number;
  systemUptime: number;
  isConnected: boolean; // Status koneksi WebSocket/PLC
}

// Helper: Format uptime (tetap sama)
const formatUptime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export function MonitorPage({ 
  counterInput, 
  counterOutput, 
  systemUptime, 
  isConnected 
}: MonitorPageProps) {
  
  // -- STATE LOKAL (Hanya untuk UI/Visual history) --
  
  // Total updates bisa kita hitung dari total counter saat ini
  const totalUpdates = counterInput + counterOutput;

  // Chart data: Kita simpan history sederhana di local state
  // (Idealnya, data chart history diambil dari API backend: /api/history)
  // Di sini kita buat simulasi "live updating chart" berdasarkan data masuk
  const [barChartData, setBarChartData] = useState<any[]>([]);

  // State untuk animasi perubahan angka (+1 badge)
  const [prevInputCounter, setPrevInputCounter] = useState(counterInput);
  const [prevOutputCounter, setPrevOutputCounter] = useState(counterOutput);
  const [inputChange, setInputChange] = useState(0);
  const [outputChange, setOutputChange] = useState(0);

  // -- SIDE EFFECTS --

  // 1. Deteksi perubahan Input Counter untuk animasi
  useEffect(() => {
    if (counterInput > prevInputCounter) {
      setInputChange(counterInput - prevInputCounter);
      setPrevInputCounter(counterInput);
      
      // Reset badge "+1" setelah 2 detik
      const timer = setTimeout(() => setInputChange(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [counterInput, prevInputCounter]);

  // 2. Deteksi perubahan Output Counter untuk animasi
  useEffect(() => {
    if (counterOutput > prevOutputCounter) {
      setOutputChange(counterOutput - prevOutputCounter);
      setPrevOutputCounter(counterOutput);
      
      const timer = setTimeout(() => setOutputChange(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [counterOutput, prevOutputCounter]);

  // 3. Update Chart Data saat ada data baru (Simple rolling chart)
  useEffect(() => {
    setBarChartData(prevData => {
      const now = new Date();
      const hour = now.getHours();
      
      // Jika belum ada data, inisialisasi
      if (prevData.length === 0) {
        return Array.from({ length: 12 }, (_, i) => ({
          hour: (hour - 11 + i + 24) % 24, // 12 jam terakhir
          inputRequests: Math.floor(counterInput / 12), // Rata-rata kasar
          outputRequests: Math.floor(counterOutput / 12)
        }));
      }

      // Update data jam terakhir atau tambah jam baru
      const newData = [...prevData];
      const lastEntry = newData[newData.length - 1];

      if (lastEntry.hour === hour) {
        // Update jam yang sama
        lastEntry.inputRequests += inputChange;
        lastEntry.outputRequests += outputChange;
      } else {
        // Geser data (FIFO) dan tambah jam baru
        newData.shift();
        newData.push({
          hour,
          inputRequests: inputChange,
          outputRequests: outputChange
        });
      }
      return newData;
    });
  }, [counterInput, counterOutput]);

  return (
    <div className="space-y-6 ps-fade-in">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-[var(--ps-text-primary)] mb-2">
          📈 Real-time Statistics
        </h1>
        <p className="text-sm text-[var(--ps-text-secondary)]">
          Live monitoring dari sensor PLC & Backend
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Input Counter Card */}
        <PSCard borderColor="info" hover={true}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-[#2196f3]/10 flex items-center justify-center">
                  <span className="text-xl">📥</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-[var(--ps-text-secondary)]">
                  Input Counter
                </span>
              </div>
              {inputChange > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-sm text-[var(--ps-success)] font-bold"
                >
                  +{inputChange}
                </motion.span>
              )}
            </div>
            <motion.div
              key={counterInput}
              initial={{ scale: 1.1, color: '#2196f3' }}
              animate={{ scale: 1, color: 'var(--ps-text-primary)' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-4xl sm:text-5xl font-bold mb-1">
                {counterInput.toLocaleString()}
              </p>
            </motion.div>
            <p className="text-xs text-[var(--ps-text-secondary)]">Total items detected</p>
          </div>
        </PSCard>

        {/* Output Counter Card */}
        <PSCard borderColor="warning" hover={true}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-[#ff9800]/10 flex items-center justify-center">
                  <span className="text-xl">📤</span>
                </div>
                <span className="text-xs uppercase tracking-wider text-[var(--ps-text-secondary)]">
                  Output Counter
                </span>
              </div>
              {outputChange > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-sm text-[var(--ps-success)] font-bold"
                >
                  +{outputChange}
                </motion.span>
              )}
            </div>
            <motion.div
              key={counterOutput}
              initial={{ scale: 1.1, color: '#ff9800' }}
              animate={{ scale: 1, color: 'var(--ps-text-primary)' }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-4xl sm:text-5xl font-bold mb-1">
                {counterOutput.toLocaleString()}
              </p>
            </motion.div>
            <p className="text-xs text-[var(--ps-text-secondary)]">Total items processed</p>
          </div>
        </PSCard>

        {/* Total Updates Card */}
        <PSCard borderColor="primary" hover={true}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#9c27b0]/10 flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-[var(--ps-text-secondary)]">
                Total Activity
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-bold text-[var(--ps-text-primary)] mb-1">
              {totalUpdates.toLocaleString()}
            </p>
            <p className="text-xs text-[var(--ps-text-secondary)]">Combined Input & Output</p>
          </div>
        </PSCard>

        {/* System Uptime Card */}
        <PSCard borderColor="accent" hover={true}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#00bcd4]/10 flex items-center justify-center">
                <span className="text-xl">⏱️</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-[var(--ps-text-secondary)]">
                System Uptime
              </span>
            </div>
            <p className="text-4xl sm:text-5xl font-bold font-mono text-[var(--ps-text-primary)] mb-1">
              {formatUptime(systemUptime)}
            </p>
            <p className="text-xs text-[var(--ps-text-secondary)]">Live monitoring duration</p>
          </div>
        </PSCard>
      </div>

      {/* Performance Chart Section */}
      <div>
        <h2 className="text-xl mb-4 text-[var(--ps-text-primary)]">
          Live Throughput (Last 12 Hours)
        </h2>
        <PSCard borderColor="primary" hover={false}>
          <div className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barChartData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--ps-border)" 
                  opacity={0.5}
                />
                <XAxis 
                  dataKey="hour" 
                  stroke="var(--ps-text-secondary)"
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Hour', position: 'insideBottom', offset: -5, fill: 'var(--ps-text-secondary)' }}
                />
                <YAxis 
                  stroke="var(--ps-text-secondary)"
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: 'var(--ps-text-secondary)' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--ps-surface)',
                    border: '1px solid var(--ps-border)',
                    borderRadius: '8px',
                    color: 'var(--ps-text-primary)'
                  }}
                  itemStyle={{ color: 'var(--ps-text-primary)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="inputRequests" fill="#2196f3" name="Input" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outputRequests" fill="#ff9800" name="Output" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PSCard>
      </div>

      {/* Status Section - Real Data Integration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Connection Status */}
        <div className={`p-4 rounded-lg border ${
          isConnected 
            ? 'bg-[var(--ps-success)]/10 border-[var(--ps-success)]/20' 
            : 'bg-[var(--ps-error)]/10 border-[var(--ps-error)]/20'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-[var(--ps-success)]' : 'bg-[var(--ps-error)]'}`} />
              {isConnected && (
                <div className="absolute inset-0 rounded-full bg-[var(--ps-success)] animate-ping opacity-75" />
              )}
            </div>
            <Activity className={`w-5 h-5 ${isConnected ? 'text-[var(--ps-success)]' : 'text-[var(--ps-error)]'}`} />
            <span className="font-medium text-[var(--ps-text-primary)]">System Status</span>
          </div>
          <p className={`text-2xl font-bold ${isConnected ? 'text-[var(--ps-success)]' : 'text-[var(--ps-error)]'} mb-1`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
          <p className="text-xs text-[var(--ps-text-secondary)]">
            {isConnected ? 'Real-time data stream active' : 'Check connection to backend'}
          </p>
        </div>

        {/* Database (diasumsikan connected jika WebSocket jalan) */}
        <div className="p-4 rounded-lg bg-[var(--ps-primary)]/10 border border-[var(--ps-primary)]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
               <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-[var(--ps-primary)]' : 'bg-gray-500'}`} />
            </div>
            <Database className="w-5 h-5 text-[var(--ps-primary)]" />
            <span className="font-medium text-[var(--ps-text-primary)]">Database</span>
          </div>
          <p className="text-2xl font-bold text-[var(--ps-primary)] mb-1">
            {isConnected ? 'Syncing' : 'Waiting'}
          </p>
          <p className="text-xs text-[var(--ps-text-secondary)]">
            PostgreSQL Storage
          </p>
        </div>

        {/* WebSocket */}
        <div className="p-4 rounded-lg bg-[var(--ps-accent)]/10 border border-[var(--ps-accent)]/20">
          <div className="flex items-center gap-3 mb-2">
             <Wifi className="w-5 h-5 text-[var(--ps-accent)]" />
            <span className="font-medium text-[var(--ps-text-primary)]">Protocol</span>
          </div>
          <p className="text-2xl font-bold text-[var(--ps-accent-dark)] mb-1">Socket.IO</p>
          <p className="text-xs text-[var(--ps-text-secondary)]">
            Low latency transport
          </p>
        </div>
      </div>
    </div>
  );
}
