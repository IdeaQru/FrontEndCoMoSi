import React from 'react';
import { LucideIcon } from 'lucide-react';
import { PSCard } from './PSCard';

interface PSStatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  borderColor?: 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

export function PSStatCard({ 
  label, 
  value, 
  icon: Icon, 
  borderColor = 'primary',
  trend,
  loading = false 
}: PSStatCardProps) {
  return (
    <PSCard borderColor={borderColor} hover={false}>
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-[var(--ps-text-secondary)] mb-1 sm:mb-2">
              {label}
            </p>
            {loading ? (
              <div className="h-8 sm:h-10 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            ) : (
              <p className="text-2xl sm:text-3xl md:text-4xl text-[var(--ps-text-primary)]">
                {value}
              </p>
            )}
            {trend && !loading && (
              <p className={`text-xs sm:text-sm mt-2 ${trend.isPositive ? 'text-[var(--ps-success)]' : 'text-[var(--ps-error)]'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          {Icon && (
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `var(--ps-${borderColor})`, opacity: 0.1 }}
            >
              <Icon 
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ color: `var(--ps-${borderColor})` }}
              />
            </div>
          )}
        </div>
      </div>
    </PSCard>
  );
}
