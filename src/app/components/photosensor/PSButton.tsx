import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PSButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: {
    bg: 'var(--ps-primary)',
    bgHover: 'var(--ps-primary-dark)',
    text: '#ffffff',
  },
  secondary: {
    bg: 'transparent',
    bgHover: 'var(--ps-surface-hover)',
    text: 'var(--ps-primary)',
    border: 'var(--ps-primary)',
  },
  success: {
    bg: 'var(--ps-success)',
    bgHover: 'var(--ps-success-dark)',
    text: '#ffffff',
  },
  error: {
    bg: 'var(--ps-error)',
    bgHover: 'var(--ps-error-dark)',
    text: '#ffffff',
  },
  warning: {
    bg: 'var(--ps-accent)',
    bgHover: 'var(--ps-accent-dark)',
    text: '#333333',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function PSButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
}: PSButtonProps) {
  const styles = variantStyles[variant];
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-lg font-medium
        transition-all duration-200
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md active:scale-95'}
      `}
      style={{
        backgroundColor: variant === 'secondary' ? styles.bg : styles.bg,
        color: styles.text,
        border: styles.border ? `2px solid ${styles.border}` : 'none',
      }}
      onMouseEnter={(e) => {
        if (!isDisabled && variant !== 'secondary') {
          e.currentTarget.style.backgroundColor = styles.bgHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled && variant !== 'secondary') {
          e.currentTarget.style.backgroundColor = styles.bg;
        }
      }}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon className="w-4 h-4" />}
    </button>
  );
}
