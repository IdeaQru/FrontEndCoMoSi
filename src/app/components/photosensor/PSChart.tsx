import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PSCard } from './PSCard';

interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface PSChartProps {
  data: ChartDataPoint[];
  title?: string;
  type?: 'line' | 'area';
  dataKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  loading?: boolean;
}

export function PSChart({ 
  data, 
  title,
  type = 'line',
  dataKey = 'value',
  color = 'var(--ps-primary)',
  height = 300,
  showGrid = true,
  showLegend = false,
  loading = false
}: PSChartProps) {
  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <PSCard borderColor="primary" hover={false}>
      <div className="p-4 sm:p-6">
        {title && (
          <h3 className="text-base sm:text-lg mb-4 text-[var(--ps-text-primary)]">{title}</h3>
        )}
        {loading ? (
          <div 
            className="w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
            style={{ height }}
          />
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <ChartComponent data={data}>
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--ps-border)" 
                  opacity={0.5}
                />
              )}
              <XAxis 
                dataKey="name" 
                stroke="var(--ps-text-secondary)"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="var(--ps-text-secondary)"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--ps-surface)',
                  border: '1px solid var(--ps-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--ps-shadow)',
                }}
                labelStyle={{ color: 'var(--ps-text-primary)' }}
              />
              {showLegend && <Legend />}
              <DataComponent
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fill={type === 'area' ? color : undefined}
                fillOpacity={type === 'area' ? 0.2 : undefined}
                strokeWidth={2}
                dot={{ fill: color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ChartComponent>
          </ResponsiveContainer>
        )}
      </div>
    </PSCard>
  );
}
