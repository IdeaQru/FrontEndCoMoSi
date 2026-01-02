import React from 'react';

interface PSLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'success' | 'white';
  fullScreen?: boolean;
  message?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};

const colorMap = {
  primary: 'border-[var(--ps-primary)] border-t-transparent',
  accent: 'border-[var(--ps-accent)] border-t-transparent',
  success: 'border-[var(--ps-success)] border-t-transparent',
  white: 'border-white border-t-transparent',
};

export function PSLoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  fullScreen = false,
  message
}: PSLoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} ${colorMap[color]} rounded-full animate-spin`}
      />
      {message && (
        <p className="text-sm text-[var(--ps-text-secondary)]">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--ps-bg-gradient-start)] bg-opacity-90 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
