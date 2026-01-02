import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PSInputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export function PSInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  icon: Icon,
  fullWidth = false,
}: PSInputProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm text-[var(--ps-text-primary)] mb-2">
          {label}
          {required && <span className="text-[var(--ps-error)] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ps-text-secondary)]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2 rounded-lg
            bg-[var(--ps-surface)] 
            border-2 transition-all duration-200
            text-[var(--ps-text-primary)]
            placeholder:text-[var(--ps-text-secondary)]
            ${Icon ? 'pl-11' : ''}
            ${error 
              ? 'border-[var(--ps-error)] focus:border-[var(--ps-error)]' 
              : 'border-[var(--ps-border)] focus:border-[var(--ps-primary)]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:outline-none focus:ring-2 focus:ring-offset-0
          `}
          style={{
            boxShadow: error ? 'none' : undefined,
          }}
        />
      </div>
      {error && (
        <p className="text-sm text-[var(--ps-error)] mt-1">{error}</p>
      )}
    </div>
  );
}
