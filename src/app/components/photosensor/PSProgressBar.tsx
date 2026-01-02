import React from 'react';

interface PSProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'accent' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const colorMap = {
  primary: 'var(--ps-primary)',
  accent: 'var(--ps-accent)',
  success: 'var(--ps-success)',
  error: 'var(--ps-error)',
  warning: 'var(--ps-warning)',
};

const heightMap = {
  sm: '6px',
  md: '8px',
  lg: '12px',
};

export function PSProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'primary',
  size = 'md',
  animated = false,
}: PSProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const bgColor = colorMap[color];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm text-[var(--ps-text-primary)]">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-[var(--ps-text-secondary)]">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          backgroundColor: 'var(--ps-border)',
          height: heightMap[size],
        }}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${percentage}%`,
            backgroundColor: bgColor,
          }}
        />
      </div>
    </div>
  );
}
