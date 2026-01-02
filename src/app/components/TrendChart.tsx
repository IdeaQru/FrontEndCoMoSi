// src/components/TrendChart.tsx

import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { PSCard } from './photosensor/PSCard';

// Pastikan tipe data sama dengan di hook
import { HistoryPoint } from '../../features/monitor/useMonitorData';

interface TrendChartProps {
  history: HistoryPoint[]; // Data real dari App/Hook
}

type TimeRange = '5min' | '1hour' | 'today';

export function TrendChart({ history }: TrendChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('5min');

  // Filter & Format Data Real untuk Chart
  const filteredData = useMemo(() => {
    if (!history || history.length === 0) return [];

    const now = Date.now();
    let cutoffTime = 0;

    // Tentukan batas waktu data yang diambil
    if (timeRange === '5min') cutoffTime = now - 5 * 60 * 1000;
    else if (timeRange === '1hour') cutoffTime = now - 60 * 60 * 1000;
    else if (timeRange === 'today') {
      const today = new Date();
      today.setHours(0,0,0,0);
      cutoffTime = today.getTime();
    }

    // 1. Ambil data sesuai rentang waktu
    const relevantData = history.filter(pt => pt.timestamp >= cutoffTime);

    // 2. Format label agar enak dibaca di grafik
    return relevantData.map(pt => ({
      ...pt,
      label: new Date(pt.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: timeRange === '5min' ? '2-digit' : undefined // Detik hanya di mode 5 menit
      })
    }));

  }, [history, timeRange]);

  return (
    <PSCard borderColor="primary" hover={false}>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[var(--ps-primary)]/10 rounded-lg">
              <BarChart3 className="w-5 h-5 text-[var(--ps-primary)]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--ps-text-primary)]">
                Live Trends
              </h3>
              <p className="text-xs text-[var(--ps-text-secondary)]">
                Real-time sensor data history
              </p>
            </div>
          </div>

          <div className="flex p-1 bg-[var(--ps-surface-hover)] rounded-lg border border-[var(--ps-border)]">
            {(['5min', '1hour', 'today'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize
                  ${timeRange === range 
                    ? 'bg-[var(--ps-surface)] text-[var(--ps-primary)] shadow-sm border border-[var(--ps-border)]' 
                    : 'text-[var(--ps-text-secondary)] hover:text-[var(--ps-text-primary)]'}
                `}
              >
                {range === '5min' ? '5 Min' : range === '1hour' ? '1 Hour' : 'Today'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196f3" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff9800" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff9800" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--ps-border)" opacity={0.3} vertical={false} />
              <XAxis 
                dataKey="label" 
                stroke="var(--ps-text-secondary)" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                minTickGap={30} // Agar label tidak bertumpuk
                dy={10}
              />
              <YAxis 
                stroke="var(--ps-text-secondary)" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={['auto', 'auto']} // Auto scale Y axis
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--ps-surface)',
                  border: '1px solid var(--ps-border)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  color: 'var(--ps-text-primary)'
                }}
                labelStyle={{ marginBottom: '8px', color: 'var(--ps-text-secondary)', fontSize: '11px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
              <Area 
                type="monotone" 
                dataKey="input" 
                stroke="#2196f3" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorInput)" 
                name="Input"
                isAnimationActive={false} // Disable animation for smoother realtime updates
              />
              <Area 
                type="monotone" 
                dataKey="output" 
                stroke="#ff9800" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorOutput)" 
                name="Output"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PSCard>
  );
}
