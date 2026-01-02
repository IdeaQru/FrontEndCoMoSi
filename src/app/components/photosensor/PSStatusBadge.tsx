import React from 'react';

interface PSStatusBadgeProps {
  status: 'on' | 'off' | 'warning' | 'error' | 'info';
  label?: string;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  on: {
    bg: 'var(--ps-success)',
    text: 'var(--ps-success-dark)',
    label: 'ON',
  },
  off: {
    bg: 'var(--ps-error)',
    text: 'var(--ps-error-dark)',
    label: 'OFF',
  },
  warning: {
    bg: 'var(--ps-accent)',
    text: 'var(--ps-accent-dark)',
    label: 'WARNING',
  },
  error: {
    bg: 'var(--ps-error)',
    text: 'var(--ps-error-dark)',
    label: 'ERROR',
  },
  info: {
    bg: 'var(--ps-info)',
    text: 'var(--ps-primary-dark)',
    label: 'INFO',
  },
};

const sizeConfig = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
};

export function PSStatusBadge({ 
  status, 
  label, 
  pulse = false,
  size = 'md' 
}: PSStatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium ${sizeConfig[size]}`}
      style={{
        backgroundColor: `${config.bg}20`,
        color: config.text,
      }}
    >
      <span
        className={`w-2 h-2 rounded-full ${pulse ? 'ps-pulse' : ''}`}
        style={{ backgroundColor: config.bg }}
      />
      {displayLabel}
    </span>
  );
}
