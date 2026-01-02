import React from 'react';

interface PSCardProps {
  children: React.ReactNode;
  borderColor?: 'primary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const borderColors = {
  primary: 'var(--ps-primary)',
  accent: 'var(--ps-accent)',
  success: 'var(--ps-success)',
  error: 'var(--ps-error)',
  warning: 'var(--ps-warning)',
  info: 'var(--ps-info)',
};

export function PSCard({ 
  children, 
  borderColor = 'primary', 
  hover = true,
  className = '',
  onClick 
}: PSCardProps) {
  const borderStyle = {
    borderLeft: `4px solid ${borderColors[borderColor]}`,
  };

  return (
    <div
      className={`bg-[var(--ps-surface)] rounded-lg ps-card-shadow transition-all duration-200 ${
        hover ? 'hover:shadow-lg hover:bg-[var(--ps-surface-hover)] cursor-pointer' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={borderStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
